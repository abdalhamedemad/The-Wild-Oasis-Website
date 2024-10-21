import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

// here the following line will make the data cashed at the server side
// to be revalidated every 0 seconds so will change this page to be dynamic page
// page will be refetch and render page with every request (close cashing)
// export const revalidate = 0;

// in order to achieve SSG static site generation with ISR incremental static regeneration
// and allow cashing the data for 1 hour (3600 seconds) we will use the following line
export const revalidate = 3600;

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
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={image}
            fill
            className=" object-cover"
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
