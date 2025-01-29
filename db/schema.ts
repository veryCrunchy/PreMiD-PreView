import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  primaryKey,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

// Tables
export const users = pgTable("users", {
  // the shares created
  id: varchar().primaryKey(),
  username: varchar().notNull(),
  global_name: varchar(),
  avatar: varchar(),
  timestamp: timestamp().notNull().defaultNow(),
});

export const activities = pgTable("activities", {
  // the shares created
  id: varchar()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  timestamp: timestamp().notNull().defaultNow(),
  authorId: varchar()
    .notNull()
    .references(() => users.id),
});

export const activityRelations = relations(activities, ({ one, many }) => ({
  author: one(users, {
    fields: [activities.authorId],
    references: [users.id],
  }),
  revisions: many(revisions),
}));

export const files = pgTable("files", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  hash: varchar().notNull().unique(), // Hash to avoid duplicates
  data: text().notNull(),
  timestamp: timestamp().notNull().defaultNow(),
});

export const revisions = pgTable("revisions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  activityId: varchar()
    .references(() => activities.id)
    .notNull(),
  number: integer().notNull(), // Revision number
  timestamp: timestamp().notNull().defaultNow(),
  metadataId: integer()
    .references(() => files.id)
    .notNull(),
});

export const revisionsRelations = relations(revisions, ({ many, one }) => ({
  activity: one(activities, {
    fields: [revisions.activityId],
    references: [activities.id],
  }),
  revisionFiles: many(revisionFiles),
  metadata: one(files, {
    fields: [revisions.metadataId],
    references: [files.id],
  }),
}));

export const revisionFiles = pgTable(
  "revisionFiles",
  {
    // Link files to a revision
    // This helps save storage by reusing unchanged files across different revisions
    revisionId: integer()
      .references(() => revisions.id)
      .notNull(),
    fileId: integer()
      .references(() => files.id)
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.revisionId, t.fileId] })]
);

export const revisionFilesRelations = relations(revisionFiles, ({ one }) => ({
  revision: one(revisions, {
    fields: [revisionFiles.revisionId],
    references: [revisions.id],
  }),
  file: one(files, {
    fields: [revisionFiles.fileId],
    references: [files.id],
  }),
}));

// potentially unnecessary relations

// export const filesRelations = relations(files, ({ many }) => ({
//     revisionFile: many(revisionFiles),
// }));

// export const metadataRelations = relations(metadata, ({ one }) => ({
//     revision: one(revisions), // should be many
// }));
