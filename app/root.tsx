import { LinksFunction } from "@remix-run/node";
import {
  Form,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import favIconHref from "~/assets/favicon.svg";
import stylesheetHref from "~/app.css";

export const links: LinksFunction = () => [
  { rel: "icon", href: favIconHref },
  { rel: "stylesheet", href: stylesheetHref },
];

export default function App() {
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
            <ul>
              <li>
                <NavLink to={`contacts/${1}`}>Your Name</NavLink>
              </li>
              <li>
                <NavLink to={`contacts/${2}`}>Your Friend</NavLink>
              </li>
            </ul>
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
