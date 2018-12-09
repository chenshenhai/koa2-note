const babelConfig = {
  presets: [
    '@babel/env',
    // [
    //   '@babel/env',
    //   {
    //     targets: {
    //       edge: '17',
    //       firefox: '60',
    //       chrome: '67',
    //       safari: '11.1'
    //     },
    //     useBuiltIns: 'usage'
    //   }
    // ],
    '@babel/preset-react'
  ],
  'plugins': [
    [
      'import',
      { 'libraryName': 'antd', 'libraryDirectory': 'lib' },
      'ant'
    ],
    [
      'import',
      { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib' },
      'antd-mobile'
    ],
    '@babel/plugin-proposal-class-properties'
  ]
};

module.exports = babelConfig;
