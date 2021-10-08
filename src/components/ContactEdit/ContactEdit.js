import { Box, Button, Grid, Paper, TextField } from '@material-ui/core';
import paths from 'components/Routes/paths';
import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getContacts } from '../../redux/phonebook/phonebookSelectors';
import { editContact } from '../../redux/phonebook/phonebookOperations';

class ContactEdit extends Component {
  state = {
    id: '',
    name: '',
    number: '',
    enterName: false,
    enterNumber: false,
  };

  componentDidMount() {
    const { contacts } = this.props;
    const { currentID } = this.props.match.params;

    const { id, name, number } = contacts.find(({ id }) => id === currentID);

    this.setState(() => ({ id, name, number }));
  }

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
      enterName: false,
      enterNumber: false,
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { history, editContact } = this.props;
    const { name, number, id } = this.state;
    if (name === '') {
      this.setState(() => ({ enterName: true }));
      return;
    }
    if (number === '') {
      this.setState(() => ({ enterNumber: true }));
      return;
    }
    await editContact({ name, number, id });
    history.push(paths.PHONEBOOK);
  };

  render() {
    const { name, number, enterName, enterNumber } = this.state;
    return (
      <>
        <Paper elevation={3}>
          <Box p={3} mt={1} mb={1}>
            <form onSubmit={this.onSubmit}>
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
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      this.props.history.push(paths.PHONEBOOK);
                    }}
                    color="secondary"
                  >
                    Отмена
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Готово
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

const mapDispatchToProps = {
  editContact,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ContactEdit));
