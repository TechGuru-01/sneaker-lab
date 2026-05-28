import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";

export default function SignUp({
  setActivePage,
  redirectTarget,
  setRedirectTarget,
}) {
  useEffect(() => {
    if (!document.getElementById("facebook-jssdk")) {
      const js = document.createElement("script");
      js.id = "facebook-jssdk";
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      js.async = true;
      js.defer = true;
      document.body.appendChild(js);
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_ID || "1771130377214010",
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
    };
  }, []);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/social-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              auth_provider: "google",
              token: tokenResponse.access_token,
            }),
          },
        );

        const data = await response.json();

        if (response.ok) {
          // 💡 FIXED: Basahin nang ligtas ang role galing sa root level o user sub-object, saka gawing lowercase
          const userRole = (
            data.role ||
            data.user?.role ||
            "user"
          ).toLowerCase();
          const userToken = data.token || tokenResponse.access_token;

          localStorage.setItem("token", userToken);
          localStorage.setItem("userRole", userRole);

          // 💡 REDIRECT LOGIC: Kung admin, itapon agad sa admin panel view
          if (userRole === "admin") {
            setActivePage("admin");
          } else {
            setActivePage(redirectTarget || "home");
          }
          setRedirectTarget(null);
        } else {
          alert(`Error: ${data.error || "Something went wrong"}`);
        }
      } catch (error) {
        alert(
          "Server error. Siguraduhing nakabukas ang Node.js backend mo sa port 5000.",
        );
      }
    },
    onError: () => {
      alert("Google Authentication Failed. Subukan ulit.");
    },
  });

  const handleFacebookLogin = () => {
    if (!window.FB) {
      alert("Facebook SDK is still loading. Subukan ulit sandali.");
      return;
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const fbToken = response.authResponse.accessToken;
          sendFacebookTokenToBackend(fbToken);
        } else {
          alert("Facebook Authentication Cancelled or Failed.");
        }
      },
      { scope: "public_profile" },
    );
  };

  const sendFacebookTokenToBackend = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/social-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth_provider: "facebook",
            token: token,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // 💡 FIXED: Case-insensitive fallback check para sa Facebook login naman
        const userRole = (data.role || data.user?.role || "user").toLowerCase();
        const userToken = data.token || token;

        localStorage.setItem("token", userToken);
        localStorage.setItem("userRole", userRole);

        if (userRole === "admin") {
          setActivePage("admin");
        } else {
          setActivePage(redirectTarget || "home");
        }
        setRedirectTarget(null);
      } else {
        alert(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      alert(
        "Server error. Siguraduhing nakabukas ang Node.js backend mo sa port 5000.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4 w-full">
      <div className="w-full max-w-md border border-brand-grey bg-brand-black/40 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-brand-accent"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-brand-accent"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-brand-accent"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-accent"></div>

        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold font-mono text-brand-white uppercase tracking-widest">
            ACCESS_DENIED // JOIN_LAB
          </h2>
          <p className="text-xs font-mono text-brand-lightgrey/50 mt-2 uppercase">
            Authentication required to view this sector.
          </p>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => loginWithGoogle()}
            className="w-full h-12 flex items-center justify-center gap-3 border border-brand-lightgrey/20 bg-transparent hover:bg-brand-white hover:text-brand-black text-brand-white font-mono text-xs uppercase tracking-wider transition-all duration-300 group cursor-pointer"
          >
            <svg
              className="w-4 h-4 fill-current group-hover:text-brand-black"
              viewBox="0 0 24 24"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Connect via Google
          </button>

          <button
            type="button"
            onClick={handleFacebookLogin}
            className="w-full h-12 flex items-center justify-center gap-3 border border-brand-lightgrey/20 bg-transparent hover:bg-[#1877F2] hover:border-[#1877F2] text-brand-white font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Connect via Facebook
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] font-mono text-brand-lightgrey/30 uppercase">
            By connecting, you agree to sneakerlab_protocol_v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
