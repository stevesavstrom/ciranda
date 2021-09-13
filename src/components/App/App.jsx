import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AdminPage from '../AdminPage/AdminPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import SearchPage from '../SearchPage/SearchPage';
import SearchList from '../SearchList/SearchList';
import "../App/App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div style={{minHeight:"92vh"}}>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/search" />
          <Redirect exact from="/home" to="/search" />
          <Route exact path="/search">
            <SearchPage />
          </Route>

          <ProtectedRoute
            exact
            path="/admin"
          >
            <AdminPage />
          </ProtectedRoute>

          <Route
            exact
            path="/register"
          >
            <RegisterPage />
          </Route>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/search" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            <SearchPage />
          </Route>
          <Route 
          exact
          path="/search?">
            <SearchList />
          </Route>
          

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
      <Footer />

    </Router>
  );
}

export default App;
