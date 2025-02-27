// Write your code here

import Popup from 'reactjs-popup'
import Payment from '../Payment'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachItem => {
        total += eachItem.price * eachItem.quantity
      })

      return (
        <div className="cart-summary-conatiner">
          <h1 className="order-total">
            Order Total <span className="total-order-price">Rs {total}/-</span>
          </h1>
          <p className="total-items-count">
            <span>{cartList.length}</span> Items in cart
          </p>
          <Popup
            className="popup"
            modal
            trigger={
              <button className="checkout-button" type="button">
                Checkout
              </button>
            }
            position="top left"
          >
            {close => <Payment close={close} />}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
