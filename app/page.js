import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (<>
    <section className="">
      <div className="min-h-screen flex gap-5 items-center flex-col justify-center">
        <h1 className="text-7xl text-center font-semibold">Fund your <br /> creative work</h1>
        <p className="text-2xl opacity-90">A refined way to fund your work and grow steadily.</p>
        <div className="flex gap-10">
          <Link href={"/dashboard"}><button className="cursor-pointer bg-[#d5ba80] duration-200 hover:brightness-90 brightness-110 text-black text-lg font-medium py-3 px-7 rounded-2xl">Create A Page</button></Link>
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
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="secure" className="icon glyph w-10 h-10" fill="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.42,3.83,12.24,2h0A.67.67,0,0,0,12,2a.67.67,0,0,0-.2,0h0L4.58,3.83A2,2,0,0,0,3.07,5.92l.42,5.51a12,12,0,0,0,7.24,10.11l.88.38h0a.91.91,0,0,0,.7,0h0l.88-.38a12,12,0,0,0,7.24-10.11l.42-5.51A2,2,0,0,0,19.42,3.83ZM15.71,9.71l-4,4a1,1,0,0,1-1.42,0l-2-2a1,1,0,0,1,1.42-1.42L11,11.59l3.29-3.3a1,1,0,0,1,1.42,1.42Z" style={{ fill: "#fff" }}></path></g></svg>
            </span>
            <span>Full ownership</span>
          </div>

          <div className="h-10 w-px bg-neutral-600"></div>

          <div className="flex items-center text-[20px] gap-2 font-medium">
            <span>
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748Z" fill="#ffffff"></path> <path d="M12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z" fill="#ffffff"></path> <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z" fill="#ffffff"></path> </g></svg>
            </span>
            <span>Recurring Revenue</span>
          </div>

          <div className="h-10 w-px bg-neutral-600"></div>

          <div className="flex items-center text-[20px] gap-2 font-medium">
            <span>
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z" fill="#e8e8e8"></path> <path fillRule="evenodd" clipRule="evenodd" d="M2 8C2 8.49355 2.99294 8.89073 4.97883 9.68508L7.7873 10.8085C9.77318 11.6028 10.7661 12 12 12C13.2339 12 14.2268 11.6028 16.2127 10.8085L19.0212 9.68508C21.0071 8.89073 22 8.49355 22 8C22 7.50645 21.0071 7.10927 19.0212 6.31492L16.2127 5.19153C14.2268 4.39718 13.2339 4 12 4C10.7661 4 9.77318 4.39718 7.7873 5.19153L4.97883 6.31492C2.99294 7.10927 2 7.50645 2 8Z" fill="#e8e8e8"></path> <path opacity="0.7" d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L5.76613 10Z" fill="#e8e8e8"></path> <path opacity="0.4" d="M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14L16.2127 14.8085C14.2268 15.6028 13.2339 16 12 16C10.7661 16 9.77318 15.6028 7.7873 14.8085L5.76613 14Z" fill="#e8e8e8"></path> </g></svg>
            </span>
            <span>Transparent Structure</span>
          </div>
        </div>
        <p className="opacity-80 text-sm">Demo platform concept image</p>
      </div>
    </section>
    <section className="min-h-[70vh] gap-10 flex items-center flex-col justify-center">
      <h1 className="text-5xl font-semibold">The people you support remember it.</h1>
      <h2 className="text-2xl opacity-90">Every contribution moves a creator forward.</h2>
      <Link href={"/login"}><button className="bg-[#d5ba80] cursor-pointer duration-200 hover:brightness-90 brightness-110 text-black text-lg font-medium py-3 px-7 rounded-2xl">Start Supporting</button></Link>
    </section>
  </>
  );
}