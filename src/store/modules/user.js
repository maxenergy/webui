/**
 * 登录状态管理
 */
import {
  formatMenus,
  toTreeData
} from 'ele-admin';
import {
  USER_MENUS
} from '@/config/setting';
import {
  getUserInfo
} from '@/api';
import {
  getSystemAppconfig
} from '@/api/system-config';
import {
  aiGetAlgorithm
} from '@/api/config/channel_config';
export default {
  namespaced: true,
  state: {
    // 当前登录用户信息
    info: null,
    // 当前登录用户的菜单
    menus: null,
    // 当前登录用户的权限
    authorities: [],
    // 当前登录用户的角色
    roles: [],

    AlarmTypes:[]

  },
  mutations: {
    // 设置登录用户的信息
    setUserInfo(state, info) {
      state.info = info;
    },
    // 设置登录用户的菜单
    setMenus(state, menus) {
      state.menus = menus;
    },
    // 设置登录用户的权限
    setAuthorities(state, authorities) {
      state.authorities = authorities;
    },
    // 设置登录用户的角色
    setRoles(state, roles) {
      state.roles = roles;
    },
    setAlarmTypes(state, AlarmTypes){
      state.AlarmTypes = AlarmTypes;
    }
  },
  actions: {
    getAlarmTypes({
      commit
    }){
      aiGetAlgorithm()
      .then((msg) => {
        commit('setAlarmTypes', msg.list);
      })
      .catch(() => {
        
      });
    },
    /**
     * 请求用户信息、权限、角色、菜单
     * @param commit
     * @returns {Promise}
     */
    fetchUserInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((result) => {
            // 用户信息
            commit('setUserInfo', result);

            getSystemAppconfig().then((res) => {
              console.log(res.isLocalPlay)
              // 用户权限
              result.authorities = [{
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "",
                  "createTime": "2021-12-13 18:08:30",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-video-camera-solid",
                  "menuId": 129,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 0,
                  "path": "/warn-center",
                  "sortNumber": 13,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "报警中心",
                  "updateTime": "2021-12-15 14:58:39"
                },
                /* {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": !res.isLocalPlay?"/warn-center/list-local":"/warn-center/list",
                  "createTime": "2021-12-13 18:16:41",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-video-camera",
                  "menuId": 130,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 129,
                  "path": "/warn-center/list",
                  "sortNumber": 1,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "实时报警",
                  "updateTime": "2021-12-16 10:36:00"
                }, */
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": !res.isLocalPlay?"/warn-center/list-local-custom":"/warn-center/list-custom",
                  "createTime": "2021-12-13 18:16:41",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-video-camera",
                  "menuId": 147,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 129,
                  "path": "/warn-center/list",
                  "sortNumber": 1,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "实时报警",
                  "updateTime": "2021-12-16 10:36:00"
                },
                /* {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/warn-center/list-local-custom",
                  "createTime": "2021-12-13 18:16:41",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-video-camera",
                  "menuId": 148,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 129,
                  "path": "/warn-center/list-local-custom",
                  "sortNumber": 1,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "实时报警",
                  "updateTime": "2021-12-16 10:36:00"
                }, */
                /* {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/warn-center/list-local",
                  "createTime": "2021-12-13 18:16:41",
                  "deleted": 0,
                  "hide": res.isLocalPlay,
                  "icon": "el-icon-video-camera",
                  "menuId": 147,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 129,
                  "path": "/warn-center/list-local",
                  "sortNumber": 1,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "实时报警",
                  "updateTime": "2021-12-16 10:36:00"
                }, */
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/warn-center/search",
                  "createTime": "2021-12-13 18:17:30",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-notebook-2",
                  "menuId": 131,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 129,
                  "path": "/warn-center/search",
                  "sortNumber": 2,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "报警检索",
                  "updateTime": "2021-12-16 10:36:59"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "",
                  "createTime": "2021-12-15 15:00:46",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-_setting-solid",
                  "menuId": 132,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 0,
                  "path": "/config",
                  "sortNumber": 14,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "视频配置",
                  "updateTime": "2021-12-15 15:00:46"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/config/channel_config/list",
                  "createTime": "2021-12-15 15:02:52",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-_video",
                  "menuId": 133,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 132,
                  "path": "/config/channel_config/list",
                  "sortNumber": 1,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "视频通道",
                  "updateTime": "2021-12-16 10:37:32"
                },
                /* {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/config/face_config/index",
                  "createTime": "2021-12-15 15:02:52",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-_user-group",
                  "menuId": 142,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 132,
                  "path": "/config/face_config/index",
                  "sortNumber": 1,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "人脸应用",
                  "updateTime": "2021-12-16 10:37:32"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/config/channel_config/arithmetic_roi",
                  "createTime": "2021-12-15 15:02:52",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-s-operation",
                  "menuId": 140,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 132,
                  "path": "/config/channel_config/arithmetic_roi",
                  "sortNumber": 2,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "视频边界",
                  "updateTime": "2021-12-16 10:37:32"
                },*/
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/config/channel_config/arithmetic_roi_1",
                  "createTime": "2021-12-15 15:02:52",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-s-operation",
                  "menuId": 143,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 132,
                  "path": "/config/channel_config/arithmetic_roi",
                  "sortNumber": 2,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "视频边界",
                  "updateTime": "2021-12-16 10:37:32"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "",
                  "createTime": "2021-12-13 18:08:30",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-s-tools",
                  "menuId": 134,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 0,
                  "path": "/system-config",
                  "sortNumber": 15,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "系统配置",
                  "updateTime": "2021-12-15 14:58:39"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/system-config/logo",
                  "createTime": "2021-12-15 15:02:52",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-_palette",
                  "menuId": 135,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 134,
                  "path": "/system-config/logo",
                  "sortNumber": 1,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "LOGO和标题",
                  "updateTime": "2021-12-16 10:37:32"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/system-config/upload",
                  "createTime": "2021-12-15 15:02:52",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-_upload",
                  "menuId": 136,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 134,
                  "path": "/system-config/upload",
                  "sortNumber": 2,
                  "target": "_self",
                  "tenantId": 2,
                  "title": "系统升级",
                  "updateTime": "2021-12-16 10:37:32"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/system-config/uploadlist",
                  "createTime": "2021-12-15 15:02:52",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-_database",
                  "menuId": 138,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 134,
                  "path": "/system-config/datasave",
                  "sortNumber": 2,
                  "target": "_self",
                  "tenantId": 3,
                  "title": "数据上报",
                  "updateTime": "2021-12-16 10:37:32"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/system-config/ipconfig",
                  "createTime": "2021-12-15 15:02:52",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-_code",
                  "menuId": 141,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 134,
                  "path": "/system-config/ipconfig",
                  "sortNumber": 2,
                  "target": "_self",
                  "tenantId": 3,
                  "title": "IP地址设置",
                  "updateTime": "2021-12-16 10:37:32"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "",
                  "createTime": "2021-12-13 18:08:30",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-_bug-solid",
                  "menuId": 1000,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 0,
                  "path": "/debug-center",
                  "sortNumber": 16,
                  "target": "_self",
                  "tenantId": 1,
                  "title": "高级配置",
                  "updateTime": "2021-12-15 14:58:39"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/debug-center/threshold",
                  "createTime": "2021-12-15 15:02:52",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-_code",
                  "menuId": 10001,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 1000,
                  "path": "/debug-center/threshold",
                  "sortNumber": 2,
                  "target": "_self",
                  "tenantId": 3,
                  "title": "算法阈值配置",
                  "updateTime": "2021-12-16 10:37:32"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/system-config/datasave",
                  "createTime": "2021-12-15 15:02:52",
                  "deleted": 0,
                  "hide": 1,
                  "icon": "el-icon-_database",
                  "menuId": 137,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 1000,
                  "path": "/system-config/datasave",
                  "sortNumber": 1,
                  "target": "_self",
                  "tenantId": 3,
                  "title": "数据保存机制",
                  "updateTime": "2021-12-16 10:37:32"
                },
                {
                  "active": null,
                  "authority": "",
                  "checked": null,
                  "children": null,
                  "color": null,
                  "component": "/debug-center/shell",
                  "createTime": "2021-12-15 15:02:52",
                  "deleted": 0,
                  "hide": 0,
                  "icon": "el-icon-_code",
                  "menuId": 1002,
                  "menuType": 0,
                  "meta": null,
                  "parentId": 1000,
                  "path": "/debug-center/shell",
                  "sortNumber": 2,
                  "target": "_self",
                  "tenantId": 3,
                  "title": "shell远程命令",
                  "updateTime": "2021-12-16 10:37:32"
                },
              ]



              const authorities = result.authorities
                ?.filter((d) => !!d.authority)
                ?.map((d) => d.authority);
              commit('setAuthorities', authorities);
              // 用户角色
              const roles = result.roles?.map((d) => d.roleCode);
              commit('setRoles', roles);
              // 用户菜单
              const menuData = toTreeData({
                data: result.authorities?.filter((d) => d.menuType === 0), // 过滤掉按钮类型的菜单
                idField: 'menuId',
                parentIdField: 'parentId'
              });
              // 处理菜单数据格式
              const {
                menus,
                homePath
              } = formatMenus(USER_MENUS ?? menuData);
              commit('setMenus', menus);
              resolve({
                menus,
                homePath
              });

            })


          })
          .catch((e) => {
            reject(e);
          });
      });
    }
  }
};
