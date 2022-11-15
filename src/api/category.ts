import { http } from '@/plugins';

export const getCategories = async () => {
  return await http({
    method: 'get',
    url: '/api/category'
  });
};

export const createCategory = async (data: object) => {
  return await http({
    method: 'post',
    url: '/api/category',
    data
  });
};

export const updateCategoty = async (id: number, data: object) => {
  return await http({
    method: 'put',
    url: `/api/category/${id}`,
    data
  });
};

export const deleteCategoty = async (id: number) => {
  return await http({
    method: 'delete',
    url: `/api/category/${id}`,
  });
};
