import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/auth/authOperations';
import { getLoading } from 'redux/auth/authSelectors';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enterEmail, setEnterEmail] = useState(false);
  const [enterPassword, setEnterPassword] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);

  const handleChange = e => {
    const { id, value } = e.target;
    switch (id) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return console.log('Ошибка чтения имени поля ввода');
    }
    setEnterEmail(false);
    setEnterPassword(false);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (email === '') {
      setEnterEmail(true);
      return;
    }
    if (password === '') {
      setEnterPassword(true);
      return;
    }
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      <Paper elevation={3}>
        <Box p={3} mt={1} mb={1}>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="filled"
                  type="email"
                  onChange={handleChange}
                  value={email}
                  error={enterEmail}
                  helperText={enterEmail && 'Введите Email'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  variant="filled"
                  type="password"
                  onChange={handleChange}
                  value={password}
                  error={enterPassword}
                  helperText={enterPassword && 'Введите пароль'}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Войти
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </>
  );
}
