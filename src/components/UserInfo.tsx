"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut();
    toast.error("সফলভাবে সাইন আউট হয়েছে");
  };
  return (
    <div>
      {user ? (
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img alt={user.name} src={user?.image as string} />
            </div>
          </div>
          <button
            onClick={handleSignout}
            className="rounded bg-[#b90000] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-red-800"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-[#008236] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#006d2d] transition-colors"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
