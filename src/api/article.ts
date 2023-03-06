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
