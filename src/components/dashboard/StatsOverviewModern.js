import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import { getRelativeTime } from '../../utils/timeUtils';

const INITIAL_ACTIVITIES_LIMIT = 4;

/**
 * StatsOverview Ultra-Moderne - Mode sombre avec glassmorphism
 * Design futuriste avec gradients, animations, et effets de profondeur
 */
const StatsOverviewModern = ({ userRole, periodFilter = '30d', onPeriodChange, isDarkMode = true }) => {
  const { activities: recentActivitiesFromContext, members, payments, planning } = useDashboard();
  const [showAllActivities, setShowAllActivities] = useState(false);

  // Calculer les statistiques en temps réel
  const totalMembers = members.length;
  const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalCourses = planning.length;
  
  const currentMonth = new Date().getMonth();
  const activeMembersCount = payments.filter(p => {
    const paymentDate = new Date(p.date);
    return paymentDate.getMonth() === currentMonth;
  }).length;

  const newMembersThisMonth = members.filter(m => {
    const createdDate = new Date(m.createdAt);
    return createdDate.getMonth() === currentMonth;
  }).length;

  // KPIs avec gradients distincts et glassmorphism
  const kpisData = [
    {
      title: 'Membres Actifs',
      value: activeMembersCount.toString(),
      change: totalMembers > 0 ? `${Math.round((activeMembersCount / totalMembers) * 100)}%` : '0%',
      changeLabel: 'du total',
      trend: 'up',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      glowColor: 'rgba(16, 185, 129, 0.3)',
      bgGradient: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      title: 'Revenu Total',
      value: totalRevenue.toLocaleString(),
      unit: 'DH',
      change: payments.length > 0 ? `${payments.length} paiements` : '0 paiement',
      changeLabel: 'ce mois',
      trend: 'up',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      glowColor: 'rgba(59, 130, 246, 0.3)',
      bgGradient: 'from-blue-500/10 to-purple-500/10'
    },
    {
      title: 'Nouveaux Inscrits',
      value: newMembersThisMonth.toString(),
      change: `${totalMembers} total`,
      changeLabel: 'membres',
      trend: 'up',
      icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      glowColor: 'rgba(168, 85, 247, 0.3)',
      bgGradient: 'from-purple-500/10 to-pink-500/10'
    },
    {
      title: 'Cours Planifiés',
      value: totalCourses.toString(),
      unit: 'cours',
      change: planning.reduce((sum, c) => sum + (c.participants?.length || 0), 0).toString(),
      changeLabel: 'participants',
      trend: 'up',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      glowColor: 'rgba(249, 115, 22, 0.3)',
      bgGradient: 'from-orange-500/10 to-yellow-500/10'
    }
  ];

  // Activités récentes
  const recentActivities = recentActivitiesFromContext.length > 0 ? recentActivitiesFromContext : [
    { 
      id: 1, 
      member: 'Système', 
      action: 'Aucune activité récente', 
      time: '-', 
      type: 'info',
      avatar: 'SY',
      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  // Données graphique hebdomadaire
  const weeklyData = [
    { day: 'Lun', visitors: 120 },
    { day: 'Mar', visitors: 150 },
    { day: 'Mer', visitors: 130 },
    { day: 'Jeu', visitors: 140 },
    { day: 'Ven', visitors: 160 },
    { day: 'Sam', visitors: 90 },
    { day: 'Dim', visitors: 70 }
  ];
  
  const maxVisitors = Math.max(...weeklyData.map(d => d.visitors));

  return (
    <div className="space-y-6">
      {/* Header avec filtres */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Tableau de Bord
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Vue d'ensemble des performances
          </p>
        </div>
      </div>

      {/* KPI Cards - Glassmorphism avec gradients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpisData.map((kpi, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50' 
                : 'bg-white/80 backdrop-blur-xl border border-gray-200'
            }`}
            style={{
              boxShadow: isDarkMode 
                ? `0 8px 32px ${kpi.glowColor}` 
                : '0 4px 20px rgba(0,0,0,0.08)'
            }}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            {/* Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${kpi.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
            
            {/* Content */}
            <div className="relative p-6">
              {/* Icon avec gradient */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${kpi.gradient} shadow-lg`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={kpi.icon} />
                  </svg>
                </div>
                
                {/* Trend Badge */}
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                  isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-50'
                }`}>
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-xs font-semibold text-emerald-500">{kpi.change}</span>
                </div>
              </div>

              {/* Value */}
              <div className="space-y-1">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  {kpi.title}
                </p>
                <div className="flex items-baseline space-x-2">
                  <h3 className={`text-3xl font-bold bg-gradient-to-r ${kpi.gradient} bg-clip-text text-transparent`}>
                    {kpi.value}
                  </h3>
                  {kpi.unit && (
                    <span className={`text-lg font-semibold ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                      {kpi.unit}
                    </span>
                  )}
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                  {kpi.changeLabel}
                </p>
              </div>

              {/* Animated Border */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r ${kpi.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique et Activités */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique Fréquentation - Glassmorphism */}
        <div className={`lg:col-span-2 rounded-2xl p-6 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50' 
            : 'bg-white/80 backdrop-blur-xl border border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Fréquentation Hebdomadaire
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Nombre de visites par jour
              </p>
            </div>
          </div>

          {/* Graphique en barres avec gradients */}
          <div className="space-y-4">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className={`text-sm font-medium w-12 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  {data.day}
                </span>
                <div className="flex-1 h-10 relative group">
                  <div className={`absolute inset-0 rounded-lg ${
                    isDarkMode ? 'bg-slate-700/30' : 'bg-gray-100'
                  }`}></div>
                  <div
                    className="absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:shadow-lg"
                    style={{ 
                      width: `${(data.visitors / maxVisitors) * 100}%`,
                      boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)'
                    }}
                  >
                    <div className="flex items-center justify-end h-full pr-3">
                      <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {data.visitors}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activités Récentes - Glassmorphism */}
        <div className={`rounded-2xl p-6 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50' 
            : 'bg-white/80 backdrop-blur-xl border border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Activités Récentes
            </h2>
            {recentActivities.length > INITIAL_ACTIVITIES_LIMIT && (
              <button
                onClick={() => setShowAllActivities(!showAllActivities)}
                className={`text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'text-purple-400 hover:text-purple-300' 
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                {showAllActivities ? 'Voir moins' : `Voir tout (${recentActivities.length})`}
              </button>
            )}
          </div>

          <div className="space-y-3">
            {(showAllActivities ? recentActivities : recentActivities.slice(0, INITIAL_ACTIVITIES_LIMIT)).map((activity) => {
              const getActivityColor = (type) => {
                switch(type) {
                  case 'inscription': return 'from-emerald-500 to-teal-500';
                  case 'payment': return 'from-blue-500 to-cyan-500';
                  case 'renewal': return 'from-purple-500 to-pink-500';
                  case 'warning': return 'from-orange-500 to-amber-500';
                  default: return 'from-slate-500 to-slate-600';
                }
              };
              
              return (
                <div
                  key={activity.id}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-slate-700/30 hover:bg-slate-700/50' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {/* Avatar avec gradient */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getActivityColor(activity.type)} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <span className="text-white text-xs font-bold">{activity.avatar}</span>
                  </div>
                  
                  {/* Contenu */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {activity.member}
                    </p>
                    <p className={`text-xs truncate ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      {activity.action}
                    </p>
                  </div>
                  
                  {/* Timestamp */}
                  <span className={`text-xs whitespace-nowrap ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                    {activity.createdAt ? getRelativeTime(activity.createdAt) : activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverviewModern;
