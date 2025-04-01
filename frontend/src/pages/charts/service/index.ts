import { api } from '@/utils/axios';

// ** Types
import { IAllTimeTestClient, ITest } from '@/types/tests';
import { IAddComment } from './types';
import { ApiResponse } from '@/types/axios';

export const getTests = async ({ env }: { env?: string }) => {
  const query = env === 'AllTest' ? '' : env ? `?env=${env}` : '';
  const { data } = await api.get<ApiResponse<{
    results: IAllTimeTestClient[];
    test_names: string[],
    envs: string[]
  }>>(`/tests${query}`);
  return data;
};

export const getTest = async (name: string, env?: string): Promise<ApiResponse<ITest[] | {
  results: IAllTimeTestClient[];
  test_names: string[];
  envs: string[];
}>> => {
  if (name === 'AllTest') {
    const query = env === 'AllTest' ? '' : env ? `?env=${env}` : '';
    const { data } = await api.get<ApiResponse<{
      results: IAllTimeTestClient[];
      test_names: string[],
      envs: string[]
    }>>(`/tests${query}`);
    return data;
  }

  // Если конкретный тест, собираем query как раньше
  const query = `?name=${name}${env && env !== 'AllTest' ? `&env=${env}` : ''}`;
  const { data } = await api.get<ApiResponse<ITest[]>>(`/test/${query}`);
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