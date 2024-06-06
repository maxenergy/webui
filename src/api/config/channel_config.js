import axios from '@/utils/request';

/**
 * 查询字典数据列表
 * @param params 查询条件
 */
export async function loadallDevices(params) {
  const res = await axios.get('/loadall/devices', {
    params
  });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加摄像头数据
 * @param data 摄像头数据信息
 */
export async function addDevices(data) {
  const res = await axios.post('/add/devices', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改摄像头数据
 * @param data 摄像头数据信息
 */
export async function updateDevices(data) {
  const res = await axios.post('/update/devices', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除摄像头数据
 * @param id 摄像头数据id
 */
export async function deleteDevices(data) {
  const res = await axios.post('/delete/devices',data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

export async function updateDeviceStatus(data) {
  const res = await axios.post('/ai/detect-status',data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}


/**
 * 获取设备AI检测配置
 * @param data 查询条件
 */
export async function aigetconfig(data) {
  const res = await axios.post('/ai/getconfig', data);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 设置设备AI检测配置
 * @param data 查询条件
 */
export async function aisetconfig(data) {
  const res = await axios.post('/ai/setconfig', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 设置设备AI检测配置
 * @param data 查询条件
 */
export async function aisetconfigthreshold(data) {
  const res = await axios.post('/ai/setconfig/threshold', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 设备重启
 * @param data 查询条件
 */
export async function devicereboot() {
  const res = await axios.get('/reboot');
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取是否播放报警声音
 * @param data 查询条件
 */
export async function getVoice() {
  const res = await axios.get('/voice');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

export async function setVoice(data) {
  const res = await axios.post('/voice',data);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}


export async function aiGetAlgorithm() {
  const res = await axios.get('/get/algorithm');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
