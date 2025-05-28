import React from "react";
import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import Timeline from "../components/AboutTimeline";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

function AboutPage() {
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
      </Helmet>
      <Navbar />
      <div>
        <AboutHero />
      </div>
      <Timeline />
      <Footer />
    </div>
  );
}

export default AboutPage;
