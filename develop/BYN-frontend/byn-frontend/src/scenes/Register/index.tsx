import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import styles from "./Register.module.css";
import InputText from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Form from "../../components/Form";
import { BackButton } from "../../components/BackButton";
import Switch from "../../components/Switch/Switch";
import { User } from "../../types";
import { createUser } from "../../services/userService";

interface props {
  customStyles?: React.CSSProperties;
  containerStyles?: React.CSSProperties;
  optionChooseRole?: boolean;
  selectedOptionRole?: string;
  createClientFromTrainer?: boolean;
  entrenadorId?: number;
  onSuccess?: () => void;
}

export const Registro: React.FC<props> = ({
  customStyles,
  containerStyles,
  optionChooseRole,
  selectedOptionRole,
  createClientFromTrainer,
  entrenadorId,
  onSuccess
}) => {

  const [selectedOption, setSelectedOption] = useState<string>(selectedOptionRole || "ENTRENADOR");

  const [formData, setFormData] = React.useState({
    nombre: "",
    password: "",
    email: "",
    confirmPassword: "",
    role: selectedOptionRole || "ENTRENADOR",
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
      const newUser: User = {
        nombre: formData.nombre,
        password: formData.password,
        email: formData.email,
        role: formData.role,
        entrenadorId: createClientFromTrainer ? entrenadorId : undefined,
      };
      const response = await createUser(newUser);
      console.log(formData.role + " creado exitosamente:", response);
      alert(formData.role + " creado exitosamente:");

      if (onSuccess) {
       console.log("Llamando a onSuccess desde el registro");
        onSuccess(); // ✅ Llamamos a onSuccess si todo salió bien
      }

      // handleChange(); // Llamamos a handleChange para cerrar el popup
    } catch (error: any) {
      console.error("Error al registrar el usuario");

      if (error.response) {
        // Imprimimos la respuesta completa del error desde el backend
        console.error(
          "Detalles del error desde el backend:",
          error.response.data
        );

        // Mostrar el mensaje de error que devuelve el backend
        setError(
          error.response?.data?.error ||
            "Hubo un problema al registrar el usuario"
        );
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

  useEffect(() => {
    if (selectedOptionRole) {
      setSelectedOption(selectedOptionRole);
      setFormData((prev) => ({ ...prev, role: selectedOptionRole }));
    }
  }, [selectedOptionRole]);
  

  const handleSwitchChange = (value: string) => {
    setSelectedOption(value);
    formData.role = value;
  };

  return (
    <div className={styles.container} style={customStyles}>
      <h2 style={{ color: "white", fontSize: "30px" }}>Registro</h2>
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
          ...containerStyles,
        }}
      >
        <Form onSubmit={handleSubmit}>
          <InputText
            type="text"
            name="nombre"
            placeholder="Nombre de usuario"
            value={formData.nombre}
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
          <Switch
            selectedOption={selectedOption}
            onChange={handleSwitchChange}
            disableChooseRole={!optionChooseRole}
          />
          <Button size="large" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </Form>
      </Card>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Mostramos el error si ocurre */}
      <BackButton />
    </div>
  );
};
