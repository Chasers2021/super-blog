import { service } from '@/plugins';

export const getCategories = async () => {
  return await service({
    method: 'get',
    url: '/api/category'
  });
};
