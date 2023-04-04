import { render, screen } from '@testing-library/react';
import * as React from "react";
import LoginForm from './Components/Login/LoginForm';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Sign In");
  expect(linkElement).toBeInTheDocument();
});
