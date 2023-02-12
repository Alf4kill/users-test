import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("show inputs and button", () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("its calls onUserAdd when the form is submitted", () => {
  // bad implementation
  const argList = [];
  const callback = (...args) => {
    argList.push(args);
  };

  // try render component

  render(<UserForm onUserAdd={callback} />);
  // find the two inputs
  const [nameInput, emailInput] = screen.getAllByRole("textbox");
  // simulate typing the name
  user.click(nameInput);
  user.keyboard("jane");
  // simulate typing the email
  user.click(emailInput);
  user.keyboard("ane@hotmail.com");
  // find the button
  const button = screen.getByRole("button");
  // simulate clicking the button
  user.click(button);
  // assertion to make sure 'onUserAdd' get called with email/name
  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({ name: "jane", email: "ane@hotmail.com" });
});
