import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface StudentFormProps {
  formData: {
    idNumber: string;
    advisor: string;
  };
  professors: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdvisorChange: (event: any, newValue: string | null) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ formData, professors, onChange, onAdvisorChange }) => {
  return (
    <>
      <Autocomplete
        options={professors}
        value={formData.advisor}
        onChange={onAdvisorChange}
        renderInput={(params) => (
          <TextField {...params} label="지도 교수" variant="outlined" fullWidth required />
        )}
      />
      <TextField
        name="idNumber"
        label="학번"
        variant="outlined"
        fullWidth
        required
        value={formData.idNumber}
        onChange={onChange}
      />
    </>
  );
};

export default StudentForm;
