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

## Fetching data on a server with RSC

- here the request will send from the server then after getting the data will render the component and send the rendered html to the client
- here will solve client-server data water fall that happens in the react which is the data is fetched after the component mounts and also components are not rendered waiting for the data...

```jsx
export default async function MyComponent() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  // this will be logging into a server console
  console.log(data);
  return <div>{data}</div>;
}
```

## client Components

- Client Components (Rect components) are components that are rendered on the server side as html and send to the client then hydrated with js bundle. here the content of the components first will appear and will not be reactive until the JS bundle is downloaded (i.e Rendered HTML first send to the client so content will appear but will only be reactive like clicking to button change the state only when JS bundle fished downloading)
  here we can use hooks like useEffect, useState, useContext, etc , to use client components -> "use client";
  example:

```jsx
"use client";
import { useEffect, useState } from "react";
...................
```

- we can use both RSC and Client Components in the same app, use RSC for the components that don't need client-side interactivity and use Client Components for the components that need client-side interactivity.
- ONLY the client components is hydrated

## works behined the scene

- intially both RSC and CC are initially rendered on the server then after that RSC are rendered in the server and CC are rendered in the client Computer

## Passing data from server components to client components

- we can use Props to pass the data from server components to client components

## The Global loading

- you can add global loading indicator when you add a file called loading.js in the App folder
- this Global loading will be rendered when you loading/fetching data of a server component at any place the loading can occurs inside nesred page or even a component will show this loading wrapped by the layout
- if we want to display the loading only for a apart of component use suspense for server components
- It is shown while Server Components are streaming from the server.

## Nextjs Folder Structure

- app: all the folder in the app folder are accessible from the browser, to make a folder not accessible from the browser add a underscore before the folder name for ex: \_components
- @: is an alias for the src folder so use @/app/components

## Navigating between pages

- you can navigate using <a href="/cabins">link</a> but this will make the entire app to reloading all again
- to feel like SPA use <Link href="/cabins">cabins </Link> because behined the scene next do some optimization and cashing so will feel like SPA

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
- there are two ways for using image component, one must specify width and height and second one didn't have to specify width and height but the image must imported before using it

## Loading Spinner in nextjs

- we can set a loading component at root level or in any page level and this loading components will render until the page is fully loaded ,
- but here will be for the whole components that in the page will loading spinner - but if we want to show loading spinner for a specific part in the component we can use the Suspense component from react

## SUSPENSE in nextjs

- Suspense is a component that allows you to show a loading spinner while waiting for data to load. for async function will show the spinner until finished
  example:

```jsx
import { Suspense } from "react";
export default async function MyComponent() {
  return (
    <Suspense fallback={<Spinner />}>
      <ASYNCCOMPONETTHATFETCHINGDATA>
    </Suspense>
  );
}
```

## Client components and server components in nextjs

- Client components can import only client components and can also import server components but in this case will be a client component also
- all children of client components will be client components ,so make client components as deep as possible
  in the component tree
- we can pass server components as props to client components and in a Server component and in this case the server component will still be a server component
- Server components can import client components and server components and the component still be a server component

## Static vs Dyanmic serever Rendering

- in static server rendering the renders occurs at the build time i.e when you build the app using npm run build ,
- Dyanmic SSR the renders occurs when the page is requested
- By default all pages are Static but Next will make the page renders dynamically in 4 Scenarios when use params like cabins/[cabinId] how next know that id and when use query params like ?id=0 and read cookies or headrs or set no cash to the page
- TO Make A Dyanmic SSR a Staic and you have a finite set of theses URLS
  for Example You knows the possible ids of the [cabinid] so you cane make next generate each page for each id at the build time using the following generateStaticParams

```jsx
// here we are generating static paths for all cabins
// in order to make this page rendered as SSG static site generation
export async function generateStaticParams() {
  try {
    const cabins = await getCabins();
    const ids = cabins.map((cabin) => ({ cabinid: String(cabin.id) }));
    return ids;
  } catch (error) {
    console.error(error);
    return [];
  }
}
```

