import React from 'react';
import TextField from '@mui/material/TextField';

interface ProfessorFormProps {
  formData: {
    idNumber: string;
    position: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({ formData, onChange }) => {
  return (
    <>
      <TextField
        name="idNumber"
        label="교수 번호"
        variant="outlined"
        fullWidth
        required
        value={formData.idNumber}
        onChange={onChange}
      />
      <TextField
        name="position"
        label="직급"
        variant="outlined"
        fullWidth
        required
        value={formData.position}
        onChange={onChange}
      />
    </>
  );
};

export default ProfessorForm;
