import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Root, {rootAction, rootLoader} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, {
  contactLoader,
  contactAction,
} from "./routes/contact";
import EditContact, {
  editAction,
} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";



import './index.css'
import queryClient from './services/queryClient';

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>,
)
