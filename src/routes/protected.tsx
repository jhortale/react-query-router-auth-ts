/* eslint-disable react-refresh/only-export-components */
import { Form } from "react-router-dom";
import withAuth from "./withAuth"


function Protected() {
  
  return(
    <Form
      method="post"
      action="logout"
      onSubmit={(event) => {
        if (
          !confirm(
            "Please confirm you want to logout."
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <button type="submit">Logout</button>
    </Form>
  )
}

export default withAuth(Protected)

