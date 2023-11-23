import {
  inject,
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import { CachingRepository } from '../repositories';



@injectable({tags: {key: CachingInterceptor.BINDING_KEY}})
export class CachingInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${CachingInterceptor.name}`;

  constructor(
    @inject('repositories.CachingRepository') 
    private cachingRepository: CachingRepository,
  ) {}

 


  value() {
    return this.intercept.bind(this);
  }
  
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
        const cacheKey = this.generateCacheKey(invocationCtx);
        console.log("cacheKey: "+cacheKey)
        // Check if the data is already in the cache
        const cachedResult =  await this.cachingRepository.get(cacheKey);
        console.log("cachedResult: "+cachedResult)
  
        if (cachedResult !== null) {
          // Data found in cache, return it
          return cachedResult;
        }
  
        // Data not found in cache, proceed with the actual method invocation
        const result = await next();
        console.log("result: "+result)
 
        // Store the result in the cache for future use
        
        await this.cachingRepository.set(cacheKey, result[0], {ttl:20000});
  
        return result;
    } catch (err) {
      throw err;
    }
  }

// Generate a unique cache key for the method
private generateCacheKey(invocationCtx: InvocationContext): string {
  // You can create a unique cache key based on method name, arguments, or any other context.
  const methodName = invocationCtx.methodName;
  const args = JSON.stringify(invocationCtx.args);

  return `${methodName}:${args}`;
}

}








