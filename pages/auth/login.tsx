import { GetServerSideProps } from "next";
import { Provider } from "next-auth/providers";
import { getProviders, signIn, useSession } from "next-auth/react";
import { LogosGoogleIcon, MdiGithub } from "../../icons/Icons";

import React from "react";

type Props = {
  providers: Provider;
};

const Login = ({ providers }: Props) => {
  const { data: session } = useSession();
  console.log(session, "SESSION");

  return (
 <div className="flex  items-center justify-center">

      <>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
           <button
                    type="button"
                    className="bg-white rounded-lg px-4 py-2 m-2 shadow-sm hover:shadow"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
           {provider.name === "Google" ? (
                      <div className="h-12 mb-2">
                        {" "}
                        <LogosGoogleIcon />
                      </div>
                    ) : (
                      <div className="h-12 mb-2">
                        {" "}
                        <MdiGithub />
                      </div>
                    )}{" "}
                    {provider.name}
            </button>
          </div>
        ))}
      </>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};