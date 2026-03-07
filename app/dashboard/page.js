
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { redirect } from "next/navigation";


export default async function DashboardOverviewPage() {
  const truncateText = (value, maxChars = 150) => {
    const text = String(value ?? "").trim();
    if (!text || text === "-") return "-";
    return text.length > maxChars ? `${text.slice(0, maxChars)}....` : text;
  };
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const sessionEmail = session.user.email?.trim().toLowerCase();

  await connectDB();
  const user = await User.findOne({ email: sessionEmail })
    .select("name username description profileImage bannerImage supporters followersCount members totalSupportAmount")
    .lean();
  const supporters = user?.supporters || [];
  const supporterUserIds = supporters
    .map((supporter) => supporter?.user)
    .filter(Boolean);
  const supporterUsers = supporterUserIds.length
    ? await User.find({ _id: { $in: supporterUserIds } }).select("name username").lean()
    : [];
  const supporterUsersById = new Map(
    supporterUsers.map((supporterUser) => [supporterUser._id.toString(), supporterUser])
  );
  const members = user?.members || [];
  const memberUserIds = members
    .map((member) => member?.user)
    .filter(Boolean);
  const memberUsers = memberUserIds.length
    ? await User.find({ _id: { $in: memberUserIds } }).select("name username").lean()
    : [];
  const memberUsersById = new Map(
    memberUsers.map((memberUser) => [memberUser._id.toString(), memberUser])
  );
  const supportersCount = supporters.length;
  const followersCount = user?.followersCount ?? 0;
  const membersCount = members.length;
  const formattedSupporters = supporters.map((supporter, index) => {
    const supporterUserId = supporter?.user?.toString?.() || "";
    const supporterUser = supporterUsersById.get(supporterUserId);

    return {
      id: supporter?._id?.toString?.() || `${supporterUserId || "supporter"}-${index}`,
      name: supporterUser?.name || supporterUser?.username || supporter?.name || "Anonymous",
      amount: supporter?.amount ?? 0,
      message: truncateText(supporter?.message),
    };
  });
  const formattedMembers = members.map((member, index) => {
    const memberUserId = member?.user?.toString?.() || "";
    const memberUser = memberUsersById.get(memberUserId);

    return {
      id: member?._id?.toString?.() || `${memberUserId || "member"}-${index}`,
      name: memberUser?.name || memberUser?.username || "Unknown member",
      type: member?.tier?.name?.trim() || "Member",
      amount: member?.tier?.price ?? 0,
    };
  });
  const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const totalSupportAmount = user?.totalSupportAmount ?? 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-around">
        <div className="flex flex-col px-16 py-5 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#f2f2f2"></path> </g></svg>
            Supporters</span>
          <span className=" text-2xl">{supportersCount}</span>
        </div>
        <div className="flex flex-col px-16 py-5 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.5291 7.77C17.4591 7.76 17.3891 7.76 17.3191 7.77C15.7691 7.72 14.5391 6.45 14.5391 4.89C14.5391 3.3 15.8291 2 17.4291 2C19.0191 2 20.3191 3.29 20.3191 4.89C20.3091 6.45 19.0791 7.72 17.5291 7.77Z" fill="#f2f2f2"></path> <path d="M20.7916 14.7004C19.6716 15.4504 18.1016 15.7304 16.6516 15.5404C17.0316 14.7204 17.2316 13.8104 17.2416 12.8504C17.2416 11.8504 17.0216 10.9004 16.6016 10.0704C18.0816 9.8704 19.6516 10.1504 20.7816 10.9004C22.3616 11.9404 22.3616 13.6504 20.7916 14.7004Z" fill="#f2f2f2"></path> <path d="M6.44016 7.77C6.51016 7.76 6.58016 7.76 6.65016 7.77C8.20016 7.72 9.43016 6.45 9.43016 4.89C9.43016 3.29 8.14016 2 6.54016 2C4.95016 2 3.66016 3.29 3.66016 4.89C3.66016 6.45 4.89016 7.72 6.44016 7.77Z" fill="#f2f2f2"></path> <path d="M6.55109 12.8506C6.55109 13.8206 6.76109 14.7406 7.14109 15.5706C5.73109 15.7206 4.26109 15.4206 3.18109 14.7106C1.60109 13.6606 1.60109 11.9506 3.18109 10.9006C4.25109 10.1806 5.76109 9.89059 7.18109 10.0506C6.77109 10.8906 6.55109 11.8406 6.55109 12.8506Z" fill="#f2f2f2"></path> <path d="M12.1208 15.87C12.0408 15.86 11.9508 15.86 11.8608 15.87C10.0208 15.81 8.55078 14.3 8.55078 12.44C8.56078 10.54 10.0908 9 12.0008 9C13.9008 9 15.4408 10.54 15.4408 12.44C15.4308 14.3 13.9708 15.81 12.1208 15.87Z" fill="#f2f2f2"></path> <path d="M8.87078 17.9406C7.36078 18.9506 7.36078 20.6106 8.87078 21.6106C10.5908 22.7606 13.4108 22.7606 15.1308 21.6106C16.6408 20.6006 16.6408 18.9406 15.1308 17.9406C13.4208 16.7906 10.6008 16.7906 8.87078 17.9406Z" fill="#f2f2f2"></path> </g></svg>
            Followers</span>
          <span className=" text-2xl">{followersCount}</span>
        </div>
        <div className="flex flex-col px-16 py-5 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5 19C5 18.4477 5.44772 18 6 18L18 18C18.5523 18 19 18.4477 19 19C19 19.5523 18.5523 20 18 20L6 20C5.44772 20 5 19.5523 5 19Z" fill="#f2f2f2"></path> <path fillRule="evenodd" clipRule="evenodd" d="M9.87867 4.70711C11.0502 3.53554 12.9497 3.53554 14.1213 4.70711L16.6878 7.27359C16.9922 7.57795 17.4571 7.6534 17.8421 7.46091L18.5528 7.10558C20.0877 6.33813 21.7842 7.80954 21.2416 9.43755L19.4045 14.9487C18.9962 16.1737 17.8498 17 16.5585 17H7.44151C6.15022 17 5.0038 16.1737 4.59546 14.9487L2.75842 9.43755C2.21575 7.80955 3.91231 6.33813 5.44721 7.10558L6.15787 7.46091C6.54286 7.6534 7.00783 7.57795 7.31219 7.27359L9.87867 4.70711Z" fill="#f2f2f2"></path> </g></svg>
            Members</span>
          <span className=" text-2xl">{membersCount}</span>
        </div>
        <div className="flex flex-col px-12 py-5 rounded-2xl items-center bg-[#191919] cursor-default hover:bg-[#111] duration-250">
          <span className="opacity-90  flex justify-center gap-1 text-lg font-medium">
            <svg viewBox="0 -196 1416 1416" className="w-7 h-7 icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M324.358919 22.140541H1361.643243c18.819459 0 33.210811 14.391351 33.210811 33.21081v645.396757c0 18.819459-14.391351 33.210811-33.210811 33.210811H324.358919c-18.819459 0-33.210811-14.391351-33.210811-33.210811V55.351351c0-18.819459 14.391351-33.210811 33.210811-33.21081z" fill="#ededed"></path><path d="M1361.643243 756.099459H324.358919c-30.996757 0-55.351351-24.354595-55.351351-55.351351V55.351351c0-30.996757 24.354595-55.351351 55.351351-55.351351H1361.643243c30.996757 0 55.351351 24.354595 55.351352 55.351351v645.396757c0 29.88973-24.354595 55.351351-55.351352 55.351351zM324.358919 44.281081c-6.642162 0-11.07027 4.428108-11.07027 11.07027v645.396757c0 6.642162 4.428108 11.07027 11.07027 11.07027H1361.643243c6.642162 0 11.07027-4.428108 11.070271-11.07027V55.351351c0-6.642162-4.428108-11.07027-11.070271-11.07027H324.358919z" fill="#131313"></path><path d="M230.261622 116.237838h1038.391351c18.819459 0 33.210811 14.391351 33.210811 33.210811v645.396756c0 18.819459-14.391351 33.210811-33.210811 33.210811H230.261622c-18.819459 0-33.210811-14.391351-33.210811-33.210811V149.448649c0-18.819459 14.391351-33.210811 33.210811-33.210811z" fill="#ededed"></path><path d="M1267.545946 850.196757H230.261622c-30.996757 0-55.351351-24.354595-55.351352-55.351352V149.448649c0-30.996757 24.354595-55.351351 55.351352-55.351352h1038.391351c30.996757 0 55.351351 24.354595 55.351351 55.351352v645.396756c-1.107027 29.88973-25.461622 55.351351-56.458378 55.351352zM230.261622 138.378378c-6.642162 0-11.07027 4.428108-11.070271 11.070271v645.396756c0 6.642162 4.428108 11.07027 11.070271 11.070271h1038.391351c6.642162 0 11.07027-4.428108 11.07027-11.070271V149.448649c0-6.642162-4.428108-11.07027-11.07027-11.070271H230.261622z" fill="#131313"></path><path d="M143.913514 208.121081h1038.391351c18.819459 0 33.210811 14.391351 33.210811 33.210811v645.396757c0 18.819459-14.391351 33.210811-33.210811 33.21081H143.913514c-18.819459 0-33.210811-14.391351-33.210811-33.21081V241.331892c0-17.712432 14.391351-33.210811 33.210811-33.210811z" fill="#ededed"></path><path d="M1182.304865 942.08H143.913514c-30.996757 0-55.351351-24.354595-55.351352-55.351351V241.331892c0-30.996757 24.354595-55.351351 55.351352-55.351351h1038.391351c30.996757 0 55.351351 24.354595 55.351351 55.351351v645.396757c0 29.88973-25.461622 55.351351-55.351351 55.351351zM143.913514 230.261622c-6.642162 0-11.07027 4.428108-11.070271 11.07027v645.396757c0 6.642162 4.428108 11.07027 11.070271 11.07027h1038.391351c6.642162 0 11.07027-4.428108 11.07027-11.07027V241.331892c0-6.642162-4.428108-11.07027-11.07027-11.07027H143.913514z" fill="#131313"></path><path d="M55.351351 290.041081h1038.391352c18.819459 0 33.210811 14.391351 33.210811 33.210811v645.396757c0 18.819459-14.391351 33.210811-33.210811 33.21081H55.351351c-18.819459 0-33.210811-14.391351-33.21081-33.21081V323.251892c0-17.712432 14.391351-33.210811 33.21081-33.210811z" fill="#ededed"></path><path d="M1093.742703 1024H55.351351c-30.996757 0-55.351351-24.354595-55.351351-55.351351V323.251892c0-30.996757 24.354595-55.351351 55.351351-55.351351h1038.391352c30.996757 0 55.351351 24.354595 55.351351 55.351351v645.396757c0 30.996757-25.461622 55.351351-55.351351 55.351351zM55.351351 312.181622c-6.642162 0-11.07027 4.428108-11.07027 11.07027v645.396757c0 6.642162 4.428108 11.07027 11.07027 11.07027h1038.391352c6.642162 0 11.07027-4.428108 11.07027-11.07027V323.251892c0-6.642162-4.428108-11.07027-11.07027-11.07027H55.351351z" fill="#131313"></path><path d="M954.257297 902.227027H194.836757c0-52.03027-43.174054-95.204324-95.204325-95.204324V472.700541c52.03027 0 95.204324-43.174054 95.204325-95.204325h759.42054c0 52.03027 43.174054 95.204324 95.204325 95.204325v334.322162c-53.137297 0-95.204324 43.174054-95.204325 95.204324z" fill="#ffffff"></path><path d="M954.257297 924.367568H194.836757c-12.177297 0-22.140541-9.963243-22.140541-22.140541 0-39.852973-33.210811-73.063784-73.063784-73.063784-12.177297 0-22.140541-9.963243-22.14054-22.14054V472.700541c0-12.177297 9.963243-22.140541 22.14054-22.140541 39.852973 0 73.063784-33.210811 73.063784-73.063784 0-12.177297 9.963243-22.140541 22.140541-22.14054h759.42054c12.177297 0 22.140541 9.963243 22.140541 22.14054 0 39.852973 33.210811 73.063784 73.063784 73.063784 12.177297 0 22.140541 9.963243 22.14054 22.140541v334.322162c0 12.177297-9.963243 22.140541-22.14054 22.14054-39.852973 0-73.063784 33.210811-73.063784 73.063784 0 12.177297-9.963243 22.140541-22.140541 22.140541z m-739.494054-44.281082h718.460541c8.856216-46.495135 46.495135-84.134054 92.99027-92.99027V492.627027c-46.495135-8.856216-84.134054-46.495135-92.99027-92.99027H214.763243c-8.856216 46.495135-46.495135 84.134054-92.99027 92.99027V785.989189c46.495135 9.963243 84.134054 47.602162 92.99027 94.097297z" fill="#131313"></path><path d="M576.761081 790.417297c-35.424865 0-73.063784-13.284324-99.632432-47.602162-7.749189-9.963243-5.535135-23.247568 3.321081-30.996757 9.963243-7.749189 23.247568-5.535135 30.996756 3.321081 26.568649 34.317838 67.528649 35.424865 94.097298 26.568649 22.140541-7.749189 35.424865-22.140541 35.424865-37.638919 0-14.391351-34.317838-24.354595-64.207568-33.210811-46.495135-14.391351-105.167568-30.996757-105.167567-86.348108 0-26.568649 16.605405-50.923243 45.388108-65.314594 35.424865-17.712432 95.204324-24.354595 151.662702 16.605405 9.963243 7.749189 12.177297 21.033514 4.428108 30.996757-7.749189 9.963243-21.033514 12.177297-30.996756 4.428108-37.638919-27.675676-79.705946-26.568649-105.167568-13.284324-13.284324 6.642162-22.140541 16.605405-22.14054 26.568648 0 21.033514 30.996757 30.996757 73.063783 44.281081 45.388108 13.284324 95.204324 28.782703 95.204325 75.277838 0 34.317838-25.461622 65.314595-65.314595 79.705946-11.07027 3.321081-26.568649 6.642162-40.96 6.642162z" fill="#131313"></path><path d="M574.547027 549.085405c-12.177297 0-22.140541-9.963243-22.140541-22.14054v-48.709189c0-12.177297 9.963243-22.140541 22.140541-22.140541s22.140541 9.963243 22.140541 22.140541v48.709189c0 13.284324-9.963243 22.140541-22.140541 22.14054z" fill="#131313"></path><path d="M574.547027 832.484324c-12.177297 0-22.140541-9.963243-22.140541-22.14054v-36.531892c0-12.177297 9.963243-22.140541 22.140541-22.140541s22.140541 9.963243 22.140541 22.140541v36.531892c0 12.177297-9.963243 22.140541-22.140541 22.14054z" fill="#131313"></path><path d="M285.612973 653.145946m-40.96 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 1 0-81.92 0Z" fill="#ffffff"></path><path d="M285.612973 715.139459c-34.317838 0-63.100541-27.675676-63.100541-63.10054s27.675676-63.100541 63.100541-63.100541c34.317838 0 63.100541 27.675676 63.100541 63.100541s-28.782703 63.100541-63.100541 63.10054z m0-80.812973c-9.963243 0-18.819459 7.749189-18.819459 18.81946s7.749189 18.819459 18.819459 18.819459c9.963243 0 18.819459-7.749189 18.819459-18.819459s-8.856216-18.819459-18.819459-18.81946z" fill="#131313"></path><path d="M865.695135 653.145946m-40.96 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 1 0-81.92 0Z" fill="#ffffff"></path><path d="M865.695135 715.139459c-34.317838 0-63.100541-27.675676-63.10054-63.10054s27.675676-63.100541 63.10054-63.100541c34.317838 0 63.100541 27.675676 63.100541 63.100541s-28.782703 63.100541-63.100541 63.10054z m0-80.812973c-9.963243 0-18.819459 7.749189-18.819459 18.81946s7.749189 18.819459 18.819459 18.819459 18.819459-7.749189 18.81946-18.819459-8.856216-18.819459-18.81946-18.81946z" fill="#131313"></path></g></svg>
            Total Support</span>
          <span className=" text-2xl">{usdFormatter.format(totalSupportAmount)}</span>
        </div>
      </div>

      <div>
        <h1 className="text-2xl mb-4 font-medium">Recent Supports, Members</h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#222] bg-[#151515] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#222]">
              <h2 className="text-lg font-semibold text-neutral-100">Supporters</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead className="bg-[#191919]">
                  <tr className="text-left text-sm text-neutral-300">
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {formattedSupporters.length ? (
                    formattedSupporters.slice().reverse().map((supporter) => (
                      <tr key={supporter.id} className="border-t border-[#222] text-neutral-200">
                        <td className="px-5 py-4">{supporter.name}</td>
                        <td className="px-5 py-4 font-semibold">{usdFormatter.format(supporter.amount)}</td>
                        <td className="px-5 py-4 text-neutral-300">{supporter.message}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-t border-[#222] text-neutral-400">
                      <td colSpan={3} className="px-5 py-8 text-center">
                        No supporters yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-[#222] bg-[#151515] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#222]">
              <h2 className="text-lg font-semibold text-neutral-100">Members</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead className="bg-[#191919]">
                  <tr className="text-left text-sm text-neutral-300">
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Membership Type</th>
                    <th className="px-5 py-3 font-medium">Membership Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {formattedMembers.length ? (
                    formattedMembers.slice().reverse().map((member) => (
                      <tr key={member.id} className="border-t border-[#222] text-neutral-200">
                        <td className="px-5 py-4">{member.name}</td>
                        <td className="px-5 py-4">{member.type}</td>
                        <td className="px-5 py-4 font-semibold">{usdFormatter.format(member.amount)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-t border-[#222] text-neutral-400">
                      <td colSpan={3} className="px-5 py-8 text-center">
                        No members yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

