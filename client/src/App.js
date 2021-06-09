import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header  from './component/layout/Header';
import UserLogin  from './component/layout/UserLogin';
import { Route, Switch } from 'react-router-dom';
import  RegisterForm  from './component/layout/RegisterForm';
import Alert from './component/layout/AlertMsg';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import store from './store';
import setToken from './utils/setToken';
import Posts from './component/layout/Posts';
import Discussion from './component/comment/Discussion';
import LandingPage from './component/layout/LandingPage';

if (localStorage.token) {
        setToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser);
  }, [])

  return (
    <Provider store={store}>
      <Header />
      <Alert  />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={UserLogin} />
        <Route exact path='/register' component={RegisterForm} />
        <Route exact path='/allposts' component={Posts} />
        <Route exact path='/post/:id' component={Discussion} />
      </Switch>
    </Provider>
  );
}

export default App;
