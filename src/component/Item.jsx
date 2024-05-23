import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const Item = ({ cart, addToCart }) => {
    const location = useLocation();
    const { id } = useParams();
    const [product, setProduct] = useState(location.state?.product || null);
    const [loading, setLoading] = useState(!product);
    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if(storedCart){
            setCartItem(storedCart);
        }
        if (!product) {
            axios.get(`https://dummyjson.com/products/${id}`)
                .then(response => {
                    console.log(response.data);
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    setLoading(false);
                });
        }
    }, [id, product]);

    if (!product) {
        return <div>No product data available</div>;
    }

    return (
        <div>
            <Navbar cart={cartItem}/>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div
                        className='row justify-content-center align-items-center'
                        style={{ marginTop: '5rem'}}>
                        <div className="col-md-8">
                            <div className="card mx-auto text-center border-0 mt-3"
                                style={{ marginTop: '2rem' }}>
                                <div className="row">
                                    <div className='col mx-3' style={{ marginTop: '2rem' }}>
                                        <img
                                            src={product.thumbnail}
                                            className="card-img-top mt-3"
                                            alt={product.title}
                                        />
                                    </div>
                                    <div className='col' style={{ marginTop: '2rem' }}>
                                        <div className="card-body d-flex flex-column">
                                            <p className="fw-bold fs-4">{product.title}</p>
                                            <p className="card-text">{product.description}</p>
                                        </div>
                                    </div>
                                    <div className='col' style={{ marginTop: '2rem' }}>
                                        <div className="card-body d-flex flex-column">
                                            <p className="fw-bold fs-2">$ {product.price}</p>
                                            <p className="fw-lighter">-{product.discountPercentage} %</p>
                                            <p className="fw-lighter badge bg-primary text-wrap">In Stock - {product.stock}</p>
                                        </div>
                                    </div>
                                        <div className="my-3">
                                            <button
                                                className="fw-bold btn btn-warning rounded-pill w-100"
                                                onClick={() => addToCart(product)}
                                                >
                                                    Add to Cart
                                                </button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

        </div>
    );
};

export default Item;
