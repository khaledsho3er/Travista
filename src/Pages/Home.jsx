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
import { Helmet } from "react-helmet";

// Animation wrapper component
const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.96,
        skewY: 4,
        boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              skewY: 0,
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }
          : {
              opacity: 0,
              y: 60,
              scale: 0.96,
              skewY: 4,
              boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
            }
      }
      transition={{
        duration: 0.55,
        delay: delay,
        ease: [0.4, 0.0, 0.2, 1], // classic sharp cubic-bezier
        type: "spring",
        stiffness: 80,
        damping: 18,
      }}
      style={{
        borderRadius: "12px",
        background: "rgba(255,255,255,0.01)", // subtle, for sharpness
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
