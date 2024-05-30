import React, { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';
import { Dropdown } from 'react-bootstrap';


const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    const { cart } = useCart();
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`/api/user`);
            setUser(response.data);

         } catch (error) {
             console.log(error);
         };
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = () => {
        axios.post(`/api/logout/`)
        .then((res) => {
            localStorage.removeItem('token');
            setLoggedIn(false);
        })
        .catch((err) =>{
            console.log('Error fetching user data:', err);
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
                <Link to={`/`} className="float-start text-decoration-none">
                    <div className="navbar-brand fs-3 fw-bold">Shoppify</div>
                </Link>
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
                                        <div className="nav-link active">
                                            {user ? (
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        style={{ cursor: "pointer" }}
                                                        as="div"
                                                        variant="success"
                                                        id="dropdown-basic">
                                                        {user.name}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item as={Link} to={`/${user.id}`}>
                                                                <AccountCircleIcon/>  Profile
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">
                                                            <SettingsIcon/>  Settings
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => handleLogout()}> <LogoutIcon/>  Logout
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            ):(
                                                <div className="spinner-grow" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            )}
                                        </div>
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
