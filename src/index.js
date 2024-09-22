import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId= "1080881537246-im3mtkvgqq5c17q3n38a01ar7slq19p3.apps.googleusercontent.com">
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </GoogleOAuthProvider>
);
