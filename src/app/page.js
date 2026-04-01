import HeroCarousel from "@/components/HeroCarousel/HeroCarousel";
import About from "@/components/About";
import Management from "@/components/About/Management";
import KeyPersons from "@/components/About/KeyPersons";
import MissionVision from "@/components/About/MissionVision";
import OurInfrastructure from "@/components/About/OurInfrastructure";
import Certifications from "@/components/About/Certifications";
import OurJourney from "@/components/About/OurJourney";

export default function Home() {
  const slides = [
    {
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/3e425a459b-733ddb1f886d42169401.png",
      title: "Air Pollution Control Systems",
      subtitle: `Innovative systems designed to reduce emissions and safeguard air quality.\nEmpowering industries to meet environmental standards with efficiency and reliability.`,
      buttonText: "Know More",
      buttonLink: "/projects-and-products/AirPollutionControl",
    },
    {
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/3e425a459b-733ddb1f886d42169401.png",
      title: "HVAC Clean Room Projects",
      subtitle: `High-performance cleanroom and HVAC solutions built for precision and energy savings.\nCreating controlled environments that improve comfort, safety, and efficiency.`,
      buttonText: "Know More",
      buttonLink: "/projects-and-products/HVAC",
    },
    {
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/3e425a459b-733ddb1f886d42169401.png",
      title: "Material Handling Systems",
      subtitle: `Comprehensive solutions for smooth, safe, and efficient bulk material movement.\nOptimized designs that enhance productivity and reduce operational downtime.`,
      buttonText: "Know More",
      buttonLink: "/projects-and-products/MaterialHandling",
    },
    {
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/3e425a459b-733ddb1f886d42169401.png",
      title: "EPC Power Projects",
      subtitle: `Complete EPC expertise from concept to commissioning of industrial power plants.\nDelivering reliable, scalable infrastructure that drives sustainable growth and performance.`,
      buttonText: "Know More",
      buttonLink: "/projects-and-products/EPCPower",
    },
    {
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/3e425a459b-733ddb1f886d42169401.png",
      title: "Metallurgicals & Briquettes",
      subtitle: `Premium metallurgical products and eco-friendly briquettes for diverse industrial applications.\nCombining quality, sustainability, and innovation to meet evolving market demands.`,
      buttonText: "Know More",
      buttonLink: "/Ourgroup/GlobalMetallurgy",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col w-full">
      {/* Hero Carousel */}
      <HeroCarousel 
        slides={slides} 
        interval={2000}   
        pauseOnHover={false} 
        pauseOnBtnHover={true} 
      />

      {/* About Us Banner */}
      <About />
      
      {/* Management */}
      <section id="management">
        <Management />
      </section>

      {/* Key Persons */}
      <section id="key-persons">
        <KeyPersons />
      </section>

      {/* Mission & Vision */}
      <section id="mission">
        <MissionVision />
      </section>

      {/* Our Infrastructure */}
      <section id="infrastructure">
        <OurInfrastructure />
      </section>

      {/* Certifications */}
      <section id="certifications">
        <Certifications />
      </section>

      {/* Our Journey */}
      <section id="journey">
        <OurJourney />
      </section>
    </main>
  );
}