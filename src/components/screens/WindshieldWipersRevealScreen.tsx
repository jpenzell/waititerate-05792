import zooxVehicle from "@/assets/zoox-vehicle.jpg";

export const WindshieldWipersRevealScreen = () => {
  return (
    <main
      className="h-full w-full relative overflow-hidden"
      role="main"
      aria-label="Zoox vehicle reveal"
      style={{
        backgroundImage: `url(${zooxVehicle})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Hidden img kept for screen-reader alt text */}
      <img
        src={zooxVehicle}
        alt="Zoox autonomous vehicle — bidirectional, no traditional windshield, passengers face each other"
        className="sr-only"
      />
      {/* Bottom gradient for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-10 md:p-16 text-white">
        <p className="text-base md:text-xl uppercase tracking-[0.3em] text-white/70 mb-3">
          Zoox · Las Vegas, today
        </p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl">
          No driver. No windshield. No wipers.
        </h1>
      </div>
    </main>
  );
};