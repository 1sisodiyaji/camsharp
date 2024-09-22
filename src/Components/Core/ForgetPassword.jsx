import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

 function ForgetPassword(){
    const navigate=useNavigate();
    const [clickedVerify, setClickedVerify] = useState(true);


    const [forgotValue, setForgotValue] = useState({
        number: ""
    });

    const onhandleInputValue = (e) => {
        const { name, value } = e.target;
        setForgotValue({
            ...forgotValue,
            [name]: value
        });
    }

    const onSubmitButton = (e) => {
        e.preventDefault();
        try {
            console.log('number', forgotValue);

            setClickedVerify(false);

            setForgotValue({
                number: ""
            });
            return;

        } catch (error) {
            console.log('error', error);
            return;

        }
    }
    const [otpValues, setOtpvalues] = useState(["","","",""]);
    const otpInputsRefs = [useRef(), useRef(), useRef(), useRef()];
    const onOtpInputHandle = (index,value) => {
        
       const UpdatedOtpValues=[...otpValues];
       UpdatedOtpValues[index]=value;
       setOtpvalues(UpdatedOtpValues);

       if (value && index < otpInputsRefs.length - 1) {
        otpInputsRefs[index + 1].current.focus();
    }

    };
    const onOtpVerifySubmitHandle = (e) => {
        e.preventDefault();
        try {
            console.log('otp Values :', otpValues);
            setOtpvalues(["","","",""])
            navigate('/login');
            return;

        } catch (error) {
            console.log('error', error);
            return;

        }
    }

    return (
        <>

            <div className='min-h-screen flex items-center justify-center bg-gray-200'>
                <div className='forgot-password bg-gray-100 border rounded-xl p-8 max-w-md w-full'>
                    <h1 className='text-xl font-bold mb-4'>Forgot Password</h1>
                    {/* Mobiile number varification */}
                    {clickedVerify ? (<div className='flex flex-col mt-2'>
                        <h6 className='text-sm font-bold mb-2'>
                            Enter Your Registered Mobile Number :
                        </h6>
                        <div className='border-b flex items-center px-2 py-1 mb-4'>
                            <i className="fi fi-bs-user text-sky-500 mr-2"></i>
                            <input
                                type="text"
                                name="number"
                                placeholder="number"
                                value={forgotValue.number}
                                onChange={onhandleInputValue}
                                className="input-field h-8 w-full text-gray-700 focus:outline-none bg-transparent"
                            />
                        </div>
                        <button className='bg-blue-500 font-bold text-white rounded-xl h-12 hover:bg-blue-600' onClick={onSubmitButton}>
                            Verify
                        </button>

                    </div>

                    ) : (<div className=' flex flex-col justify-center items-center'>
                         <h6 className='text-sm font-bold mb-2'>
                            Enter OTP :
                        </h6>
                        <div className='text-center  pb-2'>

                            {[1, 2, 3, 4].map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    name='OTP'
                                    maxLength="1"
                                    value={otpValues.OTP}
                                    onChange={(e) => onOtpInputHandle(index, e.target.value)}
                                    ref={otpInputsRefs[index]}
                                    className="ml-2 w-8 mb-2 border-b-2 border-red-700 focus:outline-none bg-transparent p-1 rounded-lg text-center text-green-700 font-extrabold mb-2 md:mb-0"
                                />
                            ))}
                        </div>
                        <button className=' mt-2 bg-blue-500 font-bold text-white rounded-xl h-12 w-full  hover:bg-blue-600 mb-4 md:mb-0' onClick={onOtpVerifySubmitHandle}>
                            Verify
                        </button>
                    </div>
                    )}
                 

                   
              
                    

                </div>
            </div>

        </>
    );
}


export default ForgetPassword;