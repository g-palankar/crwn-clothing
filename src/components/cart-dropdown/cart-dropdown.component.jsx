import './cart-dropdown.styles.scss'
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors'


const CartDropDown = ({ cartItems }) => {
    console.log('got state as ', [])
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.map(cItem => <CartItem key={cItem.id} item={cItem} />)
                }
            </div>
            <CustomButton>Go TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
});

export default connect(mapStateToProps, null)(CartDropDown);