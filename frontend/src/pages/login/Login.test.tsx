import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import Login from '.';
import { Provider } from 'react-redux';
import store from '@store/store'
import '@testing-library/jest-dom/';

describe("whole page testing", () => {
  function renderLogin() {
    return render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }

  test("should render initial component", async () => {
    renderLogin();
    const mainElement = screen.getByText("Sign In to Continue.");
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByTestId('sign-in-button');
    const signupLink = screen.getByText('Create an account');
    expect(mainElement).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
  });

  test("it allows user to input the email and password", () => {
    renderLogin()
    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")
    fireEvent.change(emailInput, { target: { value: "spaudel645@gmail.com" } })
    fireEvent.change(passwordInput, { target: { value: "password" } })
    expect(emailInput).toHaveValue("spaudel645@gmail.com")
    expect(passwordInput).toHaveValue("password")
  })

  // test("submits the form with correct data", () => {
  //   renderLogin();
  //   const handleSubmit = jest.fn();
  //   const emailInput = screen.getByLabelText('Email');
  //   const passwordInput = screen.getByLabelText('Password');
  //   const loginButton = screen.getByTestId('sign-in-button');
  //   act(() => {
  //     fireEvent.change(emailInput, { target: { value: 'testuser' } });
  //     fireEvent.change(passwordInput, { target: { value: 'password123' } });
  //     fireEvent.click(loginButton);
  //   })
  // })

  // test if the link Create an account redirects to signup page o rnot

});