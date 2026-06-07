import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
    <div className="grid h-5 w-7 grid-cols-3 grid-rows-3 gap-[2px] lg:h-[18px] lg:w-6">
      {blocks.map(([color, pos], index) => (
        <span key={index} className={pos} style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

function PixelArrow({ className = "size-4" }) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.9995 25H8.99951V21H12.9995V25Z" fill="currentColor" />
      <path d="M16.9995 21H12.9995V17H16.9995V21Z" fill="currentColor" />
      <path d="M20.9995 17H16.9995V13H20.9995V17Z" fill="currentColor" />
      <path d="M16.9995 13H12.9995V9H16.9995V13Z" fill="currentColor" />
      <path d="M12.9995 9H8.99951V5H12.9995V9Z" fill="currentColor" />
    </svg>
  );
}

const sectionItems = [
  { label: "Workflow", id: "workflow" },
  // { label: "Products", id: "products" },
  // { label: "Features", id: "features" },
  { label: "Implementation", id: "implementation" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isPredictPage = location.pathname === "/predict";
  const sectionIds = useMemo(() => sectionItems.map((item) => item.id), []);

  const closeMenu = () => setIsOpen(false);

  const goHome = () => {
    closeMenu();
    setActiveSection("");
    navigate("/");

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const goToSection = (id) => {
    closeMenu();
    setActiveSection(id);

    const scrollToTarget = () => {
      const target = document.getElementById(id);

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      window.setTimeout(scrollToTarget, 120);
      return;
    }

    window.history.replaceState(null, "", `#${id}`);
    scrollToTarget();
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const hash = location.hash.replace("#", "");

    if (!hash) return;

    const target = document.getElementById(hash);

    if (!target) return;

    setActiveSection(hash);

    window.setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const handleTopArea = () => {
      const firstSectionTop = sections[0]?.getBoundingClientRect().top ?? 0;

      if (window.scrollY < 80 || firstSectionTop > window.innerHeight * 0.55) {
        setActiveSection("");
      }
    };

    handleTopArea();

    const observer = new IntersectionObserver(
      (entries) => {
        handleTopArea();

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.12, 0.25, 0.45, 0.65],
      }
    );

    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleTopArea, { passive: true });
    window.addEventListener("resize", handleTopArea);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleTopArea);
      window.removeEventListener("resize", handleTopArea);
    };
  }, [location.pathname, sectionIds]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed left-0 top-0 z-[9999] isolate w-full border-b border-[#111]/10 bg-[#fbfaf5] text-[#111]">
      <div className="mx-auto max-w-[1728px] border-x border-[#111]/10">
        <div className="grid h-14 grid-cols-[56px_1fr_auto] divide-x divide-[#111]/10 lg:h-12 lg:grid-cols-[48px_1fr_auto]">
          <button
            type="button"
            onClick={goHome}
            className="grid place-items-center transition hover:bg-[#f1eee5]"
            aria-label="FashionTrend AI"
          >
            {logoFailed ? (
              <PixelMark />
            ) : (
              <img
                src="/logo.png"
                alt="FashionTrend"
                className="h-8 w-8 object-contain lg:h-7 lg:w-7"
                draggable="false"
                onError={() => setLogoFailed(true)}
              />
            )}
          </button>

          <div className="flex min-w-0 items-center justify-between">
            <button
              type="button"
              onClick={goHome}
              className="min-w-0 truncate px-4 text-left font-sans text-sm font-semibold tracking-[-0.02em] text-[#111] transition hover:text-[#fa520f] sm:px-5 lg:hidden"
            >
              FashionTrend AI
            </button>

            <nav className="hidden h-full items-center lg:flex">
              <button
                type="button"
                onClick={goHome}
                className={`flex h-full items-center border-r border-[#111]/10 px-4 text-[13px] font-semibold transition xl:px-5 ${
                  location.pathname === "/" && !activeSection
                    ? "bg-[#f1eee5] text-[#fa520f]"
                    : "text-[#111] hover:bg-[#f1eee5] hover:text-[#fa520f]"
                }`}
              >
                Home
              </button>

              {sectionItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  className={`flex h-full items-center border-r border-[#111]/10 px-4 text-[13px] font-semibold transition xl:px-5 ${
                    activeSection === item.id
                      ? "bg-[#f1eee5] text-[#fa520f]"
                      : "text-[#111] hover:bg-[#f1eee5] hover:text-[#fa520f]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center divide-x divide-[#111]/10">
            <NavLink
              to="/predict"
              className={({ isActive }) =>
                `hidden h-14 items-center gap-2 px-4 text-[13px] font-semibold transition md:flex lg:h-12 xl:px-5 ${
                  isActive
                    ? "bg-[#f1eee5] text-[#fa520f]"
                    : "text-[#111] hover:bg-[#f1eee5] hover:text-[#fa520f]"
                }`
              }
            >
              Coba Prediksi
              <PixelArrow className="size-4 rotate-90" />
            </NavLink>

            <NavLink
              to="/predict"
              className={({ isActive }) =>
                `hidden h-14 items-center gap-2 bg-[#111] px-4 text-[13px] font-semibold text-white transition hover:bg-[#fa520f] md:flex lg:h-12 xl:px-5 ${
                  isActive ? "bg-[#fa520f]" : ""
                }`
              }
            >
              Start analysing
              <PixelArrow className="size-4" />
            </NavLink>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="grid h-14 w-14 place-items-center text-[#111] transition hover:bg-[#f1eee5] lg:hidden"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-header-menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          id="mobile-header-menu"
          className={`overflow-hidden border-t border-[#111]/10 bg-[#fbfaf5] transition-[max-height,opacity] duration-300 lg:hidden ${
            isOpen ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid divide-y divide-[#111]/10">
            <button
              type="button"
              onClick={goHome}
              className={`flex items-center justify-between px-5 py-4 text-left text-sm font-semibold transition ${
                location.pathname === "/" && !activeSection
                  ? "bg-[#f1eee5] text-[#fa520f]"
                  : "text-[#111] hover:bg-[#f1eee5] hover:text-[#fa520f]"
              }`}
            >
              Home
              <PixelArrow className="size-4" />
            </button>

            {sectionItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSection(item.id)}
                className={`flex items-center justify-between px-5 py-4 text-left text-sm font-semibold transition ${
                  activeSection === item.id
                    ? "bg-[#f1eee5] text-[#fa520f]"
                    : "text-[#111] hover:bg-[#f1eee5] hover:text-[#fa520f]"
                }`}
              >
                {item.label}
                <PixelArrow className="size-4" />
              </button>
            ))}

            <div className="grid gap-0 border-t border-[#111]/10 sm:grid-cols-2 sm:divide-x sm:divide-[#111]/10">
              <Link
                to="/predict"
                onClick={closeMenu}
                className={`flex h-14 items-center justify-center gap-2 px-5 text-sm font-semibold transition ${
                  isPredictPage
                    ? "bg-[#f1eee5] text-[#fa520f]"
                    : "text-[#111] hover:bg-[#f1eee5] hover:text-[#fa520f]"
                }`}
              >
                Coba Prediksi
                <PixelArrow className="size-4 rotate-90" />
              </Link>

              <Link
                to="/predict"
                onClick={closeMenu}
                className="flex h-14 items-center justify-center gap-2 bg-[#111] px-5 text-sm font-semibold text-white transition hover:bg-[#fa520f]"
              >
                Start analysing
                <PixelArrow className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}