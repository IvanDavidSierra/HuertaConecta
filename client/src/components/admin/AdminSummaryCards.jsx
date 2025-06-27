import React, { useEffect, useState } from 'react';
import './AdminSummaryCards.css';
import { fetchDashboardCounts } from '../../services/dashboardService';

const AdminSummaryCards = () => {
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardCounts()
      .then(data => {
        setCounts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('No se pudieron cargar los datos');
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-summary-cards">
      <div className="card red">Tipos de Usuario<br /><b>{loading ? '-' : (counts?.tiposUsuario ?? '-')}</b></div>
      <div className="card blue">Usuarios<br /><b>{loading ? '-' : (counts?.usuarios ?? '-')}</b></div>
      <div className="card green">Huertas<br /><b>{loading ? '-' : (counts?.huertas ?? '-')}</b></div>
      <div className="card yellow">Publicaciones<br /><b>{loading ? '-' : (counts?.publicaciones ?? '-')}</b></div>
      <div className="card purple">Cultivos<br /><b>{loading ? '-' : (counts?.cultivos ?? '-')}</b></div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AdminSummaryCards; 