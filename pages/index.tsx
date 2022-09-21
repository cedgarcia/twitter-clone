import type {GetServerSideProps, NextPage } from 'next'
import { Provider } from "next-auth/providers";
import Head from 'next/head'
import Image from 'next/image'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'


type Props = {
  providers: Provider
}

const Home = ({providers}:Props) => {

  const { data: session } = useSession();
  
  console.log(session)
  return (
    <div>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {session?.user?(
          <>
          <h1>Welcome back {session.user.name}</h1>
          <button onClick= {() =>signOut()}>Log out</button>
          </>
        ):(
          <>
            {providers && Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: "/",
                    })
                  }
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};