import { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import Products from './component/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './component/Cart';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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
        <div className='container'>
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
            <Products addToCart = {addToCart}/>
        </div>
  );
}

export default App;
