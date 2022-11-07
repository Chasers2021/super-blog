import { service } from '@/plugins';

export const getCategories = async () => {
  await service({
    method: 'get',
    url: '/category'
  });
};
