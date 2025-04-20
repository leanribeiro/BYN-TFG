export interface InputTextProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  hasLabel?: boolean;
  labelText?: string; 
  canPaste?:boolean;
}
