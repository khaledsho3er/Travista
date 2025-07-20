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
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet";

// Animation wrapper component
const AnimatedSection = ({ children, delay = 0, y = 50, duration = 0.8 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      style={{ width: "100%" }}
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
        const res = await axios.get(
          "https://api.travistasl.com/api/hero/active"
        );
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
      <Helmet>
        <title>Travista Egypt | Travel the World with Ease</title>
        <meta
          name="description"
          content="Travista is your go-to travel agency for global adventures, hotel bookings, senior trips, and more. Discover the world with us."
        />
        <meta
          name="keywords"
          content="Travista Egypt, travel agency, hotel booking, senior trips, tour packages"
        />
        <meta
          property="og:title"
          content="Travista Egypt | Global Travel Experts"
        />
        <meta
          property="og:description"
          content="Book your next adventure with Travista."
        />
        <meta property="og:url" content="https://travista.vercel.app/" />
        <link rel="canonical" href="https://travista.vercel.app/" />
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Travista Egypt",
        "url": "https://travista.vercel.app",
        "logo": "https://travista.vercel.app/logo.png",
        "description": "Travista is a global travel agency offering hotel bookings, tours, and senior travel packages.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "EG"
        },
        "sameAs": [
          "https://www.facebook.com/travistaegypt",
          "https://www.instagram.com/travistaegypt"
        ]
      }
    `}
        </script>
      </Helmet>
      <Navbar />
      <AnimatedSection y={60} duration={1}>
        <Hero preloadedData={heroData} />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Explore />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Highlight />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <About />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <PackageCard />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <Comments />
      </AnimatedSection>
      <AnimatedSection delay={0.6}>
        <FAQ />
      </AnimatedSection>
      <Footer />
    </div>
  );
}

export default Home;
