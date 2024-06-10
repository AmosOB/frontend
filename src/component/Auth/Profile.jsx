import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom'
import { Col, Image, Row } from 'react-bootstrap';

const Profile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        profile_image: null,
        email: ''
    })

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const handleUserUpdate = (e) => {
        if (e) e.preventDefault();
        const token = localStorage.getItem('token');
        const data = new FormData();

        if (formData.name !== profile.name) {
            data.append('name', formData.name);
        }
        if (formData.username !== profile.username) {
            data.append('username', formData.username);
        }
        if (formData.email !== profile.email) {
            data.append('email', formData.email);
        }
        if (formData.profile_image) {
            data.append('profile_image', formData.profile_image);
        }

        axios.put(`/api/update/${username}`, data, {

            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res);

        })
        .catch((err) => {
            if(err.response && err.response.status === 422){
                    console.log(err.response.data.message, err.response.data.errors)
                    setValidationErrors(err.response.data.errors);
            } else {
                console.log(err);
            }

        });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profile_image') {
            setFormData(prevState => ({
                ...prevState,
                profile_image: files[0]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const profileData = async () => {
        try {
            const response = await axios.get(`/api/user`);
            setProfile(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(profile){
            setFormData({
                name: profile.name || '',
                username: profile.username || '',
                profile_image: profile.profile_image || null,
                email: profile.email || ''
            });
        }

    }, [profile]);

    useEffect(() => {
        profileData();
    }, []);
    return (
        <div className="row" style={{ marginTop: '4rem' }}>
            <div className="col-md-8">
                <Card className='mt-3'>
                    <Card.Body>
                        <Card.Title>Profile</Card.Title>
                        <Card.Subtitle className="mb-3 mt-3 text-muted">Edit</Card.Subtitle>
                            <form onSubmit={handleUserUpdate}>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Image src={formData.profile_image}
                                        roundedCircle
                                        className='custom-image-size my-3' />
                                    </Col>
                                    <Col className='align-self-center' xs={6} md={4}>
                                        <input
                                            type="file"
                                            onChange={handleChange}
                                            className='form-control'
                                            name="profile_image"
                                            id="profile_image"/>
                                    </Col>
                                </Row>
                                <div className="form-floating mb-3">
                                    <input
                                        type="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`form-control bg-white ${validationErrors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        placeholder="name"
                                        autoComplete="name"
                                        required />
                                    {validationErrors.name && (
                                        <div className="text-danger">{validationErrors.name}</div>
                                     )}
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className={`form-control bg-white ${validationErrors.username ? 'is-invalid' : ''}`}
                                        id="username"
                                        placeholder="username"
                                        autoComplete="username"
                                        required />
                                     {validationErrors.username && (
                                        <div className="text-danger">{validationErrors.username}</div>
                                     )}
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        className={`form-control bg-white ${validationErrors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        placeholder="email"
                                        autoComplete="email"
                                        required />
                                     {validationErrors.email && (
                                        <div className="text-danger">{validationErrors.email}</div>
                                     )}
                                </div>
                                <Button type='submit' variant="warning">Update User</Button>
                            </form>

                    </Card.Body>
                </Card>
            </div>
            <div className="col-md-8"></div>
        </div>
    )
}

export default Profile
