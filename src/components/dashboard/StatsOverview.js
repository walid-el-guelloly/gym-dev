import React, { useState, useEffect } from 'react';
import { useDashboard } from './DashboardContext';
import { getRelativeTime } from '../../utils/timeUtils';

const INITIAL_ACTIVITIES_LIMIT = 4;

/**
 * StatsOverview - Dashboard moderne et professionnel
 * Design system: Spacing 24px, Border-radius 12px, Shadow-sm
 * Palette: #3B82F6 (bleu), #8B5CF6 (violet), #10B981 (succès), #F59E0B (warning)
 */
const StatsOverview = ({ userRole, periodFilter = '30d', onPeriodChange }) => {
  const { activities: recentActivitiesFromContext } = useDashboard();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [showAllActivities, setShowAllActivities] = useState(false);
  
  // Mettre à jour le temps toutes les minutes pour rafraîchir les temps relatifs
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // 1 minute
    
    return () => clearInterval(interval);
  }, []);
  // KPIs principaux avec icônes SVG
  const kpisData = [
    {
      title: 'Membres Actifs',
      value: '247',
      change: '+12%',
      changeLabel: 'vs mois dernier',
      trend: 'up',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      color: '#3B82F6'
    },
    {
      title: 'Revenu Mensuel',
      value: '45 280',
      unit: 'DH',
      change: '+8.2%',
      changeLabel: 'vs mois dernier',
      trend: 'up',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      color: '#10B981'
    },
    {
      title: 'Nouveaux Inscrits',
      value: '32',
      change: '+5%',
      changeLabel: 'vs mois dernier',
      trend: 'up',
      icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
      color: '#8B5CF6'
    },
    {
      title: 'Taux de Rétention',
      value: '89',
      unit: '%',
      change: '+2%',
      changeLabel: 'vs mois dernier',
      trend: 'up',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
      color: '#F59E0B'
    }
  ];

  // Utiliser les activités récentes du contexte (synchronisées automatiquement)
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

  // Données de fréquentation hebdomadaire (graphique en colonnes)
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
  const avgVisitors = Math.round(weeklyData.reduce((sum, d) => sum + d.visitors, 0) / weeklyData.length);
  
  // Objectifs du mois
  const monthlyGoals = [
    { label: 'Nouveaux membres', current: 32, target: 40, unit: 'membres' },
    { label: 'Revenu mensuel', current: 45280, target: 50000, unit: 'DH' },
    { label: 'Taux de présence', current: 78, target: 85, unit: '%' }
  ];
  
  // Quick stats supplémentaires
  const quickStats = [
    { label: 'Sessions aujourd\'hui', value: '47', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: '#3B82F6' },
    { label: 'Équipements maintenance', value: '3', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: '#F59E0B' }
  ];
  
  // Filtres de période
  const periods = [
    { value: '7d', label: '7 jours' },
    { value: '30d', label: '30 jours' },
    { value: '12m', label: '12 mois' },
    { value: 'custom', label: 'Personnalisé' }
  ];

  return (
    <div className="space-y-6">
      {/* Header avec filtres de période */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Tableau de Bord</h1>
          <p className="text-[#6B7280] text-sm mt-1">Aperçu des performances de votre salle de sport</p>
        </div>
        
        {/* Filtres de période */}
        <div className="flex items-center space-x-2">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => onPeriodChange && onPeriodChange(period.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                periodFilter === period.value
                  ? 'bg-[#3B82F6] text-white shadow-sm'
                  : 'bg-white text-[#6B7280] hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs Grid - 4 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpisData.map((kpi, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group cursor-pointer"
          >
            {/* Icône badge circulaire */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                <svg className="w-5 h-5" style={{ color: kpi.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={kpi.icon} />
                </svg>
              </div>
            </div>
            
            {/* Titre */}
            <p className="text-sm font-semibold text-[#6B7280] mb-2">{kpi.title}</p>
            
            {/* Valeur principale */}
            <div className="flex items-baseline space-x-1 mb-2">
              <p className="text-4xl font-bold text-[#111827]">{kpi.value}</p>
              {kpi.unit && <span className="text-lg font-medium text-[#6B7280]">{kpi.unit}</span>}
            </div>
            
            {/* Changement et label */}
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-semibold ${kpi.trend === 'up' ? 'text-[#10B981]' : 'text-[#DC2626]'}`}>
                {kpi.change}
              </span>
              <span className="text-xs text-[#6B7280]">{kpi.changeLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance Chart - Graphique en colonnes */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-[#111827]">Fréquentation Hebdomadaire</h2>
            <span className="text-xs text-[#6B7280]">Moyenne: {avgVisitors} visites/jour</span>
          </div>
          
          {/* Graphique en colonnes verticales */}
          <div className="flex items-end justify-between h-48 space-x-2">
            {weeklyData.map((day, index) => {
              const heightPercent = (day.visitors / maxVisitors) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  {/* Colonne */}
                  <div className="w-full flex flex-col justify-end h-full relative">
                    {/* Grille de fond (lignes horizontales) */}
                    {index === 0 && (
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                        <div className="border-t border-gray-300"></div>
                        <div className="border-t border-gray-300"></div>
                        <div className="border-t border-gray-300"></div>
                        <div className="border-t border-gray-300"></div>
                      </div>
                    )}
                    
                    {/* Barre avec tooltip */}
                    <div className="relative">
                      <div 
                        className="w-full bg-gradient-to-t from-[#3B82F6] to-[#8B5CF6] rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                        style={{ height: `${heightPercent}%`, minHeight: '20px' }}
                      >
                        {/* Tooltip au hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="bg-[#111827] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {day.visitors} visites
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Label jour */}
                  <span className="text-xs font-medium text-[#6B7280] mt-2">{day.day}</span>
                </div>
              );
            })}
          </div>
          
          {/* Ligne de tendance moyenne */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6B7280]">Tendance</span>
              <span className="text-[#10B981] font-semibold">↗ +5% cette semaine</span>
            </div>
          </div>
        </div>

        {/* Recent Activities - Design compact avec avatars */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#111827]">Activités Récentes</h2>
            {recentActivities.length > INITIAL_ACTIVITIES_LIMIT && (
              <button
                onClick={() => setShowAllActivities(!showAllActivities)}
                className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors"
              >
                {showAllActivities ? 'Voir moins' : `Voir tout (${recentActivities.length})`}
              </button>
            )}
          </div>
          <div className="space-y-3">
            {(showAllActivities ? recentActivities : recentActivities.slice(0, INITIAL_ACTIVITIES_LIMIT)).map((activity) => {
              const getActivityColor = (type) => {
                switch(type) {
                  case 'inscription': return '#10B981';
                  case 'payment': return '#3B82F6';
                  case 'renewal': return '#8B5CF6';
                  case 'warning': return '#F59E0B';
                  case 'checkin': return '#6B7280';
                  default: return '#6B7280';
                }
              };
              
              return (
                <div
                  key={activity.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  {/* Avatar circulaire */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{activity.avatar}</span>
                  </div>
                  
                  {/* Icône de type d'activité */}
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getActivityColor(activity.type)}15` }}>
                    <svg className="w-4 h-4" style={{ color: getActivityColor(activity.type) }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activity.icon} />
                    </svg>
                  </div>
                  
                  {/* Contenu */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate">{activity.member}</p>
                    <p className="text-xs text-[#6B7280] truncate">{activity.action}</p>
                  </div>
                  
                  {/* Timestamp - Temps relatif dynamique */}
                  <span className="text-xs text-[#6B7280] whitespace-nowrap" key={currentTime}>
                    {activity.createdAt ? getRelativeTime(activity.createdAt) : activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Objectifs du Mois avec Progress Bars */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <h2 className="text-base font-semibold text-[#111827] mb-4">Objectifs du Mois</h2>
        <div className="space-y-4">
          {monthlyGoals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#111827]">{goal.label}</span>
                  <span className="text-sm font-semibold text-[#6B7280]">
                    {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-[#6B7280]">
                  {progress.toFixed(0)}% complété
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Quick Stats - 2 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                <svg className="w-6 h-6" style={{ color: stat.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
                <p className="text-sm text-[#6B7280]">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;