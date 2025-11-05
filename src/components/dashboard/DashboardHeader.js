import React, { useState } from 'react';

/**
 * Dashboard Header - Hauteur 64px, Design moderne et professionnel
 * Palette: #3B82F6 (bleu), #8B5CF6 (violet), #111827 (texte)
 */
const DashboardHeader = ({ onMenuToggle, userRole, onLogout, isSidebarOpen, onSidebarToggle, onNavigate }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 h-16">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg text-[#6B7280] hover:bg-gray-50 hover:text-[#111827] transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Rechercher membres, paiements..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg bg-[#F9FAFB] text-[#111827] text-sm placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent focus:bg-white transition-all duration-300"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Actions rapides */}
          <button 
            onClick={() => onNavigate && onNavigate('members', 'add')}
            className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white rounded-lg text-sm font-semibold hover:from-[#2563EB] hover:to-[#7C3AED] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nouveau membre</span>
          </button>
          
          <button className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-white text-[#3B82F6] border border-[#3B82F6] rounded-lg text-sm font-semibold hover:bg-[#EEF2FF] transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Paiement</span>
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-lg text-[#6B7280] hover:bg-gray-50 hover:text-[#111827] transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F59E0B] rounded-full"></span>
            </button>
            
            {/* Dropdown notifications */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-semibold text-[#111827] text-sm">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <p className="text-sm font-medium text-[#111827]">Nouveau membre inscrit</p>
                    <p className="text-xs text-[#6B7280] mt-1">Ahmed Ali vient de s'inscrire</p>
                    <p className="text-xs text-[#6B7280] mt-1">Il y a 5 minutes</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <p className="text-sm font-medium text-[#111827]">Paiement reçu</p>
                    <p className="text-xs text-[#6B7280] mt-1">350 DH de Fatima Zahra</p>
                    <p className="text-xs text-[#6B7280] mt-1">Il y a 15 minutes</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {userRole?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-[#111827] capitalize">{userRole}</p>
              </div>
              <svg className="w-4 h-4 text-[#6B7280] hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button className="w-full text-left px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Mon Profil</span>
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Paramètres</span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-[#DC2626] hover:bg-red-50 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;