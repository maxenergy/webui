import axios from '@/utils/request';


/**
 * 获取系统信息
 */
export async function getSystemInfo() {
  const res = await axios.get('/system/info');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}


/**
 * 获取记录保存机制
 */
export async function getRocordUpload() {
  const res = await axios.post('/rocord/get/upload');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 记录保存机制
 */
export async function setRocordUpload(data) {
  const res = await axios.post('/rocord/set/upload',data);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}


/**
 * 获取系统logo信息
 */
export async function getSystemLogos() {
  const res = await axios.get('/system/appconfig');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 */
export async function getSystemAppconfig() {
  const res = await axios.get('/system/appconfig');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

export async function setIsLocalPlay(status) {
  const res = await axios.get('/isLocalPlay?status='+status);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}


/**
 */
export async function setSystemIpconfig(data) {
  const res = await axios.post('/system/ipconfig',data);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取系统标题
 */
export async function setSystemTitle(data) {
  const res = await axios.post('/system/title',data);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}


/**
 * 发送shell命令
 */
export async function sentSystemShell(data) {
  const res = await axios.post('/system/shell',data);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 清空记录
 */
export async function shellClearRecord() {
  const res = await axios.post('/system/shell/clearRecord');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 清空记录
 */
export async function shellClearFileCache() {
  const res = await axios.post('/system/shell/clearFileCache');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
/**
 * 恢复出厂设置
 */
export async function systemRecover() {
  const res = await axios.post('/system/shell/recover');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 设备云对接
 */
export async function setRocordServer(data) {
  const res = await axios.post('/rocord/set/server',data);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 设备云对接
 */
export async function getRocordServer() {
  const res = await axios.post('/rocord/get/server');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 设备云对接
 */
export async function setregistcode(code) {
  const res = await axios.get('/reg?code='+code);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}


/**
 * 获取人员离岗间隔时间
 */
export async function getRocordTimeInterval() {
  const res = await axios.get('/rocord/get/TimeInterval');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 设置人员离岗间隔时间
 */
export async function setRocordTimeInterval(data) {
  const res = await axios.post('/rocord/set/TimeInterval',data);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

//获取备用数据上报
export async function getRocordUploadSpare() {
  const res = await axios.get('/rocord/get/WeChat');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

//设置备用数据上报
export async function setRocordUploadSpare(url) {
  const res = await axios.post('/rocord/set/WeChat',{url: url});
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

//获取MQTT参数
export async function getMqttConfig() {
  const res = await axios.get('/mqttConfig');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

//设置MQTT参数
export async function setMqttConfig(data) {
  const res = await axios.post('/mqttConfig',data);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}


//获取snUrl参数
export async function getSnUrl() {
  const res = await axios.get('/snUrl');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

//设置snUrl参数
export async function setSnUrl(data) {
  const res = await axios.post('/snUrl',data);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
