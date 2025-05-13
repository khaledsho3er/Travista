import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Explore from "../components/Explore";
import Highlight from "../components/Highlight";
import About from "../components/About";
import PackageCard from "../components/PackageCard";
import Comments from "../components/Comments";
import FAQ from "../components/FAQsSection";
import Footer from "../components/Footer";
import TravistaLoading from "../components/loading";

function Home() {
  const [loading, setLoading] = useState({
    hero: true,
    highlight: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Handle loading state changes from components
  const handleLoadingChange = (component, isLoading) => {
    setLoading((prev) => ({
      ...prev,
      [component]: isLoading,
    }));
  };

  // Check if all required components are loaded
  useEffect(() => {
    if (!loading.hero && !loading.highlight) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [loading]);

  // If still loading, show the loading component
  if (isLoading) {
    return <TravistaLoading />;
  }

  return (
    <div>
      <Navbar />
      <Hero onLoadingChange={handleLoadingChange} />
      <Explore />
      <Highlight onLoadingChange={handleLoadingChange} />
      <About />
      <PackageCard />
      <Comments />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Home;
