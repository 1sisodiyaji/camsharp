// src/pages/LoginPage.js
import React, { useEffect, useState } from 'react';
import Config from '../utils/Config';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading , setLoading] = useState(false);
  const from = location.state?.from || '/profile';

  const [formValues, setFormValues] = useState({
    mobileNumber: "",
    password: ""
  }); 


  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token');

      if (token) {
        navigate(from); // Redirect if token is already present
      }
    };
    fetchUserData();
  }, [navigate, from]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const isFormValid = () => {
    const {   mobileNumber,  password  } = formValues;
    return  mobileNumber &&  password  ;
};

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    if (!formValues.mobileNumber || !formValues.password) {
      toast.warn("Both Fields are required", { theme: "dark" }); 
      setLoading(false);
      return;
    }

    try {  
      const response = await fetch(`${Config.BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        toast.success("Login Successful", { theme: "dark" }); 
        const data = await response.json();
        setLoading(false);
        const token = data.token;
        Cookies.set('token', token, { expires: 7, secure: true }); 
        sessionStorage.setItem('token', token);
        window.location.href = "/";
       
      } else {
        const errorData = await response.json();
        toast.error(errorData.message, { theme: "dark" }); 
        setLoading(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to submit Form", { theme: "dark" }); 
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
        <div >
          <div className="row w-100 g-0">
            <div className="col-lg-4 col-12">
              <div className='mt-lg-5 p-2'>
                <div className="text-center">
                  <img src="img/logo.png" className='img-fluid' title='camSharp logo' alt="logo" style={{ height: '150px' }} />
                  <h1 className="fw-bold">CamSharp</h1>
                  <p className="text-secondary text-capitalize text-decoration-underline mt-2">Your premier destination for photography</p>
                </div>
                <div className="card p-2">
                  <h1 className="text-center mb-4">Log In</h1>

                  <form onSubmit={handleFormSubmit} className='form-group'>
                    <div className='input-group'>
                      <i className="fi fi-bs-smartphone pt-2 text-sky-500"></i>
                      <input
                        type="text"
                        name="mobileNumber"
                        id="mobileNumber_id"
                        required
                        maxLength={10}
                        placeholder="Mobile Number"
                        value={formValues.mobileNumber}
                        onChange={handleInputChange}
                        className=" form-control w-100"
                      />
                    </div>
                    <div className='input-group'>
                      <i className="fi fi-bs-password pt-2 text-sky-500"></i>
                      <input
                        type="password"
                        name="password"
                        id="password_id"
                        required
                        placeholder="Password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        className=" form-control w-100 my-2"
                      />
                    </div>
                    <div className="text-end"> <Link to="/forgot" className="text-light">Forgot Password?</Link></div>

                    <div>
                      <button type="submit" className="btn text-capitalize w-100 text-light" disabled={!isFormValid()}>
                        {loading ? <>
                            Welcome to camsharp... <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>             
                           </> : <> 
                           Log In  <i className="fi fi-sr-address-card ps-2"></i> 
                           </>}
                        
                       
                      </button>

                      <div className="btn btn-block my-3 text-capitalize text-light" onClick={login}> <img src="img/Google.png" alt="google" className='img-fluid me-2' />Login With Google</div>
                    </div>
                  </form> 
                  <div className="d-flex my-3">
                    <p>Don't have an account?</p> <Link to="/signup" className="ps-2 text-light text-decoration-underline">Sign Up</Link>
                  </div>
                <Link to="/admin-login" className="text-light">Admin Login</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 d-lg-block d-md-block d-none">
              <img src="img/Auth.jpg" className='w-100 h-100 img-fluid' alt="login" title='login page' loading='lazy' />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}


export default LoginPage;

