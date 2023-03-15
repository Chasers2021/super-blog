import { http } from '@/plugins';

export const findPage = async (params: any) => {
  return await http({
    method: 'get',
    url: '/api/article',
    params
  });
};

export const createArticle = async (data: object) => {
  return await http({
    method: 'post',
    url: '/api/article',
    data
  });
};

export const deleteById = async (id: number) => {
  return await http({
    method: 'delete',
    url: `/api/article/${id}`,
  });
};

export const findById = async (id: number) => {
  return await http({
    method: 'get',
    url: `/api/article/${id}`,
  });
};

export const updateArticle = async (data: object, id: number) => {
  return await http({
    method: 'put',
    url: `/api/article/${id}`,
    data
  });
};
