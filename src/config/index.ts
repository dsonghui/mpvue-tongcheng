/**
 * 项目配置
 */

const pre = '/pages'
export const AppUrls = {
  Login: pre + '/login/main',
  MePage: pre + '/me/main',
  MePageDetail: pre + '/me/detail/main',

  FormIndex: pre + '/form/index/main',
  FormMchat: pre + '/form/mchat/main',
  FormMchatHistory: pre + '/form/mchat/history/main',

  ChildIndex: pre + '/children/index/main',
  ChildDetail: pre + '/children/detail/main',
}


export default class JCConfig {
  static HOST: string = 'http://192.168.9.171:8874';
}
