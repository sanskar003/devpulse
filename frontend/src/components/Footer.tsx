import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { label: "devTo", to: "/devto" },
    { label: "ffcBlog", to: "/freecodecamp" },
    { label: "githubBlog", to: "/githubblog" },
    { label: "topNews", to: "/topnews" },
    { label: "gNews", to: "/gnews" },
    { label: "home", to: "/" },
  ];

  return (
    <div className=" p-10 flex flex-col sm:flex-row justify-center gap-10 bg-emerald-800/50 rounded-t-4xl">

      {/* LEFT — LINKS */}
      <div className="sm:w-1/2">
        <h4 className="font-lamoric text-emerald-400 mb-3">links</h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {links.map((item, i) => (
            <Link
              to={item.to}
              key={i}
              className="group relative w-40 h-8 sm:h-10 flex justify-between items-center px-2 rounded-xl cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-between w-full transition-all duration-300 group-hover:text-black">
                <h2 className="text-sm sm:text-base">{item.label}</h2>
                <img
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 group-hover:rotate-45"
                  src="/icons/navbar-uparrow.png"
                  alt="see"
                />
              </span>

              <span className="absolute inset-0 bg-white/50 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500"></span>
            </Link>
          ))}
        </div>
      </div>

      {/* RIGHT — CONTACT INFO */}
      <div className="flex flex-col gap-6">

        {/* EMAIL */}
        <div>
           <img className="w-5 h-5"  src="/icons/emailIconem.png" alt="" />
          <a
            className="font-haneen text-lg text-foreground/80 hover:text-emerald-200/80 transition-colors"
          >
            sanskar.dev.02@gmail.com
          </a>
        </div>

        {/* GITHUB */}
        <div>
          <img className="w-5 h-5" src="/icons/githubIconem.png" alt="" />
          <a
            href="https://github.com/sanskar003"
            target="_blank"
            className="font-haneen text-lg text-foreground/80 hover:text-emerald-200/80 transition-colors"
          >
            sanskar003
          </a>
        </div>

      </div>
    </div>
  );
};

export default Footer;