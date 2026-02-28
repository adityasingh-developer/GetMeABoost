export default function Home() {
  return (
    <section className="">
      <div className="min-h-[80vh] flex gap-5 items-center flex-col justify-center">
        <h1 className="text-7xl text-center font-semibold">Fund your <br /> creative work</h1>
        <p className="text-2xl opacity-90">A refined way to fund your work and grow steadily.</p>
        <div className="flex gap-10">
          <button className="bg-[#d5ba80] duration-200 hover:brightness-90 brightness-110 text-black text-lg font-medium py-3 px-7 rounded-2xl">Create A Page</button>
          <button className="border-[#d5ba80] hover:bg-[#d5ba80] hover:text-black duration-200 border text-lg font-medium py-3 px-7 rounded-2xl">Explore Creators</button>
        </div>
        <p className="opacity-90 text-xl">It’s free and takes less than a minute!</p>
      </div>
    </section>
  );
}
