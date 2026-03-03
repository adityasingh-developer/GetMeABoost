"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const displayName = session?.user?.name || session?.user?.email || "User";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return null;
  }
  const avatarColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-teal-500',
    'bg-blue-500',
    'bg-violet-500',
    'bg-pink-500',
  ];
  const getAvatarData = (user) => {
    const identifier = user?.name || user?.email || 'U';
    const initial = session?.user?.name
      ? session.user.name
        .split(" ")
        .map(word => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
      : "U";
    const seed = identifier
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const backgroundColorClass = avatarColors[seed % avatarColors.length];
    const title = user?.name || user?.email || 'User';

    return { initial, backgroundColorClass, title };
  };
  const { initial, backgroundColorClass, title } = getAvatarData(session?.user);

  return (
    <div className="flex w-full">
      <div className="sideBar h-[91.6vh] flex flex-col justify-between w-[20%] bg-neutral-900 py-2 px-3">
        <ul className="flex gap-1 flex-col mt-3 ml-4">
          <li className="flex items-center cursor-pointer hover:bg-neutral-800 duration-250 py-2 px-4 rounded-md gap-2 text-xl">
            <svg viewBox="0 0 24 24" className="w-5.5 h-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="#f5f5f5"></path> </g></svg>
            Overview</li>
          <li className="flex items-center cursor-pointer hover:bg-neutral-800 duration-250 py-2 px-4 rounded-md gap-2 text-xl">
            <svg viewBox="0 0 36 36" className="w-5 h-5 iconify iconify--twemoji" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#f0f0f0" d="M32.415 9.586l-9-9a2.001 2.001 0 0 0-2.829 2.829l-3.859 3.859l9 9l3.859-3.859a2 2 0 0 0 2.829-2.829z"></path><path fill="#f0f0f0" d="M22 0H7a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V11h-9c-1 0-2-1-2-2V0z"></path><path fill="#c4c4c4" d="M22 0h-2v9a4 4 0 0 0 4 4h9v-2h-9c-1 0-2-1-2-2V0zm-5 8a1 1 0 0 1-1 1H8a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1zm0 4a1 1 0 0 1-1 1H8a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1zm12 4a1 1 0 0 1-1 1H8a1 1 0 0 1 0-2h20a1 1 0 0 1 1 1zm0 4a1 1 0 0 1-1 1H8a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1zm0 4a1 1 0 0 1-1 1H8a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1zm0 4a1 1 0 0 1-1 1H8a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1z"></path></g></svg>
            My Page</li>
          <li className="flex items-center cursor-pointer hover:bg-neutral-800 duration-250 py-2 px-4 rounded-md gap-2 text-xl">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#f0f0f0"></path> </g></svg>
            Supporters</li>
          <li className="flex items-center cursor-pointer hover:bg-neutral-800 duration-250 py-2 px-4 rounded-md gap-2 text-xl">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M21.1009 8.00353C21.0442 7.99996 20.9825 7.99998 20.9186 8L20.9026 8.00001H18.3941C16.3264 8.00001 14.5572 9.62757 14.5572 11.75C14.5572 13.8724 16.3264 15.5 18.3941 15.5H20.9026L20.9186 15.5C20.9825 15.5 21.0442 15.5001 21.1009 15.4965C21.9408 15.4434 22.6835 14.7862 22.746 13.8682C22.7501 13.808 22.75 13.7431 22.75 13.683L22.75 13.6667V9.83334L22.75 9.81702C22.75 9.75688 22.7501 9.69199 22.746 9.6318C22.6835 8.71381 21.9408 8.05657 21.1009 8.00353ZM18.1717 12.75C18.704 12.75 19.1355 12.3023 19.1355 11.75C19.1355 11.1977 18.704 10.75 18.1717 10.75C17.6394 10.75 17.2078 11.1977 17.2078 11.75C17.2078 12.3023 17.6394 12.75 18.1717 12.75Z" fill="#f0f0f0"></path> <path fillRule="evenodd" clipRule="evenodd" d="M20.9179 17C21.067 16.9961 21.1799 17.1342 21.1394 17.2778C20.9387 17.9902 20.62 18.5975 20.1088 19.1088C19.3604 19.8571 18.4114 20.1892 17.239 20.3469C16.0998 20.5 14.6442 20.5 12.8064 20.5H10.6936C8.85583 20.5 7.40019 20.5 6.26098 20.3469C5.08856 20.1892 4.13961 19.8571 3.39124 19.1088C2.64288 18.3604 2.31076 17.4114 2.15314 16.239C1.99997 15.0998 1.99998 13.6442 2 11.8064V11.6936C1.99998 9.85583 1.99997 8.40019 2.15314 7.26098C2.31076 6.08856 2.64288 5.13961 3.39124 4.39124C4.13961 3.64288 5.08856 3.31076 6.26098 3.15314C7.40019 2.99997 8.85582 2.99998 10.6936 3L12.8064 3C14.6442 2.99998 16.0998 2.99997 17.239 3.15314C18.4114 3.31076 19.3604 3.64288 20.1088 4.39124C20.62 4.90252 20.9386 5.50974 21.1394 6.22218C21.1799 6.36575 21.067 6.50387 20.9179 6.5L18.394 6.50001C15.5574 6.50001 13.0571 8.74091 13.0571 11.75C13.0571 14.7591 15.5574 17 18.394 17L20.9179 17ZM7 15.5C6.58579 15.5 6.25 15.1642 6.25 14.75V8.75C6.25 8.33579 6.58579 8 7 8C7.41421 8 7.75 8.33579 7.75 8.75V14.75C7.75 15.1642 7.41421 15.5 7 15.5Z" fill="#f0f0f0"></path> </g></svg>
            Payout</li>
          <li className="flex items-center cursor-pointer hover:bg-neutral-800 duration-250 py-2 px-4 rounded-md gap-2 text-xl">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608C20.4261 13.0639 20.1197 12.558 20.1197 11.9999C20.1197 11.4418 20.4261 10.9361 20.9022 10.6392C21.2263 10.4371 21.435 10.2757 21.5836 10.0835C21.9089 9.66273 22.0525 9.13087 21.9828 8.60497C21.9304 8.21055 21.6957 7.80703 21.2262 7C20.7567 6.19297 20.522 5.78945 20.2039 5.54727C19.7799 5.22436 19.244 5.08185 18.7141 5.15109C18.4722 5.18269 18.2269 5.28136 17.8887 5.4588C17.3915 5.71959 16.7969 5.73002 16.3099 5.45096C15.8229 5.17191 15.5347 4.65566 15.5136 4.09794C15.4993 3.71848 15.4628 3.45833 15.3694 3.23463C15.1649 2.74458 14.7726 2.35523 14.2788 2.15224ZM12.5 15C14.1695 15 15.5228 13.6569 15.5228 12C15.5228 10.3431 14.1695 9 12.5 9C10.8305 9 9.47716 10.3431 9.47716 12C9.47716 13.6569 10.8305 15 12.5 15Z" fill="#f0f0f0"></path> </g></svg>
            Settings</li>
        </ul>

        <div className="mb-13 items-center justify-between px-6 flex">
          <div className="flex items-center gap-3">
            <button
              title={title}
              className={`${backgroundColorClass} h-10 w-10 rounded-full flex text-md items-center justify-center text-white font-medium cursor-pointer`} aria-label={`User avatar for ${title}`}
            >
              {initial}
            </button>
            <h1 className="text-xl">
              {displayName}
            </h1>
          </div>

          <button
            onClick={() => signOut()}
            className="bg-neutral-800 hover:bg-neutral-600 duration-250 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
            aria-label="Logout" title="Logout"
          >
            <svg fill="#f2f2f2" className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" stroke="#f2f2f2" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M17,2H7C5.3,2,4,3.3,4,5v6h8.6l-2.3-2.3c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l4,4c0.4,0.4,0.4,1,0,1.4c0,0,0,0,0,0l-4,4c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2.3-2.3H4v6c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3V5C20,3.3,18.7,2,17,2z"></path></g></svg>
          </button>
        </div>
      </div>
      <div className="h-[91.6vh] w-[80%] py-2 px-3">
        <h1 className="text-2xl font-semibold">{displayName}</h1>
      </div>
    </div>
  );
};

export default Page;
