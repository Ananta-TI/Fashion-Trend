import { Link, NavLink } from "react-router-dom";

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

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#1f1f1f]/15 bg-[#fff8e0]/95 backdrop-blur-xl">
      <div className="mx-auto grid h-14 max-w-[1728px] grid-cols-[56px_1fr_auto] divide-x divide-[#1f1f1f]/15 border-x border-[#1f1f1f]/15">
        <Link
          to="/"
          className="grid place-items-center transition hover:bg-[#fffaeb]"
          aria-label="FashionTrend AI"
        >
          <PixelMark />
        </Link>

        <nav className="hidden items-center gap-8 px-6 text-sm font-medium text-[#1f1f1f] lg:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#fa520f]" : "transition hover:text-[#fa520f]"
            }
          >
            Home
          </NavLink>


        </nav>

        <div className="flex items-center divide-x divide-[#1f1f1f]/15">
          <Link
            to="/predict"
            className="hidden h-14 items-center px-6 text-sm font-medium text-[#1f1f1f] transition hover:bg-[#fffaeb] md:flex"
          >
            Coba Prediksi
          </Link>

          <Link
            to="/predict"
            className="flex h-14 items-center bg-[#1f1f1f] px-5 text-sm font-semibold text-white transition hover:bg-[#2c2c2c] md:px-6"
          >
            Start analysing
          </Link>
        </div>
      </div>
    </header>
  );
}