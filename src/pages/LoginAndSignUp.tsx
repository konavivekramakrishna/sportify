import { useState, lazy, Suspense, useEffect } from "react";

const SignUp = lazy(() => import("../components/SignUp"));
const Login = lazy(() => import("../components/Login"));

export default function LoginAndSignUp() {
  const [signupForm, setSignupForm] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSignup = () => {
    setSignupForm(!signupForm);
  };

  useEffect(() => {
    const image = new Image();
    image.src = "https://source.unsplash.com/random?wallpapers";
    image.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div
        className={`hidden md:block md:w-4/6 bg-cover bg-center ${
          imageLoaded ? "block" : "hidden"
        }`}
        style={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
        }}
      ></div>

      <div
        className={`w-full md:w-1/3 p-4 ${
          imageLoaded ? "block" : "hidden"
        }  flex items-center justify-center`}
      >
        <div className="max-w-lg w-full">
          <div className="mb-5 ml-3 p-2 text-center">
            <img src="src/assets/crlogo1.png" alt="" />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            {signupForm ? (
              <SignUp handleSignupCB={handleSignup} />
            ) : (
              <Login handleSignupCB={handleSignup} />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
