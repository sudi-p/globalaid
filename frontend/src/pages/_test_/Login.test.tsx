import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import Login from '../login';
import { Provider } from 'react-redux';
import { createMockRouter } from '@utils/test-utils/createMockRouter';
import store from '@store/store';
import { RouterContext } from 'next/dist/shared/lib/router-context';

describe("Login", () => {
  const router = createMockRouter();
  function renderLogin() {
    return render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <Login />
        </Provider>
      </RouterContext.Provider>
    );
  }
  it("should render initial component", () => {
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

  it("should allow user to input the email and password", () => {
    renderLogin()
    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")
    fireEvent.change(emailInput, { target: { value: "spaudel645@gmail.com" } })
    fireEvent.change(passwordInput, { target: { value: "password" } })
    expect(emailInput).toHaveValue("spaudel645@gmail.com")
    expect(passwordInput).toHaveValue("password")
  })

  test("if the link Create an account redirects to signup page or not", () => {
    renderLogin();
    const signupLink = screen.getByRole('link', {name: "Create an account"});
    fireEvent.click(signupLink);
    expect(router.push).toHaveBeenCalledWith("/signup", expect.anything(), expect.anything())
  })
  
});