import { Box, Button, Grid, Paper, TextField } from '@material-ui/core';
import paths from 'components/Routes/paths';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { getContacts } from '../../redux/phonebook/phonebookSelectors';
import { editContact } from '../../redux/phonebook/phonebookOperations';

export default function ContactEdit() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [enterName, setEnterName] = useState(false);
  const [enterNumber, setEnterNumber] = useState(false);

  const contacts = useSelector(getContacts);
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    const { currentID } = match.params;

    const { id, name, number } = contacts.find(({ id }) => id === currentID);
    setId(id);
    setName(name);
    setNumber(number);
  }, [match.params, contacts]);

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

  const onSubmit = async e => {
    e.preventDefault();
    if (name === '') {
      setEnterName(true);
      return;
    }
    if (number === '') {
      setEnterNumber(true);
      return;
    }
    await dispatch(editContact({ name, number, id }));
    history.push(paths.PHONEBOOK);
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
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    history.push(paths.PHONEBOOK);
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
