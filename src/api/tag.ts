import { http } from '@/plugins';

export const getTags = async (params: any) => {
  return await http({
    method: 'get',
    url: '/tag',
    params
  });
};

export const createTag = async (data: object) => {
  return await http({
    method: 'post',
    url: '/tag',
    data
  });
};

export const updateTag = async (id: number, data: object) => {
  return await http({
    method: 'put',
    url: `/tag/${id}`,
    data
  });
};

export const deleteTag = async (id: number) => {
  return await http({
    method: 'delete',
    url: `/tag/${id}`,
  });
};
