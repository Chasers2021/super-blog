import { http } from '@/plugins';

export const getTags = async (params: any) => {
  return await http({
    method: 'get',
    url: '/api/tag',
    params
  });
};

export const createTag = async (data: object) => {
  return await http({
    method: 'post',
    url: '/api/tag',
    data
  });
};

export const updateTag = async (id: number, data: object) => {
  return await http({
    method: 'put',
    url: `/api/tag/${id}`,
    data
  });
};

export const deleteTag = async (id: number) => {
  return await http({
    method: 'delete',
    url: `/api/tag/${id}`,
  });
};
