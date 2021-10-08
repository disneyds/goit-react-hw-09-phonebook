import Loader from 'components/Loader/Loader';
import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { getLoadind } from 'redux/phonebook/phonebookSelectors';
import s from './Title.module.css';

function Title({ onLoading }) {
  return (
    <div className={s.wrapper}>
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="Title"
        unmountOnExit
      >
        <h1 className={s.title}>Контакты</h1>
      </CSSTransition>
      {onLoading && <Loader />}
    </div>
  );
}

const mapStateToProps = state => ({
  onLoading: getLoadind(state),
});

export default connect(mapStateToProps)(Title);
