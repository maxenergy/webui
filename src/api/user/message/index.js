import axios from '@/utils/request';

/**
 * 获取消息列表
 */
export async function getUserMessage() {
  const res = await axios.get('https://cdn.eleadmin.com/20200609/message.json');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
