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
