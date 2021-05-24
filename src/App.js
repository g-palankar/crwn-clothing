import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

// import {dis} from 'react-redux'

class App extends React.Component {
  unSubscribeFromAuth = null;

  render() {
    return (
      <div>
        <Header></Header>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/shop' component={ShopPage}></Route>
          <Route exact path='/signin' render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />}></Route>
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // this.unSubscribeFromAuth = auth.onAuthStateChanged((c) => this.setState({ currentUser: c }));
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot((snap) => {
          setCurrentUser({
            id: snap.id,
            ...snap.data(),
          })
        })
      } else setCurrentUser(null)
    });
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
