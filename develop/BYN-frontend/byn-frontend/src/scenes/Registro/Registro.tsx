import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import styles from "./Registro.module.css";
import InputText from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Form from "../../components/Form";
import { BackButton } from "../../components/BackButton";
import Switch from "../../components/Switch/Switch";
import { User } from "../../types";
import { createUser } from "../../services/userService";
import { toast } from "react-toastify";
import { ApiErrorResponse } from "../../types/api";
import { showApiErrorToast } from "../../utils/showApiErrorToast";


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
  optionChooseRole=false,
  selectedOptionRole = "ENTRENADOR",
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

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setLoading(true);
  
  //   try {
  //     const newUser: User = {
  //       nombre: formData.nombre,
  //       password: formData.password,
  //       email: formData.email,
  //       role: formData.role,
  //       entrenadorId: createClientFromTrainer ? entrenadorId : undefined,
  //     };
  
  //     const response = await createUser(newUser);
  
  //     console.log(formData.role + " creado exitosamente:", response);
  //     toast.success(`${formData.role} creado exitosamente`);
  
  //     if (onSuccess) {
  //       onSuccess();
  //     }
  //   } catch (error: any) {
  //     console.error("Error al registrar el usuario:", error);
  
  //     const res = error?.response?.data as ApiErrorResponse;
  
  //     if (res?.code === "VALIDATION_ERROR" && Array.isArray(res.messages)) {
  //       res.messages.forEach((msg) => toast.error(msg));
  //     } else if (res?.error) {
  //       toast.error(res.error);
  //     } else if (error.request) {
  //       console.error("No se recibió respuesta del servidor:", error.request);
  //       toast.error("No se recibió respuesta del servidor");
  //     } else {
  //       console.error("Error al hacer la solicitud:", error.message);
  //       toast.error("Hubo un error inesperado");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
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
  
      console.log(`${formData.role} creado exitosamente:`, response);
      toast.success(`${formData.role} creado exitosamente`);
  
      onSuccess?.(); // si existe, se ejecuta
    } catch (error) {
      showApiErrorToast(error); // ✅ manejo centralizado de errores
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
