import React, { useState } from "react";
import { Search, ShoppingCart, X, Menu } from "lucide-react";
import UserDropdown from "./UserDropdown";

export const Header = ({
  activePage,
  setActivePage,
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
  isScrolled,
  cartCount,
  onTriggerNotification,
  setRedirectTarget,
  isAdmin = false, // 💡 Nagdagdag ng prop para malaman kung admin ang naka-login
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomeTransparent = activePage === "home" && !isScrolled;

  const handleNavClick = (newFilters) => {
    setFilters(newFilters);
    setActivePage("collections");
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`w-full top-0 fixed z-50 transition-all duration-500 ease-in-out ${
          isHomeTransparent
            ? "bg-transparent border-transparent h-20"
            : isScrolled
              ? "bg-brand-black/95 backdrop-blur-md border-b border-brand-grey h-16"
              : "bg-brand-black border-b border-brand-grey/40 h-20"
        }`}
      >
        <div className="flex justify-between items-center h-full px-6 md:px-16 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-12">
            <button
              onClick={() => {
                setActivePage("home");
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-lg md:text-xl font-syne font-bold tracking-tighter hover:text-brand-accent transition-colors cursor-pointer text-left z-50"
              id="top-nav-logo"
            >
              LOGO.
            </button>

            <nav className="hidden md:flex items-center gap-6 text-[11px] font-mono font-bold tracking-wider">
              <button
                onClick={() =>
                  handleNavClick({
                    category: "all",
                    gender: "men",
                    size: null,
                    colorway: null,
                    sortBy: "NEWEST FIRST",
                    maxPrice: 850,
                  })
                }
                className={`py-2 transition-all border-b-2 hover:text-brand-white ${
                  activePage === "collections" && filters.gender === "men"
                    ? "text-brand-white border-brand-accent"
                    : "text-brand-lightgrey/60 border-transparent"
                }`}
              >
                MEN
              </button>

              <button
                onClick={() =>
                  handleNavClick({
                    category: "all",
                    gender: "women",
                    size: null,
                    colorway: null,
                    sortBy: "NEWEST FIRST",
                    maxPrice: 850,
                  })
                }
                className={`py-2 transition-all border-b-2 hover:text-brand-white ${
                  activePage === "collections" && filters.gender === "women"
                    ? "text-brand-white border-brand-accent"
                    : "text-brand-lightgrey/60 border-transparent"
                }`}
              >
                WOMEN
              </button>

              <button
                onClick={() =>
                  handleNavClick({
                    category: "all",
                    gender: "kids",
                    size: null,
                    colorway: null,
                    sortBy: "NEWEST FIRST",
                    maxPrice: 850,
                  })
                }
                className={`py-2 transition-all border-b-2 hover:text-brand-white ${
                  activePage === "collections" && filters.gender === "kids"
                    ? "text-brand-white border-brand-accent"
                    : "text-brand-lightgrey/60 border-transparent"
                }`}
              >
                KIDS
              </button>

              <div className="h-4 w-[1px] bg-brand-grey/40 self-center mx-1"></div>

              <button
                onClick={() =>
                  handleNavClick({
                    category: "all",
                    gender: "all",
                    size: null,
                    colorway: null,
                    sortBy: "NEWEST FIRST",
                    maxPrice: 850,
                  })
                }
                className={`py-2 transition-all border-b-2 hover:text-brand-white ${
                  activePage === "collections" &&
                  filters.category === "all" &&
                  filters.gender === "all" &&
                  filters.sortBy === "NEWEST FIRST"
                    ? "text-brand-white border-brand-accent"
                    : "text-brand-lightgrey/60 border-transparent"
                }`}
              >
                NEW ARRIVALS
              </button>

              <button
                onClick={() =>
                  handleNavClick({
                    category: "all",
                    gender: "all",
                    size: null,
                    colorway: null,
                    sortBy: "MOST POPULAR",
                    maxPrice: 850,
                  })
                }
                className={`py-2 transition-all border-b-2 hover:text-brand-white ${
                  activePage === "collections" &&
                  filters.sortBy === "MOST POPULAR" &&
                  filters.gender === "all"
                    ? "text-brand-white border-brand-accent"
                    : "text-brand-lightgrey/60 border-transparent"
                }`}
              >
                COLLECTIONS
              </button>

              <button
                onClick={() =>
                  handleNavClick({
                    category: "all",
                    gender: "all",
                    size: null,
                    colorway: null,
                    sortBy: "PRICE: LOW TO HIGH",
                    maxPrice: 300,
                  })
                }
                className={`py-2 transition-all border-b-2 hover:text-brand-white ${
                  activePage === "collections" &&
                  filters.maxPrice <= 300 &&
                  filters.gender === "all"
                    ? "text-brand-white border-brand-accent"
                    : "text-brand-lightgrey/60 border-transparent"
                }`}
              >
                SALE
              </button>

              {/* 💡 DESKTOP ADMIN CORE LINK - Lalabas lang kapag isAdmin === true */}
              {isAdmin && (
                <>
                  <div className="h-4 w-[1px] bg-brand-grey/40 self-center mx-1"></div>
                  <button
                    onClick={() => setActivePage("admin")}
                    className={`py-2 transition-all border-b-2 hover:text-brand-accent tracking-widest ${
                      activePage === "admin"
                        ? "text-brand-accent border-brand-accent"
                        : "text-brand-lightgrey/40 border-transparent"
                    }`}
                  >
                    [ADMIN_CORE]
                  </button>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div
              className={`hidden lg:flex items-center border ${isSearchOpen ? "border-brand-accent w-64" : "border-brand-grey w-48"} px-3 h-10 gap-2 transition-all duration-300`}
            >
              <Search size={14} className="text-brand-lightgrey/60" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activePage !== "collections")
                    setActivePage("collections");
                }}
                placeholder="SEARCH MODELS..."
                className="bg-transparent border-none outline-none text-[10px] font-mono uppercase text-brand-white placeholder:text-brand-lightgrey/40 w-full focus:ring-0"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X size={12} className="text-brand-lightgrey/60" />
                </button>
              )}
            </div>

            <UserDropdown
              setActivePage={setActivePage}
              setRedirectTarget={setRedirectTarget}
            />

            <button
              onClick={() => {
                setActivePage("cart");
                setIsMobileMenuOpen(false);
              }}
              className="relative hover:text-brand-accent transition-all duration-200 active:scale-95 p-2"
              id="top-nav-cart-trigger"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-accent text-white leading-none text-[9px] font-bold w-4 h-4 rounded-none flex items-center justify-center tracking-tighter">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden relative z-50 p-2 hover:text-brand-accent transition-all"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-brand-black z-40 md:hidden flex flex-col justify-between pt-28 px-6 pb-10 transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center border border-brand-grey/60 px-4 h-12 gap-3 w-full mb-4">
            <Search size={16} className="text-brand-lightgrey/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== "collections") setActivePage("collections");
              }}
              placeholder="SEARCH MODELS..."
              className="bg-transparent border-none outline-none text-[11px] font-mono uppercase text-brand-white placeholder:text-brand-lightgrey/40 w-full focus:ring-0"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <X size={14} className="text-brand-lightgrey/60" />
              </button>
            )}
          </div>

          <nav className="flex flex-col gap-5 text-sm font-mono font-bold tracking-widest">
            <button
              onClick={() =>
                handleNavClick({
                  category: "all",
                  gender: "men",
                  size: null,
                  colorway: null,
                  sortBy: "NEWEST FIRST",
                  maxPrice: 850,
                })
              }
              className={`text-left py-2 border-b border-brand-grey/20 ${filters.gender === "men" && activePage === "collections" ? "text-brand-accent" : "text-brand-white"}`}
            >
              MEN
            </button>
            <button
              onClick={() =>
                handleNavClick({
                  category: "all",
                  gender: "women",
                  size: null,
                  colorway: null,
                  sortBy: "NEWEST FIRST",
                  maxPrice: 850,
                })
              }
              className={`text-left py-2 border-b border-brand-grey/20 ${filters.gender === "women" && activePage === "collections" ? "text-brand-accent" : "text-brand-white"}`}
            >
              WOMEN
            </button>
            <button
              onClick={() =>
                handleNavClick({
                  category: "all",
                  gender: "kids",
                  size: null,
                  colorway: null,
                  sortBy: "NEWEST FIRST",
                  maxPrice: 850,
                })
              }
              className={`text-left py-2 border-b border-brand-grey/20 ${filters.gender === "kids" && activePage === "collections" ? "text-brand-accent" : "text-brand-white"}`}
            >
              KIDS
            </button>
            <button
              onClick={() =>
                handleNavClick({
                  category: "all",
                  gender: "all",
                  size: null,
                  colorway: null,
                  sortBy: "NEWEST FIRST",
                  maxPrice: 850,
                })
              }
              className={`text-left py-2 border-b border-brand-grey/20 ${filters.category === "all" && filters.gender === "all" && filters.sortBy === "NEWEST FIRST" && activePage === "collections" ? "text-brand-accent" : "text-brand-white"}`}
            >
              NEW ARRIVALS
            </button>
            <button
              onClick={() =>
                handleNavClick({
                  category: "all",
                  gender: "all",
                  size: null,
                  colorway: null,
                  sortBy: "MOST POPULAR",
                  maxPrice: 850,
                })
              }
              className={`text-left py-2 border-b border-brand-grey/20 ${filters.sortBy === "MOST POPULAR" && activePage === "collections" ? "text-brand-accent" : "text-brand-white"}`}
            >
              COLLECTIONS
            </button>
            <button
              onClick={() =>
                handleNavClick({
                  category: "all",
                  gender: "all",
                  size: null,
                  colorway: null,
                  sortBy: "PRICE: LOW TO HIGH",
                  maxPrice: 300,
                })
              }
              className={`text-left py-2 border-b border-brand-grey/20 ${filters.maxPrice <= 300 && activePage === "collections" ? "text-brand-accent" : "text-brand-white"}`}
            >
              SALE
            </button>

            {/* 💡 MOBILE ADMIN FEATURE TRIGGER - Lalabas lang kapag isAdmin === true */}
            {isAdmin && (
              <button
                onClick={() => {
                  setActivePage("admin");
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-brand-grey/20 tracking-widest font-mono ${
                  activePage === "admin"
                    ? "text-brand-accent"
                    : "text-brand-accent/70"
                }`}
              >
                [⚙️ SYSTEM_ADMIN_CORE]
              </button>
            )}
          </nav>
        </div>

        <div className="text-[9px] font-mono text-brand-lightgrey/40 tracking-wider text-center">
          &copy; {new Date().getFullYear()} LOGO. ALL RIGHTS RESERVED.
        </div>
      </div>
    </>
  );
};
