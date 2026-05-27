import { useState } from "react";
import { User } from "lucide-react";

export default function UserDropdown({ setActivePage, setRedirectTarget }) {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

 const handleProtectedAction = (e, targetPage) => {
   e.preventDefault();
   setIsOpen(false);

   if (targetPage === "logout") {
     localStorage.removeItem("token");
     window.history.pushState({}, "", "/SignUp");
     setActivePage("signup");
     return;
   }

   if (!isLoggedIn) {
     setRedirectTarget(targetPage); // TANDAAN ANG TARGET PAGE!
     window.history.pushState({}, "", "/SignUp");
     setActivePage("signup");
   } else {
     window.history.pushState({}, "", `/${targetPage}`);
     setActivePage(targetPage);
   }
 };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block p-2 cursor-pointer text-brand-white hover:text-brand-accent transition-colors focus:outline-none"
      >
        <User size={18} />
      </button>
      {isOpen && (
        <ul className="absolute right-0 w-48 bg-brand-black/95 backdrop-blur-md shadow-lg py-1 z-50 rounded-md border border-brand-lightgrey/10">
          <li>
            <a
              href="/profile"
              onClick={(e) => handleProtectedAction(e, "profile")}
              className="block px-4 py-2 text-sm text-brand-lightgrey/70 hover:text-white transition-colors font-mono"
            >
              View profile
            </a>
          </li>
          <li>
            <a
              href="/order"
              onClick={(e) => handleProtectedAction(e, "orders")}
              className="block px-4 py-2 text-sm text-brand-lightgrey/70 hover:text-white transition-colors font-mono"
            >
              Orders
            </a>
          </li>
          <li>
            <a
              href="/favourites"
              onClick={(e) => handleProtectedAction(e, "favourites")}
              className="block px-4 py-2 text-sm text-brand-lightgrey/70 hover:text-white transition-colors font-mono"
            >
              Favourites
            </a>
          </li>
          <li>
            <a
              href="/accountSettings"
              onClick={(e) => handleProtectedAction(e, "accountSettings")}
              className="block px-4 py-2 text-sm text-brand-lightgrey/70 hover:text-white transition-colors font-mono"
            >
              Account Settings
            </a>
          </li>
          <hr className="border-brand-lightgray/70 my-1" />
          <li>
            <button
              onClick={(e) =>
                handleProtectedAction(e, isLoggedIn ? "logout" : "signup")
              }
              className="block w-full text-left px-4 py-2 text-sm text-brand-lightgrey/70 hover:text-white transition-colors font-medium font-mono cursor-pointer"
            >
              {isLoggedIn ? "Logout" : "Login / SignUp"}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
