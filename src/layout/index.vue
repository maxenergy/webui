<!-- 框架布局 -->
<template>
  <ele-pro-layout :menus="menus" :home-title="homeTitle" :project-name="projectName" :show-setting.sync="showSetting"
    :need-setting="enableSetting" :hide-footers="hideFooters" :hide-sidebars="hideSidebars"
    :repeatable-tabs="repeatableTabs" :tabs="theme.tabs" :color="theme.color" :collapse="theme.collapse"
    :head-style="theme.headStyle" :side-style="theme.sideStyle" :layout-style="theme.layoutStyle"
    :side-menu-style="theme.sideMenuStyle" :fixed-body="theme.fixedBody" :fixed-header="theme.fixedHeader"
    :fixed-sidebar="theme.fixedSidebar" :body-full="theme.bodyFull" :show-footer="theme.showFooter"
    :colorful-icon="theme.colorfulIcon" :logo-auto-size="theme.logoAutoSize" :side-unique-open="theme.sideUniqueOpen"
    :show-tabs="theme.showTabs" :tab-style="theme.tabStyle" :dark-mode="theme.darkMode" :weak-mode="theme.weakMode"
    :i18n="i18n" :locale="locale" @logo-click="onLogoClick" @reload-page="reloadPage" @update-screen="updateScreen"
    @update-collapse="updateCollapse" @tab-add="tabAdd" @tab-remove="tabRemove" @tab-remove-all="tabRemoveAll"
    @tab-remove-left="tabRemoveLeft" @tab-remove-right="tabRemoveRight" @tab-remove-other="tabRemoveOther"
    @change-style="changeStyle" @change-color="changeColor" @change-dark-mode="changeDarkMode"
    @change-weak-mode="changeWeakMode" @set-home-components="setHomeComponents" @reset-setting="resetSetting">
    <!-- logo图标 -->
    <template slot="logo">
      <img id="logoimg" style="image-rendering: -webkit-optimize-contrast;width: auto;height: 50px;display: none;"
        src="@/assets/logo.png" />
      <span id="logotitle">{{logotitletext==""||logotitletext==" "?"AIBOX后台管理":logotitletext}}</span>
    </template>
    <!-- 顶栏右侧区域 -->
    <template slot="right">
      <ele-header-right :setting="enableSetting" :fullscreen="fullscreen" @item-click="onItemClick"
        @change-language="changeLanguage" @change-fullscreen="changeFullscreen" />
    </template>
    <!-- 全局页脚 -->
    <template slot="footer">
      <ele-footer />
    </template>
    <!-- 修改密码弹窗 -->
    <ele-password :visible.sync="showPassword" />
  </ele-pro-layout>
</template>

