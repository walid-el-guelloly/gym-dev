import React, { useState, useEffect } from "react";
import { useScrollSpy } from "../../hooks/useScrollSpy";

/**
 * Barre de navigation complète avec gestion du dashboard
 */
const Navbar = ({ onDashboardClick, onSectionChange }) => {
  const activeSection = useScrollSpy();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "store", label: "Store" },
    { id: "contact", label: "Contact Us" },
  ];

  const scrollToSection = (sectionId) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Gestion du clic sur Dashboard
  const handleDashboardClick = () => {
    onDashboardClick();
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (pageHeight > 0 && scrollY / pageHeight > 0.1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 h-16 transition-all duration-300 ${
        scrolled ? "bg-black bg-opacity-90 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">
            <img src="/logo.png" alt="Gym Logo" className="h-8 w-auto" />
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative group px-2 py-1 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-red-600 font-bold"
                    : "text-white hover:text-red-500"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Boutons à droite */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Bouton Dashboard */}
            <button
              onClick={handleDashboardClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Dashboard
            </button>

            {/* Bouton Join Now */}
            <button
              onClick={() => scrollToSection("pricing")}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
            >
              Join Now
            </button>
          </div>

          {/* Menu Mobile Burger */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t">
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2 px-4 font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-red-600 bg-red-50 rounded-md"
                        : "text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded-md"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Bouton Dashboard Mobile */}
                <button
                  onClick={handleDashboardClick}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 text-center"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => scrollToSection("pricing")}
                  className="bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-700 transition-all duration-300 text-center"
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
