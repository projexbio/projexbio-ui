import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-black/90 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Left Section */}
        <div className="flex items-center space-x-4 mb-6 md:mb-0">
          <Image src="/blackLogo.png" alt="Logo" width={60} height={60} />
          <div>
            <h1 className="text-3xl font-bold font-anton">PROJEXBIO</h1>
            <p className="text-medium text-gray-300">
              Empowering Projects Across Campuses
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right">
          <h3 className="font-bold text-3xl mb-1">Contact</h3>
          <div className="flex items-center justify-center md:justify-end text-sm text-gray-300">
            <HiOutlineMail className="mr-2 text-2xl" />
            <a href="mailto:saksham@projexbio.com" className="hover:underline">
              saksham@projexbio.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-300 mb-3">
          Product by <span className="text-white font-medium">@SailingSam</span>{" "}
          :
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="https://github.com/sailingsam" target="_blank">
            <FaGithub className="h-6 w-6 text-white" />
          </Link>
          <Link href="https://www.linkedin.com/in/sailingsam/" target="_blank">
            <FaLinkedin className="h-6 w-6 text-white" />
          </Link>
          <Link href="https://x.com/jainsaksham1004" target="_blank">
            <FaXTwitter className="h-6 w-6 text-white" />
          </Link>
          <a href="mailto:saksham@projexbio.com">
            <HiOutlineMail className="h-6 w-6 text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}
