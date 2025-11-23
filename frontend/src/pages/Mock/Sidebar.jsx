import { Settings } from "lucide-react";
import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI Components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faChalkboardUser,
  faFileSignature,
  faFileCircleQuestion,
  faBookOpenReader,
  faNewspaper,
  faCartShopping,
  faHandHoldingDollar,
  faAddressCard,
  faListOl,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import {
  faSquareWhatsapp,
  faYoutube,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

const drawerWidth = 240;
const APPBAR_HEIGHT = 64;

const sidebarItems = [
  { icon: <FontAwesomeIcon icon={faHouse} />, label: "Home", link: "#" },
  {
    icon: <FontAwesomeIcon icon={faChalkboardUser} />,
    label: "Live Classes",
    link: "#",
  },
  {
    icon: <FontAwesomeIcon icon={faFileSignature} />,
    label: "Mock Test",
    link: "#",
  },
  {
    icon: <FontAwesomeIcon icon={faFileCircleQuestion} />,
    label: "Live Mock",
    link: "#/mock",
  },
  { icon: <FontAwesomeIcon icon={faListOl} />, label: "To-Do List", link: "#" },
  {
    icon: <FontAwesomeIcon icon={faBookOpenReader} />,
    label: "Descriptive Writing",
    link: "#/descriptive",
  },
  {
    icon: <FontAwesomeIcon icon={faNewspaper} />,
    label: "Current Affair",
    link: "#/ca-quiz",
  },
  {
    icon: <FontAwesomeIcon icon={faFileSignature} />,
    label: "Daily Quiz",
    link: "#",
  },
  {
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    label: "Track Your Exam",
    link: "#/examTracker",
  },
  {
    icon: <FontAwesomeIcon icon={faHandHoldingDollar} />,
    label: "Win Prize",
    link: "#",
  },
  {
    icon: <FontAwesomeIcon icon={faAddressCard} />,
    label: "Our Selections",
    link: "#",
  },
  {
    icon: <FontAwesomeIcon icon={faCartShopping} />,
    label: "Purchased Item",
    link: "#",
  },

  // Social
  {
    icon: <FontAwesomeIcon icon={faSquareWhatsapp} />,
    label: "WhatsApp",
    link: "https://chat.whatsapp.com/EF6x76bLnSe47jBOvzIuGe",
  },
  {
    icon: <FontAwesomeIcon icon={faYoutube} />,
    label: "YouTube",
    link: "https://www.youtube.com/@silenttravler1632",
  },
  {
    icon: <FontAwesomeIcon icon={faTelegram} />,
    label: "Telegram",
    link: "https://t.me/Pathtobanking271",
  },

  // Lucide
  { icon: <Settings />, label: "Setting", link: "#" },
];

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen(!mobileOpen);
  };

  // ⭐ Replaced drawer content with your full sidebarItems
  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component="a"
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : "_self"}
            >
              {/* ICON */}

              <ListItemIcon sx={{ color: "#45f3f3" }}>{item.icon}</ListItemIcon>

              {/* LABEL */}
              <ListItemText
                primary={item.label}
                sx={{ color: "white", fontSize: "16px" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* 🔵 TOP NAVBAR */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#0d47a1",
          width: "100%",
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ minHeight: APPBAR_HEIGHT }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>
            Sidebar Layout ✓
          </Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR LEFT AREA */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          onTransitionEnd={handleDrawerTransitionEnd}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "black",
              color: "white",
              mt: `${APPBAR_HEIGHT}px`,

              height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
            },
            "& .MuiDrawer-paper > div": {
              backgroundColor: " black !important",
            },
          }}
        >
          {drawer}
          <Toolbar />
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              mt: `${APPBAR_HEIGHT}px`,
              height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
              // backgroundColor: "black",
              color: "Black",
            },
            "& .MuiDrawer-paper > div": {
              backgroundColor: " black !important",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* MAIN CONTENT AREA */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: `${APPBAR_HEIGHT}px`,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Typography variant="h6">Your content goes here...</Typography>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};
