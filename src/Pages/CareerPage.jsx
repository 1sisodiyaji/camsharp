import React from 'react';
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import FooterBar from '../Components/Common/FooterBar';

function Careers(){
    return (
        <>
            <Navbar />
            <FooterBar/>
            <div id="careers" className="bg-white text-gray-700 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold text-blue-500 mb-8">Careers</h2>
                    <p className="text-lg mb-6">
                        Join the <span className="font-bold">CamSharp</span> team and help us shape the future of photography and videography rentals. We're always on the lookout for talented individuals who share our passion for creativity and innovation.
                    </p>
                    <h3 className="text-2xl font-semibold text-blue-500 mb-4">Current Openings</h3>
                    <div className="mb-8">
                        <h4 className="text-xl font-semibold text-gray-700 mb-2">1. Customer Service Representative</h4>
                        <p className="text-lg text-gray-500 mb-2">Location: [Your Location]</p>
                        <p className="text-lg text-gray-500 mb-2">Full-time</p>
                        <p className="text-lg text-gray-500 mb-2">Description: We are seeking a customer service representative to join our team and provide exceptional support to our clients. The ideal candidate is friendly, detail-oriented, and passionate about helping others.</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">Apply Now</button>
                    </div>
                    <div className="mb-8">
                        <h4 className="text-xl font-semibold text-gray-700 mb-2">2. Marketing Specialist</h4>
                        <p className="text-lg text-gray-500 mb-2">Location: [Your Location]</p>
                        <p className="text-lg text-gray-500 mb-2">Part-time</p>
                        <p className="text-lg text-gray-500 mb-2">Description: We are seeking a creative and strategic marketing specialist to help us develop and execute marketing campaigns that drive brand awareness and customer engagement. The ideal candidate has experience in digital marketing, content creation, and social media management.</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">Apply Now</button>
                    </div>
                    <p className="text-lg mt-8 text-gray-500">
                        Don't see a position that matches your skills and interests? We're always interested in hearing from talented individuals who are passionate about what we do. Send your resume and cover letter to [Your Email Address], and we'll keep you in mind for future opportunities.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};
 
export default  Careers;