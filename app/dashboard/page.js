
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function DashboardOverviewPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const sessionEmail = session.user.email?.trim().toLowerCase();

  await connectDB();
  const user = await User.findOne({ email: sessionEmail })
    .select("name username description profileImage bannerImage supporters followersCount membersCount totalSupportAmount")
    .lean();
  const supporters = user?.supporters || [];
  const supportersCount = supporters.length;
  const followersCount = user?.followersCount ?? 0;
  const membersCount = user?.membersCount ?? 0;
  const totalSupportAmount = user?.totalSupportAmount ?? 0;

  return (
    <div>
      <div className="flex justify-around">
        <div className="flex flex-col px-16 py-7 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.5291 7.77C17.4591 7.76 17.3891 7.76 17.3191 7.77C15.7691 7.72 14.5391 6.45 14.5391 4.89C14.5391 3.3 15.8291 2 17.4291 2C19.0191 2 20.3191 3.29 20.3191 4.89C20.3091 6.45 19.0791 7.72 17.5291 7.77Z" fill="#f2f2f2"></path> <path d="M20.7916 14.7004C19.6716 15.4504 18.1016 15.7304 16.6516 15.5404C17.0316 14.7204 17.2316 13.8104 17.2416 12.8504C17.2416 11.8504 17.0216 10.9004 16.6016 10.0704C18.0816 9.8704 19.6516 10.1504 20.7816 10.9004C22.3616 11.9404 22.3616 13.6504 20.7916 14.7004Z" fill="#f2f2f2"></path> <path d="M6.44016 7.77C6.51016 7.76 6.58016 7.76 6.65016 7.77C8.20016 7.72 9.43016 6.45 9.43016 4.89C9.43016 3.29 8.14016 2 6.54016 2C4.95016 2 3.66016 3.29 3.66016 4.89C3.66016 6.45 4.89016 7.72 6.44016 7.77Z" fill="#f2f2f2"></path> <path d="M6.55109 12.8506C6.55109 13.8206 6.76109 14.7406 7.14109 15.5706C5.73109 15.7206 4.26109 15.4206 3.18109 14.7106C1.60109 13.6606 1.60109 11.9506 3.18109 10.9006C4.25109 10.1806 5.76109 9.89059 7.18109 10.0506C6.77109 10.8906 6.55109 11.8406 6.55109 12.8506Z" fill="#f2f2f2"></path> <path d="M12.1208 15.87C12.0408 15.86 11.9508 15.86 11.8608 15.87C10.0208 15.81 8.55078 14.3 8.55078 12.44C8.56078 10.54 10.0908 9 12.0008 9C13.9008 9 15.4408 10.54 15.4408 12.44C15.4308 14.3 13.9708 15.81 12.1208 15.87Z" fill="#f2f2f2"></path> <path d="M8.87078 17.9406C7.36078 18.9506 7.36078 20.6106 8.87078 21.6106C10.5908 22.7606 13.4108 22.7606 15.1308 21.6106C16.6408 20.6006 16.6408 18.9406 15.1308 17.9406C13.4208 16.7906 10.6008 16.7906 8.87078 17.9406Z" fill="#f2f2f2"></path> </g></svg>
            Supporters</span>
          <span className=" text-2xl">{supportersCount}</span>
        </div>
        <div className="flex flex-col px-16 py-7 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="#d6d6d6" fillOpacity="0.24"></path> <circle cx="12" cy="10" r="4" fill="#d6d6d6"></circle> <path fillRule="evenodd" clipRule="evenodd" d="M18.2209 18.2462C18.2791 18.3426 18.2613 18.466 18.1795 18.5432C16.5674 20.0662 14.3928 21 12 21C9.60728 21 7.43264 20.0663 5.82057 18.5433C5.73877 18.466 5.72101 18.3427 5.77918 18.2463C6.94337 16.318 9.29215 15 12.0001 15C14.7079 15 17.0567 16.3179 18.2209 18.2462Z" fill="#d6d6d6"></path> </g></svg>
            Followers</span>
          <span className=" text-2xl">{followersCount}</span>
        </div>
        <div className="flex flex-col px-16 py-7 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5 19C5 18.4477 5.44772 18 6 18L18 18C18.5523 18 19 18.4477 19 19C19 19.5523 18.5523 20 18 20L6 20C5.44772 20 5 19.5523 5 19Z" fill="#f2f2f2"></path> <path fillRule="evenodd" clipRule="evenodd" d="M9.87867 4.70711C11.0502 3.53554 12.9497 3.53554 14.1213 4.70711L16.6878 7.27359C16.9922 7.57795 17.4571 7.6534 17.8421 7.46091L18.5528 7.10558C20.0877 6.33813 21.7842 7.80954 21.2416 9.43755L19.4045 14.9487C18.9962 16.1737 17.8498 17 16.5585 17H7.44151C6.15022 17 5.0038 16.1737 4.59546 14.9487L2.75842 9.43755C2.21575 7.80955 3.91231 6.33813 5.44721 7.10558L6.15787 7.46091C6.54286 7.6534 7.00783 7.57795 7.31219 7.27359L9.87867 4.70711Z" fill="#f2f2f2"></path> </g></svg>
            Members</span>
          <span className=" text-2xl">{membersCount}</span>
        </div>
        <div className="flex flex-col px-16 py-7 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M19.875 20.5917C19.2334 20.0473 18.2666 20.0473 17.625 20.5917C16.9834 21.1361 16.0166 21.1361 15.375 20.5917C14.7334 20.0473 13.7666 20.0473 13.125 20.5917C12.4834 21.1361 11.5166 21.1361 10.875 20.5917C10.2334 20.0473 9.26659 20.0473 8.625 20.5917C7.98341 21.1361 7.01659 21.1361 6.375 20.5917C5.73341 20.0473 4.76659 20.0473 4.125 20.5917C3.68909 20.9616 3 20.6662 3 20.1094V3.89059C3 3.33383 3.68909 3.03842 4.125 3.40832C4.76659 3.95274 5.73341 3.95274 6.375 3.40832C7.01659 2.86389 7.98341 2.86389 8.625 3.40832C9.26659 3.95274 10.2334 3.95274 10.875 3.40832C11.5166 2.86389 12.4834 2.86389 13.125 3.40832C13.7666 3.95274 14.7334 3.95274 15.375 3.40832C16.0166 2.86389 16.9834 2.86389 17.625 3.40832C18.2666 3.95274 19.2334 3.95274 19.875 3.40832C20.3109 3.03842 21 3.33383 21 3.89059V20.1094C21 20.6662 20.3109 20.9616 19.875 20.5917ZM6.75 12C6.75 11.5858 7.08579 11.25 7.5 11.25H16.5C16.9142 11.25 17.25 11.5858 17.25 12C17.25 12.4142 16.9142 12.75 16.5 12.75H7.5C7.08579 12.75 6.75 12.4142 6.75 12ZM7.5 7.75C7.08579 7.75 6.75 8.08579 6.75 8.5C6.75 8.91421 7.08579 9.25 7.5 9.25H16.5C16.9142 9.25 17.25 8.91421 17.25 8.5C17.25 8.08579 16.9142 7.75 16.5 7.75H7.5ZM6.75 15.5C6.75 15.0858 7.08579 14.75 7.5 14.75H16.5C16.9142 14.75 17.25 15.0858 17.25 15.5C17.25 15.9142 16.9142 16.25 16.5 16.25H7.5C7.08579 16.25 6.75 15.9142 6.75 15.5Z" fill="#f0f0f0"></path> </g></svg>
            Total Support</span>
          <span className=" text-2xl">${totalSupportAmount}</span>
        </div>
      </div>
    </div>
  )
}