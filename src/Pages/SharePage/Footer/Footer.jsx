import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
const Footer = () => {

    const currentYear=new Date().getFullYear();
    return (
        <div className="mt-0">
            <div className="flex flex-col md:flex-row">
                <div className="flex-1  flex flex-col justify-center items-center p-5 bg-[#000] text-white">
                     <h1 className="text-xl">CONTACT US</h1>
                      <p className="text-[14px] text-[#f5f5f5]">09 Street, Uttra, Bangladesh</p>
                      <p className="text-[14px] text-[#f5f5f5]">+88 123456789</p>
                      <p className="text-[14px] text-[#f5f5f5]">Sun- Thu: 08:00 AM - 05:00 PM</p>
                      <p className="text-[14px] text-[#f5f5f5]">Fri - Sat : 10:00 AM - 02:00 PM</p>

                </div>
                <div className="flex-1  flex flex-col justify-center items-center p-5 bg-[#000] text-white">
                     <h1 className="text-xl">FOLLOW US</h1>
                     <p className="text-[14px] text-[#dcdada]">Join us on social media</p>
                     <div className="flex gap-3 text-white mt-3 shadow-xl bg-[#00205b77] p-1">
                        <FaFacebookF></FaFacebookF>
                        <FiInstagram></FiInstagram>
                        <FaTwitter></FaTwitter>
                     </div>

                </div>
            </div>
            <div className="bg-black">
              <p className="text-center text-[14px] text-[#fff] py-2"> Copyright © Academia {currentYear}. All rights reserved</p>
            </div>
        </div>
    );
};

export default Footer;