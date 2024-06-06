/**
 * 主题状态管理
 */
import { changeColor } from 'ele-admin/packages/style/util';
import { TAB_KEEP_ALIVE, THEME_STORE_NAME } from '@/config/setting';
// state默认值
const DEFAULT_STATE = {
  // 侧边栏风格: light(亮色), dark(暗色)
  sideStyle: 'light',
  // 顶栏风格: light(亮色), dark(暗色), primary(主色)
  headStyle: 'light',
  // 标签页风格: default(默认), dot(圆点), card(卡片)
  tabStyle: 'default',
  // 布局风格: side(默认), top(顶栏菜单), mix(混合菜单)
  layoutStyle: 'side',
  // 侧边栏菜单风格: default(默认), mix(双排菜单)
  sideMenuStyle: 'default',
  // 是否固定侧栏
  fixedSidebar: true,
  // 是否固定顶栏
  fixedHeader: false,
  // 是否固定主体
  fixedBody: true,
  // 内容区域宽度铺满
  bodyFull: true,
  // 是否开启多标签
  showTabs: false,
  // logo是否自适应宽度
  logoAutoSize: true,
  // 侧栏是否多彩图标
  colorfulIcon: false,
  // 侧边栏是否只保持一个子菜单展开
  sideUniqueOpen: true,
  // 是否开启页脚
  showFooter: false,
  // 是否是色弱模式
  weakMode: false,
  // 是否是暗黑模式
  darkMode: false,
  // 主题色
  color: null,
  // 是否折叠侧边栏
  collapse: false,
  // 当前打开的选项卡
  tabs: [],
  // 主页的组件
  homeComponents: [],
  // 需要keep-alive的组件
  keepAliveInclude: [],
  // 不需要keep-alive的组件
  keepAliveExclude: [],
  // 屏幕宽度
  screenWidth:
    document.documentElement.clientWidth || document.body.clientWidth,
  // 屏幕高度
  screenHeight:
    document.documentElement.clientHeight || document.body.clientHeight,
  // 内容区域宽度
  contentWidth: document.querySelector('.ele-admin-content-view')?.clientWidth
};
// 不需要本地缓存的state
const NO_CACHE_STATE = [
  'collapse',
  'tabs',
  'homeComponents',
  'keepAliveInclude',
  'keepAliveExclude',
  'screenWidth',
  'screenHeight',
  'contentWidth'
];
// 改变时禁用过渡效果的state
const DISABLED_TRANSITIONS = [
  'layoutStyle',
  'sideMenuStyle',
  'fixedSidebar',
  'fixedHeader',
  'fixedBody',
  'logoAutoSize'
];
//
let updateSizeTimer = null;

/**
 * 读取缓存的配置
 * @param keyName 缓存的键名
 * @returns {Object}
 */
