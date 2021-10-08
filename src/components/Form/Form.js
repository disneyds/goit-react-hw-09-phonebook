import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addContact } from '../../redux/phonebook/phonebookOperations';
import { getContacts } from 'redux/phonebook/phonebookSelectors';
import { Box, Button, Grid, Paper, TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';

class Form extends Component {
  state = {
    name: '',
    number: '',
    enterName: false,
    enterNumber: false,
  };

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
      enterName: false,
      enterNumber: false,
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (name === '') {
      this.setState(() => ({ enterName: true }));
      return;
    }
    if (number === '') {
      this.setState(() => ({ enterNumber: true }));
      return;
    }
    this.props.handleSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number, enterName, enterNumber } = this.state;
    return (
      <>
        <Paper elevation={3}>
          <Box p={3} mt={1} mb={1}>
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
                  <InputMask
                    mask="+38 (999) 99-99-999"
                    value={number}
                    onChange={this.handleChange}
                    disabled={false}
                    maskChar=" "
                  >
                    {() => (
                      <TextField
                        fullWidth
                        id="number"
                        label="Number"
                        variant="filled"
                        type="tel"
                        error={enterNumber}
                        helperText={enterNumber && 'Введите номер'}
                      />
                    )}
                  </InputMask>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Создать контакт
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
  contacts: getContacts(state),
});
const mapDispatchToProps = dispatch => ({
  handleSubmit: ({ name, number }) => dispatch(addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
