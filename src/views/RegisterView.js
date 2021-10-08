import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  TextField,
} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { registration } from 'redux/auth/authOperations';
import { getLoading } from 'redux/auth/authSelectors';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    enterName: false,
    enterEmail: false,
    enterPassword: false,
    invalidPassword: false,
  };

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
      enterName: false,
      enterEmail: false,
      enterPassword: false,
      invalidPassword: false,
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;
    if (name === '') {
      this.setState(() => ({ enterName: true }));
      return;
    }
    if (email === '') {
      this.setState(() => ({ enterEmail: true }));
      return;
    }
    if (password === '') {
      this.setState(() => ({ enterPassword: true }));
      return;
    }
    if (password.length < 7) {
      this.setState(() => ({ password: '', confirmPassword: '' }));
      toast.dark('Пароль должен быть не мение 7 символов!');
      return;
    }
    if (confirmPassword === '') {
      this.setState(() => ({ invalidPassword: true }));
      return;
    }
    if (confirmPassword !== password) {
      this.setState(() => ({ password: '', confirmPassword: '' }));
      toast.dark('Пароль не совпадает, пожалуйста повторите!');
      return;
    }
    this.props.onRegister({ name, email, password });
  };

  render() {
    const {
      name,
      email,
      password,
      confirmPassword,
      enterName,
      enterEmail,
      enterPassword,
      invalidPassword,
    } = this.state;
    return (
      <>
        {this.props.isLoading && <LinearProgress />}
        <Paper elevation={3}>
          <Box p={3} mt={1}>
            <form onSubmit={this.onSubmitForm}>
              <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    variant="filled"
                    type="text"
                    onChange={this.handleChange}
                    value={name}
                    error={enterName}
                    helperText={enterName && 'Введите имя'}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    variant="filled"
                    type="email"
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                    value={password}
                    error={enterPassword}
                    helperText={enterPassword && 'Введите пароль'}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    variant="filled"
                    type="password"
                    onChange={this.handleChange}
                    value={confirmPassword}
                    error={invalidPassword}
                    helperText={invalidPassword && 'Введите пароль повторно'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Зарегистрировать
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoading(state),
});

const mapDispatchToProps = {
  onRegister: registration,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
