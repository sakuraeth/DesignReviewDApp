let dataCache = null; // Caching data to reuse

async function fetchData(params) {
  if (!dataCache) {
    const data = await expensiveDataRetrieval(params); // Hypothetically an expensive call
    dataCache = data; // Cache the first retrieval
  }
  return dataCache;
}

function clearCache() {
  dataCache = null; // Explicitly free memory by clearing the cache when no longer needed
}