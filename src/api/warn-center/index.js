import axios from '@/utils/request';

/**
 * 获取摄像头列表
 */
export async function getAllCamera() {
  const res = await axios.get('/getAllCamera');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
