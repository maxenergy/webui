import axios from '@/utils/request';

/**
 * 获取当前登录的用户信息、菜单、权限、角色
 */
export async function getUserInfo() {
  let time = new Date().getTime()
  const res = await axios.get('/auth/user?time='+time);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改当前登录的用户密码
 * @param data
 */
export async function updatePassword(data) {
  const res = await axios.put('/auth/password', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
