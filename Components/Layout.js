import React from "react";
import Head from "next/Head";

export default function Layout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto max-w-6xl pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
