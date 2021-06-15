import { get, post } from '@/api/http';

export const login = (username: string, password: string) => post('/login', { username, password });

export const getUser = () => get('/get_user');
