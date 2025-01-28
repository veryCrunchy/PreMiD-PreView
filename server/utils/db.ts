import { drizzle } from 'drizzle-orm/libsql';
import { eq, desc, ExtractTablesWithRelations } from 'drizzle-orm';
import * as schema from "~/db/schema";
const db = drizzle("file:local.db", { schema });
export default db;
import crypto from "crypto";
import { activities, files, revisions, revisionFiles } from "~/db/schema"; // Import schema
import { ResultSet } from '@libsql/client';
import { SQLiteTransaction } from 'drizzle-orm/sqlite-core';
function Hash(data: crypto.BinaryLike) {
    return crypto.createHash("sha256").update(data).digest("hex")
}
type File = { name: string, data: string | Buffer }
async function handleFileUpload({ name, data }: File, tx: SQLiteTransaction<"async", ResultSet, typeof schema, ExtractTablesWithRelations<typeof schema>>): Promise<number> {
        if (typeof data === "object") data = JSON.stringify(data);
    data = Buffer.from(data);
    const hash = Hash(data)
    const [existingFile] = await tx
        .select({ id: files.id }).from(files).where(eq(files.hash, hash))
    if (existingFile) return existingFile.id
    const [newFile] = await tx
        .insert(files).values({ name, hash, data })
        .returning({ id: files.id });
    return newFile.id
}
export async function uploadActivityShare(fileList: File[], metadataJson: string) {
return await db.transaction(async (tx) => {
    //TODO: testing, edgecases, duplicate handling, more...

    // Insert folder info
    const [activity] = await tx.insert(activities).values({}).returning();

    // Calculate file hashes and store unique files
    const metadataId = await handleFileUpload({ data: metadataJson, name: "metadata.json" }, tx);

        const fileIds: number[] = [metadataId];
    for (let { name, data } of fileList) {
        fileIds.push(await handleFileUpload({ data, name }, tx));
    }

    // Insert revision info
    const [latestRevision] = await tx.select().from(revisions).where(eq(revisions.activityId, activity.id)).orderBy(desc(revisions.createdAt)).limit(1);
    const revisionNumber = latestRevision ? latestRevision.number + 1 : 1;
    const [revision] = await tx.insert(revisions).values({ activityId: activity.id, number: revisionNumber, metadataId }).returning();

    // Link files to revision
    for (const fileId of fileIds) {
        await tx.insert(revisionFiles).values({ revisionId: revision.id, fileId });
    }

    // Clean up old revisions if necessary
    const totalRevisions = await tx.select().from(revisions).where(eq(revisions.activityId, activity.id));
    if (totalRevisions.length > 5) {
        const oldestRevision = totalRevisions.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))[0];
        await tx.delete(revisions).where(eq(revisions.id, oldestRevision.id));
        //TODO: only delete files that aren't needed/referenced anymore
        await tx.delete(revisionFiles).where(eq(revisionFiles.revisionId, oldestRevision.id));
    }
    return activity.id
}).catch(e => console.log(e))
}
//TODO: retrieve
