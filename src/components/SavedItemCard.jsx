import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

function SavedItemCard({ item, type = "package" }) {
  const navigate = useNavigate();

  const isPackage = type === "package";

  const image = isPackage
    ? item.packagePicture
    : item.featuredImage
    ? `https://api.travistasl.com/uploads/${item.featuredImage}`
    : "/fallback.jpg";

  const handleClick = () => {
    if (isPackage) navigate("/packages");
    else navigate("/Blogs");
  };

  return (
    <Card
      sx={{
        background: "var(--dark-green)",
        borderRadius: "1.25rem",
        height: "350px",
        width: "350px",
        position: "relative",
        color: "white",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover .hover-content": {
          transform: "translateY(-50px)",
        },
        "&:hover .hover-buttons": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "white",
            color: "var(--maroon)",
            padding: "5px 10px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {type === "package" ? "Tour" : "Blog"}
        </Typography>

        <IconButton
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "red",
          }}
        >
          <FavoriteIcon />
        </IconButton>

        <Box
          className="hover-content"
          sx={{
            position: "absolute",
            bottom: "50px",
            left: "30px",
            transition: "transform 0.3s ease",
            zIndex: 1,
            textAlign: "left",
          }}
        >
          <Typography fontWeight={800} variant="h5" gutterBottom>
            {isPackage ? item.packageName : item.title}
          </Typography>

          <Typography variant="body2" color="#dddddd" fontWeight={600}>
            {isPackage
              ? `${item.totalDays} days / ${item.totalNights} nights`
              : item.subTitle || item.content?.slice(0, 60) + "..."}
          </Typography>

          {isPackage && (
            <Typography variant="subtitle1" sx={{ color: "#fed7d2" }}>
              {item.packagePrice?.amount} {item.packagePrice?.currency}
            </Typography>
          )}
        </Box>

        <Box
          className="hover-buttons"
          sx={{
            position: "absolute",
            bottom: "60px",
            left: "30px",
            display: "flex",
            gap: "10px",
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            zIndex: 1,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#eceee9",
              color: "#eceee9",
              borderRadius: "20px",
              fontSize: "13px",
            }}
            onClick={handleClick}
          >
            {isPackage ? "Explore Tour" : "Read Article"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SavedItemCard;