### Cashing (Most confusing look for lecture first then reads this notes)

- opt out: means remove the cache to occurs
- in page /cabins that list the cabins here will make static side generation because is the default (and we do not use any of 4 things that makes it dynamic) so static side generation so page will convert into a static html at the build time in order to makes it dynamic you have to use for example (export const revalidate = 0) : 0 seconds means makes this page dynamic so with each request will re-rendering and fetch new data , if the page data will not changes frequently we can change 0 to ex: 3600 means a day so for each day data will automatically re-render (ISR Incrementally server re-rendering)
- we can use also noStore() in the components to prevents cash to occur , this also will make the full page dynamic not this component only bec in next 14 partial re-rendering not available

## Highlight the navigation link in nextjs

- we can highlight the navigation link by using the usePathname Hook from next/Navigation so this component must be client component bec we use a Hook

## Passing data from Server to Client

- here very straight full by passing props

## Passing data from Client to Server

- the best way by url query params
  in the Client side update the url and at server use searchParams props to get values and filter according to it

## Fetching data in nextjs

- BETTER to fetch data at Server components and passed to client component as a props

## context api

- context api will be only available for client components bec it contains hooks ...

## making endpoint Api in nextjs

- by Making a folder and inside the folder make file names route.js

## Next Auth

- is a library for handling authentication and authorization
- to use it first make auth.js folder and add this envs AUTH_URL=http://localhost:3000/
  AUTH_SECRET=... this will reads automatically
- and to get the session use const session = await auth()
- /app/api/auth/[...nextauth]/route.ts this ... to catch all sigin up and...

## Middleware in nextjs

- middleware must be one file and in the root folder outside app folder
- middleware function will be called for each request to the website we can specify a matcher in order to be called for specific routes

## what is Server Actions

- the server actions are the functions that are executed on the server side and can be called from the client side
- server actions are useful for making the server components interactive and reactive i.e handling click for form submissions
- behind the scene the server actions are called by the client side and the server side will execute the function and return the result to the client side using API endpoint
- used for handling form submissions, handling clicks, etc for data mutations
- server actions require a running web server

- two way for defining server actions
  1. async function in the server component
  2. separated file with "use server" directive at the top of the file and export the function
- Server Action can be called from:
  1. action attribute in a <form> element (in server components or client components)
  2. event handlers (only clients components)
  3. useEffect hook (only clients components)

- in server actions we can do data mutations , update ui by revalidate , work with cookies...

## Enviroment varaibles

- in the env varaible all of them will not be shown to the Client all become only in the server so will be secure if you want to make it available in both client and server make it's name start with "NEXT*PUBLIC\_*\_...."

## Generate Meata data for SEO

- in the layout

```jsx
export const metadata = {
  // title: "The Wild Oasis",
  title: {
    // %s is a placeholder for the title if it exists in a page
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Egypt, surrounded by the beautiful nature of the desert.",
};
```

- Static use

```jsx
export const metadata = {
  title: {
    template: "Cabin",
  },
};
```

- Dynamically change the title of the page :

```jsx
// generate meta data dynamically
export async function generateMetadata({ params: { cabinid } }) {
  const cabin = await getCabin(cabinid);
  if (!cabin) {
    return { title: "Cabin not found" };
  }

  return {
    title: `Cabin ${cabin.name}`,
  };
}
```

### Global Error Boundary

- Just add a folder at the root folder called error.js
- only this will catch the errors happens in the rendering not the error for example that happens in the call back
- we can add nested error.js the closet one will be show
- the error.js must be client component it catch rendering error and has reset function that could attached with onClick to resfresh the page

### NOT found page

- handle not found url by adding not-found.js at the root folder
- this page will be rendered if the user try to access a url that not Exist additionally we can trigger it manually used notFound function from next/navigation
- we also making nested not found pages
