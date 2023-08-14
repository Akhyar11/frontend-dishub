import logoDishub from "../../assets/Departemen_Perhubungan.png";
import logoBoyolali from "../../assets/Kabupaten_Boyolali.png";
import { MdMenu } from "react-icons/md";

export default function NavbarAdmin() {
  const navigation = [
    {
      name: "Dashboard",
      href: "#",
      current: true,
    },
    {
      name: "Team",
      href: "#",
      current: false,
    },
    {
      name: "Projects",
      href: "#",
      current: false,
    },
    {
      name: "Reports",
      href: "#",
      current: false,
    },
  ];

  const Active = (e) => {
    const target = e.target.innerHTML;
    const element = [
      document.getElementById("Dashboard"),
      document.getElementById("Team"),
      document.getElementById("Projects"),
      document.getElementById("Reports"),
    ];

    for (let i = 0; i < navigation.length; i++) {
      if (target === navigation[i].name) navigation[i].current = true;
      if (target !== navigation[i].name) navigation[i].current = false;
      if (navigation[i].current) {
        element[i].classList.remove("hover:bg-sky-100");
        element[i].classList.add("bg-sky-400");
        element[i].classList.add("text-white");
        element[i].classList.add("font-semibold");
      } else {
        element[i].classList.add("hover:bg-sky-100");
        element[i].classList.remove("bg-sky-400");
        element[i].classList.remove("text-white");
        element[i].classList.remove("font-semibold");
      }
    }
  };

  const handelMenu = () => {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("hidden");
  };
  return (
    <>
      {/* Navbar */}
      <div className="w-full bg-white fixed z-10">
        <div className="p-3 md:px-44 transition-all shadow-md">
          <div className="flex items-center w-full">
            <div className="w-8 flex mr-2">
              <img src={logoBoyolali} alt="logo dishub" />
            </div>
            <div className="w-10 flex mr-2">
              <img src={logoDishub} alt="logo dishub" />
            </div>
            <div className="w-[1px] h-10 bg-black mr-2"></div>
            <div className="font-semibold mr-4 text-sm">
              <span className="text-3xl">SIPELAN</span>
              <br />
              <span>Kabupaten Boyolali</span>
            </div>
            <div className="ml-auto lg:flex hidden gap-4">
              {navigation.map((i) => {
                return (
                  <button
                    key={i.name}
                    id={i.name}
                    className={
                      i.current
                        ? "bg-sky-400 text-white font-semibold rounded-md py-2 px-3 hover:bg-sky-100 transition-all hidden lg:block"
                        : "rounded-md py-2 px-3 hover:bg-sky-100 transition-all"
                    }
                    onClick={Active}
                  >
                    {i.name}
                  </button>
                );
              })}
            </div>
            <div className="ml-auto lg:hidden">
              <MdMenu
                className="text-5xl p-2 rounded-md hover:bg-sky-100 transition-all"
                onClick={handelMenu}
              />
            </div>
          </div>
          <div
            className="ml-auto lg:hidden mt-6 hidden transition-all"
            id="dropdown"
          >
            {navigation.map((i) => {
              return (
                <div key={i.name}>
                  <button
                    key={i.name}
                    id={i.name}
                    className={
                      i.current
                        ? "bg-sky-400 text-white font-semibold rounded-md py-2 px-3 hover:bg-sky-100 transition-all w-full mb-2"
                        : "rounded-md py-2 px-3 hover:bg-sky-100 transition-all w-full mb-2"
                    }
                    onClick={Active}
                  >
                    {i.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
