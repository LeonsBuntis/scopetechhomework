import Axios from 'axios';
import { buildWebStorage, setupCache } from 'axios-cache-interceptor';

const cacheStorage = buildWebStorage(sessionStorage, 'axios-cache:');

export const HttpClient = setupCache(Axios, { 
    ttl: 1000 * 60 * 5,
    // storage: cacheStorage
 });