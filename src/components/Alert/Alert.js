import React from 'react';
import s from './Alert.module.css';

export default function Alert({ massage }) {
  return (
    <div className={s.alert}>
      <span>{massage}</span>
    </div>
  );
}
