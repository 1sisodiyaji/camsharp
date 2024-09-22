import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Config from '../utils/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin';
  const [loading , setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    mobileNumber: "",
    password: ""
  });
  const [errors, setErrors] = useState("");


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

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

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    if (!formValues.mobileNumber || !formValues.password) { 
      toast.warn("Both fields are required", { theme: "dark" }); 
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Config.BASE_URL}/api/users/admin-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        toast.success("Admin Logged successfully", { theme: "dark" }); 
        const data = await response.json();
        setLoading(false);
        const token = data.token; 
        localStorage.setItem('token', token);
        navigate('/admin');
        setFormValues({
          mobileNumber: "",
          password: ""

        });

      } else {
        const errorData = await response.json();
        toast.error(errorData.message, { theme: "dark" });  
        setLoading(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to login", { theme: "dark" }); 
      setLoading(false); 
    }

  };

  return (
    <>
  <ToastContainer />
      <div className='container-fluid g-0 design d-flex align-items-center' style={{ minHeight: '100vh' }}>
        <div className="row w-100 g-0">
          <div className="col-lg-6 col-12"> <img src="img/logo.png" alt="logo" className='img-fluid ' loading='lazy' /></div>
          <div className="col-lg-6 col-12">
          <div className="card m-1 p-4">
          <div className="text-center mb-4">
            <i className=" h2 fi fi-sr-aperture"></i>
            <h1 className=" fw-bold">CamSharp</h1>
            <p className="mt-2">Your premier destination for photography</p>
          </div>
          <div>
            <h1 className="h5 fw-bold text-start mb-4">Admin Log In</h1>
            <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-4 form-group">
              <div className=" d-flex mb-3">
                <i className="fi fi-sr-smartphone iconColor mx-2 pt-2"></i>

                <input
                  type="tel"
                  name="mobileNumber"
                  id="mobileNumber_id"
                  maxLength={10}
                  required
                  placeholder="Mobile Number"
                  value={formValues.mobileNumber}
                  onChange={handleInputChange}
                  className="form-control w-100"
                />
              </div>
              <div className="d-flex mb-3">
                <i className="fi fi-sr-password mx-2 pt-2"></i>

                <input
                  type="password"
                  name="password"
                  id="password_id"
                  required
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn rounded-6 fw-bold">
                  {loading ? ' Admin Logging ' : 'Log In' }
                  <i className="fi fi-sr-address-card ps-2"></i>
                </button>
                <a href="/forgot" className="text-light">Forgot Password?</a>
              </div>
            </form>
          </div>
        </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default LoginPage;
