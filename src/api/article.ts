import { http } from '@/plugins';

export const findPage = async (params: any) => {
  return await http({
    method: 'get',
    url: '/article',
    params
  });
};

export const createArticle = async (data: object) => {
  return await http({
    method: 'post',
    url: '/article',
    data
  });
};

export const deleteById = async (id: number) => {
  return await http({
    method: 'delete',
    url: `/article/${id}`,
  });
};

export const findById = async (id: number) => {
  return await http({
    method: 'get',
    url: `/article/${id}`,
  });
};

export const updateArticle = async (data: object, id: number) => {
  return await http({
    method: 'put',
    url: `/article/${id}`,
    data
  });
};
