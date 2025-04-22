import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import "./Clients.css"; // Importación de los estilos
import useAuthStore from "../../../store/authStore";

export const DashBoardEntrenador = () => {
  const { user } = useAuthStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const query = e.target.value.toLowerCase();
    // setSearchQuery(query);

    // // Aquí deberías filtrar los clientes desde tu backend o estado real
    // setFilteredClients([]); // Reemplazar con lógica real
  };

  return (
    <DashboardLayout>
      <div className="clients-container">
        <div className="clients-header">
          <div>
            <h1 className="title">Mis Clientes</h1>
            <p className="subtitle">Administra y haz seguimiento a tus clientes.</p>
          </div>
          <button className="btn primary">
            ➕ Nuevo Cliente
          </button>
        </div>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            placeholder="Buscar cliente por nombre o email..."
            className="search-input"
            // value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="tabs">
          <div className="tabs-list">
            <button className="tab active">Activos</button>
            <button className="tab">Inactivos</button>
            <button className="tab">Todos</button>
          </div>

          <div className="tabs-content">
            {filteredClients.length === 0 ? (
              <div className="no-results">
                No se encontraron clientes que coincidan con tu búsqueda.
              </div>
            ) : (
              <div className="client-grid">
                {filteredClients.map((client) => (
                  <div className="client-card" key={client.id}>
                    <div className="client-header">
                      <img src={client.avatar} alt={client.name} className="avatar" />
                      <div>
                        <h3>{client.name}</h3>
                        <p className="email">{client.email}</p>
                      </div>
                    </div>
                    <div className="client-info">
                      <p><strong>Objetivo:</strong> {client.goal}</p>
                      <p><strong>Se unió:</strong> {client.joinDate}</p>
                      <p><strong>Última actividad:</strong> {client.lastActive}</p>
                      <p><strong>Progreso:</strong> {client.progress}%</p>
                    </div>
                    <div className="client-actions">
                      <Link to={`/trainer/progress/${client.id}`} className="btn outline">
                        👁️ Ver progreso
                      </Link>
                      <Link to="/trainer/routines" className="btn">
                        📈 Rutinas
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

