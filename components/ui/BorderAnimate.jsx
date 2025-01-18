import React from "react";

const BorderAnimate = ({ children }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-easing="linear"
      className="BorderAnimate relative p-1 rounded-md before:animate-border-spin overflow-hidden place-content-center isolate"
    >
      {/* محتوى العنصر الداخلي */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BorderAnimate;

/*




import React from "react";

interface BorderAnimateProps {
  children: React.ReactNode;
}

const BorderAnimate: React.FC<BorderAnimateProps> = ({ children }) => {
  return (
    <div
      className="relative p-px z-40
        bg-gradient-to-b from-slate-500 to-slate-700 rounded-md
        overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10
          bg-gradient-to-r from-lime-500 via-primary-700 to-primary
          animate-border-spin
          before:inset-[-60%]
          "
        style={{
          content: "''",
          position: "absolute",
          zIndex: -1,
          borderRadius: "inherit",
        }}
      ></div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BorderAnimate;




*/
