import { ValidationError } from "class-validator";

export const formatValidationErrors = (errors: ValidationError[]): string[] => {
  return errors.flatMap((error) =>
    error.constraints ? Object.values(error.constraints) : []
  );
};
