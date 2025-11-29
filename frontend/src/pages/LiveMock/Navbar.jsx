import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: "#0d6efd" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 1rem",
          }}
        >
          {/* LEFT - Logo / Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            Today Live Mock
          </Typography>

          {/* RIGHT - Add Exam Button */}
          {user?.role === "admin" || user?.role === "editor" ? (
            <Button
              component={Link}
              to="/add-Live-exam"
              sx={{
                color: "#fff",
                border: "1px solid #fff",
                fontSize: { xs: "0.8rem", sm: "1rem" },
                padding: "6px 16px",
              }}
            >
              ADD EXAM
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
