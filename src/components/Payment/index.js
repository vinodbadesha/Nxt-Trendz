import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

const paymentOptionsList = [
  {id: 'CARD', displayText: 'Card', isDisabled: true},
  {id: 'NET BANKING', displayText: 'Net Banking', isDisabled: true},
  {id: 'UPI', displayText: 'UPI', isDisabled: true},
  {id: 'WALLET', displayText: 'Wallet', isDisabled: true},
  {id: 'CASH ON DELIVERY', displayText: 'Cash On Delivery', isDisabled: false},
]

const Payment = () => {
  const {cartList} = useContext(CartContext)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const updatePaymentMethod = event => {
    const {id} = event.target
    setPaymentMethod(id)
  }

  const onPlaceOrder = () => setIsOrderPlaced(true)

  const getTotalPrice = () => {
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)
  }

  const renderPaymentMethodsInput = () => (
    <ul className="payment-method-inputs">
      {paymentOptionsList.map(each => (
        <li key={each.id} className="payment-method-input-container">
          <input
            id={each.id}
            type="radio"
            name="paymentMethod"
            disabled={each.isDisabled}
            onChange={updatePaymentMethod}
            className="payment-method-input"
          />
          <label
            className={`payment-method.label ${
              each.isDisabled ? 'disabled-label' : ''
            }`}
          >
            {each.displayText}
          </label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="payments-container">
      {isOrderPlaced ? (
        <p className="success-message">
          Your order has been placed successfully
        </p>
      ) : (
        <>
          <h1 className="payments-heading">Payment Details</h1>
          <p className="payments-sub-heading">Payment Method</p>
          {renderPaymentMethodsInput()}
          <div className="order-details">
            <p className="payments-sub-heading">Order details</p>
            <p>Quantity: {cartList.length}</p>
            <p>Total Price: RS {getTotalPrice()}/</p>
          </div>
          <button
            className="confirm-order-button"
            type="button"
            onClick={onPlaceOrder}
            disabled={paymentMethod === ''}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default Payment
