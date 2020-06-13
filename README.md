# React Json Schema Form UI

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

#### Add to your project
`yarn add react-jsonschema-form-ui`

**or**

`npm install react-jsonschema-form-ui`

**then**

```
import {
  ArrayFieldTemplate, 
  CurrencyWidget, 
  PercentWidget, 
  RawHTMLField, 
  ReactDatePickerWidget, 
  ReactSelectWidget, 
  ReactSignatureCanvasField, 
  StatesWidget
} from 'react-jsonschema-form-ui';

const widgets = {
  CurrencyWidget: CurrencyWidget,
  PercentWidget: PercentWidget,
  ReactDatePickerWidget: ReactDatePickerWidget,
  ReactSelectWidget: ReactSelectWidget,
  StatesWidget: StatesWidget
};

const fields = {
  RawHTMLField: RawHTMLField,
  ReactSignatureCanvasField: ReactSignatureCanvasField
};
```

### Development

#### Install
`yarn install`

#### Start
`yarn start`

# Sponsored by 
## [<img src="https://responsevault.com/images/ResponseVault-Logo.svg" width=300>](https://responsevault.com/)


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
