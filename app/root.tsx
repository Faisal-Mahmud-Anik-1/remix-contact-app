import { LinksFunction, LoaderFunction, json } from "@remix-run/node";
import {
  Form,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import favIconHref from "~/assets/favicon.svg";
import stylesheetHref from "~/app.css";
import { ContactRecord, getContacts } from "./data";

export const links: LinksFunction = () => [
  { rel: "icon", href: favIconHref },
  { rel: "stylesheet", href: stylesheetHref },
];

export const loader: LoaderFunction = async () => {
  const contacts = await getContacts();
  return await json({ contacts });
};

export default function App() {
  const { contacts } = useLoaderData<typeof loader>();
  console.log(contacts);
  return (
    <html>
      <head lang="en">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                type="search"
                aria-label="Search contacts"
                id="q"
                name="q"
                placeholder="search"
              />
              <div aria-hidden hidden={true} id="search spinner" />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact: ContactRecord) => (
                  <li key={contact.id}>
                    <NavLink to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? <span>★</span> : null}
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

        <div id="details">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
