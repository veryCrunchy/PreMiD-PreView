import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

// Tables
//TODO: check when well rested, schema likely has some flaws 
export const activities = sqliteTable("activities", {// the shares created
    id: integer().primaryKey(),
    createdAt: text().default("CURRENT_TIMESTAMP"),
});

export const activityRelations = relations(activities, ({ many }) => ({
    revisions: many(revisions),
}));


export const files = sqliteTable("files", {
    id: integer().primaryKey(),
    name: text().notNull(),
    hash: text().notNull().unique(), // Hash to avoid duplicates
    data: blob().notNull(),
    createdAt: text().default("CURRENT_TIMESTAMP").notNull(),
});

export const revisions = sqliteTable("revisions", {
    id: integer().primaryKey(),
    activityId: integer().references(() => activities.id),
    number: integer().notNull(), // Revision number
    createdAt: text().default("CURRENT_TIMESTAMP").notNull(),
    metadataId: integer().references(() => files.id),
});

export const revisionsRelations = relations(revisions, ({ many, one }) => ({
    activity: one(activities),
    revisionFiles: many(revisionFiles),
    metadata: one(revisionFiles, {
        fields: [revisions.metadataId],
        references: [revisionFiles.id],
    }),
}));


export const revisionFiles = sqliteTable("revisionFiles", {
    // Link files to a revision
    // This helps save storage by reusing unchanged files across different revisions
    id: integer().primaryKey(),
    revisionId: integer().references(() => revisions.id),
    fileId: integer().references(() => files.id),
});

export const revisionFilesRelations = relations(revisionFiles, ({ many, one }) => ({
    revision: one(revisions),
    file: one(files),
}));



// potentially unnecessary relations

// export const filesRelations = relations(files, ({ many }) => ({
//     revisionFile: many(revisionFiles),
// }));

// export const metadataRelations = relations(metadata, ({ one }) => ({
//     revision: one(revisions), // should be many
// }));