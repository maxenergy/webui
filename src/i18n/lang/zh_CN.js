/**
 * 简体中文
 */
export default {
  // 菜单路由
  route: {
    dashboard: {
      _name: 'Dashboard',
      workplace: { _name: '工作台' },
      analysis: { _name: '分析页' },
      monitor: { _name: '监控页' }
    },
    system: {
      _name: '系统管理',
      user: {
        _name: '用户管理',
        info: { _name: '' }
      },
      role: { _name: '角色管理' },
      menu: { _name: '菜单管理' },
      dictionary: { _name: '字典管理' },
      organization: { _name: '机构管理' },
      loginRecord: { _name: '登录日志' },
      operationRecord: { _name: '操作日志' }
    },
    form: {
      _name: '表单页面',
      basic: { _name: '基础表单' },
      advanced: { _name: '复杂表单' },
      step: { _name: '分步表单' }
    },
    list: {
      _name: '列表页面',
      basic: { _name: '基础列表' },
      advanced: { _name: '复杂列表' },
      card: {
        _name: '卡片列表',
        project: { _name: '项目列表' },
        application: { _name: '应用列表' },
        article: { _name: '文章列表' }
      }
    },
    result: {
      _name: '结果页面',
      success: { _name: '成功页' },
      fail: { _name: '失败页' }
    },
    exception: {
      _name: '异常页面',
      '403': { _name: '403' },
      '404': { _name: '404' },
      '500': { _name: '500' }
    },
    user: {
      _name: '个人中心',
      profile: { _name: '个人资料' },
      message: { _name: '我的消息' }
    },
    extension: {
      _name: '扩展组件',
      icon: { _name: '字体图标' },
      file: { _name: '文件列表' },
      printer: { _name: '打印插件' },
      excel: { _name: 'excel插件' },
      dragsort: { _name: '拖拽排序' },
      map: { _name: '地图组件' },
      player: { _name: '视频播放' },
      editor: { _name: '富文本框' },
      tag: { _name: '标签组件' },
      message: { _name: '消息提示' },
      steps: { _name: '步骤条' },
      menu: { _name: '菜单导航' },
      empty: { _name: '空状态' },
      regions: { _name: '城市选择' },
      countUp: { _name: '滚动数字' },
      qrCode: { _name: '二维码' },
      dialog: { _name: '拖拽弹窗' },
      treeSelect: { _name: '树形下拉' },
      tableSelect: { _name: '表格下拉' }
    },
    example: {
      _name: '常用实例',
      table: { _name: '树形表格' },
      document: { _name: '案卷调整' },
      choose: { _name: '批量选择' },
      eleadmin: { _name: '内嵌页面' }
    },
    'https://eleadminCom/goods/8': { _name: '获取授权' }
  },
  // 主框架
  layout: {
    home: '主页',
    header: {
      profile: '个人中心',
      password: '修改密码',
      logout: '退出登录'
    },
    footer: {
      website: '官网',
      document: '文档',
      authorization: '授权',
      copyright: ''
    },
    logout: {
      title: '提示',
      message: '确定要退出登录吗?'
    }
  },
  // 登录界面
  login: {
    title: '用户登录',
    username: '请输入登录账号',
    password: '请输入登录密码',
    code: '请输入验证码',
    remember: '记住密码',
    forget: '忘记密码',
    login: '登录',
    loading: '登录中'
  },
  //报警中心
  warnCenter: {
    label:{
      fire: '烟火检测',
      smoke: '烟火检测',
      head: '未戴安全帽',
      helmet: '安全帽检测',
      smoking: '吸烟检测',
      calling: '打电话',
      oth_clothes: '未穿反光衣',
      ref_clothes:  '反光衣',
      inside: '人员闯入',
      person: '人员闯入',
      leave: '人员离岗'
    },
  }
};
