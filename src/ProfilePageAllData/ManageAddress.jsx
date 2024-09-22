
// ManageAddress()

import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Config from '../utils/Config';


const ManageAddress = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      // Fetch data from the server
      const fetchUserData = async () => {
        const token = sessionStorage.getItem('token');
  
        try {
          if (!token) {
            console.log('Token is not storing on session storage: ', token);
            navigate('/login');
            return;
          }
          // Make a GET request to fetch user profile data
          const response = await fetch(`${Config.BASE_URL}/api/users/address`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          // Extract user data from response
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.log('Error:', error);
         // Redirect to profile if an error occurs
        }
      };
      fetchUserData();
    }, [navigate]);

    const [hideUpdateform, setHideUpdateForm] = useState(false);
    const [address, setAddress] = useState({
        address1: '',
        address2: '',
        city: '',
        state: '',
        district: '',
        zip: '',
        country: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission here
     setHideUpdateForm(!hideUpdateform);
        console.log('Updated Address:', address);
    };
    const handleShowUpdateForm=()=>{
        setHideUpdateForm(!hideUpdateform);
    }

    return (
        <div className="container mt-5">

            <div className={`${hideUpdateform?'d-none':''} card mt-5`}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3>Address Details</h3>
                    <button type="button" className="btn btn-primary" onClick={handleShowUpdateForm}>Edit</button>
                </div>
                <div className="card-body">
                    <p><strong>Address 1:</strong> Icha</p>
                    <p><strong>Address 2:</strong> ICHA</p>
                    <p><strong>City:</strong>Chaibasa</p>
                    <p><strong>District:</strong>seraikella-kharsawan</p>
                    <p><strong>State:</strong> jharkhand</p>
                    <p><strong>Zip:</strong>833219</p>
                    <p><strong>Country:</strong>Bharat</p>
                    <p><strong>Phone Number:</strong> 8210811018</p>
                </div>
            </div>
          {hideUpdateform &&(  <div className="card">
                <div className="card-header">
                    <h2> You want to update tour address...</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputAddress">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                    name="address1"
                                    value={address.address1}
                                    onChange={handleChange}
                                    placeholder="1234 Main St"
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputAddress2">Address 2</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress2"
                                    name="address2"
                                    value={address.address2}
                                    onChange={handleChange}
                                    placeholder="Apartment, studio, or floor"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputCity">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputCity"
                                    name="city"
                                    value={address.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputDistrict">District</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputDistrict"
                                    name="district"
                                    value={address.district}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">State</label>
                                <select
                                    id="inputState"
                                    className="form-control"
                                    name="state"
                                    value={address.state}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Choose...</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputZip">Zip</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputZip"
                                    name="zip"
                                    value={address.zip}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCountry">Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputCountry"
                                    name="country"
                                    value={address.country}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPhone">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputPhone"
                                    name="phone"
                                    value={address.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
            )}


        </div>
    );
};

export default ManageAddress;
