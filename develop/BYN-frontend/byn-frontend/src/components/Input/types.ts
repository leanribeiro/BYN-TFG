export interface InputTextProps {
  type: string;
  name: string;
  placeholder: string;
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  hasLabel?: boolean;
  labelText?: string; 
  canPaste?:boolean;
}
