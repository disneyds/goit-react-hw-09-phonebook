import PropTypes from 'prop-types';
import { Box, Slide, Typography } from '@material-ui/core';

const Title = ({ text }) => {
  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Typography color="primary" component="h1" variant="h4">
        <Box ml={3} mt={3} mb={3}>
          {text}
        </Box>
      </Typography>
    </Slide>
  );
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
