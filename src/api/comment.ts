import { http } from '@/plugins';

export const findPage = async (params: any) => {
  return await http({
    method: 'get',
    url: '/api/comment',
    params
  });
};
