import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartEmpty, setCartEmpty] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if(storedCart){
            setCartItems(storedCart);
        } else {
            setCartEmpty(true);
        }
    }, []);

    const removeAll = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
        setCartEmpty(true);
    }

    const removeProduct = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  return (

    <div
        className='container'
        style={{ marginTop: '20vh' }}>
        <Navbar cart = { cartItems }/>
        <div className='row justify-content-center'>
            <div className='col-md-8' >
                <div>
                <ul className="list-group list-group-flush">
                        <div className='row d-flex'>
                            <div className="col-md-6">
                                <h5>
                                    Cart ({cartItems.length})
                                </h5>
                            </div>
                            <div className="col-md-6">
                                <button
                                    type="button"
                                    onClick={ removeAll }
                                    className="btn btn-link fs-6 text-decoration-none text-warning float-end">
                                        Remove All
                                </button>
                            </div>
                        </div>

                    {cartEmpty ? (
                        <Link className='btn btn-warning align-items-center' to={`/`}>
                                Continue Shopping
                        </Link>

                    ) : (
                    cartItems.map(cartItem => (
                        <div key={cartItem.id} className='my-3'>
                                <div className='row g-0'>
                                    <div className="col-md-3">
                                        <img
                                        src={ cartItem.images[0] }
                                        className="img-fluid rounded w-50"/>
                                    </div>
                                    <div className="col-md-4 mx-3 fs-6">
                                        <p className='card-text'>
                                        {cartItem.description}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5 className='card-title float-end mt-3'>
                                        $ {cartItem.price}
                                        </h5>
                                    </div>
                                </div>
                                <div className='row g-0'>

                                    <div className="col-md-6">
                                            <DeleteIcon
                                            onClick= {() => removeProduct(cartItem.id)}
                                            className='mt-3'
                                            color='warning'
                                            sx={{ fontSize: 20 }}/>

                                    </div>
                                    <div className="col-md-6">
                                        <div className='card-title d-flex float-end mt-3 mx-3'>
                                            <RemoveCircleIcon
                                                sx={{ fontSize: 20 }}
                                                color='warning'/>

                                            <h6 className='mx-3'>1</h6>

                                            <AddCircleIcon
                                                sx={{ fontSize: 20 }}
                                                color='warning'/>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                        </div>

                    )))}

                </ul>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Cart
