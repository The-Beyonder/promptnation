'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, Provider } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


interface ProviderType{
  [key: string]: any;
}

const Nav = () => {

  const {data: session}= useSession();
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState<null | ProviderType>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
 
  useEffect(() => {
    const makeProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    makeProviders()
  }, [])

  // console.log(session);

  return (

    <nav className="flex-between w-full pt-3 mb-16">
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt='logo'
          className='object-contain'
          width={30}
          height={30}
        />
        <p className='logo_text'>Promptio</p>
      </Link>
      {/* Desktop Nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt"
              className='black_btn'
            >
              Create Post
            </Link>
            <button type="button"
              onClick={()=>signOut()}
              className='outline_btn'>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image!} 
                alt="profile"
                width={37} height={37}
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
            {
          providers&& Object.values(providers).map((provider: ProviderType)=>(
            <button
            type='button'
            key={provider.name}
            onClick={()=>signIn(provider.id)}
            className='black_btn'
            >
              Sign In
            </button>
          ))
        }
          </>
        )}
</div>
        {/* Mobile Nav */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
                <Image
                  src={session?.user.image || "/assets/images/logo.svg"} 
                  alt="profile"
                  width={37} height={37}
                  className='rounded-full'
                  onClick={()=>{setToggleDropdown((prev)=>!prev)}}
                />
                {toggleDropdown&&(
                  <div className="dropdown">
                    <Link href="/profile"
                    className='dropdown_link'
                    onClick={()=>setToggleDropdown(false)}>
                      My Profile
                    </Link>
                    <Link href="/create-prompt"
                    className='dropdown_link'
                    onClick={()=>setToggleDropdown(false)}>
                      Create Prompt
                    </Link>
                    <button type="button"
                    className='mt-5 w-full black_btn'
                    onClick={
                      ()=>{
                        setToggleDropdown(false);
                        signOut()
                      }
                    }
                    >
                      Sign Out
                    </button>
                  </div>
                )}
            </div>
          ) : 
          (<>
             {
          providers&& Object.values(providers).map((provider: ProviderType)=>(
            <button
            type='button'
            key={provider.name}
            onClick={()=>signIn(provider.id)}
            className='black_btn'
            >
              Sign In
            </button>
          ))
        }
          </>)}
        </div>
    </nav>
  )
}

export default Nav