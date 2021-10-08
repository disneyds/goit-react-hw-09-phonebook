import React from 'react';
import s from './Alert.module.css';

export default function Alert({ name }) {
  return (
    <div className={s.alert}>
      <span>Такой контакт уже существует</span>
    </div>
  );
}
