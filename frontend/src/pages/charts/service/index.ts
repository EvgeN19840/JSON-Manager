import { api } from '@/utils/axios';

// ** Types
import { IAllTimeTestClient, ITest } from '@/types/tests';
import { IAddComment } from './types';
import { ApiResponse } from '@/types/axios';

export const getTests = async (): Promise<ApiResponse<{ results: IAllTimeTestClient[]; test_names: string[] }>> => {
  const { data } = await api.get<ApiResponse<{ results: IAllTimeTestClient[]; test_names: string[] }>>(`/tests`);
  return data;
};

export const getTest = async (name: string): Promise<ApiResponse<ITest[]>> => {
  const { data } = await api.get<ApiResponse<ITest[]>>(`/test/?name=${name}`);
  return data;
};

export const addComment = async ({ data, type }: IAddComment) => {
  if (type === 'common_test') {
    const res = await api.put(`/tests/add-comment/test`, data);
    return res.data;
  }
  if (type === 'main_test') {
    const res = await api.put(`/tests/add-comment/main`, data);
    return res.data;
  }
};