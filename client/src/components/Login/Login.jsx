import React from 'react';
import { NavLink } from 'react-router-dom';
import { BoxLogin } from './Login.styled';
import { linkActiv } from 'components/utilits/linkActiv';

export function Login(props) {
  return (
    <BoxLogin>
      <NavLink style={linkActiv} to="/register">
        Registration
      </NavLink>
      <NavLink style={linkActiv} to="/login">
        Login
      </NavLink>
    </BoxLogin>
  );
}
