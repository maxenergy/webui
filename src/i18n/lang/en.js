/**
 * 英语
 */
export default {
  // 菜单路由
  route: {
    dashboard: {
      _name: 'Dashboard',
      workplace: { _name: 'Workplace' },
      analysis: { _name: 'Analysis' },
      monitor: { _name: 'Monitor' }
    },
    system: {
      _name: 'System',
      user: {
        _name: 'User',
        info: { _name: '' }
      },
      role: { _name: 'Role' },
      menu: { _name: 'Menu' },
      dictionary: { _name: 'Dictionary' },
      organization: { _name: 'Organization' },
      loginRecord: { _name: 'LoginRecord' },
      operationRecord: { _name: 'OperationRecord' }
    },
    form: {
      _name: 'Form',
      basic: { _name: 'Basic Form' },
      advanced: { _name: 'Advanced Form' },
      step: { _name: 'Step Form' }
    },
    list: {
      _name: 'List',
      basic: { _name: 'Basic List' },
      advanced: { _name: 'Advanced List' },
      card: {
        _name: 'Card List',
        project: { _name: 'Project' },
        application: { _name: 'Application' },
        article: { _name: 'Article' }
      }
    },
    result: {
      _name: 'Result',
      success: { _name: 'Success' },
      fail: { _name: 'Fail' }
    },
    exception: {
      _name: 'Exception',
      '403': { _name: '403' },
      '404': { _name: '404' },
      '500': { _name: '500' }
    },
    user: {
      _name: 'User',
      profile: { _name: 'Profile' },
      message: { _name: 'Message' }
    },
    extension: {
      _name: 'Extension',
      icon: { _name: 'Icon' },
      file: { _name: 'File' },
      printer: { _name: 'Printer' },
      excel: { _name: 'Excel' },
      dragsort: { _name: 'DragSort' },
      map: { _name: 'Map' },
      player: { _name: 'Player' },
      editor: { _name: 'Editor' },
      tag: { _name: 'Tags' },
      message: { _name: 'Message' },
      steps: { _name: 'Steps' },
      menu: { _name: 'Menu' },
      empty: { _name: 'Empty' },
      regions: { _name: 'CitySelect' },
      countUp: { _name: 'CountUp' },
      qrCode: { _name: 'QRCode' },
      dialog: { _name: 'DragDialog' },
      treeSelect: { _name: 'TreeSelect' },
      tableSelect: { _name: 'TableSelect' }
    },
    example: {
      _name: 'Example',
      table: { _name: 'TreeTable' },
      document: { _name: 'Document' },
      choose: { _name: 'Choose' },
      eleadmin: { _name: 'IFrame' }
    },
    'https://eleadminCom/goods/8': { _name: 'Authorization' }
  },
  // 主框架
  layout: {
    home: 'Home',
    header: {
      profile: 'Profile',
      password: 'Password',
      logout: 'SignOut'
    },
    footer: {
      website: 'Website',
      document: 'Document',
      authorization: 'Authorization',
      copyright: 'Copyright © 2021 Guangzhou ruimushu Technology Co., Ltd'
    },
    logout: {
      title: 'Confirm',
      message: 'Are you sure you want to log out?'
    }
  },
  // 登录界面
  login: {
    title: 'User Login',
    username: 'please input username',
    password: 'please input password',
    code: 'please input code',
    remember: 'remember',
    forget: 'forget',
    login: 'login',
    loading: 'loading'
  }
};
