import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('/api/register', formData)
        .then((res) => {
            const token = res.data.access_token;
            localStorage.setItem('token', token);
            console.log(res);
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
        })
    };
  return (
    <div className="container">
        <Navbar/>
        <div className="row justify-content-center" style={{ marginTop: '74px' }}>
            <div className='col-md-6 align-self-center'>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className='mb-3'>Register</h5>
                            <form onSubmit={ handleSubmit }>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="name"
                                        value={ formData.name }
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="form-control bg-white"
                                        id="name"
                                        placeholder="name"
                                        autoComplete="name"
                                        required/>
                                    <label
                                        htmlFor="floatingInput"
                                    >
                                        Name
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        value={ formData.email }
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="form-control bg-white"
                                        id="email"
                                        placeholder="email"
                                        autoComplete="email"
                                        required/>
                                    <label
                                        htmlFor="floatingInput"
                                    >
                                        Email
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        name="password"
                                        value={ formData.password }
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        className="form-control bg-white"
                                        id="password"
                                        placeholder="password"
                                        autoComplete="password"
                                        required/>
                                    <label
                                        htmlFor="floatingInput"
                                    >
                                        Password
                                    </label>
                                </div>
                                <br />
                                <div>
                                        <h6>Have an account ?
                                            <span className='ms-2'>
                                                 <Link
                                                    className='text-decoration-none'
                                                    to={ `/login`}>Sign In</Link>
                                            </span>
                                        </h6>

                                    </div>
                                <br />
                                <button
                                    type='submit'
                                    className='btn btn-outline-primary'
                                    >
                                        Register
                                </button>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Register;
