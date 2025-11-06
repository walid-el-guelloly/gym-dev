import React, { useState, useEffect } from 'react';
import { useDashboard } from './DashboardContext';

/**
 * Gestion de Planning - Planification des cours (Kickboxing, Cardio, etc.)
 * Fonctionnalités: Créer cours, Ajouter participants, Gérer horaires
 */
const PlanningManagement = ({ userRole }) => {
  const { planning, addCourse, updateCourse, addParticipantToCourse, updateParticipant, removeParticipant } = useDashboard();
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showParticipantForm, setShowParticipantForm] = useState(false);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [detailsTab, setDetailsTab] = useState('info'); // 'info' ou 'participants'
  const [searchMember, setSearchMember] = useState('');
  const [editedCourseData, setEditedCourseData] = useState({}); // Données en cours d'édition
  const [editedParticipantData, setEditedParticipantData] = useState({}); // Données participant en édition
  
  // Système de notifications
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, message: '', onConfirm: null });

  // État du formulaire de cours avec horaires par jour
  const [courseForm, setCourseForm] = useState({
    courseName: '',
    sport: 'Kickboxing',
    customSport: '',
    coachName: '',
    days: [],
    schedule: {}, // { 'Lundi': { startTime: '09:00', endTime: '10:00' }, ... }
    maxParticipants: 20
  });

  // État du formulaire de participant
  const [participantForm, setParticipantForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    price: 300
  });

  const sports = ['Kickboxing', 'Cardio Workouts', 'Yoga', 'CrossFit', 'Boxing', 'Pilates', 'Zumba', 'Autre'];
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  // Synchroniser selectedCourse avec les changements du planning
  useEffect(() => {
    if (selectedCourse) {
      const updatedCourse = planning.find(c => c.id === selectedCourse.id);
      if (updatedCourse) {
        setSelectedCourse(updatedCourse);
      }
    }
  }, [planning, selectedCourse]);

  // Fonction pour afficher un toast
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // Fonction pour afficher une confirmation
  const showConfirm = (message, onConfirm) => {
    setConfirmDialog({ show: true, message, onConfirm });
  };

  // Réinitialiser le formulaire de cours
  const resetCourseForm = () => {
    setCourseForm({
      courseName: '',
      sport: 'Kickboxing',
      customSport: '',
      coachName: '',
      days: [],
      schedule: {},
      maxParticipants: 20
    });
  };
  
  // Gérer le changement de jour (ajouter/retirer + initialiser horaires)
  const handleDayToggle = (day) => {
    const newDays = courseForm.days.includes(day)
      ? courseForm.days.filter(d => d !== day)
      : [...courseForm.days, day];
    
    const newSchedule = { ...courseForm.schedule };
    if (newDays.includes(day) && !newSchedule[day]) {
      newSchedule[day] = { startTime: '09:00', endTime: '10:00' };
    } else if (!newDays.includes(day)) {
      delete newSchedule[day];
    }
    
    setCourseForm({ ...courseForm, days: newDays, schedule: newSchedule });
  };
  
  // Mettre à jour l'horaire d'un jour spécifique
  const updateDaySchedule = (day, field, value) => {
    setCourseForm({
      ...courseForm,
      schedule: {
        ...courseForm.schedule,
        [day]: {
          ...courseForm.schedule[day],
          [field]: value
        }
      }
    });
  };

  // Réinitialiser le formulaire de participant
  const resetParticipantForm = () => {
    setParticipantForm({
      fullName: '',
      email: '',
      phone: '',
      price: 300
    });
  };

  // Ajouter un cours
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (courseForm.days.length === 0) {
      showToast('Veuillez sélectionner au moins un jour', 'error');
      return;
    }
    addCourse(courseForm);
    setShowCourseForm(false);
    resetCourseForm();
    showToast('Cours ajouté avec succès!', 'success');
  };

  // Ajouter un participant à un cours
  const handleAddParticipant = (e) => {
    e.preventDefault();
    addParticipantToCourse(selectedCourse.id, participantForm);
    setShowParticipantForm(false);
    resetParticipantForm();
    showToast(`${participantForm.fullName} a été inscrit au cours!`, 'success');
  };

  // Filtrer les cours
  const filteredCourses = planning.filter(course => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return (course.participants?.length || 0) < course.maxParticipants;
    if (activeTab === 'full') return (course.participants?.length || 0) >= course.maxParticipants;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Gestion de Planning</h1>
          <p className="text-[#6B7280] text-sm mt-1">Planifiez et gérez les cours collectifs</p>
        </div>
        <button
          onClick={() => {
            setShowCourseForm(true);
            resetCourseForm();
          }}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouveau Cours</span>
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'Tous les cours' },
            { id: 'active', label: 'Places disponibles' },
            { id: 'full', label: 'Complets' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#3B82F6] text-white shadow-sm'
                  : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des cours */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const participantCount = course.participants?.length || 0;
          const isFull = participantCount >= course.maxParticipants;
          
          return (
            <div key={course.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              {/* Header du cours */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#111827]">{course.courseName}</h3>
                  <p className="text-sm text-[#6B7280] mt-1">{course.sport}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  isFull ? 'bg-[#DC2626] text-white' : 'bg-[#10B981] text-white'
                }`}>
                  {isFull ? 'Complet' : 'Disponible'}
                </span>
              </div>

              {/* Coach */}
              <div className="flex items-center space-x-2 mb-3">
                <svg className="w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm text-[#111827] font-medium">Coach: {course.coachName}</span>
              </div>

              {/* Horaires */}
              <div className="flex items-center space-x-2 mb-3">
                <svg className="w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-[#6B7280]">
                  {course.schedule && Object.keys(course.schedule).length > 0 
                    ? `${Object.values(course.schedule)[0]?.startTime || '-'} - ${Object.values(course.schedule)[0]?.endTime || '-'}`
                    : `${course.startTime || '-'} - ${course.endTime || '-'}`
                  }
                </span>
              </div>

              {/* Jours */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {course.days.map((day) => (
                    <span key={day} className="px-2 py-1 bg-[#EEF2FF] text-[#3B82F6] rounded text-xs font-medium">
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Participants */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#111827]">Participants</span>
                  <span className="text-sm text-[#6B7280]">{participantCount}/{course.maxParticipants}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(participantCount / course.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowCourseDetails(true);
                  }}
                  className="px-4 py-2 bg-white border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold hover:bg-[#EEF2FF] transition-all duration-300"
                >
                  Voir Détails
                </button>
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowParticipantForm(true);
                    resetParticipantForm();
                  }}
                  disabled={isFull}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isFull
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                  }`}
                >
                  {isFull ? 'Complet' : 'Inscrire'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message si aucun cours */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
          <svg className="w-16 h-16 text-[#6B7280] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-[#111827] mb-2">Aucun cours planifié</h3>
          <p className="text-[#6B7280] mb-4">Commencez par créer votre premier cours</p>
          <button
            onClick={() => setShowCourseForm(true)}
            className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white px-6 py-2 rounded-lg font-semibold hover:from-[#2563EB] hover:to-[#7C3AED] transition-all duration-300"
          >
            Créer un Cours
          </button>
        </div>
      )}

      {/* Modal Formulaire de Cours */}
      {showCourseForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Header avec gradient */}
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Nouveau Cours</h2>
                    <p className="text-white/80 text-sm">Planifiez un nouveau cours pour vos membres</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowCourseForm(false);
                    resetCourseForm();
                  }}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">

              <form onSubmit={handleAddCourse} className="space-y-4">
                {/* Nom du cours */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Nom du Cours <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.courseName}
                    onChange={(e) => setCourseForm({...courseForm, courseName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="Ex: Kickboxing Débutants"
                  />
                </div>

                {/* Type de sport */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Type de Sport <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={courseForm.sport}
                    onChange={(e) => setCourseForm({...courseForm, sport: e.target.value, customSport: ''})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  >
                    {sports.map(sport => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>
                  
                  {/* Input personnalisé si "Autre" est sélectionné */}
                  {courseForm.sport === 'Autre' && (
                    <input
                      type="text"
                      required
                      value={courseForm.customSport}
                      onChange={(e) => setCourseForm({...courseForm, customSport: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent mt-2"
                      placeholder="Entrez le type de sport..."
                    />
                  )}
                </div>

                {/* Nom du coach */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Nom du Coach <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.coachName}
                    onChange={(e) => setCourseForm({...courseForm, coachName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="Ex: Mohamed Alami"
                  />
                </div>

                {/* Jours de la semaine avec horaires individuels */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Jours et Horaires <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="space-y-3">
                    {daysOfWeek.map(day => (
                      <div key={day} className="flex items-center space-x-3 p-3 bg-[#F9FAFB] rounded-lg">
                        <input
                          type="checkbox"
                          checked={courseForm.days.includes(day)}
                          onChange={() => handleDayToggle(day)}
                          className="w-5 h-5 text-[#3B82F6] rounded focus:ring-2 focus:ring-[#3B82F6]"
                        />
                        <span className="font-medium text-[#111827] w-24">{day}</span>
                        
                        {courseForm.days.includes(day) && (
                          <div className="flex items-center space-x-2 flex-1">
                            <input
                              type="time"
                              value={courseForm.schedule[day]?.startTime || '09:00'}
                              onChange={(e) => updateDaySchedule(day, 'startTime', e.target.value)}
                              className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] text-sm"
                            />
                            <span className="text-[#6B7280]">→</span>
                            <input
                              type="time"
                              value={courseForm.schedule[day]?.endTime || '10:00'}
                              onChange={(e) => updateDaySchedule(day, 'endTime', e.target.value)}
                              className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3B82F6] text-sm"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capacité maximale */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Nombre Maximum de Participants <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="50"
                    value={courseForm.maxParticipants}
                    onChange={(e) => setCourseForm({...courseForm, maxParticipants: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>

                {/* Boutons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCourseForm(false);
                      resetCourseForm();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-200 text-[#6B7280] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white rounded-lg font-semibold hover:from-[#2563EB] hover:to-[#7C3AED] transition-all duration-300 shadow-sm"
                  >
                    Créer le Cours
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Formulaire d'Inscription Participant */}
      {showParticipantForm && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-scale-in">
            {/* Header avec gradient */}
            <div className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Inscrire un Membre</h2>
                    <p className="text-white/80 text-sm">{selectedCourse.courseName}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowParticipantForm(false);
                    resetParticipantForm();
                  }}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleAddParticipant} className="space-y-4">
                {/* Nom complet */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Nom Complet <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={participantForm.fullName}
                    onChange={(e) => setParticipantForm({...participantForm, fullName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="Ex: Ahmed Ali"
                  />
                </div>

                {/* Contact */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Email <span className="text-[#6B7280] text-xs">(optionnel)</span>
                    </label>
                    <input
                      type="email"
                      value={participantForm.email}
                      onChange={(e) => setParticipantForm({...participantForm, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                      placeholder="email@exemple.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Téléphone <span className="text-[#6B7280] text-xs">(optionnel)</span>
                    </label>
                    <input
                      type="tel"
                      value={participantForm.phone}
                      onChange={(e) => setParticipantForm({...participantForm, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                      placeholder="+212 6XX-XXXXXX"
                    />
                  </div>
                </div>

                {/* Prix mensuel */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Prix Mensuel (DH) <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={participantForm.price}
                    onChange={(e) => setParticipantForm({...participantForm, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="300"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">Abonnement mensuel pour ce cours</p>
                </div>

                {/* Boutons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowParticipantForm(false);
                      setSelectedCourse(null);
                      resetParticipantForm();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-200 text-[#6B7280] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white rounded-lg font-semibold hover:from-[#2563EB] hover:to-[#7C3AED] transition-all duration-300 shadow-sm"
                  >
                    Inscrire
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails du Cours Amélioré */}
      {showCourseDetails && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#111827]">{selectedCourse.courseName}</h2>
                  <p className="text-sm text-[#6B7280] mt-1">{selectedCourse.sport} • Coach: {selectedCourse.coachName}</p>
                </div>
                <button
                  onClick={() => {
                    setShowCourseDetails(false);
                    setSelectedCourse(null);
                    setEditingCourse(false);
                    setEditingParticipant(null);
                    setDetailsTab('info');
                    setSearchMember('');
                  }}
                  className="text-[#6B7280] hover:text-[#111827] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Onglets */}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => setDetailsTab('info')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    detailsTab === 'info'
                      ? 'bg-[#111827] text-white'
                      : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-gray-200'
                  }`}
                >
                  Informations du Cours
                </button>
                <button
                  onClick={() => setDetailsTab('participants')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    detailsTab === 'participants'
                      ? 'bg-[#111827] text-white'
                      : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-gray-200'
                  }`}
                >
                  Participants ({selectedCourse.participants?.length || 0})
                </button>
              </div>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Onglet Informations */}
              {detailsTab === 'info' && (
                <div className="space-y-6">
                  {!editingCourse ? (
                    <>
                      {/* Vue lecture */}
                      <div className="grid grid-cols-2 gap-4 p-4 bg-[#F9FAFB] rounded-lg">
                        <div>
                          <p className="text-xs text-[#6B7280] mb-1">Nom du cours</p>
                          <p className="text-sm font-medium text-[#111827]">{selectedCourse.courseName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6B7280] mb-1">Sport</p>
                          <p className="text-sm font-medium text-[#111827]">{selectedCourse.sport}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6B7280] mb-1">Coach</p>
                          <p className="text-sm font-medium text-[#111827]">{selectedCourse.coachName}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-[#6B7280] mb-2">Jours et Horaires</p>
                          <div className="space-y-1">
                            {selectedCourse.days.map((day) => {
                              const schedule = selectedCourse.schedule?.[day];
                              return (
                                <div key={day} className="flex items-center justify-between text-sm">
                                  <span className="font-medium text-[#111827]">{day}</span>
                                  <span className="text-[#6B7280]">
                                    {schedule ? `${schedule.startTime} - ${schedule.endTime}` : '-'}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-[#6B7280] mb-1">Capacité</p>
                          <p className="text-sm font-medium text-[#111827]">
                            {selectedCourse.participants?.length || 0} / {selectedCourse.maxParticipants} participants
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingCourse(true)}
                        className="w-full px-4 py-2 bg-[#111827] text-white rounded-lg font-semibold hover:bg-black transition-all"
                      >
                        Modifier les informations
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Vue édition */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#111827] mb-2">Nom du Cours</label>
                          <input
                            type="text"
                            value={editedCourseData.courseName || selectedCourse.courseName}
                            onChange={(e) => setEditedCourseData({...editedCourseData, courseName: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#111827] focus:border-transparent"
                            placeholder="Ex: Kickboxing Débutants"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-[#111827] mb-2">Sport</label>
                            <select
                              value={editedCourseData.sport || selectedCourse.sport}
                              onChange={(e) => setEditedCourseData({...editedCourseData, sport: e.target.value})}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#111827] focus:border-transparent"
                            >
                              <option value="Kickboxing">Kickboxing</option>
                              <option value="Cardio Workouts">Cardio Workouts</option>
                              <option value="Yoga">Yoga</option>
                              <option value="CrossFit">CrossFit</option>
                              <option value="Boxing">Boxing</option>
                              <option value="Pilates">Pilates</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[#111827] mb-2">Coach</label>
                            <input
                              type="text"
                              value={editedCourseData.coachName || selectedCourse.coachName}
                              onChange={(e) => setEditedCourseData({...editedCourseData, coachName: e.target.value})}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#111827] focus:border-transparent"
                              placeholder="Nom du coach"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#111827] mb-2">Nombre max de participants</label>
                          <input
                            type="number"
                            value={editedCourseData.maxParticipants || selectedCourse.maxParticipants}
                            onChange={(e) => setEditedCourseData({...editedCourseData, maxParticipants: parseInt(e.target.value)})}
                            min="1"
                            max="50"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#111827] focus:border-transparent"
                          />
                        </div>

                        {/* Jours et horaires */}
                        <div>
                          <label className="block text-sm font-semibold text-[#111827] mb-3">Jours et Horaires</label>
                          <div className="space-y-2">
                            {daysOfWeek.map((day) => {
                              const currentDays = editedCourseData.days !== undefined ? editedCourseData.days : selectedCourse.days;
                              const currentSchedule = editedCourseData.schedule !== undefined ? editedCourseData.schedule : selectedCourse.schedule || {};
                              const isSelected = currentDays.includes(day);
                              
                              return (
                                <div key={day} className="flex items-center space-x-3 p-3 bg-[#F9FAFB] rounded-lg">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => {
                                      const newDays = e.target.checked 
                                        ? [...currentDays, day]
                                        : currentDays.filter(d => d !== day);
                                      const newSchedule = {...currentSchedule};
                                      if (e.target.checked) {
                                        newSchedule[day] = { startTime: '09:00', endTime: '10:00' };
                                      } else {
                                        delete newSchedule[day];
                                      }
                                      setEditedCourseData({...editedCourseData, days: newDays, schedule: newSchedule});
                                    }}
                                    className="w-4 h-4 text-[#3B82F6] rounded focus:ring-2 focus:ring-[#3B82F6]"
                                  />
                                  <span className="text-sm font-medium text-[#111827] w-24">{day}</span>
                                  {isSelected && (
                                    <div className="flex items-center space-x-2 flex-1">
                                      <input
                                        type="time"
                                        value={currentSchedule[day]?.startTime || '09:00'}
                                        onChange={(e) => {
                                          const newSchedule = {...currentSchedule};
                                          newSchedule[day] = {...newSchedule[day], startTime: e.target.value};
                                          setEditedCourseData({...editedCourseData, schedule: newSchedule});
                                        }}
                                        className="px-3 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-[#111827]"
                                      />
                                      <span className="text-[#6B7280]">-</span>
                                      <input
                                        type="time"
                                        value={currentSchedule[day]?.endTime || '10:00'}
                                        onChange={(e) => {
                                          const newSchedule = {...currentSchedule};
                                          newSchedule[day] = {...newSchedule[day], endTime: e.target.value};
                                          setEditedCourseData({...editedCourseData, schedule: newSchedule});
                                        }}
                                        className="px-3 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-[#111827]"
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setEditingCourse(false);
                            setEditedCourseData({});
                          }}
                          className="flex-1 px-4 py-2 bg-[#F9FAFB] text-[#111827] rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={() => {
                            updateCourse(selectedCourse.id, editedCourseData);
                            setEditingCourse(false);
                            setEditedCourseData({});
                            showToast('Cours modifié avec succès!', 'success');
                          }}
                          className="flex-1 px-4 py-2 bg-[#111827] text-white rounded-lg font-semibold hover:bg-black transition-all"
                        >
                          Sauvegarder
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Onglet Participants */}
              {detailsTab === 'participants' && (
                <div className="space-y-4">
                  {/* Search bar et bouton ajouter */}
                  <div className="flex space-x-3">
                    <div className="flex-1 relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={searchMember}
                        onChange={(e) => setSearchMember(e.target.value)}
                        placeholder="Rechercher un membre..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#111827] focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setShowParticipantForm(true);
                        resetParticipantForm();
                      }}
                      className="px-4 py-2 bg-[#111827] text-white rounded-lg font-semibold hover:bg-black transition-all flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Ajouter</span>
                    </button>
                  </div>

                  {/* Liste des participants */}
                  {selectedCourse.participants && selectedCourse.participants.length > 0 ? (
                    <div className="space-y-2">
                      {selectedCourse.participants
                        .filter(p => p.fullName.toLowerCase().includes(searchMember.toLowerCase()))
                        .map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg hover:bg-gray-100 transition-colors">
                          {editingParticipant?.id === participant.id ? (
                            // Mode édition
                            <div className="flex-1 grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={editedParticipantData.fullName || ''}
                                onChange={(e) => setEditedParticipantData({...editedParticipantData, fullName: e.target.value})}
                                placeholder="Nom complet"
                                className="px-3 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-[#111827]"
                              />
                              <input
                                type="email"
                                value={editedParticipantData.email || ''}
                                onChange={(e) => setEditedParticipantData({...editedParticipantData, email: e.target.value})}
                                placeholder="Email"
                                className="px-3 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-[#111827]"
                              />
                              <input
                                type="tel"
                                value={editedParticipantData.phone || ''}
                                onChange={(e) => setEditedParticipantData({...editedParticipantData, phone: e.target.value})}
                                placeholder="Téléphone"
                                className="px-3 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-[#111827]"
                              />
                              <input
                                type="number"
                                value={editedParticipantData.price || ''}
                                onChange={(e) => setEditedParticipantData({...editedParticipantData, price: parseInt(e.target.value) || 0})}
                                placeholder="Prix (DH)"
                                className="px-3 py-1.5 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-[#111827]"
                              />
                            </div>
                          ) : (
                            // Mode lecture
                            <div className="flex items-center space-x-4 flex-1">
                              <div className="w-10 h-10 bg-[#111827] rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                  {participant.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-[#111827]">{participant.fullName}</p>
                                <p className="text-sm text-[#6B7280]">
                                  {participant.email || 'Pas d\'email'} • {participant.phone || 'Pas de téléphone'}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-[#111827]">{participant.price} DH/mois</span>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2 ml-3">
                            {editingParticipant?.id === participant.id ? (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingParticipant(null);
                                    setEditedParticipantData({});
                                  }}
                                  className="p-2 text-[#6B7280] hover:text-[#111827] transition-colors"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    updateParticipant(selectedCourse.id, participant.id, editedParticipantData);
                                    setEditingParticipant(null);
                                    setEditedParticipantData({});
                                    showToast('Participant modifié avec succès!', 'success');
                                  }}
                                  className="p-2 text-[#10B981] hover:text-[#059669] transition-colors"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingParticipant(participant);
                                    setEditedParticipantData({
                                      fullName: participant.fullName,
                                      email: participant.email || '',
                                      phone: participant.phone || '',
                                      price: participant.price
                                    });
                                  }}
                                  className="p-2 text-[#6B7280] hover:text-[#111827] transition-colors"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    showConfirm(
                                      `Êtes-vous sûr de vouloir retirer ${participant.fullName} de ce cours ?`,
                                      () => {
                                        removeParticipant(selectedCourse.id, participant.id);
                                        showToast(`${participant.fullName} a été retiré du cours`, 'success');
                                      }
                                    );
                                  }}
                                  className="p-2 text-[#DC2626] hover:text-[#B91C1C] transition-colors"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[#6B7280]">
                      <svg className="w-16 h-16 mx-auto mb-3 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="font-medium">Aucun participant inscrit</p>
                      <p className="text-sm mt-1">Cliquez sur "Ajouter" pour inscrire un membre</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-[70] animate-slide-in">
          <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-2xl border-l-4 ${
            toast.type === 'success' 
              ? 'bg-white border-[#10B981] text-[#111827]' 
              : toast.type === 'error'
              ? 'bg-white border-[#DC2626] text-[#111827]'
              : 'bg-white border-[#3B82F6] text-[#111827]'
          }`}>
            {toast.type === 'success' && (
              <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg className="w-6 h-6 text-[#DC2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast({ show: false, message: '', type: '' })}
              className="ml-4 text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmDialog.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#FEF3C7] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#111827] mb-2">Confirmation</h3>
                <p className="text-[#6B7280]">{confirmDialog.message}</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setConfirmDialog({ show: false, message: '', onConfirm: null })}
                className="flex-1 px-4 py-2.5 bg-[#F9FAFB] text-[#111827] rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  confirmDialog.onConfirm();
                  setConfirmDialog({ show: false, message: '', onConfirm: null });
                }}
                className="flex-1 px-4 py-2.5 bg-[#DC2626] text-white rounded-lg font-semibold hover:bg-[#B91C1C] transition-all"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanningManagement;
