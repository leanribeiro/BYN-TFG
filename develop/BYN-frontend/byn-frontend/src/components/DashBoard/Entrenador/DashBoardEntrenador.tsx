import { useEffect, useState } from "react";
import styles from "./DashBoardEntrenador.module.css";
import { DashBoardProps } from "../../../types";
import { getClientsByEntrenador } from "../../../services/api";
import { ClientCard } from "../../../components/CardClient/CardClient";
import { CustomPopup } from "../../Popuop/Popup";
import Button from "../../Button/Button";
import { Registro } from "../../../scenes/Register";

export const DashBoardEntrenador = (props: DashBoardProps) => {
  const { user } = props;
  const [clientes, setClientes] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);

  const getClientes = async () => {
    try {
      const data = await getClientsByEntrenador(user?.id);
      setClientes(data);
    } catch (err) {
      console.error("Error trayendo los clientes:", err);
    }
  };


  useEffect(() => {
    getClientes();
  }, [user?.id]);

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
        <Button 
          className={styles.addButton}
          onClick={() => setPopupOpen(true)}
        >
          ➕ Nuevo Cliente
        </Button>
        <CustomPopup

          onClose={() => setPopupOpen(false)}
          open={popupOpen}
        >
        
          <Registro
            optionChooseRole={false}
            createClientFromTrainer={true}
            entrenadorId={user?.id}
            selectedOptionRole =  "CLIENTE"
            onSuccess={() => {
              setPopupOpen(false); 
              getClientes();      
            }}
            customStyles={{
              width: "400px",
              height: "500px",
              paddingTop: "130px",
            }}
            containerStyles={{ width: "90vh" }}
          />
        </CustomPopup>
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
