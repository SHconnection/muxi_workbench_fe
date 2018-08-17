module.exports = {
  "extends": ["airbnb", "prettier"],
  "plugins": ["react"],
  "rules": {
    // React Native has JSX in JS files
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],

    // React Native includes images via require("../images/example.png")
    "global-require": 0,

    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],

    "react/prefer-stateless-function": [2, { "ignorePureComponents": true }],

  },
  "env": {
    "jest": true,
    "browser": true
  }
};