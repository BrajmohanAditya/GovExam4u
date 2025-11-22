// import * as React from "react";
// import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MailIcon from "@mui/icons-material/Mail";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// const drawerWidth = 240;
// const APPBAR_HEIGHT = 64; // Default MUI AppBar height for desktop

// export default function ResponsiveDrawer(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [isClosing, setIsClosing] = React.useState(false);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const drawer = (
//     <div>
//       {/* Sidebar top bar */}
//       {/* <Toolbar/> */}

//       <Divider />

//       <List>
//         {[
//           "Inbox",
//           "Starred",
//           "Send email",
//           "Drafts",
//           "Eat",
//           "Drink",
//           "Sleep",
//           "Dance",
//           "Code",
//         ].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//       <Divider />

//       <List>
//         {["All mail", "Trash", "Spam"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       {/* TOP NAVBAR */}
//       <AppBar
//         position="fixed"
//         sx={{
//           backgroundColor: "#0d47a1",
//           width: "100%",
//           zIndex: 1300,
//         }}
//       >
//         <Toolbar sx={{ minHeight: APPBAR_HEIGHT }}>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ fontWeight: "bold" }}
//           >
//             Sidebar Layout ✓
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* SIDEBAR AREA */}
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="sidebar folders"
//       >
//         {/* MOBILE DRAWER */}
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onTransitionEnd={handleDrawerTransitionEnd}
//           onClose={handleDrawerClose}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//               backgroundColor: "black",
//               color: "white",
//             },
//             "& .MuiDrawer-paper > div": {
//               backgroundColor: "black !important",
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>

//         {/* DESKTOP PERMANENT DRAWER */}
//         <Drawer
//           variant="permanent"
//           open
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               width: drawerWidth,
//               mt: `${APPBAR_HEIGHT}px`,
//               height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
//               overflow: "auto",
//               color: "white",
//             },
//             "& .MuiDrawer-paper > div": {
//               backgroundColor: " black !important",
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       {/* MAIN CONTENT */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           mt: `${APPBAR_HEIGHT}px`,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//         }}
//       >
//         <Typography variant="h6" sx={{ mb: 2 }}>
//           Your content goes here...
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// ResponsiveDrawer.propTypes = {
//   window: PropTypes.func,
// };

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

// 🔥 Sidebar items list (FontAwesome icons + links)
const sidebarItems = [
  { icon: faHouse, label: "Home", link: "#" },
  { icon: faChalkboardUser, label: "Live Classes", link: "#" },
  { icon: faFileSignature, label: "Mock Test", link: "#" },
  { icon: faFileCircleQuestion, label: "Live Mock", link: "#/mock" },
  { icon: faListOl, label: "To-Do List", link: "#" },
  {
    icon: faBookOpenReader,
    label: "Descriptive Writing",
    link: "#/descriptive",
  },
  { icon: faNewspaper, label: "Current Affair", link: "#/ca-quiz" },
  { icon: faFileSignature, label: "Daily Quiz", link: "#" },
  { icon: faCalendarDays, label: "Track Your Exam", link: "#/examTracker" },
  { icon: faHandHoldingDollar, label: "Win Prize", link: "#" },
  { icon: faAddressCard, label: "Our Selections", link: "#" },
  { icon: faCartShopping, label: "Purchased Item", link: "#" },

  // Social
  {
    icon: faSquareWhatsapp,
    label: "WhatsApp",
    link: "https://chat.whatsapp.com/EF6x76bLnSe47jBOvzIuGe",
  },
  {
    icon: faYoutube,
    label: "YouTube",
    link: "https://www.youtube.com/@silenttravler1632",
  },
  {
    icon: faTelegram,
    label: "Telegram",
    link: "https://t.me/Pathtobanking271",
  },

  { icon: "⚙️", label: "Setting", link: "#/password/forgot" },
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
              <ListItemIcon sx={{ color: "#45f3f3" }}>
                {typeof item.icon === "string" ? (
                  <span style={{ fontSize: "20px" }}>{item.icon}</span>
                ) : (
                  <FontAwesomeIcon icon={item.icon} />
                )}
              </ListItemIcon>

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
