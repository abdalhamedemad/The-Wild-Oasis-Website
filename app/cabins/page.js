import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

// here the following line will make the data cashed at the server side
// to be revalidated every 0 seconds so will change this page to be dynamic page
// page will be refetch and render page with every request (close cashing)
// export const revalidate = 0;

// in order to achieve SSG static site generation with ISR incremental static regeneration
// and allow cashing the data for 1 hour (3600 seconds) we will use the following line
export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};

// here we use searchParams so this page will be dynamically generated
export default async function Page({ searchParams }) {
  // CHANGE
  // will be blocking until the data is fetched
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      {/* we pass a key in order to show the spinner while the component rendered 
      during the transition between the filters
      */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
