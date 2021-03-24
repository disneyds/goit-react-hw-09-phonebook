import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/phonebook/phonebookOperations';
import { Box, Button, Grid, Paper, TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';

export default function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [enterName, setEnterName] = useState(false);
  const [enterNumber, setEnterNumber] = useState(false);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { id, value } = e.target;
    switch (id) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return console.log('Ошибка чтения имени поля ввода');
    }
    setEnterName(false);
    setEnterNumber(false);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === '') {
      setEnterName(true);
      return;
    }
    if (number === '') {
      setEnterNumber(true);
      return;
    }
    dispatch(addContact(name, number));
    setName('');
    setNumber('');
  };

  return (
    <>
      <Paper elevation={3}>
        <Box p={3} mt={1} mb={1}>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  variant="filled"
                  type="text"
                  onChange={handleChange}
                  value={name}
                  error={enterName}
                  helperText={enterName && 'Введите имя'}
                />
              </Grid>

              <Grid item xs={12}>
                <InputMask
                  mask="+38 (999) 99-99-999"
                  value={number}
                  onChange={handleChange}
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
