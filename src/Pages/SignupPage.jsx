import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Config from '../utils/Config';
import Cookies from 'js-cookie';
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/profile';

    const [formValues, setFormValues] = useState({
        name: "",
        mob_num: "",
        email: "",
        password: "",
        confirm_password: "",

    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                navigate(from); // Redirect if token is already present
            }
        };
        fetchUserData();
    }, [navigate, from]);
 
    const onHandleInputform = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const isFormValid = () => {
        const { name, mob_num, email, password, confirm_password } = formValues;
        return name && mob_num && email && password && password === confirm_password;
    };

    const formSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        if (!formValues.name || !formValues.mob_num || !formValues.password) {
            toast.warn("Please Fill the data", { theme: "dark" }); 
            setLoading(false);
            return;
        }
        if (formValues.password !== formValues.confirm_password) {
            toast.warn("Password Doesn't Match ❌", { theme: "dark" }); 
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${Config.BASE_URL}/api/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                setLoading(false);
                toast.success("Moving to Login Page", { theme: "dark" });  
                navigate('/login');
                setFormValues({
                    name: "",
                    mob_num: "",
                    email: "",
                    password: "",
                    confirm_password: "",

                });
            } else {
                const errorData = await response.json();
                console.log(errorData);
                toast.error(errorData.message, { theme: "dark" });
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error("Failed to Register your account", { theme: "dark" }); 
            setLoading(false);
        }
    };

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
          const accessToken = tokenResponse.access_token;
          setLoading(true);
      
          try {
            // Fetch user data from Google API
            const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const userData = googleResponse.data;
            const formData = {
              email: userData.email,
              name: userData.name,
              username: userData.given_name,
              image: userData.picture,
            };
       
      
            const saveUserDataResponse = await fetch(`${Config.BASE_URL}/api/users/saveuserData`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            const saveUserData = await saveUserDataResponse.json();
      
            if (saveUserData.status === "success") {
              toast.success("Login Successful", { theme: "dark" });
              Cookies.set('token', saveUserData.token, { expires: 7, secure: true });
              sessionStorage.setItem('token', saveUserData.token);
              window.location.href = "/";
            } else {
              toast.error("Error saving user data", { theme: "dark" });
              console.log(saveUserData.message);
            }
          } catch (error) {
            console.error("Error during login:", error);
            toast.error("Error during login. Please try again later.", { theme: "dark" });
          } finally {
            setLoading(false);
          }
        },
        onFailure: (error) => {
          console.error("Error during login:", error);
          toast.error("Error during login. Please try again later.", { theme: "dark" });
          setLoading(false);
        },
      });
      

    return (
        <>
        <ToastContainer />
            <div className="container-fluid g-0 design">
                <div>
                    <div className="row w-100 g-0">
                        <div className="col-lg-4 col-12">
                            <div className='mt-lg-4 p-2'>
                                <div className="text-center">
                                    <img src="img/logo.png" className='img-fluid' title='camSharp logo' alt="logo" style={{ height: '150px' }} />
                                    <h1 className="fw-bold">CamSharp</h1>
                                    <p className="text-secondary text-capitalize text-decoration-underline mt-2">Your premier destination for photography</p>
                                </div>

                                <div className="card p-2">
                                    <h1 className="text-center mb-3">Sign Up</h1>
                                    <form onSubmit={formSubmit} className="form-group">

                                        <div className='px-2 py-1 d-flex'>
                                            <i className="fi fi-sr-circle-user pe-2 mt-2" style={{ fontSize: '1.2rem' }}></i>
                                            <input
                                                type="text"
                                                required 
                                                name="name"
                                                placeholder="Name"
                                                value={formValues.name}
                                                onChange={onHandleInputform}
                                                className="form-control w-100"
                                            />
                                        </div>

                                        <div className='  px-2 py-1 d-flex'>
                                            <i className="fi fi-rr-mobile-notch pe-2 mt-2" style={{ fontSize: '1.2rem' }}></i>
                                            <input
                                                type="tel"
                                                name="mob_num"
                                                required
                                                maxLength={10}
                                                placeholder="Mobile"
                                                value={formValues.mob_num}
                                                onChange={onHandleInputform}
                                                className="form-control w-100"
                                            />
                                        </div>

                                        <div className='  px-2 py-1 d-flex'>
                                            <i className="fi fi-ss-envelope  pe-2 mt-2" style={{ fontSize: '1.2rem' }}></i>
                                            <input
                                                type="email"
                                                name="email"
                                                required eamil="true"
                                                placeholder="Email"
                                                value={formValues.email}
                                                onChange={onHandleInputform}
                                                className="form-control w-100"
                                            />
                                        </div>



                                        <div className='  px-2 py-1 d-flex'>
                                            <i className="fi fi-sr-lock  pe-2 mt-2" style={{ fontSize: '1.2rem' }}></i>
                                            <input
                                                type="password"
                                                name="password"
                                                required
                                                placeholder="Password"
                                                value={formValues.password}
                                                onChange={onHandleInputform}
                                                className="form-control w-100"
                                            />
                                        </div>

                                        <div className=' d-flex px-2 py-1'>
                                            <i className="fi fi-sr-lock  pe-2 mt-2" style={{ fontSize: '1.2rem' }}></i>
                                            <input
                                                type="password"
                                                name="confirm_password"
                                                required
                                                placeholder="Confirm Password"
                                                value={formValues.confirm_password}
                                                onChange={onHandleInputform}
                                                className="form-control w-100"
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-block my-3 text-capitalize text-light"  disabled={!isFormValid()}>
                                            {loading ? 
                                            <> 
                                             Moving to login page... <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </> : 
                                            <>
                                            Sign Up <i className="fi fi-sr-address-card ms-1"></i>
                                             </>} 
                                        </button>

                                        <div className="btn btn-block my-3 text-capitalize text-light" onClick={login}> <img src="img/Google.png" alt="google" className='img-fluid me-2' />Sign Up With Google</div>
                                    </form>

                                    <div className="d-flex my-3">
                                        <p>Already have an account?</p> <Link to="/login" className="ps-2 text-light text-decoration-underline">Log in </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-8 d-lg-block d-md-block d-none">
                            <img src="img/Auth.jpg" className='w-100 h-100 img-fluid' alt="signup" loading='lazy' title='welcome to camsharp' />
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
}


export default Signup;
