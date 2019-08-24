module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      arrowFunctions: true,
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  plugins: ['react'],
  rules: {
    'no-empty': 0,
    'no-console': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-boolean-value': 0,
    'react/forbid-prop-types': 0,
    'react/prop-types': 0, // TODO: We will be using flow typing instead (once app code stabilises more)
    'react/prefer-stateless-function': 0, // Sometimes we prefer PureComponent for performance reasons
    'react/destructuring-assignment': [2, 'always', { ignoreClassFields: true }],
    'react/sort-comp': [
      2,
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          '/^on.+$/',
          'everything-else',
          'instance-variables',
          'render'
        ]
      }
    ],
    // Require the use of === and !==
    eqeqeq: 2,
    // Disallow await inside of loops
    'no-await-in-loop': 2,
    'no-plusplus': 0,
    'no-else-return': ['error', { allowElseIf: true }],
    'import/no-named-as-default': 0
  },
  globals: {
    React: true,
    fixture: true
  },
  env: {
    browser: true,
    jest: true,
    node: true
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        root: ['./'],
        extensions: ['.js', '.tsx', '.ts']
      }
    }
  }
};
