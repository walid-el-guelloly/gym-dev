import React, { useState } from 'react';

/**
 * Paramètres du dashboard
 */
const Settings = ({ userRole, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: true,
    emailReports: true,
    darkMode: false,
    language: 'fr'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">
          Paramètres
        </h1>
        <p className="text-[#6B7280] text-sm mt-1">
          Gérez vos préférences et paramètres du compte
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Menu latéral */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <nav className="space-y-1">
              {[
                { id: 'profile', label: 'Profil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
                { id: 'security', label: 'Sécurité', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
                { id: 'preferences', label: 'Préférences', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#F9FAFB] text-[#111827] border-l-4 border-[#111827]'
                      : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenu */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#111827]">
                  Informations du Profil
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Nom Complet
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-white text-[#111827] focus:ring-2 focus:ring-[#111827] focus:border-transparent transition-all"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-white text-[#111827] focus:ring-2 focus:ring-[#111827] focus:border-transparent transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Rôle
                  </label>
                  <div className="px-4 py-2.5 bg-[#F9FAFB] rounded-lg text-[#111827] capitalize font-medium">
                    {userRole}
                  </div>
                </div>

                <button className="bg-[#111827] hover:bg-black text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-sm">
                  Sauvegarder les modifications
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#111827]">
                  Préférences de Notification
                </h2>
                
                <div className="space-y-4">
                  {[
                    { id: 'notifications', label: 'Notifications push', description: 'Recevoir des notifications en temps réel' },
                    { id: 'emailReports', label: 'Rapports par email', description: 'Rapports quotidiens et hebdomadaires' },
                    { id: 'paymentAlerts', label: 'Alertes de paiement', description: 'Notifications pour les paiements en attente' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-[#F9FAFB] hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-[#111827]">
                          {item.label}
                        </p>
                        <p className="text-sm text-[#6B7280]">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleSettingChange(item.id, !settings[item.id])}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings[item.id] 
                            ? 'bg-[#111827]' 
                            : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings[item.id] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#111827]">
                  Sécurité du Compte
                </h2>
                
                <div className="space-y-3">
                  <button className="w-full text-left p-4 rounded-lg bg-[#F9FAFB] hover:bg-gray-100 transition-colors flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[#6B7280] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <div>
                      <p className="font-medium text-[#111827]">
                        Changer le mot de passe
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Mettre à jour votre mot de passe régulièrement
                      </p>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-4 rounded-lg bg-[#F9FAFB] hover:bg-gray-100 transition-colors flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[#6B7280] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium text-[#111827]">
                        Authentification à deux facteurs
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Ajouter une couche de sécurité supplémentaire
                      </p>
                    </div>
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={onLogout}
                    className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#111827]">
                  Préférences Générales
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9FAFB] hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-[#111827]">
                        Mode Sombre
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Activer l'interface sombre
                      </p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.darkMode 
                          ? 'bg-[#111827]' 
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Langue
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-white text-[#111827] focus:ring-2 focus:ring-[#111827] focus:border-transparent transition-all"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;