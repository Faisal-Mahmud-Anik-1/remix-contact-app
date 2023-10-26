import {
  LinksFunction,
  type LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
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
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import favIconHref from "~/assets/favicon.svg";
import stylesheetHref from "~/app.css";
import { createEmptyContact, getContacts } from "./data";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "icon", href: favIconHref },
  { rel: "stylesheet", href: stylesheetHref },
];

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

export default function App() {
  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchFiled = document.getElementById("q");
    if (searchFiled instanceof HTMLInputElement) {
      searchFiled.value = q || "";
    }
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>MC Savages Contacts</h1>
          <p> Made by 💙 Faisal Vaiya</p>
          <div>
            <Form
              id="search-form"
              role="search"
              onChange={(event) => {
                const isFirsSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirsSearch,
                });
              }}
            >
              <input
                type="search"
                className={searching ? "loading" : ""}
                aria-label="Search contacts"
                defaultValue={q || ""}
                id="q"
                name="q"
                placeholder="search"
              />
              <div aria-hidden hidden={!searching} id="search spinner" />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                      to={`contacts/${contact.id}`}
                    >
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

        <div
          className={
            navigation.state === "loading" && !searching ? "loading" : ""
          }
          id="detail"
        >
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
