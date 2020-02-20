// 自动引入文件夹下所有文件
// example
const requireContxet = require.context('./modules', true, '/\.js$/')

requireContxet.keys().map(requireContxet)