import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import NotFound from './NotFound'
import CourseDetails from './CourseDetails'

import './App.css'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseDetails} />

      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
