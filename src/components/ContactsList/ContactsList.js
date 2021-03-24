import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getVisibleConatacts } from 'redux/phonebook/phonebookSelectors';
import ContactItem from './ContactItem';
import { Grid, makeStyles } from '@material-ui/core';

const styles = makeStyles({
  list: {
    listStyle: 'none',
    padding: '0',
  },
});

export default function ContactsList() {
  const s = styles();
  const contacts = useSelector(getVisibleConatacts);
  return (
    <>
      {contacts.length > 0 && (
        <Grid
          container
          component="ul"
          justify="center"
          alignItems="center"
          className={s.list}
        >
          {contacts.map(({ name, number, id }) => (
            <Grid item xs={12} key={id} component="li">
              <ContactItem name={name} number={number} id={id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ),
  filter: PropTypes.string,
};
