import React from "react";

export default async function HomePage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <>
      Home Page
    </>
    );
  }