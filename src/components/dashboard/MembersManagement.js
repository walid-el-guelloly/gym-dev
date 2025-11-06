import React, { useState, useEffect } from 'react';
import { useDashboard } from './DashboardContext';

/**
 * Gestion des Membres - Système complet CRUD
 * Fonctionnalités: Ajouter, Modifier, Supprimer, Calcul automatique des statuts
 */
const MembersManagement = ({ userRole, action, onActionComplete }) => {
  const { members, setMembers, addMember: addMemberToContext, updateMember: updateMemberInContext, deleteMember: deleteMemberFromContext } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  
  // Formulaire state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subscriptionType: 'Month Pass',
    price: 200,
    registrationDate: new Date().toISOString().split('T')[0]
  });

  // Ouvrir le formulaire si action='add' depuis le header
  useEffect(() => {
    if (action === 'add') {
      setShowForm(true);
      setEditingMember(null);
      resetForm();
      if (onActionComplete) onActionComplete();
    }
  }, [action, onActionComplete]);
  
  // Calculer le statut basé sur la date d'inscription et le type d'abonnement
  const calculateStatus = (registrationDate, subscriptionType) => {
    const regDate = new Date(registrationDate);
    const today = new Date();
    const diffTime = today - regDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (subscriptionType === 'Day Pass') {
      return diffDays <= 1 ? 'active' : 'expired';
    } else if (subscriptionType === 'Month Pass') {
      return diffDays <= 30 ? 'active' : 'expired';
    }
    return 'expired';
  };
  
  // Mettre à jour les statuts automatiquement au montage
  useEffect(() => {
    const timer = setInterval(() => {
      setMembers(prevMembers => 
        prevMembers.map(member => ({
          ...member,
          status: calculateStatus(member.registrationDate, member.subscriptionType)
        }))
      );
    }, 60000); // Vérifier toutes les minutes
    
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Exécuter une fois au montage
  
  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subscriptionType: 'Month Pass',
      price: 200,
      registrationDate: new Date().toISOString().split('T')[0]
    });
  };
  
  // Gérer le changement de type d'abonnement
  const handleSubscriptionChange = (type) => {
    setFormData({
      ...formData,
      subscriptionType: type,
      price: type === 'Month Pass' ? 200 : 25
    });
  };
  
  // Ajouter un nouveau membre (utilise le contexte pour synchronisation automatique)
  const handleAddMember = (e) => {
    e.preventDefault();
    const memberData = {
      ...formData,
      status: calculateStatus(formData.registrationDate, formData.subscriptionType)
    };
    addMemberToContext(memberData);
    setShowForm(false);
    resetForm();
  };
  
  // Modifier un membre
  const handleEditMember = (member) => {
    setEditingMember(member);
    setFormData({
      fullName: member.fullName,
      email: member.email || '',
      phone: member.phone || '',
      subscriptionType: member.subscriptionType,
      price: member.price,
      registrationDate: member.registrationDate
    });
    setShowForm(true);
  };
  
  // Sauvegarder les modifications
  const handleUpdateMember = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      status: calculateStatus(formData.registrationDate, formData.subscriptionType)
    };
    updateMemberInContext(editingMember.id, updatedData);
    setShowForm(false);
    setEditingMember(null);
    resetForm();
  };
  
  // Supprimer un membre
  const handleDeleteMember = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      deleteMemberFromContext(id);
    }
  };

  const filteredMembers = members.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase()))
  ).filter(member =>
    activeTab === 'all' || member.status === activeTab
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-[#10B981] text-white';
      case 'expired': return 'bg-[#DC2626] text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Gestion des Membres</h1>
          <p className="text-[#6B7280] text-sm mt-1">Gérez les membres et leurs abonnements</p>
        </div>
        <button 
          onClick={() => {
            setShowForm(true);
            setEditingMember(null);
            resetForm();
          }}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouveau Membre</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un membre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            {['all', 'active', 'expired'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab === 'all' ? 'Tous' : tab === 'active' ? 'Actifs' : 'Expirés'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Membre
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Abonnement
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Dernière visite
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-[#111827]">{member.fullName}</div>
                      <div className="text-xs text-[#6B7280]">Inscrit le {member.registrationDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#111827]">{member.email || '-'}</div>
                    <div className="text-xs text-[#6B7280]">{member.phone || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#111827]">{member.subscriptionType}</div>
                    <div className="text-xs text-[#6B7280]">{member.price} DH</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-lg ${getStatusColor(member.status)}`}>
                      {member.status === 'active' ? 'Actif' : 'Expiré'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                    {member.registrationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditMember(member)}
                        className="text-[#3B82F6] hover:text-[#2563EB] transition-colors"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-[#DC2626] hover:text-[#B91C1C] transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Formulaire Modal d'ajout/modification */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#111827]">
                  {editingMember ? 'Modifier le Membre' : 'Nouveau Membre'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingMember(null);
                    resetForm();
                  }}
                  className="text-[#6B7280] hover:text-[#111827] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={editingMember ? handleUpdateMember : handleAddMember} className="space-y-4">
                {/* Nom complet */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Nom Complet <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="Ex: Ahmed Ali"
                  />
                </div>
                
                {/* Contact (optionnel) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Email <span className="text-[#6B7280] text-xs">(optionnel)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                      placeholder="exemple@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Téléphone <span className="text-[#6B7280] text-xs">(optionnel)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                      placeholder="+212 6XX-XXXXXX"
                    />
                  </div>
                </div>
                
                {/* Date d'inscription (automatique) */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Date d'Inscription
                  </label>
                  <input
                    type="date"
                    value={formData.registrationDate}
                    onChange={(e) => setFormData({...formData, registrationDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
                
                {/* Type d'abonnement */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Type d'Abonnement <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleSubscriptionChange('Month Pass')}
                      className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        formData.subscriptionType === 'Month Pass'
                          ? 'bg-[#3B82F6] text-white shadow-sm'
                          : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200'
                      }`}
                    >
                      Month Pass
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSubscriptionChange('Day Pass')}
                      className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        formData.subscriptionType === 'Day Pass'
                          ? 'bg-[#3B82F6] text-white shadow-sm'
                          : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200'
                      }`}
                    >
                      Day Pass
                    </button>
                  </div>
                </div>
                
                {/* Prix (modifiable) */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Prix (DH) <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="200"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">
                    Prix par défaut: {formData.subscriptionType === 'Month Pass' ? '200' : '25'} DH (modifiable)
                  </p>
                </div>
                
                {/* Boutons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingMember(null);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-200 text-[#6B7280] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white rounded-lg font-semibold hover:from-[#2563EB] hover:to-[#7C3AED] transition-all duration-300 shadow-sm"
                  >
                    {editingMember ? 'Sauvegarder' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersManagement;