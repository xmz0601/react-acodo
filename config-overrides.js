const { override, fixBabelImports, addLessLoader } = require('customize-cra')

// overwrite webpack config
module.exports = override(
  fixBabelImports('import',{
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#3B135A' },   
    }
  })
)