import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Comments() {
  const slider = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoading(true);
    fetch("https://api.travistasl.com/api/comments/admin")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((c) => c.isShow === true);
        setComments(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: isSmDown ? 1 : isMdDown ? 2 : 5,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: true,
    centerPadding: "0",
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    rows: 1,
    slide: "div",
    useCSS: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  // Helper to get the correct index for infinite loop
  const getRealIndex = (index) => {
    const len = comments.length;
    if (currentSlide === 0 && index === len - 1) return -1; // leftmost
    if (currentSlide === len - 1 && index === 0) return 1; // rightmost
    return index - currentSlide;
  };

  return (
    <Box
      className="comments-section"
      sx={{
        position: "flex",
        padding: { xs: "2px 0px 60px", md: "2px 0px 150px" },
      }}
    >
      <Typography
        variant="h4"
        color={"white"}
        fontWeight={800}
        p={15}
        sx={{
          margin: {
            xs: "-59px",
            md: 0,
          },
        }}
      >
        See why travelers love the journey with us <br /> Real stories. Real
        adventures. Real memories
      </Typography>

      <Box
        className="slider-container"
        sx={{
          position: "relative",
          padding: { xs: "0 0px", md: "0 50px" },
          minHeight: { xs: 320, md: 520, lg: 620 },
        }}
      >
        {loading ? (
          <Typography color="white" align="center" sx={{ mt: 8 }}>
            Loading comments...
          </Typography>
        ) : comments.length === 0 ? (
          <Typography color="white" align="center" sx={{ mt: 8 }}>
            No comments to show.
          </Typography>
        ) : (
          <Slider ref={slider} {...settings}>
            {comments.map((comment, index) => {
              let scale = 0.7;
              let zIndex = 0;
              let opacity = 0.7;
              const diff = getRealIndex(index);
              if (diff === 0) {
                scale = 1;
                zIndex = 2;
                opacity = 1;
              } else if (Math.abs(diff) === 1) {
                scale = 0.8;
                zIndex = 1;
                opacity = 0.9;
              }
              return (
                <Card
                  key={comment._id}
                  sx={{
                    background: "white",
                    borderRadius: "30px",
                    textAlign: "left",
                    transform: `scale(${scale})`,
                    transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
                    zIndex,
                    opacity,
                    margin: { xs: "0 2px", md: "0 10px" },
                    boxShadow: diff === 0 ? 6 : 2,
                    mx: "auto",
                  }}
                  component={"div"}
                  className="comment-card"
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                    className="comment-content"
                  >
                    <Typography
                      variant="body1"
                      fontSize="1.2rem"
                      color={"black"}
                      fontWeight={700}
                    >
                      {comment.content}
                    </Typography>

                    <Box>
                      <Typography variant="h7" color={"black"} fontWeight={800}>
                        {comment.author}
                      </Typography>

                      <Typography variant="body1">
                        Member since {comment.memberSince}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Slider>
        )}
        {/* Navigation buttons below, centered */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 2, md: 4 },
          }}
        >
          <button
            className="slider-btn"
            onClick={() => slider?.current?.slickPrev()}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "white",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
              cursor: "pointer",
              transition: "box-shadow 0.2s",
            }}
          >
            <ArrowBackIcon style={{ color: "#222", fontSize: 28 }} />
          </button>
          <button
            className="slider-btn"
            onClick={() => slider?.current?.slickNext()}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "white",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 16,
              cursor: "pointer",
              transition: "box-shadow 0.2s",
            }}
          >
            <ArrowForwardIcon style={{ color: "#222", fontSize: 28 }} />
          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default Comments;
