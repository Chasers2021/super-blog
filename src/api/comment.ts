import { http } from '@/plugins';

export const findPage = async (params: any) => {
  return await http({
    method: 'get',
    url: '/comment',
    params
  });
};

export const updateStatus = async (id: number, data: any) => {
  return await http({
    method: 'put',
    url: `/comment/${id}`,
    data
  });
};
