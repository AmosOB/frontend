import { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import Products from './component/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Routes, Route } from 'react-router-dom';
import Item from './component/Item';
import PrivateRoutes from './component/Auth/PrivateRoutes';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Cart from './component/Cart';

function App() {
    const [cart, setCart] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      }, []);

      const addToCart = (product) => {
        setCart((prevCart) => {
          const updatedCart = [...prevCart, product];
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          return updatedCart;
        });
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
      };

  return (
        <div
            className='container-fluid'
            style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
            {showAlert && (
                <div
                    className="alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3"
                    role="alert"
                    style={{ zIndex: 1050 }}
                >
                    Product added to cart successfully!
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowAlert(false)}
                    >
                    </button>
                </div>
            )}

            <Navbar cart = {cart}/>
                <Routes>
                    <Route path='/' element = {<Products addToCart = {addToCart}/>}/>
                    <Route path='/login' element = {<Login />}/>
                    <Route path='/register' element = {<Register />}/>
                    <Route path='/' element = {<App />}/>
                    <Route path='/cart' element = {<Cart />}/>
                    <Route path='/:id/product' element = {<Item cart={cart} addToCart = {addToCart}/>}/>
                    {/* <Route path="/item/:itemId" element={<Item cart={cart} />} /> */}
                    <Route element = {<PrivateRoutes />}>
                    </Route>
                </Routes>
        </div>
  );
}

export default App;
