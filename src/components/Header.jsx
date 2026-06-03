import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function PixelMark() {
  const blocks = [
    ["#FFAF01", "col-start-2 row-start-1"],
    ["#FF8204", "col-start-1 row-start-2"],
    ["#FA500F", "col-start-2 row-start-2"],
    ["#FF8204", "col-start-3 row-start-2"],
    ["#E61300", "col-start-1 row-start-3"],
    ["#C4001D", "col-start-2 row-start-3"],
    ["#E61300", "col-start-3 row-start-3"],
  ];

  return (
    <div className="grid h-6 w-8 grid-cols-3 grid-rows-3 gap-[2px]">
      {blocks.map(([color, pos], index) => (
        <span key={index} className={pos} style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-[#fa520f]"
    : "text-[#1f1f1f] transition hover:text-[#fa520f]";

const mobileNavLinkClass = ({ isActive }) =>
  isActive
    ? "block rounded-2xl bg-[#fa520f]/10 px-4 py-3 text-sm font-semibold text-[#fa520f]"
    : "block rounded-2xl px-4 py-3 text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#fffaeb] hover:text-[#fa520f]";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#1f1f1f]/15 bg-[#fff8e0]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-[1728px] border-x border-[#1f1f1f]/15">
        <div className="grid h-16 grid-cols-[64px_1fr_auto] divide-x divide-[#1f1f1f]/15 md:h-16 lg:h-14 lg:grid-cols-[72px_1fr_auto]">
          <Link
            to="/"
            onClick={closeMenu}
            className="grid place-items-center transition hover:bg-[#fffaeb]"
            aria-label="FashionTrend AI"
          >
            <img
              src="/logo.png"
              alt="FashionTrend"
              className="h-9 w-9 object-contain drop-shadow-[0_12px_30px_rgba(250,82,15,0.28)] md:h-10 md:w-10 lg:h-9 lg:w-9"
              draggable="false"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </Link>

          <div className="flex min-w-0 items-center justify-between px-4 md:px-6">
            <Link
              to="/"
              onClick={closeMenu}
              className="min-w-0 truncate font-serif text-lg font-semibold tracking-[-0.03em] text-[#1f1f1f] sm:text-xl lg:hidden"
            >
              FashionTrend AI
            </Link>

            <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>

              <NavLink to="/predict" className={navLinkClass}>
                Prediksi
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center divide-x divide-[#1f1f1f]/15">
            <Link
              to="/predict"
              className="hidden h-16 items-center px-5 text-sm font-medium text-[#1f1f1f] transition hover:bg-[#fffaeb] md:flex lg:h-14 lg:px-6"
            >
              Coba Prediksi
            </Link>

            <Link
              to="/predict"
              className="hidden h-16 items-center bg-[#1f1f1f] px-5 text-sm font-semibold text-white transition hover:bg-[#2c2c2c] md:flex lg:h-14 lg:px-6"
            >
              Start analysing
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="grid h-16 w-16 place-items-center text-[#1f1f1f] transition hover:bg-[#fffaeb] md:h-16 md:w-16 lg:hidden"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden border-t border-[#1f1f1f]/15 bg-[#fff8e0]/98 transition-all duration-300 lg:hidden ${
            isOpen
              ? "max-h-[420px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 px-4 py-4 sm:px-6">
            <NavLink to="/" onClick={closeMenu} className={mobileNavLinkClass}>
              Home
            </NavLink>

            <NavLink
              to="/predict"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              Prediksi
            </NavLink>

            <div className="grid gap-3 pt-3 sm:grid-cols-2">
              <Link
                to="/predict"
                onClick={closeMenu}
                className="flex h-12 items-center justify-center rounded-2xl border border-[#1f1f1f]/15 bg-white/60 px-5 text-sm font-semibold text-[#1f1f1f] transition hover:border-[#fa520f] hover:bg-[#fffaeb]"
              >
                Coba Prediksi
              </Link>

              <Link
                to="/predict"
                onClick={closeMenu}
                className="flex h-12 items-center justify-center rounded-2xl bg-[#1f1f1f] px-5 text-sm font-semibold text-white transition hover:bg-[#2c2c2c]"
              >
                Start analysing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}