import { Metadata } from "next";
import { LoginGoogleButton } from "@/components/LoginButton";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect_url?: string }>;
}) => {
  const params = (await searchParams)?.redirect_url;
  let redirectUrl;
  if (!params) {
    redirectUrl = "/";
  } else {
    redirectUrl = `/${params}`;
  }

  return (
    <div className="min-h-screen flex items-center">
      <div className="bg-[#1a1b1c] w-96 mx-auto rounded-sm shadow p-8">
        <h1 className="text-4xl font-bold mb-1 text-white">Sign In</h1>
        <p className="font-medium mb-5 text-white opacity-70">
          Sign in to your account
        </p>
        <div className="py-4 text-center">
          <LoginGoogleButton redirectUrl={redirectUrl} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