<script>
  import {
    getSystemLogos
  } from "@/api/system-config"
  import {
    mapGetters
  } from 'vuex';
  import EleHeaderRight from './components/header-right';
  import ElePassword from './components/password';
  import EleFooter from './components/footer';

  import {
    HIDE_SIDEBARS,
    HIDE_FOOTERS,
    REPEATABLE_TABS,
    HOME_TITLE,
    ENABLE_SETTING
  } from '@/config/setting';
  import {
    addPageTab,
    removePageTab,
    removeAllPageTab,
    removeLeftPageTab,
    removeRightPageTab,
    removeOtherPageTab,
    reloadPageTab
  } from '@/utils/page-tab-util';

  export default {
    name: 'EleLayout',
    components: {
      EleHeaderRight,
      ElePassword,
      EleFooter
    },
    data() {
      return {
        // 是否显示修改密码弹窗
        showPassword: false,
        // 是否显示主题设置抽屉
        showSetting: false,
        // 是否是全屏状态
        fullscreen: false,
        // 项目名
        projectName: '',
        // 顶栏是否显示主题设置按钮
        enableSetting: ENABLE_SETTING,
        // 不显示页脚的路由
        hideFooters: HIDE_FOOTERS,
        // 不显示侧栏的路由
        hideSidebars: HIDE_SIDEBARS,
        // 页签同路由不同参数可重复打开的路由
        repeatableTabs: REPEATABLE_TABS,
        logoimgsrc: '',
        logotitletext: '',
        logoiconsrc: '',
        menusAsBug: {
          active: null,
          authority: "",
          checked: null,
          children: [
            {
              active: null,
              authority: "",
              checked: null,
              children: null,
              color: null,
              component: "/debug-center/threshold",
              createTime: "2021-12-15 15:02:52",
              deleted: 0,
              hide: 0,
              icon: "el-icon-_code",
              menuId: 10001,
              menuType: 0,
              meta: {
                title: "算法阈值配置",
                icon: "el-icon-_code",
                hide: 0
              },
              parentId: 1000,
              path: "/debug-center/threshold",
              sortNumber: 2,
              target: "_self",
              tenantId: 3,
              title: "算法阈值配置",
              updateTime: "2021-12-16 10:37:32"
            },
            {
              active: null,
              authority: "",
              checked: null,
              children: null,
              color: null,
              component: "/debug-center/shell",
              createTime: "2021-12-15 15:02:52",
              deleted: 0,
              hide: 0,
              icon: "el-icon-_code",
              menuId: 1002,
              menuType: 0,
              meta: {
                title: "shell远程命令",
                icon: "el-icon-_code",
                hide: 0
              },
              parentId: 1000,
              path: "/debug-center/shell",
              sortNumber: 2,
              target: "_self",
              tenantId: 3,
              title: "shell远程命令",
              updateTime: "2021-12-16 10:37:32"
            }
          ],
          color: null,
          component: "",
          createTime: "2021-12-13 18:08:30",
          deleted: 0,
          hide: 0,
          icon: "el-icon-s-tools",
          menuId: 1000,
          menuType: 0,
          meta: {
            title: "高级设置",
            icon: "el-icon-s-tools",
            hide: 0
          },
          parentId: 0,
          path: "/debug-center",
          sortNumber: 16,
          target: "_self",
          tenantId: 1,
          title: "高级设置",
          updateTime: "2021-12-15 14:58:39",
          redirect: "/debug-center/threshold"
        },
      };
    },
    computed: {
      // 当前语言
      locale() {
        return this.$i18n.locale;
      },
      // 主页标题
      homeTitle() {
        // 去掉国际化后直接return HOME_TITLE
        return this.$t('layout.home') ?? HOME_TITLE;
      },
      // 菜单数据
      menus() {
        return this.$store.state.user.menus;
      },
      // 主题状态
      ...mapGetters(['theme'])
    },
    mounted() {
      this.$nextTick(() => {
        this.resetSetting();
        getSystemLogos().then((res) => {
          if(res.logoPath&&''!=res.logoPath&&' '!=res.logoPath){
            this.logoimgsrc = window.location.origin + res.logoPath.substring(res.logoPath.indexOf("/api/"))
          }
          if(res.logoiconsrc&&''!=res.logoiconsrc&&' '!=res.logoiconsrc){
            this.logoiconsrc = window.location.origin + res.iconPath.substring(res.iconPath.indexOf("/api/"))
          }
          this.logotitletext = res.title
          let logoimg = document.getElementById("logoimg");
          if (null != this.logoimgsrc && '' != this.logoimgsrc  ) {
            logoimg.src = this.logoimgsrc
          }
          logoimg.style.display = "block"
          if (null != this.logoiconsrc && '' != this.logoiconsrc ) {
            document.querySelector('[rel="icon"]').href = this.logoiconsrc
          }
        })
        this.keyCodeForEvent()
      })
    },
    methods: {
      /* 顶栏右侧点击 */
      onItemClick(key) {
        if (key === 'password') {
          this.showPassword = true;
        } else if (key === 'setting') {
          this.showSetting = true;
        }
      },
      /* 全屏切换 */
      changeFullscreen() {
        try {
          this.updateCollapse(true)
          this.fullscreen = this.$util.toggleFullscreen();
        } catch (e) {
          this.$message.error('您的浏览器不支持全屏模式');
        }
      },
      /* logo点击事件 */
      onLogoClick(isHome) {
        if (!isHome) {
          this.$router.push('/');
        }
      },
      /* 刷新页签 */
      reloadPage() {
        reloadPageTab();
      },
      /* 添加tab */
      tabAdd(value) {
        addPageTab(value);
      },
      /* 移除tab */
      tabRemove(obj) {
        removePageTab(obj.name, obj.active);
      },
      /* 移除全部tab */
      tabRemoveAll(active) {
        removeAllPageTab(active);
      },
      /* 移除左边tab */
      tabRemoveLeft(value) {
        removeLeftPageTab(value);
      },
      /* 移除右边tab */
      tabRemoveRight(value) {
        removeRightPageTab(value);
      },
      /* 移除其它tab */
      tabRemoveOther(value) {
        removeOtherPageTab(value);
      },
      /* 更新collapse */
      updateCollapse(value) {
        this.$store.dispatch('theme/set', {
          key: 'collapse',
          value: value
        });
      },
      /* 更新屏幕尺寸 */
      updateScreen() {
        this.$store.dispatch('theme/updateScreen');
        this.fullscreen = this.$util.isFullscreen();
      },
      /* 重置设置 */
      resetSetting() {
        this.$store.dispatch('theme/resetSetting');
      },
      /* 切换主题风格 */
      changeStyle(value) {
        this.$store.dispatch('theme/set', value);
      },
      /* 切换主题色 */
      changeColor(value) {
        const loading = this.$loading({
          lock: true,
          background: 'transparent'
        });
        this.$store
          .dispatch('theme/setColor', value)
          .then(() => {
            loading.close();
          })
          .catch((e) => {
            console.error(e);
            loading.close();
            this.$message.error('主题加载失败');
          });
      },
      /* 切换暗黑模式 */
      changeDarkMode(value) {
        this.$store.dispatch('theme/setDarkMode', value);
      },
      /* 切换色弱模式 */
      changeWeakMode(value) {
        this.$store.dispatch('theme/setWeakMode', value);
      },
      /* 设置主页包含的组件名称 */
      setHomeComponents(components) {
        this.$store.dispatch('theme/setHomeComponents', components);
      },
      /* 菜单路由国际化对应的名称 */
      i18n(path, key /*, menu*/ ) {
        // 参数三menu即原始菜单数据, 如果需要菜单标题多语言数据从接口返回可用此参数获取对应的多语言标题
        // 例如下面这样写, 接口的菜单数据为{path: '/system/user', titles: {zh: '用户管理', en: 'User'}}
        // return menu ? menu.titles[this.$i18n.locale] : null;
        const k = 'route.' + key + '._name';
        const title = this.$t(k);
        return title === k ? null : title;
      },
      /* 切换语言 */
      changeLanguage(lang) {
        this.$i18n.locale = lang;
        localStorage.setItem('i18n-lang', lang);
      },
      /* 模拟组合键触发函数 */
      keyCodeForEvent() {
        let code = 0;
        let code2 = 0;
        let code3 = 0;
        let code4 = 0;
        let that = this
        let isAdd = false;
        document.onkeydown = function(e) {
          let evn = e || event;
          let key = evn.keyCode || evn.which || evn.charCode;
          if (key === 17) {
            //Control
            code = 1;
          }
          if (key === 13) {
            //Enter
            code2 = 1;
          }
          if (key === 16) {
            //Shift
            code3 = 1;
          }
          if (key === 18) {
            //Alt
            code4 = 1;
          }
          if (code === 1 && code2 === 1 && code3 === 1 && code4 === 1) {
            //alert('Ctrl+Shift+Alt+Enter');
            // this obj to do something

            //console.log(JSON.stringify(that.$store.state.user.menus[3]))
            /* if(!isAdd){
              that.$store.state.user.menus.push(that.menusAsBug)
            }else{
              that.$store.state.user.menus.pop()
            } */
            that
            // 暂时取消高级配置,直接显示
            // let a = that.$store.state.user.menus.pop();
            // if(!isAdd){
            //   a.hide = 0
            //   a.meta.hide = 0
            // }else{
            //   a.hide = 1
            //   a.meta.hide = 1
            // }
            // that.$store.state.user.menus.push(a)

            isAdd = !isAdd;

            code = 0;
            code2 = 0;
            code3 = 0;
            code4 = 0;
          }
        }
        document.onkeyup = function(e) {
          if (e.keyCode === 17) {
            code = 0;
          }
          if (e.keyCode === 13) {
            code2 = 0;
          }
          if (e.keyCode === 16) {
            //Shift
            code3 = 0;
          }
          if (e.keyCode === 18) {
            //Alt
            code4 = 0;
          }
        }
      }
    }
  };
</script>
<style>
</style>
