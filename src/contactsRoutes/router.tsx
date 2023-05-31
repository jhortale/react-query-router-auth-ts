import {
  createBrowserRouter,
} from "react-router-dom";
import Root, {rootAction, rootLoader} from "./root";
import ErrorPage from "../error-page";
import Contact, {
  contactLoader,
  contactAction,
} from "./contact";
import EditContact, {
  editAction,
} from "./edit";
import { action as destroyAction } from "./destroy";
import Index from "./index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <ErrorPage />,
          },
        ],
      },
      
    ],
  },
]);

export default router;