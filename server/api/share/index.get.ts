import { getActivityShares } from '~/server/utils/db';

export default defineEventHandler(async () => {
    return await getActivityShares()
});
