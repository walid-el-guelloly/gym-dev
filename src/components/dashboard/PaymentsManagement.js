import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';

const INITIAL_PAYMENTS_LIMIT = 4;

/**
 * Gestion des paiements - Synchronisé avec les inscriptions membres et cours
 */
const PaymentsManagement = ({ userRole }) => {
  const { payments: paymentsFromContext } = useDashboard();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showAllPayments, setShowAllPayments] = useState(false);

  // Utiliser les paiements du contexte (synchronisés automatiquement)
  const payments = paymentsFromContext.length > 0 ? paymentsFromContext : [
    {
      id: 1,
      member: 'Ahmed Ali',
      type: 'Abonnement Mensuel',
      amount: '200 DH',
      date: '2024-10-28',
      status: 'completed',
      method: 'Carte'
    },
    {
      id: 2,
      member: 'Fatima Zahra',
      type: 'Abonnement Standard',
      amount: '150 DH',
      date: '2024-10-27',
      status: 'completed',
      method: 'Espèces'
    },
    {
      id: 3,
      member: 'Karim Benjelloun',
      type: 'Renouvellement Premium',
      amount: '200 DH',
      date: '2024-10-25',
      status: 'pending',
      method: 'Carte'
    },
    {
      id: 4,
      member: 'Sara Touimi',
      type: 'Abonnement Standard',
      amount: '150 DH',
      date: '2024-10-24',
      status: 'completed',
      method: 'Virement'
    }
  ];

  const revenueStats = {
    daily: '4,200 DH',
    weekly: '28,500 DH',
    monthly: '45,200 DH',
    yearly: '542,400 DH'
  };


  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">
            Gestion des Paiements
          </h1>
          <p className="text-[#6B7280] text-sm mt-1">
            Suivez les transactions et revenus
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-[#111827] focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          >
            <option value="day">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
          <button className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nouveau Paiement</span>
          </button>
        </div>
      </div>

      {/* Cartes de revenus */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: 'Revenu Quotidien', 
            value: revenueStats.daily, 
            icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', 
            color: 'blue' 
          },
          { 
            label: 'Revenu Hebdomadaire', 
            value: revenueStats.weekly, 
            icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', 
            color: 'green' 
          },
          { 
            label: 'Revenu Mensuel', 
            value: revenueStats.monthly, 
            icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', 
            color: 'purple' 
          },
          { 
            label: 'Revenu Annuel', 
            value: revenueStats.yearly, 
            icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', 
            color: 'orange' 
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7280]">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-[#111827]">
                  {stat.value} DH
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                stat.color === 'blue' ? 'bg-[#DBEAFE]' :
                stat.color === 'green' ? 'bg-[#DCFCE7]' :
                stat.color === 'purple' ? 'bg-[#EDE9FE]' :
                'bg-[#FEF3C7]'
              }`}>
                <svg className={`w-6 h-6 ${
                  stat.color === 'blue' ? 'text-[#3B82F6]' :
                  stat.color === 'green' ? 'text-[#10B981]' :
                  stat.color === 'purple' ? 'text-[#8B5CF6]' :
                  'text-[#F59E0B]'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Derniers paiements */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#111827]">
              Derniers Paiements
            </h2>
            {payments.length > INITIAL_PAYMENTS_LIMIT && (
              <button
                onClick={() => setShowAllPayments(!showAllPayments)}
                className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors"
              >
                {showAllPayments ? 'Voir moins' : `Voir tout (${payments.length})`}
              </button>
            )}
          </div>
          <div className="space-y-4">
            {(showAllPayments ? payments : payments.slice(0, INITIAL_PAYMENTS_LIMIT)).map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 rounded-lg bg-[#F9FAFB] hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#EEF2FF] rounded-full flex items-center justify-center">
                    <span className="text-[#3B82F6] font-semibold text-xs">
                      {payment.amount || payment.amount?.toString().split(' ')[0] || '0'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-[#111827]">
                      {payment.memberName || payment.member}
                    </p>
                    <p className="text-sm text-[#6B7280]">
                      {payment.subscriptionType || payment.type} • {payment.type || 'Sur place'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#111827]">
                    {payment.amount} DH
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    {payment.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Méthodes de paiement */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-[#111827] mb-4">
            Méthodes de Paiement
          </h2>
          <div className="space-y-4">
            {[
              { method: 'Carte Bancaire', percentage: 65, color: 'bg-[#3B82F6]' },
              { method: 'Espèces', percentage: 25, color: 'bg-[#10B981]' },
              { method: 'Virement', percentage: 8, color: 'bg-[#8B5CF6]' },
              { method: 'Autre', percentage: 2, color: 'bg-[#6B7280]' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#6B7280]">{item.method}</span>
                  <span className="text-[#111827] font-medium">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsManagement;