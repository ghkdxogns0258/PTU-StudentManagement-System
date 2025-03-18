import * as React from 'react';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
  Autocomplete,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from '../theme/AppTheme';
import ColorModeSelect from '../theme/ColorModeSelect';
import ProfessorForm from '../components/forms/ProfessorForm';
import StudentForm from '../components/forms/StudentForm';
import { useUserSettings } from '../hooks/useUserSettings';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '500px',
  boxShadow: theme.shadows[3],
}));

const UserSettingContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function UserSetting() {
  const {
    role,
    formData,
    universitiesData,
    professorsData,
    mutation,
    handleRoleChange,
    handleInputChange,
    handleUniversityChange,
    handleProfessorChange,
    handleSubmit,
  } = useUserSettings();

  return (
    <AppTheme>
      <CssBaseline />
      <UserSettingContainer>
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <Typography component="h1" variant="h5" textAlign="center">
            사용자 설정
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup row value={role} onChange={handleRoleChange}>
              <FormControlLabel value="professor" control={<Radio />} label="교수" />
              <FormControlLabel value="student" control={<Radio />} label="학생" />
            </RadioGroup>
          </FormControl>

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            {/* 대학 선택 */}
            <Autocomplete
              options={universitiesData}
              getOptionLabel={(option) => option.name}
              onChange={handleUniversityChange}
              renderInput={(params) => <TextField {...params} label="소속 대학" required />}
            />

            {/* 교수/학생별 폼 분리 */}
            {role === 'professor' ? (
              <ProfessorForm formData={formData as any} onChange={handleInputChange} />
            ) : (
              <StudentForm
                formData={formData as any}
                professors={professorsData}
                onChange={handleInputChange}
                onAdvisorChange={handleProfessorChange}
              />
            )}

            {/* 이름 입력 */}
            <TextField name="name" label="이름" variant="outlined" fullWidth required value={formData.name} onChange={handleInputChange} />

            {/* 저장 버튼 */}
            <Button type="submit" variant="contained" fullWidth disabled={mutation.isPending}>
              저장
            </Button>
          </Box>
        </Card>
      </UserSettingContainer>
    </AppTheme>
  );
}
