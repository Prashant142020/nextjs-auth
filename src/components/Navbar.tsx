import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import UserAccountnav from './UserAccountnav';

const Navbar = async() => {
  
  const  session = await getServerSession(authOptions);

  return (
    <div className='fixed top-0 z-10 w-full py-2 border-b bg-zinc-100 border-s-zinc-200'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <HandMetal />
        </Link>

        {session?.user? (
       
          <UserAccountnav />
        ): (
           <Link className={buttonVariants()} href='/sign-in'>
          Sign in
        </Link> 
        )}
          
        
       
      </div>
    </div>
  );
};


export default Navbar;
