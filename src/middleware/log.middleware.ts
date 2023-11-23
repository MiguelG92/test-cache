import {Next} from '@loopback/core';
import {Middleware, MiddlewareContext} from '@loopback/rest';

export const logMiddleware: Middleware = async (
  middlewareCtx: MiddlewareContext,
  next: Next,
) => {
  const {request, response} = middlewareCtx;
  const startTime = process.hrtime();

  try {
    const result = await next();

    const endTime = process.hrtime();
    const responseTimeInMs = calculateResponseTime(startTime, endTime);
    if (request.method.startsWith('/explorer/')) {
      console.log(`Response time for ${request.method} ${request.originalUrl}: ${responseTimeInMs}ms`);
      response.setHeader('response-time', responseTimeInMs + 'ms');
    }


    return result;
  } catch (err) {
    // Catch errors from downstream middleware
    throw err;
  }
};

// Function to calculate response time in milliseconds
function calculateResponseTime(startTime: [number, number], endTime: [number, number]): number {
  const startInSeconds = startTime[0] + startTime[1] / 1e9;
  const endInSeconds = endTime[0] + endTime[1] / 1e9;
  return Math.round((endInSeconds - startInSeconds) * 1000);
}
