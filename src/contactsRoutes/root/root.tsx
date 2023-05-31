import { 
  Outlet, 
  NavLink, 
  useLoaderData, 
  Form, 
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDebounce } from "rooks";


import { useQuery, useIsFetching } from "@tanstack/react-query";
import { ContactData } from "../contact";
import { contactListQuery } from "./root.query";

export default function Root() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { q } = useLoaderData() as { q: string};
  const { isLoading, data: contacts } = useQuery(contactListQuery(q));
  const searching = useIsFetching(["contacts", "list"]) > 0;
  const navigation = useNavigation();
  const submit = useSubmit();
  const debouncedSubmit = useDebounce((query) => {
    const isFirstSearch = q == null;
    submit(query, {
      replace: !isFirstSearch,
    });
  }, 500);

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.value = q
    }
  }, [q]);
  
  if(isLoading) {
    return <>Loading</>
  }

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              ref={inputRef}
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              key={q}
              autoFocus
              defaultValue={q}
              onChange={(event) => {
                debouncedSubmit(event.currentTarget.form);
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
        {contacts.length ? (
          <ul>
            {contacts.map((contact: ContactData) => (
              <li key={contact.id}>
              <NavLink
              to={`contacts/${contact.id}`}
              className={({ isActive, isPending }) =>
                isActive
                  ? "active"
                  : isPending
                  ? "pending"
                  : ""
              }
            >
                  {contact.first || contact.last ? (
                    <>
                      {contact.first} {contact.last}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}{" "}
                  {contact.favorite && <span>★</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No contacts</i>
          </p>
        )}
      </nav>
      </div>
      <div 
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
       <Outlet />
      </div>
    </>
  );
}