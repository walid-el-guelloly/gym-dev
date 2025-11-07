import React, { useState } from 'react';

/**
 * Rapports et analytics (Manager seulement)
 */
const Reports = ({ userRole, isDarkMode = true }) => {
  const [reportType, setReportType] = useState('membership');

  if (userRole !== 'manager') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <svg className="w-20 h-20 mx-auto mb-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-xl font-bold text-[#111827] mb-2">
            Accès Restreint
          </h2>
          <p className="text-[#6B7280]">
            Cette section est réservée aux managers
          </p>
        </div>
      </div>
    );
  }

  const reportData = {
    membership: {
      title: 'Rapport des Abonnements',
      data: [
        { month: 'Jan', premium: 45, standard: 120 },
        { month: 'Fév', premium: 52, standard: 135 },
        { month: 'Mar', premium: 48, standard: 142 },
        { month: 'Avr', premium: 55, standard: 150 },
        { month: 'Mai', premium: 60, standard: 165 },
        { month: 'Jun', premium: 65, standard: 180 }
      ]
    },
    revenue: {
      title: 'Rapport des Revenus',
      data: [
        { month: 'Jan', revenue: 38500 },
        { month: 'Fév', revenue: 41200 },
        { month: 'Mar', revenue: 39800 },
        { month: 'Avr', revenue: 42500 },
        { month: 'Mai', revenue: 45200 },
        { month: 'Jun', revenue: 47800 }
      ]
    },
    attendance: {
      title: 'Rapport de Fréquentation',
      data: [
        { month: 'Jan', visits: 2850 },
        { month: 'Fév', visits: 3120 },
        { month: 'Mar', visits: 2980 },
        { month: 'Avr', visits: 3250 },
        { month: 'Mai', visits: 3420 },
        { month: 'Jun', visits: 3680 }
      ]
    }
  };

  const currentReport = reportData[reportType];

  return (
    <div className={`space-y-6 ${isDarkMode ? 'dark-mode-wrapper' : ''}`}>
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Rapports et Analytics
          </h1>
          <p className={`text-sm mt-1 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Analysez les performances détaillées
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className={`border rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent transition-all ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700/50 text-white focus:ring-purple-500/20' 
                : 'bg-white border-gray-200 text-gray-900 focus:ring-gray-900/20'
            }`}
          >
            <option value="membership">Abonnements</option>
            <option value="revenue">Revenus</option>
            <option value="attendance">Fréquentation</option>
          </select>
          <button className="bg-[#111827] hover:bg-black text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Exporter PDF</span>
          </button>
        </div>
      </div>

      {/* Carte du rapport */}
      <div className={`rounded-xl p-6 shadow-sm border transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50' 
          : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-xl font-semibold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {currentReport.title}
        </h2>

        {/* Graphique simple */}
        <div className="space-y-6">
          {currentReport.data.map((item, index) => (
            <div key={index} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-700/30' 
                : 'hover:bg-gray-50'
            }`}>
              <span className={`text-sm font-semibold w-16 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {item.month}
              </span>
              <div className="flex-1 mx-4">
                {reportType === 'membership' ? (
                  <div className="flex space-x-1">
                    <div
                      className="bg-[#8B5CF6] h-7 rounded-l transition-all duration-500"
                      style={{ width: `${(item.premium / 200) * 100}%` }}
                      title={`Premium: ${item.premium}`}
                    ></div>
                    <div
                      className="bg-[#111827] h-7 rounded-r transition-all duration-500"
                      style={{ width: `${(item.standard / 200) * 100}%` }}
                      title={`Standard: ${item.standard}`}
                    ></div>
                  </div>
                ) : (
                  <div className="w-full bg-gray-200 rounded-full h-7">
                    <div
                      className="bg-[#10B981] h-7 rounded-full transition-all duration-500"
                      style={{ 
                        width: reportType === 'revenue' 
                          ? `${(item.revenue / 50000) * 100}%`
                          : `${(item.visits / 4000) * 100}%`
                      }}
                    ></div>
                  </div>
                )}
              </div>
              <span className="text-sm font-semibold text-[#111827] w-32 text-right">
                {reportType === 'membership' 
                  ? `${item.premium + item.standard} membres`
                  : reportType === 'revenue'
                  ? `${item.revenue.toLocaleString()} DH`
                  : `${item.visits.toLocaleString()} visites`
                }
              </span>
            </div>
          ))}
        </div>

        {/* Légende */}
        {reportType === 'membership' && (
          <div className="flex justify-center space-x-6 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#8B5CF6] rounded"></div>
              <span className="text-sm font-medium text-[#6B7280]">Premium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#111827] rounded"></div>
              <span className="text-sm font-medium text-[#6B7280]">Standard</span>
            </div>
          </div>
        )}
      </div>

      {/* Métriques clés */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#111827] mb-2">Croissance</h3>
          <p className="text-3xl font-bold text-[#10B981]">+18%</p>
          <p className="text-sm text-[#6B7280] mt-1">vs mois dernier</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-[#DBEAFE] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#111827] mb-2">Revenue Moyen</h3>
          <p className="text-3xl font-bold text-[#3B82F6]">185 DH</p>
          <p className="text-sm text-[#6B7280] mt-1">par membre/mois</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-[#EDE9FE] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#111827] mb-2">Taux de Rétention</h3>
          <p className="text-3xl font-bold text-[#8B5CF6]">89%</p>
          <p className="text-sm text-[#6B7280] mt-1">membres actifs</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;