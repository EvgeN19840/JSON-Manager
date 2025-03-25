import { api } from '@/utils/axios';
import { IAllTimeTestClient, ITest } from '@/types/tests';

export const getTests = async () => {
  const { data } = await api.get<{ results: IAllTimeTestClient[], test_names: string[] }>(`/tests`);
  return data;
};


export const getTest = async (name: string) => {
  const { data } = await api.get<ITest[]>(`/test/?name=${name}`);
  return data;
}

