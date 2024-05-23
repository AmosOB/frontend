import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = ({ addToCart }) => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
           const response = await axios.get(`https://dummyjson.com/products`);
           setProductData(response.data.products);
           setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        };
    }
    useEffect(() => {
        fetchProducts();
    }, []);

  return (
        <div className="row content-justify-center" style={{ marginTop: '56px' }}>
            { loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                productData.map(product => (
                    <div key={product.id} className="col">
                        <div className="card mx-auto text-center border-0 my-3"
                            style={{ width: '15rem', minHeight: '100%' }}>
                            <img src={product.images[0]} className="card-img-top" alt="..."/>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description.slice(0, 40)}</p>
                                <h5 className="card-title">Price: Ksh. {product.price}</h5>
                                <div className="mt-auto">
                                    <button
                                        className="btn btn-warning rounded-pill w-100"
                                        onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )))}

        </div>
  )
}

export default Products;
