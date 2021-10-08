import { React, Component } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { connect } from 'react-redux';
import AppBar from 'components/AppBar/AppBar';
import Routes from 'components/Routes/Routes';
import { getCurrentUser } from 'redux/auth/authOperations';
import { Container } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { getToken } from 'redux/auth/authSelectors';

class App extends Component {
  componentDidMount() {
    const { token, onGetCurrentUser } = this.props;
    if (token) onGetCurrentUser();
  }

  render() {
    return (
      <Container maxWidth="sm">
        <AppBar />
        <Routes />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  onGetCurrentUser: getCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
