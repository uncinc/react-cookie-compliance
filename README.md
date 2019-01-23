# @uncinc/react-cookie-compliance

GDPR friendly cookie compliance popup to prompt the user for consent.

[![NPM](https://img.shields.io/npm/v/@uncinc/react-cookie-compliance.svg)](https://www.npmjs.com/package/@uncinc/react-cookie-compliance) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

- Yarn: `yarn add @uncinc/react-cookie-compliance`
- NPM: `npm install --save @uncinc/react-cookie-compliance`

## Usage

The cookie name being stored is named `cookie-compliance-consent`.

```jsx
import React, { Component } from 'react';
import { combineReducers } from 'redux-immutable';

import CookieCompliancePopup, { cookieComplianceReducer } from '@uncinc/react-cookie-compliance';

# Add the reducer.
const rootReducer = combineReducers({
  cookieCompliance: cookieComplianceReducer,
  ...
});

...

class Example extends Component {
  render () {
    return (
      <CookieCompliancePopup agreeText="Yes" disagreeText="No">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at
          pulvinar quam. Suspendisse pellentesque feugiat sagittis. Donec
          dapibus enim nec consectetur venenatis. Curabitur quis vehicula mi.
          &nbsp;
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">
            I want to read more!
          </a>
        </p>
      </CookieCompliancePopup>
    );
  }
}

```

# Development

1) Go to the `./example` directory

2) Run `yarn install`

3) Run `yarn start`

# Publishing (testing)

If you want to test locally before publishing you have to use `npm pack`.
Normally you can use `yarn link` or `npm link` but since we have a connected
component, this does not work because it will use react-redux from
dev-dependencies instead of the react-redux from the main app. Besides, using
`npm pack` emulates a package at its best.

1) In the root run `npm pack`, this will generate `<package-name>-<package-version>.tgz`

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

Apache License 2.0 © [Unc Inc](https://github.com/uncinc)
