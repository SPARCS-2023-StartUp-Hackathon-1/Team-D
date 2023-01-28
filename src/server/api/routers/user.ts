import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Tag } from "@prisma/client";

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
  }),
  updateIsFirstLogin: protectedProcedure
  .input(z.object({bool : z.boolean({})}))
  .mutation(({ ctx, input })=> {
    const { prisma, session } = ctx;
    const { bool } = input;
    return prisma.user.update({
      data: {
        isFirstLogin: bool,
      },
      where: {
        id: session.user.id,
      }
    })
  }),
  updateTags: protectedProcedure
  .input(z.object({tag: z.string({})}))
  .mutation(({ ctx, input}) => {
    const { prisma, session } = ctx;
    const {tag} = input;
    let variable;
    if (tag === "CHILDREN"){
      variable = Tag.CHILDREN;
    } else if (tag === "ENVIRONMENT") {
      variable = Tag.ENVIRONMENT;
    } else if (tag === "FAMINE") {
      variable = Tag.FAMINE;
    } else if (tag === "HUMAN_RIGHTS") {
      variable = Tag.HUMAN_RIGHTS;
    } else if (tag === "REFUGEE") {
      variable = Tag.REFUGEE;
    }
    
    return prisma.user.update({
      data: {
        interestedTags: {
          push: variable,
        }
      },
      where: {
        id: session.user.id,
      }
    })
  })
})