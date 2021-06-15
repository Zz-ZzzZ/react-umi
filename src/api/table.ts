import { get, post } from '@/api/http';
export const getTable = () => get('/get_table');

export const delTableRowById = (rowId: number) => post('/del_row', { rowId });

export const updateRowById = (params: object) => post('/update_row', params);
