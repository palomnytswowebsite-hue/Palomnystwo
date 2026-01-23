"use client";
import HeaderMenu from "../../public/Data/headerMenu.json";

export const NavMenu = () => {
  return (
    <nav className="sticky top-0 z-50">
      <ul className="flex justify-center gap-8 bg-cyan-700 p-5 ">
        {HeaderMenu.map((menuItem) => (
          <li key={menuItem.id}>
            <a
              className="relative text-xl text-amber-50 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-amber-50 after:transition-all after:duration-300 hover:after:w-full "
              href={menuItem.path}
            >
              {menuItem.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
