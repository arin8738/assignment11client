/* eslint-disable no-unused-vars */
import React from "react";
import { FaMailBulk, FaPhoneAlt } from "react-icons/fa";
import { MdLocationPin} from "react-icons/md";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="bg-base-200">
      <footer className="footer p-10 max-w-7xl mx-auto bg-base-200 text-base-content">
        <div>
          <img src="image.svg" alt="" />
          <p>
            Language Master
            <br />
            Providing best education since 1992
          </p>
        </div>
        <div>
          <span className="footer-title">Quick Links</span>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Courses</a>
          <a className="link link-hover">Teacher</a>
          <a className="link link-hover">Pricing</a>
        </div>
        <div>
          <span className="footer-title">Useful Links</span>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms and Conditions</a>
          <a className="link link-hover">Support</a>
          <a className="link link-hover">FAQ</a>
        </div>
        <div>
          <span className="footer-title">Contact Info</span>
          <a className="link link-hover flex items-center gap-1"><FaPhoneAlt/> <span>+1800-001-658</span></a>
          <a className="link link-hover flex items-center gap-1"><FiMail></FiMail><span>languagemaster@gmail.com</span></a>
          <a className="link link-hover flex items-center gap-1"><MdLocationPin></MdLocationPin> Envato HQ 24 Fifth st., Los Angeles, USA</a>
        </div>
      </footer>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved by Language Master</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
