module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "commonjs": true,
        "mocha": true,
        "jquery": true,
        "react/node": true
    },    
    "parserOptions": {
        "sourceType": "module",
        "ecmafeatures": {
            "jsx": true,
        }
    },
    "globals": {
        "document": true,
        "fetch": true,
        "window": true,
        "history": true
    },
    "extends": ["airbnb-base", "prettier", "eslint:recommended"],
    "plugins": ["react"],
    "rules": {
      "prettier/prettier": [
        "error",
        {
          "tabWidth": 4,
          "useTabs": true,
          "semi": true,
          "singleQuote": true,
          "trailingComma": 'all',
          "bracketSpacing": true,
          "alwaysParens:": "always",
        },
      ],
      'eqeqeq': 'off',
      'quotes': ['error', 'single'],
      'no-console': 1,
      'no-tabs': 0,
      'indent': ['error', 'tab'],
      'semi': ['error', 'never'],
      'camelcase': 0,
      'no-plusplus': 0,
      'arrow-parens': 0,
      'prefer-template': 0,
      'no-param-reassign': 0,
      'no-shadow': 0,
      'func-names': 0,
      'no-unused-expressions': 0,
      'arrow-body-style': 0,
      "react/curly": "error"
    },
  };
