import { http } from '@/plugins';

export const findPage = async (params: any) => {
  return await http({
    method: 'get',
    url: '/api/comment',
    params
  });
};

export const updateStatus = async (id: number, data: any) => {
  return await http({
    method: 'put',
    url: `/api/comment/${id}`,
    data
  });
};
