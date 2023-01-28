import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserBySession: protectedProcedure
  .query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    })
  }),
  updateName: protectedProcedure
  .input(z.object({name : z.string({})}))
  .mutation(({ ctx, input })=> {
    const { prisma, session } = ctx;
    const { name } = input;
    return prisma.user.update({
      data: {
        name: name,
      },
      where: {
        id: session.user.id,
      }
    })
  })
})