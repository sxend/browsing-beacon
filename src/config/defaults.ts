export default {
  id: `UA-${Date.now().toString(32) + Math.random().toString(32).substring(2)}-0`, // FIXME idのデフォルト生成方法検討
  plugins: [],
  endpoint: '//0.0.0.0/beacon',
  transport: 'auto',
  sendTimeout: 1000
}
