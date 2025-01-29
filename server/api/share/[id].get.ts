import { getActivityShare } from "~/server/utils/db";

export default defineEventHandler((event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({ statusCode: 400 });
  }

  const share = getActivityShare(id);

  if (!share) {
    throw createError({ statusCode: 404, message: "Activity not found" });
  }

  return share;
});
