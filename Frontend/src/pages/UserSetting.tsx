import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import AppTheme from '../theme/AppTheme';
import ColorModeSelect from '../theme/ColorModeSelect';
import { getUniversities, getProfessors, createUser } from '../api/usersettingService';
import ProfessorForm from '../components/forms/ProfessorForm';
import StudentForm from '../components/forms/StudentForm';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '500px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
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
  const navigate = useNavigate();

  // 교수/학생 구분
  const [userType, setUserType] = React.useState<'professor' | 'student'>('professor');

  // 입력 데이터 (교수는 position 필수, 학생은 advisor 필수)
  const [formData, setFormData] = React.useState({
    department: '',
    idNumber: '',
    position: '',
    name: '',
    advisor: '',
  });

  // 대학 목록 조회
  const { data: universitiesData = [] } = useQuery({
    queryKey: ['universities'],
    queryFn: getUniversities,
  });

  // 교수 목록 조회
  const { data: professorsData = [] } = useQuery({
    queryKey: ['professors'],
    queryFn: getProfessors,
  });

  // 사용자 정보 저장
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      navigate(userType === 'professor' ? '/dashboard' : '/client');
    },
  });

  // 교수/학생 선택 시
  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value as 'professor' | 'student');
    setFormData({
      department: '',
      idNumber: '',
      position: '',
      name: '',
      advisor: '',
    });
  };

  // 입력값 변경 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // 대학 선택 핸들러
  const handleUniversityChange = (event: any, newValue: string | null) => {
    setFormData((prev) => ({ ...prev, department: newValue || '' }));
  };

  // 교수 선택 핸들러 (학생용)
  const handleProfessorChange = (event: any, newValue: string | null) => {
    setFormData((prev) => ({ ...prev, advisor: newValue || '' }));
  };

  // 폼 제출
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({ userType, ...formData });
  };

  return (
    <AppTheme>
      <CssBaseline />
      <UserSettingContainer>
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <Typography component="h1" variant="h5" textAlign="center">
            설정
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup row value={userType} onChange={handleUserTypeChange}>
              <FormControlLabel value="professor" control={<Radio />} label="교수" />
              <FormControlLabel value="student" control={<Radio />} label="학생" />
            </RadioGroup>
          </FormControl>

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            {/* 대학 자동완성 */}
            <Autocomplete
              options={universitiesData}
              value={formData.department}
              onChange={handleUniversityChange}
              renderInput={(params) => (
                <TextField {...params} label="소속" variant="outlined" fullWidth required />
              )}
            />

            {/* 교수/학생별 입력 폼 분리 */}
            {userType === 'professor' ? (
              <ProfessorForm formData={formData} onChange={handleInputChange} />
            ) : (
              <StudentForm
                formData={formData}
                professors={professorsData}
                onChange={handleInputChange}
                onAdvisorChange={handleProfessorChange}
              />
            )}

            {/* 공통 입력 필드 */}
            <TextField
              name="name"
              label="이름"
              variant="outlined"
              fullWidth
              required
              value={formData.name}
              onChange={handleInputChange}
            />

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
