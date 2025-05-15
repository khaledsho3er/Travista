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
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

// Animation wrapper component
const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

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

      <AnimatedSection>
        <Explore />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <Highlight />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <About />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <PackageCard />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <Comments />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <FAQ />
      </AnimatedSection>

      <Footer />
    </div>
  );
}

export default Home;
