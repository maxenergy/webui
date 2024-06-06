// 不显示侧栏的路由
export const HIDE_SIDEBARS = [];

// 不显示页脚的路由
export const HIDE_FOOTERS = [
  '/system/dictionary',
  '/system/organization',
  '/form/advanced',
  '/example/choose'
];

// 页签同路由不同参数可重复打开的路由
export const REPEATABLE_TABS = ['/system/user-info'];

// 不需要登录的路由
export const WHITE_LIST = ['/login', '/forget'];

// 直接指定菜单数据
export const USER_MENUS = null;

// token传递的header名称
export const TOKEN_HEADER_NAME = 'Authorization';

// token存储的名称
export const TOKEN_STORE_NAME = 'access_token55';

// 主题配置存储的名称
export const THEME_STORE_NAME = 'theme55';

// 首页名称, 为空则取第一个菜单的名称
export const HOME_TITLE = '主页';

// 首页路径, 为空则取第一个菜单的地址
export const HOME_PATH = '/warn-center/list';

// 顶栏是否显示主题设置按钮
export const ENABLE_SETTING = false;

// 开启多页签后是否缓存组件
export const TAB_KEEP_ALIVE = process.env.NODE_ENV !== 'development';
