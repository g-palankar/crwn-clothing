import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { cartHidden } from '../../redux/cart/cart.selectors';


import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop">SHOP</Link>
            <Link className="option" to="/shop">CONTACT</Link>
            {currentUser ? <div onClick={() => auth.signOut()} className="option">SIGN OUT</div> : <Link className="option" to="/signin">LOG IN</Link>}
            <CartIcon />
        </div>
        {!hidden ? <CartDropDown /> : null}
    </div>
)

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
    hidden: cartHidden(state)
})

export default connect(mapStateToProps)(Header);