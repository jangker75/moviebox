'use client';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Terms of use</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Do Not Sell Info</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">More</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Resources</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="mailto:hello@drambox.com" className="hover:text-white transition">hello@drambox.com</a></li>
              <li><a href="mailto:business@drambox.com" className="hover:text-white transition">business@drambox.com</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Join Us</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Email</a></li>
              <li><a href="#" className="hover:text-white transition">job@drambox.com</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition">Youtube</a></li>
              <li><a href="#" className="hover:text-white transition">Tiktok</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © DramaBox. All Rights Reserved. COPYRIGHTDRAMABOX.COM
          </p>
        </div>
      </div>
    </footer>
  );
}
