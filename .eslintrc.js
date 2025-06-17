module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    'react-native/react-native': true,
    'jest': true,
    'node': true
  },
  rules: {
    // React Native specific rules - relaxed for development
    'react-native/no-unused-styles': 1,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 1,
    'react-native/no-color-literals': 0, // Disabled for now
    'react-native/no-raw-text': 0,
    'react-native/no-single-element-style-arrays': 2,
    'react-native/sort-styles': 0, // Disabled for now

    // React specific rules
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/no-deprecated': 2,
    'react/no-direct-mutation-state': 2,
    'react/no-unescaped-entities': 0, // Disabled for now

    // General JavaScript rules
    'no-console': 0, // Allow console for development
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-undef': 2,
    'no-var': 2,
    'prefer-const': 1,
  },
}; 