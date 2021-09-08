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

import './App.css';
import SearchPage from '../SearchPage/SearchPage';
import SearchList from '../SearchList/SearchList';
import SearchItem from '../SearchItem/SearchItem';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/search" />
          <Route exact path="/search">
            <SearchPage />
          </Route>

          <Route
            exact
            path="/admin"
          >
            <AdminPage />
          </Route>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/admin" />
              :
              // Otherwise, show the login page
              <SearchPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/admin" />
              :
              // Otherwise, show the Landing page -- ADJUST TO USER SEARCH PAGE
              <SearchPage />
            }
          </Route>
          <Route 
          exact
          path="/search?">
            <SearchList />
          </Route>
          
          <Route 
          exact
          path="/search-results">
            <SearchItem />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
