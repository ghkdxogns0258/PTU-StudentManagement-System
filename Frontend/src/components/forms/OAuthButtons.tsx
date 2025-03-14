import React from 'react';
import Button from '@mui/material/Button';
import { GoogleIcon, KakaoIcon } from './CustomIcons';

interface OAuthButtonsProps {
  onGoogleLogin: () => void;
  onKakaoLogin: () => void;
}

export default function OAuthButtons({ onGoogleLogin, onKakaoLogin }: OAuthButtonsProps) {
  return (
    <>
      <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={onGoogleLogin}>
        구글로 로그인/회원가입
      </Button>
      <Button fullWidth variant="outlined" startIcon={<KakaoIcon />} onClick={onKakaoLogin}>
        카카오로 로그인/회원가입
      </Button>
    </>
  );
}
