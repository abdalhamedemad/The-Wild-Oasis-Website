import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import {
  getBookedDatesByCabinId,
  getCabin,
  getCabins,
  getSettings,
} from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import { Suspense } from "react";

// generate meta data dynamically
export async function generateMetadata({ params: { cabinid } }) {
  const cabin = await getCabin(cabinid);
  // const settings = await getSettings();
  // const bookingDates = await getBookedDatesByCabinId(cabinid);
  // in order to fetch them in parallel we can use Promise.all
  // this will make the fetching faster as it will fetch all data at the same time and
  // not one by one
  // const [cabin, settings, bookingDates] = await Promise.all([
  //   getCabin(cabinid),
  //   getSettings(),
  //   getBookedDatesByCabinId(cabinid),
  // ]);
  // Better way that add new server component for reservation

  if (!cabin) {
    return { title: "Cabin not found" };
  }

  return {
    title: `Cabin ${cabin.name}`,
  };
}
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

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinid);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
