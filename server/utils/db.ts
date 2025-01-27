import { drizzle } from 'drizzle-orm/libsql';
import { eq, desc } from 'drizzle-orm';
const db = drizzle("file:local.db");
export default db;
import crypto from "crypto";
import { activities, files, revisions, revisionFiles, metadata } from "~/db/schema"; // Import schema
function Hash(data: crypto.BinaryLike) {
    return crypto.createHash("sha256").update(data).digest("hex")
}
export async function uploadRevision(fileList: { name: string, data: Buffer }[], metadataJson: string) {
    //TODO: testing, edgecases, duplicate handling, more...

    // Insert folder info
    const [folder] = await db.insert(activities).values({}).returning();

    // Calculate file hashes and store unique files
    const fileMap: { [key: string]: number } = {};
    for (const file of fileList) {
        const hash = Hash(file.data)
        if (!fileMap[hash]) {
            const [storedFile] = await db
                .insert(files).values({ name: file.name, hash, data: file.data })
                .returning();
            fileMap[hash] = storedFile.id;
        }
    }

    // Insert revision info
    const [latestRevision] = await db.select().from(revisions).where(eq(revisions.folderId, folder.id)).orderBy(desc(revisions.createdAt)).limit(1);
    const revisionNumber = latestRevision ? latestRevision.number + 1 : 1;
    const [revision] = await db.insert(revisions).values({ folderId: folder.id, number: revisionNumber }).returning();

    // Link files to revision
    for (const fileHash in fileMap) {
        await db.insert(revisionFiles).values({ revisionId: revision.id, fileId: fileMap[fileHash] });
    }

    // Store metadata
    await db.insert(metadata).values({ revisionId: revision.id, json: metadataJson, hash: Hash(metadataJson) });

    // Clean up old revisions if necessary
    const totalRevisions = await db.select().from(revisions).where(eq(revisions.folderId, folder.id));
    if (totalRevisions.length > 5) {
        const oldestRevision = totalRevisions.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))[0];
        await db.delete(revisions).where(eq(revisions.id, oldestRevision.id));
        await db.delete(revisionFiles).where(eq(revisionFiles.revisionId, oldestRevision.id));
        await db.delete(metadata).where(eq(revisionFiles.revisionId, oldestRevision.id));
    }
}
//TODO: retrieve
