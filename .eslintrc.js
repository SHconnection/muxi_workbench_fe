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

    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "Label" ],
      "required": {
          "some": [ "nesting", "id" ]
      },
      "allowChildren": false
    }],

    "no-underscore-dangle": ["error", { "allow": ["_this"] }]

  },
  "env": {
    "jest": true,
    "browser": true
  }
};