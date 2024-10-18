## Nextjs

## React vs Next

- React is a library for building user interfaces, while Next.js is a framework for building full-stack applications.
- SSR is rendering page on server and send the html to client with a hydration
- Hydration is the process of attaching JS to the html sent by server , hydration is useful for interactivity and reactivity
- SSR (Server Side Rendering) is a technique used to render client-side applications on the server and send a fully rendered page to the client. React is a client-side library, so it doesn't support SSR out of the box. Next.js, on the other hand, is a full-stack framework that supports SSR,
- SSR is useful for SEO, performance, and accessibility.
- Next.js also supports static site generation (SSG), which is a technique used to generate static HTML files at build time. SSG is useful for performance and SEO.
- Next.js Also faster than react in terms of loading time , bec in react we have to load all the js (JS Bundle) files first then render the page but in nextjs we have the html ready to render

## Routing (APP Routing)

- Next.js has a file-system based router built on the concept of pages. When you create a page in the pages directory, it's automatically available at that route.
- Next also make cashing of pages for faster loading

## RSC (React Server Components) vs Client Components

- default of nextjs is RSC
- RSC are components that are rendered on the server and sent to the client as HTML. here we cannot use hooks like useEffect, useState, useContext, etc but we can fetch data from server and also the component can be asynchronous
  example:

```jsx
export default async function MyComponent() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  return <div>{data}</div>;
}
```

- Client Components (Rect components) are components that are rendered on the server side as html and send to the client then hydrated with js bundle. here we can use hooks like useEffect, useState, useContext, etc , to use client components -> "use client";
  example:

```jsx
"use client";
import { useEffect, useState } from "react";
...................
```

- we can use both RSC and Client Components in the same app, use RSC for the components that don't need client-side interactivity and use Client Components for the components that need client-side interactivity.

## Nextjs Folder Structure

- app: all the folder in the app folder are accessible from the browser, to make a folder not accessible from the browser add a underscore before the folder name for ex: \_components
- @: is an alias for the src folder so use @/app/components

## optimizing font in nextjs

- import fonts from "next/fonts/..." and use it

## optimizing images in nextjs

- use Image component from next/image
- Image component is a wrapper around the img tag that optimizes images for performance and accessibility.
- Image component automatically resizes images based on the device size and screen resolution.
- Image component also supports lazy loading, which means images are loaded only when they're in the viewport.
- Image component also supports placeholder images, which are low-quality images that are displayed while the high-quality images are loading.
- we can also specify the quality of the image in order to reduce the file size and improve performance.
- we can specify placeholder blur so when the image loading it will show a blur image
