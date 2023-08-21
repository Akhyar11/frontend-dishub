import { Menu, Transition } from "@headlessui/react";

export default function Dropdown({
  menuItems = [{ item: "contoh 1", func: () => console.log("contoh 1") }],
}) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="text-black flex gap-1 hover:bg-gray-100 transition-all py-4 px-3 rounded-md">
        <div className="bg-black w-1 h-1 rounded-full"></div>
        <div className="bg-black w-1 h-1 rounded-full"></div>
        <div className="bg-black w-1 h-1 rounded-full"></div>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute border border-black text-gray-500 bg-white w-36 right-0 p-2 rounded-md bg-opacity-50 backdrop-blur-lg drop-shadow-lg">
          {menuItems.map((i) => {
            return (
              <div key={i.item}>
                <Menu.Item>
                  {({ active }) => (
                    <span
                      className={`${
                        active &&
                        "text-gray-800 transition-all hover:cursor-pointer"
                      }`}
                      onClick={i.func}
                    >
                      {i.item}
                    </span>
                  )}
                </Menu.Item>
                <br />
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
