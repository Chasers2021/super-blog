import { http } from '@/plugins';

export const getCategories = async () => {
  return await http({
    method: 'get',
    url: '/category'
  });
};

export const createCategory = async (data: object) => {
  return await http({
    method: 'post',
    url: '/category',
    data
  });
};

export const updateCategoty = async (id: number, data: object) => {
  return await http({
    method: 'put',
    url: `/category/${id}`,
    data
  });
};

export const deleteCategoty = async (id: number) => {
  return await http({
    method: 'delete',
    url: `/category/${id}`,
  });
};
