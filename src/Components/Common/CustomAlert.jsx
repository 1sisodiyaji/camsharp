
import React from 'react';
const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 z-50">
            <div className="flex flex-col items-center justify-center p-8 border shadow-gray-50/50 shadow-xl rounded">
                <i className="text-2xl h-8 mt-2 lg:h-auto fi fi-bs-aperture"></i>
                <h1 className="text-2xl font-bold">CamSharp</h1>
                <p className='text-yellow-500 font-bold p-2 text-center'>{message}</p>
                <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
export default CustomAlert;
