import React from 'react';
import ReactLoader from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <ReactLoader
      className={s.wrapper}
      type="Oval"
      color="#00BFFF"
      height={40}
      width={40}
    />
  );
}
