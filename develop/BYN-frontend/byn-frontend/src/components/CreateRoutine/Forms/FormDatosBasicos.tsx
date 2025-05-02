import React from 'react'
import InputText from '../../Input/Input'
import TextAreaInput from '../../TextareaInput/TextAreaInput'
import SelectInput from '../../SelectIput/SelectInput'
import styles from "./FormDatosBasicos.module.css";
import Form from '../../Form';

interface FormDatosBasicosProps {
    formData: {
        titulo: string;
        tipo: string;
        objetivo: string;
        descripcion: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    selectTipoEntrenamientoOptions: { label: string; value: string }[];
    selectObejetivosOptions: { label: string; value: string }[];

}
export const FormDatosBasicos: React.FC<FormDatosBasicosProps> = ({
    formData,
    handleInputChange,
    selectTipoEntrenamientoOptions,
    selectObejetivosOptions,
}) => {
  return (
    <Form>
        <div className={styles.gridInputs}>
          <InputText
            type="text"
            name="titulo"
            placeholder="Nombre de la rutina"
            value={formData.titulo}
            onChange={handleInputChange}
            required
          />
          <SelectInput
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            required
            options={selectTipoEntrenamientoOptions}
          />
          <SelectInput
            name="objetivo"
            value={formData.objetivo}
            onChange={handleInputChange}
            required
            options={selectObejetivosOptions}
          />
          <TextAreaInput
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            placeholder="Descripción breve"
            required
            styleCustom={{ height: "50px" }}
          />
        </div>
      </Form>
  )
}
