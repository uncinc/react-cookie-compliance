# react-cookie-compliance

> TODO

[![NPM](https://img.shields.io/npm/v/react-cookie-compliance.svg)](https://www.npmjs.com/package/react-cookie-compliance) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

- Yarn: `yarn add react-cookie-compliance`
- NPM: `npm install --save react-cookie-compliance`

## Usage

```jsx
import React, { Component } from 'react'

import CookieCompliance, { cookieComplianceReducer } from 'react-cookie-compliance'

class Example extends Component {
  render () {
    return (
      <CookieCompliance agreeText="Yes" disagreeText="no" readMoreLink="https://..." readMoreText="I want to read more!">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet
        at quam a volutpat. Pellentesque convallis mollis diam, et elementum
        justo volutpat sit amet. Sed vel tincidunt nisi, quis faucibus.
      </CookieCompliance
    )
  }
}

..

# Add the reducer.
const rootReducer = combineReducers({
  cookieCompliance: cookieComplianceReducer,
});

```

# Development

1) Go to the `./example` directory

2) Run `yarn install`

3) Run `yarn start`

# Publishing (testing)

If you want to test locally before publishing you have to use `npm pack`.
Normally you can use `yarn link` or `npm link` but since we have a connected
component, this does not work. Besides, using `npm pack` emulates a package at
its best.

1) In the root run `npm pack`, this will generate <package-name>-<version>.tgz

2) Go to your main app (where you use this package) and run:

```
# Absolute path
yarn add file:///path/to/my-lib/my-lib-1.0.0.tgz

# OR

# Relative path
yarn add ../../path/to/my-lib/my-lib-1.0.0.tgz
```

# Publishing to NPM

Run `npm publish`.

Make sure that any npm modules you want as peer dependencies are properly marked
as `peerDependencies` in `package.json`. The rollup config will automatically
recognize them as peers and not try to bundle them in your module.



## License

MIT © [Unc Inc](https://github.com/uncinc)
