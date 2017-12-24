module.exports = {
  'plugins': [
    'vue',
    'html',
    'standard',
    'cypress'
  ],
  'extends': [
    'standard',
    'plugin:vue/recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 8,
    'sourceType': 'module'
  },
  "env": {
    "browser": true
  }
}
