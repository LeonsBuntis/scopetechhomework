import Axios from 'axios';
import { buildWebStorage, setupCache } from 'axios-cache-interceptor';

const cacheStorage = buildWebStorage(localStorage);

const axios = setupCache(Axios, {
    ttl: 1000 * 60 * 5,
    // cachePredicate is not working when storage is set
    storage: cacheStorage
});

export default axios;