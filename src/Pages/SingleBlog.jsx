import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
function SingleBLog() {
  const navigate = useNavigate();

  const handleBacktoBlogs = () => {
    navigate("/Blogs");
  };
  const Blog = [
    {
      id: 1,
      title: "The ultimate travel guide for your trip to Paris",
      subtitle: "Unveiling the City of Love, Croissants, and Adventure.",
      blogTitle: "Bonjour, globetrotters and wanderlusters!",
      content: "This is the content of blog 1",
      image: "Assets/Blogs/blogImage1.png",
      date: { year: "2024", month: "August", day: "10" }, // Fixed structure for clarity
    },
  ];

  // Access the blog object
  const blog = Blog[0];

  return (
    <Box>
      <Navbar />
      <Box className="Single-Blog-header">
        <header className="Single-Blog-header-container">
          {/* Dynamic Date Section */}
          <Box className="Single-Blog-date-container">
            <span className="Single-Blog-month">
              {blog.date.month.toUpperCase()}
            </span>
            <span className="Single-Blog-day">{blog.date.day}</span>
            <span className="Single-Blog-year">{blog.date.year}</span>
          </Box>
          {/* Blog Content Section */}
          <Box className="Single-Blog-content-container">
            <h1 className="Single-Blog-main-title">{blog.title}</h1>
            <p className="Single-Blog-subtitle">{blog.subtitle}</p>
          </Box>
          {/* Buttons */}
          <Box className="Single-Blog-button-container">
            <button className="Single-Blog-action-button">Save</button>
            <button className="Single-Blog-action-button">Share</button>
          </Box>
        </header>
      </Box>
      <Box className="Single-Blog-image-hero">
        <img src={blog.image} alt="Blog Hero.jpg" />
      </Box>
      <Box className="Single-Blog-Content">
        <h3>{blog.blogTitle}</h3>
        <p>
          Are you ready to embark on a journey to the enchanting City of Light,
          where every street corner whispers tales of romance, art, and joie de
          vivre? Ah, Paris! The mere mention of its name evokes images of the
          majestic Eiffel Tower, the aroma of freshly-baked croissants wafting
          through quaint cafés, and the harmonious symphony of French laughter
          echoing along the Seine.
        </p>
        <p>
          Whether you're a first-time visitor or a seasoned Parisian aficionado,
          this vibrant metropolis always has something new and exciting to
          offer. But fear not, dear adventurers, for I've got a treasure trove
          of tips and tricks up my sleeve to make your Parisian escapade an
          unforgettable one!
        </p>
        <p>
          So, grab your berets, dust off your French phrasebooks, and prepare to
          immerse yourself in a whimsical journey through Parisian delights.
          From secret hideaways known only to the locals, to cultural gems that
          will leave you breathless, this guide will ensure that you experience
          the true essence of Paris, with a playful twist that will have you
          saying "ooh la la" at every turn. Ready to discover the hidden
          courtyards that inspired Hemingway, sip on the finest wines in cozy
          bistros, and unlock the secrets of the Louvre? We'll delve into the
          magic of Montmartre, where artists find inspiration in every
          brushstroke, and we'll wander the charming streets of Le Marais, where
          history and modernity intertwine in a delightful dance. But that's not
          all, my fellow adventurers! We'll also unveil the best spots to
          indulge in heavenly pastries (macarons, anyone?), experience the
          thrill of a Seine river cruise under a starry night sky, and even
          share a few tips to navigate the bustling Parisian metro like a true
          local.
        </p>
        <p>
          So pack your sense of wonder, leave your worries behind, and get ready
          to fall head over heels in love with the City of Love itself. Paris
          awaits, mes amis! Let's unlock its secrets and create memories that
          will last a lifetime. 🇫🇷🌟 Vive la vie Parisienne! 🌟🇫🇷
        </p>
        <br />
        <img src="Assets/Blogs/blogImg2.png" alt="Blog MiddleImage.jpg" />
        <p>
          In Paris, every step you take is an opportunity for serendipity. Lose
          yourself in the labyrinthine streets of the Latin Quarter, where
          lively conversations mix with the scent of freshly brewed coffee from
          the charming sidewalk cafes. Pause for a moment to witness the
          elegance of Parisian fashion, as locals effortlessly strut along the
          boulevards with an air of nonchalant chic.{" "}
        </p>{" "}
        <p>
          As you venture further, don't forget to explore the iconic landmarks
          that define this magnificent city. Ascend the Eiffel Tower at
          twilight, and let the breathtaking panoramic view of Paris steal your
          breath away. Wander through the regal halls of the Louvre, where
          masterpieces like the Mona Lisa and Venus de Milo invite you into
          their world of artistic brilliance.{" "}
        </p>{" "}
        <p>
          But let's not forget that Paris is also a city of indulgence and
          culinary delights. Treat your taste buds to a symphony of flavors at a
          traditional boulangerie, where the aroma of freshly baked baguettes
          beckons you inside. Savor the delicate layers of a buttery croissant
          or dive into a decadent dish of escargots, daring your palate to
          embrace the rich tapestry of French cuisine.{" "}
        </p>{" "}
        <p>
          And when the sun sets over the Seine, Paris transforms into a
          playground of vibrant nightlife. Lose yourself in the pulsating energy
          of the Moulin Rouge, where can-can dancers and cabaret performances
          ignite the stage. Or perhaps you prefer the cozy intimacy of a jazz
          club, where the smooth melodies transport you to a bygone era of
          artistic expression. Now, my fellow adventurers, are you ready to
          unlock the secrets of this enchanting city? Join me as we dive
          headfirst into the whimsical world of Paris. From hidden gems to
          iconic landmarks, from romantic strolls along the River Seine to
          unforgettable culinary experiences, this guide will be your key to
          unlocking the true essence of the City of Light. So grab your map,
          lace up your walking shoes, and let's embark on an unforgettable
          journey through the cobblestone streets and the beating heart of
          Paris. Get ready to fall in love, to be captivated by its beauty, and
          to create memories that will linger in your heart long after you bid
          Paris adieu.
        </p>
      </Box>
      <box className="Single-Blog-Back-btn" onClick={handleBacktoBlogs}>
        <button> Back to Blog</button>
      </box>
      <br></br>
      <Footer />
    </Box>
  );
}

export default SingleBLog;
