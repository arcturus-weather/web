function app(mode) {
  return mode === 'production' ? undefined : 'src/app';
}

function pages(mode) {
  return mode === 'production'
    ? ['src/components/index']
    : undefined;
}

module.exports = {
  appId: 'wx5015a94e3b5697be',
  app,
  pages,
  compileType: 'miniprogram',
  sourceMap: false,
  minimize: false,
  plugins: [
    '@mpflow/plugin-babel',
    '@mpflow/plugin-typescript',
    '@mpflow/plugin-css',
  ],
  settings: {
    urlCheck: true,
    es6: false,
    enhance: false,
    postcss: false,
    preloadBackgroundData: false,
    minified: false,
    newFeature: false,
    coverView: true,
    nodeModules: false,
    autoAudits: false,
    showShadowRootInWxmlPanel: true,
    scopeDataCheck: false,
    uglifyFileName: false,
    checkInvalidKey: true,
    checkSiteMap: true,
    uploadWithSourceMap: true,
    compileHotReLoad: false,
    babelSetting: {
      ignore: [],
      disablePlugins: [],
      outputPath: '',
    },
    useIsolateContext: true,
    useCompilerModule: false,
    userConfirmedUseCompilerModuleSwitch: false,
  },
};
