import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import "@mantine/nprogress/styles.css";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import { useLayoutEffect } from "react";

import "./style.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    if (navigation.state === "loading") {
      nprogress.start();
    }
    if (navigation.state === "idle") {
      nprogress.complete();
    }
  }, [navigation.state]);

  return (
    <html data-mantine-color-scheme="light" lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/site.webmanifest" rel="manifest" />
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider>
          <NavigationProgress color="orange" size={2} />
          {children}
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
