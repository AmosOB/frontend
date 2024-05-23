import React, { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { isAuthenticated } from './Auth/PrivateRoutes';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Navbar = ({ cart }) => {
    const isLoggedIn = isAuthenticated();
    const [loggedIn, setLoggedIn] = useState(true);

    const handleLogout = () => {
        axios.post(`/api/logout/`)
        .then((res) => {
            localStorage.removeItem('token');
        })
        .catch((err) =>{
            console.log(err);
        })
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoggedIn(false);
        }
    }, []);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -2,
          top: 4,
          border: `2px solid ${theme.palette.background}`,
          padding: '0 4px',
        },
      }));
  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning fixed-top">
            <div className="container-fluid">
                <div className="float-start">
                    <a className="navbar-brand fw-bold" href="#">ZenMatt</a>
                </div>
                <div className=''>
                    <Link to={`/cart`}>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={cart.length} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </Link>
                </div>
                <div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            {loggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link active">
                                            <h5
                                                className='navbar-brand text-muted'
                                                >Account
                                            </h5>
                                        </a>
                                    </li>
                                    <li className="nav-item">

                                        <a className="nav-link active">
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleLogout()}
                                                >Logout
                                            </button>
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className='nav-link active fw-bold'
                                            to={ `/register` }>
                                            <h5 className='navbar-brand text-muted'>Register</h5>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className='nav-link active fw-bold'
                                            to={ `/login` }>
                                            <h5 className='navbar-brand text-muted'>Login</h5>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar
