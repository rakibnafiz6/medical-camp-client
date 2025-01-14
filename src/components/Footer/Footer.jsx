
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">About MCMS</h3>
                        <p className="text-gray-400">
                            Our Medical Camp Management System (MCMS) helps organize and
                            participate in medical camps effectively. Join us in making a difference!
                        </p>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/home"
                                    className="text-gray-400 hover:text-white transition duration-200"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/available-camps"
                                    className="text-gray-400 hover:text-white transition duration-200"
                                >
                                    Available Camps
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/join-us"
                                    className="text-gray-400 hover:text-white transition duration-200"
                                >
                                    Join Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/dashboard"
                                    className="text-gray-400 hover:text-white transition duration-200"
                                >
                                    Dashboard
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Contact Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-400">Email: support@mcms.com</p>
                        <p className="text-gray-400">Phone: +880-123-456-789</p>
                        <p className="text-gray-400">Address: Chattogram, Bangladesh</p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} MCMS. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
