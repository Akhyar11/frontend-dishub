import { useNavigate } from "react-router-dom";
import logoDishub from "../../assets/Departemen_Perhubungan.png";
import logoBoyolali from "../../assets/Kabupaten_Boyolali.png";
import { MdMenu } from "react-icons/md";

export default function NavbarAdmin({ back }) {
  const navigate = useNavigate();
  const navigation = [
    {
      name: "Kembali",
      href: "#",
      func: back,
      current:
        "bg-green-400 text-white font-semibold rounded-md py-2 px-3 hover:bg-green-100 transition-all w-full mb-2",
    },
    {
      name: "Rumah",
      href: "#",
      func: () => navigate("/dashboard/admin"),
      current:
        "bg-red-400 text-white font-semibold rounded-md py-2 px-3 hover:bg-red-100 transition-all w-full mb-2",
    },
    {
      name: "Riwayat",
      href: "#",
      func: () => navigate("/dashboard/admin/riwayat"),
      current:
        "bg-yellow-400 text-white font-semibold rounded-md py-2 px-3 hover:bg-yellow-100 transition-all w-full mb-2",
    },
  ];

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
                    className={i.current + "cursor-pointer"}
                    onClick={i.func}
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
                    className={i.current + "cursor-pointer"}
                    onClick={i.func}
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
