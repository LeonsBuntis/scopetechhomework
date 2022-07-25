import Axios from 'axios';
import { buildWebStorage, setupCache } from 'axios-cache-interceptor';

const cacheStorage = buildWebStorage(localStorage, 'axios-cache:');

const axios = setupCache(Axios, {
    ttl: 1000 * 60 * 5,
    storage: cacheStorage
});

export default axios;