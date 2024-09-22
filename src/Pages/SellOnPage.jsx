import React from 'react';
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import FooterBar from '../Components/Common/FooterBar';

function SellOnPage (){
    return (
        <>
            <Navbar />
            <FooterBar/>
            <div id="sell-section" className="bg-white text-gray-700 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-blue-500">Sell On CamSharp</h2>
                    <p className="text-lg mb-6 text-gray-700">
                        Are you a camera enthusiast looking to share your passion with others? Do you have high-quality equipment that you're not using to its full potential? Consider selling your gear on CamSharp and join our community of photographers and filmmakers!
                    </p>
                    <p className="text-lg mb-6 text-gray-700">
                        At CamSharp, we're always looking to expand our inventory and offer our customers the widest selection of cameras, lenses, and equipment. Whether you're looking to part ways with your old gear or upgrade to the latest models, we make it easy to sell your items hassle-free.
                    </p>
                    <p className="text-lg mb-6 text-gray-700">
                        Simply create an account, list your items for sale, and set your desired price. Our team will review your listings and handle the logistics of shipping and payment processing, so you can focus on what you love – capturing amazing photos and videos.
                    </p>
                    <p className="text-lg mb-6 text-gray-700">
                        Join us in empowering creators worldwide and making high-quality photography and videography accessible to all. Sell on CamSharp today and turn your unused gear into cash!
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}


export default SellOnPage;


