
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Home", "Add Exam"];

export default function Nav(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);



  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Exam Countdown
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{ fontSize: "2rem", marginRight: "1rem" }}
            >
              Exam Countdown
            </Typography>
            <Clock value={time} size={45} />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => {
              // Har item ke liye path decide karo
              const path = item === "Home" ? "/" : "";
              return (
                <Button
                  key={item}
                  sx={{ color: "#fff", fontSize: "1.2rem" }}
                  component={Link} // Link component
                  to={path} // yahan dynamically path use karo
                >
                  {item}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
