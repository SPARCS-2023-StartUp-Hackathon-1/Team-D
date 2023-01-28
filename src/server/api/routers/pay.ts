import { createTRPCRouter, publicProcedure } from "../trpc";

export const payRouter = createTRPCRouter({
  getToken: publicProcedure.query(() => {
    return {
      token: process.env.APP_ADMIN_KEY,
    };
  }),
});
