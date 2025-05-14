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
import axios from "axios";

function Home() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://158.220.96.121/api/hero/active");
        setHeroData(res.data);
      } catch (err) {
        console.error("Failed to fetch hero data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return <TravistaLoading />;
  }

  return (
    <div>
      <Navbar />
      <Hero preloadedData={heroData} />
      <Explore />
      <Highlight />
      <About />
      <PackageCard />
      <Comments />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Home;
