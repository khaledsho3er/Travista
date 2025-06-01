import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Comments() {
  const slider = React.useRef(null);

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    rows: 1,
    slide: "div",
    useCSS: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      className="comments-section"
      sx={{ position: "flex", padding: "2px 0px 150px " }}
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
        Don’t just take our word for it.
      </Typography>

      <Box className="slider-container">
        <Slider ref={slider} {...settings}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card
              key={index}
              sx={{
                background: "white",
                borderRadius: "30px",
                textAlign: "left",
              }}
              component={"div"}
              className="comment-card"
            >
              <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                className="comment-content"
              >
                <Typography
                  variant="body1"
                  fontSize="1.2rem"
                  color={"black"}
                  fontWeight={700}
                >
                  Travista's expert guidance and affordable options made it
                  possible for me to embark on this dream journey without
                  compromising on quality. I can't recommend them enough.
                </Typography>

                <Box>
                  <Typography variant="h7" color={"black"} fontWeight={800}>
                    Sarah H.
                  </Typography>

                  <Typography variant="body1">Member since 2016</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Slider>

        <button
          className="slider-btn"
          onClick={() => slider?.current?.slickPrev()}
        >
          <ArrowBackIcon />
        </button>
        <button
          className="slider-btn"
          onClick={() => slider?.current?.slickNext()}
        >
          <ArrowForwardIcon />
        </button>
      </Box>
    </Box>
  );
}

export default Comments;
