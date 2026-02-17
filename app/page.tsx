import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#E8B923] overflow-hidden">
      {/* Ondas decorativas de fondo */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full">
          <path
            fill="#D4A520"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="#B8941F"
            fillOpacity="0.3"
            d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,197.3C672,192,768,192,864,197.3C960,203,1056,213,1152,213.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Contenido principal */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 px-8 max-w-6xl">
        {/* Foto de perfil */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
          <Image
            src="/profile.jpg"
            alt="Cesar Ayala"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Texto */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-4 tracking-tight">
            Cesar Ayala
          </h1>
          <p className="text-2xl md:text-3xl text-black/90 font-light italic leading-relaxed">
            "Nadie cura a nadie, pero nadie se cura solo"
          </p>
        </div>
      </main>
    </div>
  );
}
