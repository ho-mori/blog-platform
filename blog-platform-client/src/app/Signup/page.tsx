"use client"

import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Link, Typography } from '@mui/material';
import styles from './Signup.module.scss';
import { ApiResponse, fetchFromApi, ServerErrorResponse } from '../apiClient';
import { SignupDto } from '@/app/Dto/SignupDto';



const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [requestError, setRequestError] = useState(null);

  useEffect(() => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('無効なメールアドレス形式です');
    } else {
      setEmailError('');
    }
  }, [email]);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$_%^&*])[A-Za-z\d!@#$%_^&*]{8,}$/;
    if (password && !passwordRegex.test(password)) {
      setPasswordError('パスワードは8文字以上で、大文字と小文字、数字、特殊文字を含む必要があります');
    } else {
      setPasswordError('');
    }
  }, [password]);

  const handleSignup = async () => {
      let dto: SignupDto = {
        username: username,
        email: email,
        password: password
      };
      fetchFromApi(
        'signup',
        {
          onSuccess: handleLoginSuccess,
          onError: handleError,
          onServerError: handleServerError // サーバー側エラー時のコールバック指定
        },
        dto
      );
  };

// 成功時\\\\\に呼ばれる関数
const handleLoginSuccess = (data: ApiResponse) => {
  console.log('Request succeeded with data:', data);
  // 追加の成功時処理...
};

// クライアント側エラー時に呼ばれる関数
const handleError = (error: any) => {
  console.error('Request failed with client error:', error);
  // 追加のクライアント側エラー時処理...
};

// サーバー側エラー時に呼ばれる関数
const handleServerError = (serverError: ServerErrorResponse) => {
  console.error(
    `Request failed with server error: ${serverError.status} ${serverError.message}`,
    serverError.error
  );
  // 追加のサーバー側エラー時処理...
};


  return (
    <div className={styles.signupContainer}>
      <Typography variant="h4" component="h1" gutterBottom className={styles.formTitle}>
        新規登録
      </Typography>

      <TextField
        label="ユーザー名"
        variant="outlined"
        fullWidth
        margin="normal"
        className={styles.signupInput}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        inputProps={{ maxLength: 122 }}
      />

      <TextField
        label="メールアドレス"
        variant="outlined"
        fullWidth
        margin="normal"
        className={styles.signupInput}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
      />

      <TextField
        label="パスワード"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        className={styles.signupInput}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={styles.signupButton}
        onClick={handleSignup}
      >
        登録
      </Button>

      <Grid container justifyContent="flex-end" className={styles.loginLink}>
        <Grid item>
          <Link href="/login" variant="body2">
            既にアカウントをお持ちですか？
          </Link>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        fullWidth
        className={styles.thirdPartyAuth}
        // onClickイベントなどで第三者認証の処理を扱う
      >
        Googleで登録
      </Button>
    </div>
  );
};

export default Signup;