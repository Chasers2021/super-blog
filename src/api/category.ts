import { service } from '@/plugins';

export const getCategories = async () => {
  return await service({
    method: 'get',
    url: '/api/category'
  });
};

export const createCategory = async (data: object) => {
  return await service({
    method: 'post',
    url: '/api/category',
    data
  });
};

export const updateCategoty = async (id: number, data: object) => {
  return await service({
    method: 'put',
    url: `/api/category/${id}`,
    data
  });
};

export const deleteCategoty = async (id: number) => {
  return await service({
    method: 'delete',
    url: `/api/category/${id}`,
  });
};
