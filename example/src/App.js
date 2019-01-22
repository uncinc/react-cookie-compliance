import React, { Component } from 'react'

import CookieCompliance from 'react-cookie-compliance'

export default class App extends Component {
  render () {
    return (
      <div>
        <CookieCompliance>
          Lorem ipsum
        </CookieCompliance>
      </div>
    )
  }
}
