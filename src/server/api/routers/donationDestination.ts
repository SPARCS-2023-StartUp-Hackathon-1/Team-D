import { Color } from '@prisma/client';
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
    }),

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  createDonation: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        amount: z.number(),
        message: z.string(),
        eventId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      await ctx.prisma.donate.create({
        data: {
          donorName: input.name,
          money: input.amount,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          color: Color.RED,
          message: input.message,
          eventId: input.eventId
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return await ctx.prisma.event.update({
        where: { id: input.eventId },
        data: {
          totalDonation: {
            increment: input.amount
          },
          numDonors: {
            increment: 1
          }
        }
      });
    })
});
