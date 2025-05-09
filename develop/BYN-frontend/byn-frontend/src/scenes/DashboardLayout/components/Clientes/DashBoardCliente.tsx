import { useEffect, useState } from "react";
import styles from "./DashBoardCliente.module.css";
import { DashBoardProps } from "../../../types";
import { getClientsByEntrenador } from "../../../services/api";
import { ClientCard } from "../../CardClient/ClientCard";


export const DashBoardCliente = (props: DashBoardProps) => {
  const { user } = props;
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    getClientes();
  }, [user?.id]);

  const getClientes = async () => {
    try {
      const data = await getClientsByEntrenador(user?.id);
      setClientes(data);
    } catch (err) {
      console.error("Error trayendo los clientes:", err);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // lógica de búsqueda futura
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Mis Clientes</h1>
          <p className={styles.subtitle}>
            Administra y haz seguimiento a tus clientes.
          </p>
        </div>
        <button className={styles.addButton}>➕ Nuevo Cliente</button>
      </div>

      <div className={styles.searchBox}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          placeholder="Buscar cliente por nombre o email..."
          className={styles.searchInput}
          onChange={handleSearch}
        />
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>Activos</button>
        <button className={styles.tab}>Inactivos</button>
        <button className={styles.tab}>Todos</button>
      </div>
      <div className={styles.clientList}>
      {clientes.map((cliente: any) => (
        <ClientCard 
          key={cliente.id} 
          id={cliente.id} 
          nombre={cliente.nombre} 
          email={cliente.email} 
        />
      ))}
    </div>

    </div>
  );
};
