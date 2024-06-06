import axios from '@/utils/request';

/**
 * 获取文件列表数据
 */
export async function getFileList({ directory, sort, order } = {}) {
  const res = await axios.get(
    'https://cdn.eleadmin.com/20200610/extension-files.json',
    {
      params: {
        directory,
        sort,
        order
      }
    }
  );
  if (res.data.code === 0) {
    // 模拟按文件夹筛选
    let data = res.data.data;
    if (directory) {
      directory.split('/').forEach((d) => {
        data = data.filter((t) => t.name === d)[0]?.data ?? [];
      });
    }
    // 模拟排序
    if (sort) {
      data.sort((a, b) => {
        if (a[sort] == b[sort]) {
          return 0;
        }
        if (order === 'desc') {
          return a[sort] < b[sort] ? 1 : -1;
        }
        return a[sort] < b[sort] ? -1 : 1;
      });
    }
    data.sort((a, b) => {
      return b.isDirectory ?? false - a.isDirectory ?? false;
    });
    return data;
  }
  return Promise.reject(new Error(res.data.message));
}
