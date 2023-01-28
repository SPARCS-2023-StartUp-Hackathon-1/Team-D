import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const zodEvent = z.object({eventName: z.string(), eventDate: z.date(), eventDestId: z.string()});

enum EventState {
  NOT_STARTED,
  ONGOING,
  FINISHED
}

const HOURS_OF_DAY = 24
const MINUTES_OF_HOUR = 60
const SECONDS_OF_MINUTE = 60
const MILLISEC_OF_SEC = 1000

// TODO: move this to util folder?
function checkEventState(eventDate: Date) {
  const currentTime = Date.now()
  const eventTime = eventDate.getTime()
  const millisec_per_day = HOURS_OF_DAY * MINUTES_OF_HOUR * SECONDS_OF_MINUTE * MILLISEC_OF_SEC;
  const eventStartTime = eventTime - millisec_per_day;
  const eventEndTime = eventTime + millisec_per_day;
  if (eventStartTime < currentTime) {
    return EventState.NOT_STARTED
  } else if (eventEndTime > currentTime) {
    return EventState.FINISHED
  } else {
    return EventState.ONGOING

  }
}

export const eventRouter = createTRPCRouter({
  getEvent: publicProcedure
  .input(z.object({eventId: z.string()}))
    .query(async ({ctx, input}) => {
      return await ctx.prisma.event.findUnique({where: {id: input.eventId}});
    }),

  getAllEventsByUserId: protectedProcedure
    .query(async ({ ctx }) => {
      // TODO: pagination later?
      // TODO: maybneed some filtering? like not-started, on-going, finished
      return await ctx.prisma.event.findMany({
        where: {userId: ctx.session.user.id}, include: {destination: true}
      });
    }),

  mutateEvent: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        mutatedEvent: zodEvent,
        })
    )
   .mutation(async ({ctx, input}) => {
     // TODO: check current state
     return await ctx.prisma.event.update({where: {id: input.eventId}, data: input.mutatedEvent})
   }),

  createEvent: protectedProcedure
    .input(zodEvent)
    .mutation(async ({ctx, input}) => {
      // TODO: check eventDate is valid? => should this be done in clientside?
       return await ctx.prisma.event
        .create({
          data: { 
            userId: ctx.session.user.id, 
            eventName: input.eventName, 
            eventDate: input.eventDate, 
            destId: input.eventDestId
          }
        }
      );
    }),


});
