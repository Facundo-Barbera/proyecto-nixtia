'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Call to Action Section */}
      <div className="bg-purple-600 py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Authentic Flavor?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Start shopping now and discover the taste of traditional nixtamalized corn
            products
          </p>
          <Link href="/store">
            <Button
              size="lg"
              className="bg-white text-purple-700 hover:bg-purple-50 text-lg px-8 py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/5215512345678"
                className="flex items-center gap-3 hover:text-purple-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp: +52 1 55 1234 5678</span>
              </a>
              <a
                href="mailto:contacto@nixtia.com"
                className="flex items-center gap-3 hover:text-purple-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>contacto@nixtia.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link
                href="/store"
                className="block hover:text-purple-400 transition-colors"
              >
                Shop Products
              </Link>
              <Link
                href="/landing"
                className="block hover:text-purple-400 transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Back to Top */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Nixtia. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
