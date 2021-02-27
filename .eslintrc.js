module.exports = {
    "settings": {
        "react": {
            "version": "detect",
        }
    },
    "env": {
        "browser": true,
        "es2021": true
    },
    "ignorePatterns": [".eslintrc.js", "node_modules/**"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0,
        "quotes": [2, "single"],
    }
};
