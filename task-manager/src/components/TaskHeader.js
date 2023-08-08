import { Container, Box, Typography } from "@mui/material";
import React from "react";
import { TaskStrings } from "../constants/strings";
export default function TaskHeader() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "120px",
          backgroundColor: "#88CDF6",
          borderRadius: "16px",
          mb: 6,
        }}
      >
        <Typography variant="h4" component="h1">
          {TaskStrings["taskHeading"]}
        </Typography>
      </Box>
    </Container>
  );
}
