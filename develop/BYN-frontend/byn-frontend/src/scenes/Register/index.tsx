import React, { useState } from "react";
import { Card } from "../../components/Card/Card";
import styles from "./styles.module.css";
import InputText from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Form from "../../components/Form";
import { BackButton } from "../../components/BackButton";
import { createUser } from "../../services/api";
import Switch from "../../components/Switch/Switch";

export const Registro: React.FC = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "", 
    role: ""
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    setLoading(true);
  
    try {
      const response = await createUser({
        nombre: formData.username,
        password: formData.password,
        email: formData.email,
        role: ""
      });
      console.log("Usuario creado exitosamente:", response);
      alert("Usuario creado exitosamente");
  
    } catch (error: any) {
      console.error("Error al registrar el usuario");
  
      if (error.response) {
        // Imprimimos la respuesta completa del error desde el backend
        console.error("Detalles del error desde el backend:", error.response.data);
  
        // Mostrar el mensaje de error que devuelve el backend
        setError(error.response?.data?.error || "Hubo un problema al registrar el usuario");
      } else if (error.request) {
        // Si no se recibe respuesta del servidor
        console.error("No se recibió respuesta del servidor:", error.request);
        setError("No se recibió respuesta del servidor");
      } else {
        // Si hay otro tipo de error
        console.error("Error al hacer la solicitud:", error.message);
        setError("Hubo un error inesperado");
      }
  
    } finally {
      setLoading(false);
    }
  };
  
  
  const [selectedOption, setSelectedOption] = useState<string>('ENTRENADOR');

  const handleSwitchChange = (value: string) => {
    setSelectedOption(value);
    formData.role = value; 
  };

  return (
    <div className={styles.container}>
      <h2 style={{color:"white", fontSize: "30px"}}>Registro</h2>

      <Card
        shadow
        bordered
        style={{
          width: "50%",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <InputText
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
            hasLabel={true}
            labelText="Nombre de usuario"
          />
          <InputText
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            hasLabel={true}
            labelText="Correo electrónico"
          />
          <InputText
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            hasLabel={true}
            labelText="Contraseña"
            canPaste={false}
          />
          <InputText
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            hasLabel={true}
            labelText="Confirmar contraseña"
            canPaste={false}
          />
          <Switch selectedOption={selectedOption} onChange={handleSwitchChange} />
          <Button size="large" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </Form>
      </Card>

      {error && <div className="error-message">{error}</div>} {/* Mostramos el error si ocurre */}

      <BackButton />
    </div>
  );
};
