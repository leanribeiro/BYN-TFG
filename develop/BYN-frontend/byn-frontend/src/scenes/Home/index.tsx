import React from "react";
import { NavBar } from "../../components/NavBar";
import { Card } from "../../components/Card/Card";
import styles from "./styles.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
export const Home: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className={styles.containerPrincipal}>
        <Card
          hoverable
          backgroundColor="transparent"
          style={{
            width: "90%",
            height: "75vh",
            margin: "2rem auto",
            display: "flex",
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "6rem",
              fontWeight: "bold",
              letterSpacing: "12px",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            BE YOUR NEXT
          </h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button size="medium">
              <Link to="/registro">Comenzar Ahora</Link>
            </Button>
            <Button size="medium">
              <Link to="/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};
