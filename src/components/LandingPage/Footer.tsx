import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black/90 text-white py-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="text-center mb-4">
          <p className="text-gray-300">
            If you find any issues, please contact the{" "}
            <Link 
              href="#" 
              className="text-brand-purple hover:text-brand-blue underline decoration-brand-purple/50 hover:decoration-brand-blue transition-colors duration-200"
            >
              developer here
            </Link>
          </p>
        </div>

        {/* Product By Line */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-400">
            A product by{" "}
            <span className="text-brand-purple font-medium">
              Sailing Sam
            </span>
          </p>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-800 my-4 max-w mx-auto"></div>

        {/* Social Links */}
        <div className="flex justify-center items-center space-x-6">
          <span className="text-sm text-gray-400">Connect with me :</span>
          <Link
            href="https://github.com/sailingsam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand-purple transition-colors duration-200"
          >
            <FaGithub className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/sailingsam/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand-purple transition-colors duration-200"
          >
            <FaLinkedin className="h-6 w-6" />
          </Link>
          <Link
            href="https://x.com/jainsaksham1004"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand-purple transition-colors duration-200"
          >
            <FaXTwitter className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.instagram.com/_sailingsam/#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand-purple transition-colors duration-200"
          >
            <FaInstagram className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;