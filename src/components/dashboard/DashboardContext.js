import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Contexte global du Dashboard pour partager les données entre composants
 * Gère: membres, paiements, activités récentes, planning
 */
const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  // Charger depuis localStorage ou initialiser
  const loadFromStorage = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      return defaultValue;
    }
  };

  // États globaux
  const [members, setMembers] = useState(() => loadFromStorage('gym_members', []));
  const [payments, setPayments] = useState(() => loadFromStorage('gym_payments', []));
  const [activities, setActivities] = useState(() => loadFromStorage('gym_activities', []));
  const [planning, setPlanning] = useState(() => loadFromStorage('gym_planning', []));

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('gym_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('gym_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('gym_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('gym_planning', JSON.stringify(planning));
  }, [planning]);

  // Fonction pour ajouter un membre avec synchronisation automatique
  const addMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    setMembers(prev => [...prev, newMember]);
    
    // Ajouter automatiquement dans les paiements
    const payment = {
      id: Date.now() + 1,
      memberId: newMember.id,
      memberName: newMember.fullName,
      amount: newMember.price,
      type: 'Sur place',
      subscriptionType: newMember.subscriptionType,
      date: newMember.registrationDate,
      status: 'completed',
      createdAt: new Date().toISOString()
    };
    setPayments(prev => [payment, ...prev]);
    
    // Ajouter dans les activités récentes
    const activity = {
      id: Date.now() + 2,
      member: newMember.fullName,
      action: `Nouvelle inscription - ${newMember.subscriptionType}`,
      time: 'À l\'instant',
      type: 'inscription',
      avatar: newMember.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
      createdAt: new Date().toISOString()
    };
    setActivities(prev => [activity, ...prev.slice(0, 9)]); // Garder les 10 dernières
    
    return newMember;
  };

  // Fonction pour mettre à jour un membre avec synchronisation
  const updateMember = (id, memberData) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...memberData } : m));
    
    // Mettre à jour les paiements associés
    setPayments(prev => prev.map(p => 
      p.memberId === id 
        ? { 
            ...p, 
            memberName: memberData.fullName,
            amount: memberData.price,
            subscriptionType: memberData.subscriptionType
          } 
        : p
    ));
    
    // Ajouter une activité de modification
    const activity = {
      id: Date.now(),
      member: memberData.fullName,
      action: `Modification du profil - ${memberData.subscriptionType}`,
      time: 'À l\'instant',
      type: 'update',
      avatar: memberData.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      createdAt: new Date().toISOString()
    };
    setActivities(prev => [activity, ...prev.slice(0, 9)]);
  };

  // Fonction pour supprimer un membre
  const deleteMember = (id) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  // Fonction pour ajouter un cours au planning
  const addCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      participants: []
    };
    
    setPlanning(prev => [...prev, newCourse]);
    
    // Ajouter dans les activités récentes
    const activity = {
      id: Date.now() + 1,
      member: 'Système',
      action: `Nouveau cours planifié: ${courseData.courseName} avec ${courseData.coachName}`,
      time: 'À l\'instant',
      type: 'planning',
      avatar: 'SY',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      createdAt: new Date().toISOString()
    };
    setActivities(prev => [activity, ...prev.slice(0, 9)]);
    
    return newCourse;
  };

  // Fonction pour ajouter un participant à un cours
  const addParticipantToCourse = (courseId, participantData) => {
    const course = planning.find(c => c.id === courseId);
    if (!course) return null;
    
    const participant = {
      ...participantData,
      id: Date.now(),
      courseId: courseId,
      enrolledAt: new Date().toISOString()
    };
    
    setPlanning(prev => prev.map(c => 
      c.id === courseId 
        ? { ...c, participants: [...(c.participants || []), participant] }
        : c
    ));
    
    // Ajouter le paiement
    const payment = {
      id: Date.now() + 1,
      memberId: participant.id,
      memberName: participant.fullName,
      amount: participant.price,
      type: 'Sur place',
      subscriptionType: 'Cours - ' + course.courseName,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      createdAt: new Date().toISOString()
    };
    setPayments(prev => [payment, ...prev]);
    
    // Ajouter dans les activités récentes
    const activity = {
      id: Date.now() + 2,
      member: participant.fullName,
      action: `Inscription au cours ${course.courseName}`,
      time: 'À l\'instant',
      type: 'course_enrollment',
      avatar: participant.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      createdAt: new Date().toISOString()
    };
    setActivities(prev => [activity, ...prev.slice(0, 9)]);
    
    return participant;
  };

  // Fonction pour modifier un cours
  const updateCourse = (courseId, courseData) => {
    setPlanning(prev => prev.map(c => 
      c.id === courseId ? { ...c, ...courseData } : c
    ));
    
    // Ajouter une activité
    const activity = {
      id: Date.now(),
      member: 'Système',
      action: `Modification du cours: ${courseData.courseName}`,
      time: 'À l\'instant',
      type: 'course_update',
      avatar: 'SY',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      createdAt: new Date().toISOString()
    };
    setActivities(prev => [activity, ...prev.slice(0, 9)]);
  };

  // Fonction pour modifier un participant dans un cours
  const updateParticipant = (courseId, participantId, participantData) => {
    setPlanning(prev => prev.map(c => 
      c.id === courseId 
        ? {
            ...c,
            participants: c.participants.map(p =>
              p.id === participantId ? { ...p, ...participantData } : p
            )
          }
        : c
    ));
    
    // Mettre à jour les paiements associés
    setPayments(prev => prev.map(p => 
      p.memberId === participantId 
        ? { 
            ...p, 
            memberName: participantData.fullName,
            amount: participantData.price
          } 
        : p
    ));
    
    // Ajouter une activité
    const activity = {
      id: Date.now(),
      member: participantData.fullName,
      action: `Modification inscription cours`,
      time: 'À l\'instant',
      type: 'participant_update',
      avatar: participantData.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      createdAt: new Date().toISOString()
    };
    setActivities(prev => [activity, ...prev.slice(0, 9)]);
  };

  // Fonction pour supprimer un participant d'un cours
  const removeParticipant = (courseId, participantId) => {
    setPlanning(prev => prev.map(c => 
      c.id === courseId 
        ? {
            ...c,
            participants: c.participants.filter(p => p.id !== participantId)
          }
        : c
    ));
  };

  const value = {
    members,
    setMembers,
    addMember,
    updateMember,
    deleteMember,
    payments,
    setPayments,
    activities,
    setActivities,
    planning,
    setPlanning,
    addCourse,
    updateCourse,
    addParticipantToCourse,
    updateParticipant,
    removeParticipant
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
