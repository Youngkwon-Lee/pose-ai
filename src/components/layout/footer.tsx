"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <div className="font-semibold text-xl tracking-tight">
                <span className="text-lime-bright">Pose</span>
                <span className="text-gray-dark">AI</span>
              </div>
            </div>
            <p className="text-gray-medium text-sm mt-2 mb-4">
              Advanced AI-powered pose estimation technology for dancers, fitness instructors, and posture analysis.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-medium hover:text-lime-bright transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-medium hover:text-lime-bright transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-medium hover:text-lime-bright transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-medium hover:text-lime-bright transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="col-span-1">
            <h3 className="font-semibold text-sm text-gray-dark mb-4">PRODUCT</h3>
            <ul className="space-y-2">
              {[
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Examples", href: "/examples" },
                { label: "User Guide", href: "/guide" },
                { label: "API", href: "/api" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-medium text-sm hover:text-lime-bright transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-semibold text-sm text-gray-dark mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Documentation", href: "/docs" },
                { label: "Community", href: "/community" },
                { label: "Videos", href: "/videos" },
                { label: "Tutorials", href: "/tutorials" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-medium text-sm hover:text-lime-bright transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="font-semibold text-sm text-gray-dark mb-4">COMPANY</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-medium text-sm hover:text-lime-bright transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-medium mb-4 md:mb-0">
            © {new Date().getFullYear()} PoseAI. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/privacy"
              className="text-sm text-gray-medium hover:text-lime-bright transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-medium hover:text-lime-bright transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:contact@poseai.com"
              className="text-sm text-gray-medium hover:text-lime-bright transition-colors flex items-center"
            >
              <Mail size={14} className="mr-1" /> Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
