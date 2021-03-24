import { React, useEffect } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from 'components/AppBar/AppBar';
import Routes from 'components/Routes/Routes';
import { getCurrentUser } from 'redux/auth/authOperations';
import { Container } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { getToken } from 'redux/auth/authSelectors';

export default function App() {
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) dispatch(getCurrentUser());
  }, [dispatch, token]);

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
