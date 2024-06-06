/**
 * 页签操作封装
 */
import store from '@/store';
import router from '@/router';

/**
 * 刷新当前tab
 */
export function reloadPageTab(data) {
  const { path, query, matched } = router.currentRoute;
  const components = new Set();
  matched.forEach((m) => {
    if (m.components?.default?.name) {
      if (
        !['EleEmptyLayout', 'EleLayout'].includes(m.components.default.name)
      ) {
        components.add(m.components.default.name);
      }
    }
  });
  store
    .dispatch('theme/setKeepAliveExclude', Array.from(components))
    .then(() => {
      router.replace({
        query: query,
        path: '/redirect' + path +(data?('?data='+data):'')
      });
    });
}

/**
 * 关闭当前tab
 */
export function finishPageTab() {
  store
    .dispatch('theme/tabRemove', router.currentRoute.fullPath)
    .then(({ lastPath }) => {
      router.push(lastPath || '/');
    });
}

/**
 * 移除指定tab
 * @param key {string} tab的key
 * @param active {string} 当前选中tab
 */
export function removePageTab(key, active) {
  store.dispatch('theme/tabRemove', key).then(({ lastPath }) => {
    if (active && key === active) {
      router.push(lastPath || '/');
    }
  });
}

/**
 * 移除所有tab
 * @param active {string} 当前选中tab
 */
export function removeAllPageTab(active) {
  store.dispatch('theme/tabRemoveAll').then(() => {
    if (active && active !== '/') {
      router.push('/');
    }
  });
}

/**
 * 移除左侧tab
 * @param key {string} tab的key
 */
export function removeLeftPageTab(key) {
  return store.dispatch('theme/tabRemoveLeft', key);
}

/**
 * 移除右侧tab
 * @param key {string} tab的key
 */
export function removeRightPageTab(key) {
  return store.dispatch('theme/tabRemoveRight', key);
}

/**
 * 移除其他tab
 * @param key {string} tab的key
 */
export function removeOtherPageTab(key) {
  return store.dispatch('theme/tabRemoveOther', key);
}

/**
 * 添加tab
 * @param obj
 */
export function addPageTab(obj) {
  return store.dispatch('theme/tabAdd', obj);
}

/**
 * 修改指定tab
 * @param obj
 */
export function setPageTab(obj) {
  return store.dispatch('theme/tabSetTitle', obj);
}
