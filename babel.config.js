module.exports = function(api) {
  const isDevEnv = api.env() === 'development';

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: isDevEnv
            ? ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version']
            : ['>0.2%', 'not dead', 'not op_mini all']
        }
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ];

  const plugins = [
    isDevEnv && '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    !isDevEnv && '@babel/plugin-transform-react-inline-elements',
    !isDevEnv && '@babel/plugin-transform-react-constant-elements',
    !isDevEnv && 'transform-react-remove-prop-types',
    [
      'transform-imports',
      {
        '@material-ui/core': {
          transform: function(importName) {
            return `@material0ui/core/${importName}`;
          },
          preventFullImport: true
        },
        '@material-ui/lab': {
          transform: function(importName) {
            return `@material-ui/lab/${importName}`;
          },
          preventFullImport: true
        },
        '@material-ui/styles': {
          transform: function(importName) {
            return `@material-ui/styles/${importName}`;
          },
          preventFullImport: true
        },
        '@material-ui/icons': {
          transform: function(importName) {
            return `@material-ui/icons/${importName}`;
          },
          preventFullImport: true
        }
      }
    ],
    isDevEnv && 'react-hot-loader/babel'
  ].filter(Boolean);

  return { presets, plugins };
};
