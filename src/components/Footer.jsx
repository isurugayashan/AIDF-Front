import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-white">CheckinEase</h3>
                        <p className="mt-4 text-sm text-gray-400">
                            Premium hospitality service for your comfort and luxury. We ensure a memorable stay.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-white transition">Home</a></li>
                            <li><a href="/" className="hover:text-white transition">About Us</a></li>
                            <li><a href="/" className="hover:text-white transition">Rooms</a></li>
                            <li><a href="/" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition text-lg"><FaFacebookF /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-lg"><FaTwitter /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-lg"><FaInstagram /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-lg"><FaLinkedinIn /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} CodeCloudSL. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}


export default Footer;
