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
import { login } from 'redux/auth/authOperations';
import { getLoading } from 'redux/auth/authSelectors';

class Login extends Component {
  state = {
    email: '',
    password: '',
    enterEmail: false,
    enterPassword: false,
  };

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
      enterPassword: false,
      enterEmail: false,
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email === '') {
      this.setState(() => ({ enterEmail: true }));
      return;
    }
    if (password === '') {
      this.setState(() => ({ enterPassword: true }));
      return;
    }
    this.props.onLogin({ email, password });
    this.setState({ email: '', password: '' });
  };

  render() {
    const { email, password, enterEmail, enterPassword } = this.state;
    return (
      <>
        {this.props.isLoading && <LinearProgress />}
        <Paper elevation={3}>
          <Box p={3} mt={1} mb={1}>
            <form onSubmit={this.onSubmitForm}>
              <Grid container spacing={2} justify="center" alignItems="center">
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
}

const mapStateToProps = state => ({
  isLoading: getLoading(state),
});

const mapDispatchToProps = {
  onLogin: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
