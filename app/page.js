import Image from "next/image";
import Link from 'next/link'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isSignedIn = Boolean(session?.user);
  const primaryHref = isSignedIn ? "/dashboard" : "/login";
  const primaryLabel = isSignedIn ? "Go To Dashboard" : "Create A Page";

  return (<>
    <section className="">
      <div className="min-h-screen flex gap-5 items-center flex-col justify-center">
        <h1 className="text-5xl sm:text-7xl text-center font-semibold">Fund your <br /> creative work</h1>
        <p className="text-xl sm:text-2xl opacity-90">A refined way to fund your work and grow steadily.</p>
        <div className="flex gap-10">
          <Link href={primaryHref}><button className="cursor-pointer bg-[#d5ba80] duration-200 hover:brightness-90 brightness-110 text-black text-lg font-medium py-3 px-7 rounded-2xl">{primaryLabel}</button></Link>
          <Link href={"/login"}><button className="cursor-pointer border-[#d5ba80] hover:bg-[#d5ba80] hover:text-black duration-200 border text-lg font-medium py-3 px-7 rounded-2xl">Explore Creators</button></Link>
        </div>
        <p className="opacity-90 text-xl">It’s free and takes less than a minute!</p>
      </div>
    </section>
    <section className="min-h-[80vh] flex items-end justify-center">
      <div className="flex justify-center flex-col items-center gap-10">
        <h1 className="text-4xl font-semibold">Built for creators who value control.</h1>
        <div className="flex flex-col justify-center">
          <Image src='/dashboard_image.png' alt='BuyMeABoost logo' width={1150} height={50} className='w' />
          <div className="h-px w-full bg-neutral-700"></div>
        </div>
        <div className="flex justify-around items-center w-full">
          <div className="flex items-center text-[20px] gap-2 font-medium">
            <span>
              <img src="/icons/feature-ownership.svg" alt="" aria-hidden className="w-10 h-10" />
            </span>
            <span>Full ownership</span>
          </div>

          <div className="h-10 w-px bg-neutral-600"></div>

          <div className="flex items-center text-[20px] gap-2 font-medium">
            <span>
              <img src="/icons/feature-revenue.svg" alt="" aria-hidden className="w-10 h-10" />
            </span>
            <span>Recurring Revenue</span>
          </div>

          <div className="h-10 w-px bg-neutral-600"></div>

          <div className="flex items-center text-[20px] gap-2 font-medium">
            <span>
              <img src="/icons/feature-transparent.svg" alt="" aria-hidden className="w-10 h-10" />
            </span>
            <span>Transparent Structure</span>
          </div>
        </div>
        <p className="opacity-80 text-sm">Demo platform concept image</p>
      </div>
    </section>
    <section className="min-h-[80vh] gap-10 flex items-center flex-col justify-center">
      <h1 className="text-5xl font-semibold">The people you support remember it.</h1>
      <h2 className="text-2xl opacity-90">Every contribution moves a creator forward.</h2>
      <Link href={"/login"}><button className="bg-[#d5ba80] cursor-pointer duration-200 hover:brightness-90 brightness-110 text-black text-lg font-medium py-3 px-7 rounded-2xl">Start Supporting</button></Link>
    </section>
  </>
  );
}
