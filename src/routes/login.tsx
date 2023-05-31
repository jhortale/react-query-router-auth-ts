import { Form, redirect } from "react-router-dom";

export function loginAction () {
  localStorage.setItem('token', 'new-value')
  return redirect('/protected')
}

export function loginLoader () {
  if(localStorage.getItem('token') !== null) {
    return redirect('/protected')
  }
    return {message: 'ok'}
}

function Login () {
  return (
    <Form method="post">
      <button type="submit">Login</button>
    </Form>
  )
}

export default Login