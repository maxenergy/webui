import axios from '@/utils/request';

/**
 * 获取列表数据
 */
export async function queryList(params) {
  const res = await axios.get(
    'https://cdn.eleadmin.com/20200610/list-demo-basic.json',
    { params }
  );
  if (res.data.code === 0) {
    return {
      list: res.data.data,
      count: res.data.count
    };
  }
  return Promise.reject(new Error(res.data.message));
}

export async function loadRecord(params) {
  const res = await axios.post(
    '/load/record',
   params
  );
  if (res.data.code === 0) {
    return {
      list: res.data.data.list,
      count: res.data.data.count
    };
  }
  return Promise.reject(new Error(res.data.message));
}

export async function aistartrtsp(params) {
  const res = await axios.post(
    '/ai/startrtsp',
   params
  );
  if (res.data.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.data.message));
}

export async function aistoprtsp(params) {
  const res = await axios.post(
    '/ai/stoprtsp',
   params
  );
  if (res.data.code === 0) {
    return {
      list: res.data.data.list,
      count: res.data.data.count
    };
  }
  return Promise.reject(new Error(res.data.message));
}
