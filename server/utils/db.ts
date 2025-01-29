import { drizzle, PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";
import { eq, desc, ExtractTablesWithRelations, sql } from "drizzle-orm";
import * as schema from "~/db/schema";
const db = drizzle(process.env.DATABASE_URL!, { schema });
export default db;
import crypto from "crypto";
import { activities, files, revisions, revisionFiles } from "~/db/schema"; // Import schema
import { omit } from "~/server/utils";
import { Metadata } from "~/types/metadata/1.13";
import { PgTransaction } from "drizzle-orm/pg-core";
function Hash(data: crypto.BinaryLike) {
  return crypto.createHash("sha256").update(data).digest("hex");
}
type File = { name: string; data: string };
async function handleFileUpload(
  { name, data }: File,
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
  >
): Promise<number> {
  if (typeof data === "object") data = JSON.stringify(data);
  const hash = Hash(data);
  const [existingFile] = await tx
    .select({ id: files.id })
    .from(files)
    .where(eq(files.hash, hash));
  if (existingFile) return existingFile.id;
  const [newFile] = await tx
    .insert(files)
    .values({ name, hash, data })
    .returning({ id: files.id });
  return newFile.id;
}
export async function uploadActivityShare(
  fileList: File[],
  metadataJson: string,
  authorId: string
) {
  return await db
    .transaction(async (tx) => {
      // Insert folder info
      //TODO: multiple revisions under same activity
      const [activity] = await tx
        .insert(activities)
        .values({ authorId })
        .returning();

      // Calculate file hashes and store unique files
      const metadataId = await handleFileUpload(
        { data: metadataJson, name: "metadata.json" },
        tx
      );

      const fileIds: number[] = [metadataId];
      for (let { name, data } of fileList) {
        fileIds.push(await handleFileUpload({ data, name }, tx));
      }

      // Insert revision info
      const [latestRevision] = await tx
        .select()
        .from(revisions)
        .where(eq(revisions.activityId, activity.id))
        .orderBy(desc(revisions.timestamp))
        .limit(1);
      const revisionNumber = latestRevision ? latestRevision.number + 1 : 1;
      const [revision] = await tx
        .insert(revisions)
        .values({ activityId: activity.id, number: revisionNumber, metadataId })
        .returning();

      // Link files to revision
      for (const fileId of fileIds) {
        await tx
          .insert(revisionFiles)
          .values({ revisionId: revision.id, fileId });
      }

      // Clean up old revisions if necessary
      // const totalRevisions = await tx
      //   .select()
      //   .from(revisions)
      //   .where(eq(revisions.activityId, activity.id));
      // if (totalRevisions.length > 5) {
      //   const oldestRevision = totalRevisions.sort(
      //     (a, b) => a.timestamp - b.timestamp
      //   )[0];
      //   await tx.delete(revisions).where(eq(revisions.id, oldestRevision.id));
      //   //TODO: only delete files that aren't needed/referenced anymore
      //   await tx
      //     .delete(revisionFiles)
      //     .where(eq(revisionFiles.revisionId, oldestRevision.id));
      // }
      return activity.id;
    })
    .catch((e) => console.log(e));
}
//TODO: retrieve
export type Share = {
  id: string;
  revision: {
    number: number;
    id: number;
    timestamp: Date;
    activityId: string;
  };
  metadata: Metadata;
  timestamp: Date;
};
export async function getActivityShares(): Promise<Share[]> {
  const shares = await db.query.activities.findMany({
    with: {
      revisions: {
        limit: 1,
        orderBy: desc(revisions.number),
        with: {
          metadata: {
            columns: {
              data: false,
            },
            extras: {
              data: sql<string>`
                                    CAST(${files.data} AS TEXT)
                                `.as("data"),
            },
          },
        },
      },
    },
  });
  const processedShares = shares.map((share) => {
    return {
      id: share.id,
      timestamp: share.timestamp,
      metadata: JSON.parse(share.revisions[0].metadata.data) as Metadata,
      revision: omit(share.revisions[0], ["metadata", "metadataId"]),
    };
  });
  return processedShares;
}
export async function getActivityShare(id: string): Promise<Share> {
  const share = await db.query.activities.findFirst({
    where: eq(activities.id, id),
    with: {
      revisions: {
        limit: 1,
        orderBy: desc(revisions.number),
        with: {
          metadata: true,
        },
      },
    },
  });
  if (!share) throw new Error("Share not found");
  return {
    id: share.id,
    timestamp: share.timestamp,
    metadata: JSON.parse(share.revisions[0].metadata.data) as Metadata,
    revision: omit(share.revisions[0], ["metadata", "metadataId"]),
  };
}
