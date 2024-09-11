import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleContinueShopping = () => {
    onContinueShopping(); // Call the function passed from the parent component
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 0) {
      dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id)); // Remove the item completely
    }
  };

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId)); // Dispatch the removeItem action with the itemId
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.quantity * parseFloat(item.cost.replace('$', '')); 
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${(parseFloat(item.cost.replace('$', '')) || 0).toFixed(2)}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>

                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item).toFixed(2)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem; 