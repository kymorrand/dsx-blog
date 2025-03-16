import { defineAuth } from 'auth-astro/server';
import config from '../../../auth';

export const { get, post } = defineAuth(config);
