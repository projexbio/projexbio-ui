import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-black/90 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-6">
        {/* Top Section: Logo and Contact closer and centered */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-8 w-full">
          {/* Left Section */}
          <div className="flex items-center justify-center sm:justify-start space-x-4 text-center sm:text-left">
            <Image src="/blackLogo.png" alt="Logo" width={60} height={60} />
            <div>
              <h1 className="font-blanka text-2xl sm:text-3xl font-bold">
                PROJEXBIO
              </h1>
              <p className="text-base sm:text-medium text-gray-300">
                Empowering Projects Across Campuses
              </p>
            </div>
          </div>
          {/* Right Section */}
          <div className="text-center sm:text-left sm:ml-24 mt-4 sm:mt-0">
            <h3 className="font-bold text-2xl sm:text-3xl mb-1">Contact</h3>
            <div className="flex items-center justify-center sm:justify-start text-sm text-gray-300">
              <HiOutlineMail className="mr-2 text-2xl" />
              <a
                href="mailto:jainsaksham1004@gmail.com"
                className="hover:underline"
              >
                jainsaksham1004@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Product by and icons in one line */}
        <div className="flex flex-col items-center w-full">
          <Link
            href="/team"
            className="font-norwester pb-4 text-lg sm:text-xl font-bold text-primary hover:underline mb-2"
          >
            Meet ProjexBio Team
          </Link>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <p className="text-sm text-gray-300 mb-0 flex items-center">
              Product by{" "}
              <span className="text-white font-medium mx-1">@SailingSam :</span>
            </p>
            <div className="flex space-x-4 ml-0 sm:ml-2">
              <Link href="https://github.com/sailingsam" target="_blank">
                <FaGithub className="h-6 w-6 text-white" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/sailingsam/"
                target="_blank"
              >
                <FaLinkedin className="h-6 w-6 text-white" />
              </Link>
              <Link href="https://x.com/jainsaksham1004" target="_blank">
                <FaXTwitter className="h-6 w-6 text-white" />
              </Link>
              <a href="mailto:jainsaksham1004@gmail.com">
                <HiOutlineMail className="h-6 w-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
