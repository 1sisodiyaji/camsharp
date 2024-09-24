import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import config from "../../utils/Config";

const ForgetPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showEmails, setShowEmails] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    conPassword: "",
  });
  const navigate = useNavigate();
  const otpInputs = useRef(Array.from({ length: 6 }, () => null));

  const togglePasswordVisibility = (setter) => {
    setter(prev => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (index, e) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      setFormData(prev => ({ ...prev, [`otp${index}`]: value }));
      const nextInput = otpInputs.current[index + 1];
      if (value && nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && !formData[`otp${index}`]) { 
      otpInputs.current[index - 1].focus();
      setFormData(prev => ({ ...prev, [`otp${index - 1}`]: '' }));
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${config.BASE_URL}/api/users/sendotp`, { email: formData.email });
      if (response.data.status === 'success') {
        setShowOtp(true);
        setShowEmails(false);
      } else {
        setErrors(response.data.message);
      }
    } catch (error) {
      setErrors("Failed to send email: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    const enteredOtp = Array.from({ length: 6 }, (_, index) => formData[`otp${index}`] || '').join('');
    try {
      const response = await axios.post(`${config.BASE_URL}/api/users/verifyotp`, { email: formData.email, otp: enteredOtp });
      if (response.data.status === 'success') {
        setShowOtp(false);
        setShowPassword(true);
      } else {
        setErrors(response.data.message);
      }
    } catch (error) {
      setErrors("Failed to verify OTP: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    if (formData.password !== formData.conPassword) {
      setErrors("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${config.BASE_URL}/api/users/updatePassword`, { email: formData.email, password: formData.password });
      if (response.data.status === 'success') {
        // Reset form
        setFormData({ email: "", otp: "", password: "", conPassword: "" });
        navigate("/login");
      } else {
        setErrors(response.data.message);
      }
    } catch (error) {
      setErrors("Failed to update password: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid m-0 p-0 g-0 d-flex justify-content-center align-items-center position-relative design" style={{ minHeight: "100vh"}}>
      <div className="container" style={{ maxWidth: "420px" }}>
        <form>
          <div className="text-center">
            <img src="img/logo.png" width={95} alt=""/>
            <h3 className="pt-3">Forgot password</h3>
          </div>

          {errors && <div className="text-center text-danger">{errors}</div>}
          
          {showEmails && (
            <>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control rounded-8 py-2 mb-4"
                placeholder="Email"
              />
              <button type="button" onClick={sendOtp} className="btn btn-block mb-4 py-3">
                {loading ? "Sending Otp..." : "Send OTP"}
                {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              </button>
            </>
          )}

          {showOtp && (
            <div className="mb-4" id="otpShow">
              <div className="d-flex justify-content-center">
                {Array.from({ length: 6 }, (_, index) => (
                  <input
                    key={index}
                    className="col-2 p-4 ms-2 rounded-3 input-field"
                    type="text"
                    maxLength="1"
                    name={`otp${index}`}
                    value={formData[`otp${index}`] || ''}
                    onChange={(e) => handleOtpChange(index, e)}
                    onKeyDown={(e) => handleKeyPress(index, e)}
                    ref={(el) => (otpInputs.current[index] = el)}
                  />
                ))}
              </div>
              <button type="button" onClick={verifyOtp} className="btn btn-block my-4">
                {loading ? "Verifying Otp..." : "Verify OTP"}
                {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              </button>
            </div>
          )}

          {showPassword && (
            <div id="passwordDisplay">
              <div className="input-group mb-4">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control rounded-8 py-2"
                  placeholder="Password"
                />
                <i onClick={() => togglePasswordVisibility(setIsPasswordVisible)} className={`fi fi-ss-eye-crossed pt-2 ps-2`}></i>
              </div>
              <div className="input-group mb-4">
                <input
                  type={isPasswordVisible2 ? "text" : "password"}
                  name="conPassword"
                  value={formData.conPassword}
                  onChange={handleInputChange}
                  className="form-control rounded-8 py-2"
                  placeholder="Confirm Password"
                />
                <i onClick={() => togglePasswordVisibility(setIsPasswordVisible2)} className={`fi fi-ss-eye-crossed pt-2 ps-2`}></i>
              </div>
              <button type="button" onClick={updatePassword} className="btn btn-block mb-4">
                {loading ? "Updating Password..." : "Update"}
                {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