function getCacheSetting(keyName) {
  let cache = {};
  try {
    const value = localStorage.getItem(keyName);
    if (value) {
      const temp = JSON.parse(value);
      if (typeof temp === 'object') {
        cache = temp;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return cache;
}

/**
 * 缓存配置
 * @param keyName 缓存的键名
 * @param key 缓存的配置名
 * @param value 缓存的配置名对应的值
 */
function cacheSetting(keyName, key, value) {
  if (NO_CACHE_STATE.includes(key)) {
    return;
  }
  const cache = getCacheSetting(keyName);
  if (cache[key] !== value) {
    cache[key] = value;
    localStorage.setItem(keyName, JSON.stringify(cache));
  }
}

/**
 * 检查state值以兼容旧版本
 * @param key
 * @param value
 * @returns
 */
function checkStateValue(key, value) {
  if (typeof value === 'number') {
    if (key === 'sideStyle') {
      return ['light', 'dark'][value < 2 ? value : 1];
    }
    if (key === 'headStyle') {
      return ['light', 'dark', 'primary'][value < 3 ? value : 2];
    }
    if (key === 'tabStyle') {
      return ['default', 'dot', 'card'][value < 3 ? value : 2];
    }
    if (key === 'layoutStyle') {
      return ['side', 'top', 'mix'][value < 3 ? value : 2];
    }
  }
  return value;
}

/**
 * 获取state
 * @returns {Object}
 */
function getState() {
  const state = { ...DEFAULT_STATE };
  // 读取缓存的配置及默认配置
  for (let key in state) {
    if (!Object.prototype.hasOwnProperty.call(state, key)) {
      continue;
    }
    const cache = getCacheSetting(THEME_STORE_NAME);
    if (cache[key] !== undefined) {
      state[key] = checkStateValue(key, cache[key]);
    }
  }

  // 恢复色弱模式
  if (state.weakMode) {
    changeWeakMode(true);
  }

  // 恢复上次主题色
  if (state.color || state.darkMode) {
    window.addEventListener('load', () => {
      doChangeTheme(state.color, state.darkMode).catch((e) => {
        console.error(e);
      });
    });
  }
  return state;
}

/**
 * 切换主题
 * @param value 主题
 * @param dark 是否是暗黑模式
 * @returns {Promise<>}
 */
function doChangeTheme(value, dark) {
  return new Promise((resolve, reject) => {
    try {
      changeColor(value, dark);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * 开关色弱模式
 * @param weakMode 是否开启色弱模式
 */
function changeWeakMode(weakMode) {
  const weakClass = 'ele-admin-weak';
  if (weakMode) {
    document.body.classList.add(weakClass);
  } else {
    document.body.classList.remove(weakClass);
  }
}

/**
 * 获取需要keep-alive的组件
 * @param tabs 页签数据
 * @param homeComponents 主页组件
 * @returns {any[]}
 */
function getKeepAliveInclude(tabs, homeComponents) {
  const components = new Set();
  if (tabs) {
    tabs.forEach((t) => {
      if (t?.components?.length) {
        t.components.forEach((c) => {
          if (typeof c === 'string' && c) {
            components.add(c);
          }
        });
      }
    });
  }
  if (homeComponents) {
    homeComponents.forEach((c) => {
      components.add(c);
    });
  }
  return Array.from(components);
}

export default {
  namespaced: true,
  state: getState(),
  mutations: {
    // 修改state值
    SET: function(state, obj) {
      if (DISABLED_TRANSITIONS.includes(obj.key)) {
        document.body.classList.add('ele-transition-disabled');
        setTimeout(() => {
          document.body.classList.remove('ele-transition-disabled');
        }, 100);
      }
      state[obj.key] = obj.value;
      // 缓存修改的配置
      cacheSetting(THEME_STORE_NAME, obj.key, obj.value);
    },
    // 更新屏幕尺寸
    UPDATE_SCREEN(state) {
      const w =
        document.documentElement.clientWidth || document.body.clientWidth;
      const h =
        document.documentElement.clientHeight || document.body.clientHeight;
      state.screenWidth = w;
      state.screenHeight = h;
    },
    // 更新内容区域宽度
    UPDATE_CONTENT_WIDTH(state) {
      state.contentWidth =
        document.querySelector('.ele-admin-content-view')?.clientWidth || 0;
    },
    // 更新keepAliveInclude
    UPDATE_KEEP_ALIVE_INCLUDE: function(state) {
      if (state.showTabs && TAB_KEEP_ALIVE) {
        state.keepAliveInclude = getKeepAliveInclude(
          state.tabs,
          state.homeComponents
        );
      } else {
        state.keepAliveInclude = [];
      }
    }
  },
  actions: {
    /**
     * 修改配置
     * @param {commit}
     * @param obj
     */
    set({ commit }, obj) {
      commit('SET', obj);
      if (obj.key === 'showTabs') {
        commit('UPDATE_KEEP_ALIVE_INCLUDE');
      }
      updateSizeTimer && clearTimeout(updateSizeTimer);
      updateSizeTimer = setTimeout(
        function() {
          commit('UPDATE_CONTENT_WIDTH');
        },
        obj.key === 'collapse' ? 360 : 100
      );
    },
    /**
     * 切换配置(boolean类型的配置)
     * @param {commit, state}
     * @param key 配置名称
     */
    toggle({ commit, state }, key) {
      commit('SET', { key: key, value: !state[key] });
      updateSizeTimer && clearTimeout(updateSizeTimer);
      updateSizeTimer = setTimeout(
        function() {
          commit('UPDATE_CONTENT_WIDTH');
        },
        key === 'collapse' ? 360 : 100
      );
    },
    /**
     * 切换主题色
     * @param {commit, state}
     * @param value 颜色值
     * @returns {Promise<>}
     */
    setColor({ commit, state }, value) {
      return new Promise((resolve, reject) => {
        doChangeTheme(value, state.darkMode)
          .then(() => {
            commit('SET', { key: 'color', value: value });
            return resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    /**
     * 切换暗黑模式
     * @param {commit, state}
     * @param value 是否开启暗黑模式
     * @returns {Promise<>}
     */
    setDarkMode({ commit, state }, value) {
      return new Promise((resolve, reject) => {
        doChangeTheme(state.color, value)
          .then(() => {
            commit('SET', { key: 'darkMode', value: value });
            return resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    /**
     * 切换色弱模式
     * @param {commit}
     * @param value 是否开启色弱模式
     * @returns {Promise<>}
     */
    setWeakMode({ commit }, value) {
      return new Promise((resolve) => {
        changeWeakMode(value);
        commit('SET', { key: 'weakMode', value: value });
        resolve();
      });
    },
    /**
     * 更新屏幕尺寸
     * @param {commit, state}
     */
    updateScreen({ commit }) {
      commit('UPDATE_SCREEN');
      commit('UPDATE_KEEP_ALIVE_INCLUDE');
      commit('UPDATE_CONTENT_WIDTH');
    },
    /**
     * 重置设置
     */
    resetSetting({ commit }) {
      const excludes = [
        'weakMode',
        'darkMode',
        'color',
        'collapse',
        'tabs',
        'homeComponents',
        'keepAliveInclude',
        'keepAliveExclude',
        'screenWidth',
        'screenHeight',
        'contentWidth'
      ];
      Object.keys(DEFAULT_STATE).forEach((key) => {
        if (!excludes.includes(key)) {
          commit('SET', { key: key, value: DEFAULT_STATE[key] });
          updateSizeTimer && clearTimeout(updateSizeTimer);
          updateSizeTimer = setTimeout(function() {
            commit('UPDATE_CONTENT_WIDTH');
          }, 100);
        }
      });
    },
    /**
     * 添加tab
     * @param {commit, state}
     * @param obj {Object}
     */
    tabAdd({ commit, state }, obj) {
      if (!obj.key) {
        obj.key = obj.fullPath || obj.path;
      }
      const i = state.tabs.findIndex((d) => d.key === obj.key);
      if (i === -1) {
        commit('SET', { key: 'tabs', value: state.tabs.concat([obj]) });
      } else if (obj.fullPath !== state.tabs[i].fullPath) {
        const tabs = state.tabs
          .slice(0, i)
          .concat([obj])
          .concat(state.tabs.slice(i + 1));
        commit('SET', { key: 'tabs', value: tabs });
      }
      commit('UPDATE_KEEP_ALIVE_INCLUDE');
    },
    /**
     * 移除指定tab
     * @param commit
     * @param state
     * @param key {String}
     * @returns {Promise<Object>}
     */
    tabRemove({ commit, state }, key) {
      return new Promise((resolve) => {
        let index = -1,
          lastIndex = -1,
          lastPath,
          last;
        for (let i = 0; i < state.tabs.length; i++) {
          if (state.tabs[i].key === key || state.tabs[i].fullPath === key) {
            index = i;
            break;
          }
          lastIndex = i;
          last = state.tabs[i];
          lastPath = last.fullPath;
        }
        commit('SET', {
          key: 'tabs',
          value: state.tabs.filter((d, i) => i !== index)
        });
        commit('UPDATE_KEEP_ALIVE_INCLUDE');
        resolve({ lastIndex: lastIndex, lastPath: lastPath, last: last });
      });
    },
    /**
     * 移除所有tab
     * @param commit
     */
    tabRemoveAll({ commit }) {
      commit('SET', { key: 'tabs', value: [] });
      commit('UPDATE_KEEP_ALIVE_INCLUDE');
    },
    /**
     * 移除左侧tab
     * @param commit
     * @param state
     * @param key {String}
     */
    tabRemoveLeft({ commit, state }, key) {
      for (let i = 0; i < state.tabs.length; i++) {
        if (state.tabs[i].key === key) {
          commit('SET', { key: 'tabs', value: state.tabs.slice(i) });
          commit('UPDATE_KEEP_ALIVE_INCLUDE');
          break;
        }
      }
    },
    /**
     * 移除右侧tab
     * @param commit
     * @param state
     * @param key {String}
     */
    tabRemoveRight({ commit, state }, key) {
      for (let i = 0; i < state.tabs.length; i++) {
        if (state.tabs[i].key === key) {
          commit('SET', { key: 'tabs', value: state.tabs.slice(0, i + 1) });
          commit('UPDATE_KEEP_ALIVE_INCLUDE');
          break;
        }
      }
    },
    /**
     * 移除其他tab
     * @param commit
     * @param state
     * @param key {String}
     */
    tabRemoveOther({ commit, state }, key) {
      commit('SET', {
        key: 'tabs',
        value: state.tabs.filter((d) => d.key === key)
      });
      commit('UPDATE_KEEP_ALIVE_INCLUDE');
    },
    /**
     * 修改指定tab
     * @param commit
     * @param state
     * @param obj {Object}
     */
    tabSetTitle({ commit, state }, obj) {
      let i = -1;
      if (obj.fullPath) {
        i = state.tabs.findIndex((d) => d.fullPath === obj.fullPath);
      } else if (obj.path) {
        i = state.tabs.findIndex((d) => d.path === obj.path);
      }
      if (i !== -1) {
        const data = Object.assign({}, state.tabs[i]);
        if (typeof obj.title === 'string' && obj.title) {
          data.title = obj.title;
        }
        if (typeof obj.closable === 'boolean') {
          data.closable = obj.closable;
        }
        const tabs = state.tabs
          .slice(0, i)
          .concat([data])
          .concat(state.tabs.slice(i + 1));
        commit('SET', { key: 'tabs', value: tabs });
      }
    },
    /**
     * 设置主页的组件名称
     * @param {commit, state}
     * @param components {Array}
     */
    setHomeComponents({ commit }, components) {
      commit('SET', { key: 'homeComponents', value: components });
      commit('UPDATE_KEEP_ALIVE_INCLUDE');
    },
    /**
     * 设置不需要keep-alive的组件
     * @param commit
     * @param value {Array}
     */
    setKeepAliveExclude({ commit }, value) {
      commit('SET', { key: 'keepAliveExclude', value: value });
    }
  }
};
