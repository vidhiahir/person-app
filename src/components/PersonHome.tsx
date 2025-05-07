import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const PersonHome = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    tl.fromTo(
      titleRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    );

    tl.fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    );

    tl.fromTo(
      buttonsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    );

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = [
        titleRef.current,
        subtitleRef.current,
        buttonsRef.current,
      ];

      elements.forEach((element) => {
        if (element) {
          const elementTop = element.getBoundingClientRect().top;
          if (elementTop < window.innerHeight * 0.8) {
            gsap.to(element, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 opacity-20 animate-float"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          Welcome to Person Manager
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Lets get started
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/add"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-indigo-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-indigo-500 border-2 border-indigo-600 group-hover:bg-indigo-600"></span>
            <span className="relative">Add Person</span>
          </Link>
          <Link
            to="/list"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-green-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-green-500 border-2 border-green-600 group-hover:bg-green-600"></span>
            <span className="relative">View List</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonHome;
