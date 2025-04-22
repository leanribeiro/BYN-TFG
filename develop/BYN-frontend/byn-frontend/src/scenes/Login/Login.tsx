import React from "react";
import { Card } from "../../components/Card/Card";
import styles from "./styles.module.css";
import InputText from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Form from "../../components/Form";
import { BackButton } from "../../components/BackButton";
import { loginUser } from "../../services/api";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {

  const navigate = useNavigate();


  const [formData, setFormData] = React.useState({
 
    password: "",
    email: "",
  
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const login = useAuthStore((state) => state.login);  
  const setLoadingState = useAuthStore((state) => state.setLoading);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    setLoading(true);
    setLoadingState(true);

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log("Usuario logeado:", response);

      navigate("/dashboard/entrenador");  
      if(response.token) {
        login(response.token,response.user); 
        localStorage.setItem("token", response.token); 
      }

    } catch (error: any) {
      console.error("Error al iniciar sesión");
  
      if (error.response) {
        console.error("Detalles del error desde el backend:", error.response.data);
  
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
          <Button size="large" type="submit" disabled={loading}>
            {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </Button>
        </Form>
      </Card>

      {error && <div className="error-message">{error}</div>} {/* Mostramos el error si ocurre */}

      <BackButton />
    </div>
  );
};
