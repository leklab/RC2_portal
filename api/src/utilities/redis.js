export const withCache = async (ctx, cacheKey, fn) => {

  console.log("In withCache")
  console.log(cacheKey)


  const cachedValue = await ctx.database.redis.get(cacheKey)
  
  if (cachedValue) {
    return JSON.parse(cachedValue)
  }

  const value = await fn()

  await ctx.database.redis.set(cacheKey, JSON.stringify(value))

  return value
}

