import { createTRPCRouter } from './trpc';
import { payRouter } from './routers/pay';
import { eventRouter } from './routers/event';
import { userRouter } from './routers/user';
import { donationDestinationRouter } from './routers/donationDestination';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  pay: payRouter,
  event: eventRouter,
  user: userRouter,
  donationDestination: donationDestinationRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
