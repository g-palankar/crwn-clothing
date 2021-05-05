import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  unSubscribeFromAuth = null;

  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}></Header>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/shop' component={ShopPage}></Route>
          <Route exact path='/signin' component={SignInAndSignUpPage}></Route>
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    // this.unSubscribeFromAuth = auth.onAuthStateChanged((c) => this.setState({ currentUser: c }));
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if(user){
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot((snap)=>{
          this.setState({currentUser: {
            id: snap.id,
            ...snap.data(),
          }
          })
        })

      }else this.setState({currentUser: null})

    });

  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
}

export default App;
