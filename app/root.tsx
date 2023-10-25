import { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
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
        <h1>Hello world!!!</h1>
        <div id="details"></div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
