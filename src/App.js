import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/login/login.jsx'
import Acodo from './pages/acodo/acodo.jsx'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Acodo} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
