import axios from '@/utils/request';

/**
 * 查询字典数据列表
 * @param params 查询条件
 */
export async function loadallDevicesConfig() {
  const res = await axios.get('/loadall/devices/config');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询字典数据列表
 * @param params 查询条件
 */
export async function loadallDevicesss() {
  const res = await axios.get('/loadall/devices');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
