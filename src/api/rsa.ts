import { http } from '@/plugins';

export const getPublicKey = async () => {
  return await http({ 
    method: 'get',
    url: '/rsa',
  });
};

export const login = async (data: object) => {
  return await http({ 
    method: 'post',
    url: '/rsa',
    data
  });
};
