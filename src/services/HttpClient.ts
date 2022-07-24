import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

export const HttpClient = setupCache(Axios, { ttl: 1000 * 60 * 5 });