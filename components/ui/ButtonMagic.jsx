import React from "react";

const ButtonMagic = ({
  children,
  href,
  atherClass,
  mainClass,
}) => {
  return (
    <button
      className={`relative inline-flex overflow-hidden rounded-xl p-[1px] focus:outline-none duration-300 ${mainClass}`}
    >
      <span className="absolute inset-[-10000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9cb2ff_0%,#e59cff_50%,#a855f7_100%)]" />
      <a
        href={href}
        target="_blank"
        className={`inline-flex gap-2 h-full w-full cursor-pointer items-center justify-center rounded-xl bg-main-back px-3 py-1 text-sm font-medium backdrop-blur-3xl duration-300 text-primary-color ${atherClass}`}
      >
        {children}
      </a>
    </button>
  );
};

export default ButtonMagic;
