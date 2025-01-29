import { uploadActivityShare } from "~/server/utils/db";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const body = await readBody(event);

  if (!body.files || !body.metadata) {
    throw createError({ statusCode: 400, message: "Content is required" });
  }
  
  const id = await uploadActivityShare(body.files, body.metadata, user.id);

  return { id };
});
