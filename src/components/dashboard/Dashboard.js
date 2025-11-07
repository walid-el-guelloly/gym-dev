import React, { useState } from 'react';
import { DashboardProvider } from './DashboardContext';
import DashboardLayout from './DashboardLayout';
import StatsOverviewModern from './StatsOverviewModern';
import MembersManagement from './MembersManagement';
import PaymentsManagement from './PaymentsManagement';
import Reports from './Reports';
import Settings from './Settings';
// import Login from './Login';

/**
 * Dashboard - Version ultra-moderne avec mode sombre
 * Design system: Glassmorphism, Gradients, Mode sombre slate
 */
const Dashboard = ({ onBackToHome }) => {
  const [currentView, setCurrentView] = useState('stats');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Temporairement true pour tester
  const [userRole, setUserRole] = useState('manager'); // Temporairement manager pour tester
  const [periodFilter, setPeriodFilter] = useState('30d'); // 7d, 30d, 12m, custom
  const [memberAction, setMemberAction] = useState(null); // 'add', 'edit', null
  const [isDarkMode, setIsDarkMode] = useState(true); // Mode sombre par défaut

  // Fonction de connexion (à intégrer avec le Login de votre collègue)
  const handleLogin = (email, password) => {
    // Logique d'authentification à implémenter
    if (email && password) {
      setIsAuthenticated(true);
      setUserRole('manager'); // ou 'caissier'
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };
  
  // Fonction de navigation avec action
  const handleNavigate = (view, action = null) => {
    setCurrentView(view);
    setMemberAction(action);
  };

  // Si non authentifié, afficher la page de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <button
              onClick={onBackToHome}
              className="mb-6 inline-flex items-center space-x-2 text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Retour au site</span>
            </button>
            <div className="w-16 h-16 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            <h2 className="text-2xl font-bold text-[#111827] mb-2">
              Connexion Dashboard
            </h2>
            <p className="text-[#6B7280] text-sm">
              Accès réservé au personnel
            </p>
          </div>
          {/* Votre collègue intégrera le composant Login ici */}
          <div className="text-center py-6">
            <p className="text-[#6B7280] text-sm mb-6">
              Composant Login en cours de développement...
            </p>
            <button
              onClick={() => handleLogin('test', 'test')}
              className="w-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED] text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300"
            >
              Accéder au Dashboard (Test)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Contenu du dashboard
  const renderContent = () => {
    switch (currentView) {
      case 'stats':
        return <StatsOverviewModern userRole={userRole} periodFilter={periodFilter} onPeriodChange={setPeriodFilter} isDarkMode={isDarkMode} />;
      case 'members':
        return <MembersManagement userRole={userRole} action={memberAction} onActionComplete={() => setMemberAction(null)} isDarkMode={isDarkMode} />;
      case 'payments':
        return <PaymentsManagement userRole={userRole} isDarkMode={isDarkMode} />;
      case 'planning':
        const PlanningManagement = require('./PlanningManagement').default;
        return <PlanningManagement userRole={userRole} isDarkMode={isDarkMode} />;
      case 'reports':
        return <Reports userRole={userRole} isDarkMode={isDarkMode} />;
      case 'settings':
        return <Settings userRole={userRole} onLogout={handleLogout} isDarkMode={isDarkMode} />;
      default:
        return <StatsOverviewModern userRole={userRole} periodFilter={periodFilter} onPeriodChange={setPeriodFilter} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <DashboardProvider>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950' : 'bg-[#F9FAFB]'
      }`}>
        {/* Dashboard avec barre de retour intégrée */}
        <DashboardLayout 
          onBackToHome={onBackToHome} 
          currentView={currentView}
          onViewChange={setCurrentView}
          userRole={userRole}
          onLogout={() => {
            handleLogout();
            onBackToHome();
          }}
          onNavigate={handleNavigate}
          isDarkMode={isDarkMode}
          onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        >
          {renderContent()}
        </DashboardLayout>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;