import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { AuthProvider } from './context/AuthContext'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Student from './pages/Student';
import UserSetting from './pages/UserSetting';
import Client from './pages/Client';
import StudentDetail from './pages/StudentDetail';
import OAuthCallback from './pages/OAuthCallback';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <AuthProvider> 
          <Router>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/student" element={<Student />} />
              <Route path="/usersetting" element={<UserSetting />} />
              <Route path="/client" element={<Client />} />
              <Route path="/students/:studentId" element={<StudentDetail />} />
              <Route path="/auth/kakao/callback" element={<OAuthCallback />} />
            </Routes>
          </Router>
        </AuthProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  </StrictMode>
);
