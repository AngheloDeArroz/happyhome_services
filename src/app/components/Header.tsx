import { getSignInUrl, getUser, signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";
import Image from "next/image"; // Keep this import

export default async function Header() {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();

  return (
    <header>
      <div className="container flex items-center justify-between mx-auto my-3">
        <Link href={'/'}>
          <Image 
            src="/imgs/heroLogo.png" 
            alt="HappyHome Services"
            width={150} 
            height={50} 
          />
        </Link>
        <nav className="flex gap-2">
          {!user && (
            <Link className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4" href={signInUrl}>
              Login
            </Link>
          )}
          {user && (
            <form action={async () => {
              'use server';
              await signOut();
            }}>
              <button type="submit" className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4">
                Logout
              </button>
            </form>
          )}
          <Link className="rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white" href={'/new-listing'}>
            Add Listing
          </Link>
        </nav>
      </div>
    </header>
  );
}
