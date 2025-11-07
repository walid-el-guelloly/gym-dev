import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';

/**
 * Dashboard Layout - Mode sombre ultra-moderne avec glassmorphism
 * Design futuriste avec sidebar flottante et effets de profondeur
 */
const DashboardLayout = ({ children, currentView, onViewChange, userRole, onLogout, onNavigate, onBackToHome, isDarkMode, onDarkModeToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menu items avec icônes SVG modernes (Heroicons style)
  const menuItems = [
    { 
      id: 'stats', 
      label: 'Tableau de Bord', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      roles: ['caissier', 'manager'],
      notification: null
    },
    { 
      id: 'members', 
      label: 'Gestion Membres', 
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      roles: ['caissier', 'manager'],
      notification: 3
    },
    { 
      id: 'planning', 
      label: 'Gestion de Planning', 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      roles: ['caissier', 'manager'],
      badge: null
    },
    { 
      id: 'payments', 
      label: 'Paiements', 
      icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
      roles: ['caissier', 'manager'],
      badge: null
    },
    { 
      id: 'reports', 
      label: 'Rapports', 
      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      roles: ['manager'],
      badge: null
    },
    { 
      id: 'settings', 
      label: 'Paramètres', 
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      roles: ['caissier', 'manager'],
      notification: null
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className="min-h-screen">
      {/* Sidebar for Desktop - Ultra-moderne avec glassmorphism */}
      <div className={`hidden md:flex fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out backdrop-blur-xl ${
        isSidebarOpen ? 'w-60' : 'w-20'
      } ${
        isDarkMode 
          ? 'bg-slate-900/80 border-r border-slate-700/50' 
          : 'bg-white/80 border-r border-gray-200'
      }`}>
        <div className="flex flex-col w-full">
          {/* Sidebar Header avec gradient */}
          <div className={`p-5 border-b ${
            isDarkMode ? 'border-slate-700/50' : 'border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              {/* Logo avec effet glow */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              {isSidebarOpen && (
                <div>
                  <h1 className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Gym<span className="text-red-600">.</span>
                  </h1>
                  <p className={`text-xs capitalize ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>{userRole}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu - Moderne avec glassmorphism */}
          <nav className="flex-1 p-3 space-y-2">
            {filteredMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  currentView === item.id
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 shadow-lg shadow-purple-500/20'
                      : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                    : isDarkMode
                      ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {/* Glow effect pour item actif */}
                {currentView === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                )}
                
                {/* Indicateur actif (barre gauche avec gradient) */}
                {currentView === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r shadow-lg"></div>
                )}
                
                {/* Icône avec badge gradient */}
                <div className={`relative p-2 rounded-lg transition-all duration-300 ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg'
                    : isDarkMode
                      ? 'bg-slate-800/50 group-hover:bg-slate-700/50'
                      : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <svg 
                    className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                      currentView === item.id ? 'text-white' : isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                
                {isSidebarOpen && (
                  <>
                    <span className="ml-3 font-semibold text-sm relative z-10">{item.label}</span>
                    {/* Badge de notification avec gradient */}
                    {item.notification && (
                      <span className="ml-auto bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg z-10">
                        {item.notification}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>
          
          {/* Divider avec gradient */}
          <div className="px-3 py-2">
            <div className={`h-px bg-gradient-to-r ${
              isDarkMode 
                ? 'from-transparent via-slate-700 to-transparent' 
                : 'from-transparent via-gray-300 to-transparent'
            }`}></div>
          </div>

          {/* Sidebar Toggle avec style moderne */}
          <div className={`p-3 border-t ${
            isDarkMode ? 'border-slate-700/50' : 'border-gray-200'
          }`}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-300 ${
                isDarkMode
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? 'M11 19l-7-7 7-7m8 14l-7-7 7-7' : 'M13 5l7 7-7 7M5 5l7 7-7 7'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'md:ml-60' : 'md:ml-20'
      }`}>
        {/* Barre de retour moderne avec glassmorphism */}
        {onBackToHome && (
          <div className={`sticky top-0 z-30 backdrop-blur-xl border-b transition-all duration-300 ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-700/50' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="px-6 py-3">
              <button
                onClick={onBackToHome}
                className={`inline-flex items-center space-x-2 font-semibold transition-all duration-300 group ${
                  isDarkMode
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Retour au site principal</span>
              </button>
            </div>
          </div>
        )}
        
        <DashboardHeader 
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isDarkMode={isDarkMode}
          onDarkModeToggle={onDarkModeToggle}
          userRole={userRole}
          onLogout={onLogout}
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onNavigate={onNavigate}
        />

        <main className="p-6 min-h-screen">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-60 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                  <div>
                    <h1 className="text-base font-bold text-[#111827]">GYM Manager</h1>
                    <p className="text-xs text-[#6B7280] capitalize">{userRole}</p>
                  </div>
                </div>
              </div>
              <nav className="flex-1 p-3 space-y-1">
                {filteredMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-300 relative ${
                      currentView === item.id
                        ? 'bg-[#EEF2FF] text-[#3B82F6]'
                        : 'text-[#6B7280] hover:bg-gray-50'
                    }`}
                  >
                    {currentView === item.id && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#3B82F6] rounded-r"></div>
                    )}
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className="ml-3 font-medium text-sm">{item.label}</span>
                    {item.notification && (
                      <span className="ml-auto bg-[#3B82F6] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.notification}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;