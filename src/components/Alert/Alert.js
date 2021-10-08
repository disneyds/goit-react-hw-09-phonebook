import React from 'react';
import { CSSTransition } from 'react-transition-group';
import s from './Alert.module.css';

export default function Alert({ massage, alert }) {
  return (
    <CSSTransition in={alert} timeout={250} classNames={s} unmountOnExit>
      <div className={s.alert}>
        <span>{massage}</span>
      </div>
    </CSSTransition>
  );
}
