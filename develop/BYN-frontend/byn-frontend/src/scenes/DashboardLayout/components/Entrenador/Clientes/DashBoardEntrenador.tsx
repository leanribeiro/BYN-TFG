
import { useEffect, useState } from "react";
import { getClientsByEntrenador } from "../../../../../services/userService";

import styles from "./DashBoardEntrenador.module.css";
import { CustomPopup } from "../../../../../components/Popuop/Popup";
import Button from "../../../../../components/Button/Button";
import { Registro } from "../../../../Registro/Registro";
import { ClientCard } from "../../../../../components/CardClient/ClientCard";
import { Plus, Search } from "lucide-react";
import useAuthStore from "../../../../../store/authStore";

export const DashBoardEntrenador = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<any[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useAuthStore();


  const getClientes = async () => {
    try {
      const data = await getClientsByEntrenador(user?.id);
      setClientes(data);
      setFilteredClientes(data);
    } catch (err) {
      console.error("Error trayendo los clientes:", err);
    }
  };

  useEffect(() => {
    getClientes();
  }, [user?.id]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = clientes.filter(
      (c) =>
        c.nombre.toLowerCase().includes(value) ||
        c.email.toLowerCase().includes(value)
    );
    setFilteredClientes(filtered);
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
        <Button onClick={() => setPopupOpen(true)}>
        <Plus/>  Nuevo Cliente</Button>
        <CustomPopup onClose={() => setPopupOpen(false)} open={popupOpen}>
          <Registro
            optionChooseRole={false}
            createClientFromTrainer={true}
            entrenadorId={user?.id}
            selectedOptionRole="CLIENTE"
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
        <span className={styles.searchIcon}><Search /></span>
        <input
          placeholder="Buscar cliente por nombre o email..."
          className={styles.searchInput}
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className={styles.clientList}>
        {filteredClientes.map((cliente) => (
          <ClientCard
            key={cliente.id}
            id={cliente.id}
            nombre={cliente.nombre}
            email={cliente.email}
            onDelete={() =>{
              getClientes();
            }}
          />
        ))}
      </div>
    </div>
  );
};
