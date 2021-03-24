import {
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Slide,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { ContactPhone, Delete, Edit } from '@material-ui/icons';
import paths from 'components/Routes/paths';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteContact } from 'redux/phonebook/phonebookOperations';

export default function ContactItem({ name, number, id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const onDelete = useCallback(() => dispatch(deleteContact(id)), [
    dispatch,
    id,
  ]);
  return (
    <>
      <Slide in={true} direction="left" mountOnEnter unmountOnExit>
        <Paper elevation={3}>
          <Box mt={1}>
            <ListItem ContainerComponent="div">
              <ListItemIcon>
                <ContactPhone fontSize="large" />
              </ListItemIcon>

              <ListItemText
                primary={<Typography>{name}</Typography>}
                secondary={
                  <Typography color="textSecondary">{number}</Typography>
                }
              />

              <ListItemSecondaryAction>
                <Tooltip
                  title="Редактировать контакт"
                  aria-label="Edit contact"
                  arrow
                >
                  <IconButton
                    onClick={() => {
                      history.push(paths.EDIT_CONTACT(id));
                    }}
                  >
                    <Edit color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Удалить контакт"
                  aria-label="Delete contact"
                  arrow
                >
                  <IconButton onClick={() => onDelete(id)}>
                    <Delete color="error" />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </Box>
        </Paper>
      </Slide>
    </>
  );
}
