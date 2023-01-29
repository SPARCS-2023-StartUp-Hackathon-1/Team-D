import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const donationDestinationRouter = createTRPCRouter({
  getDonationDestinationByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log(input.name);
      const res = await ctx.prisma.donateDestination.findFirst({
        where: { name: input.name }
      });
      console.log(res);
      return res;
    })
});
