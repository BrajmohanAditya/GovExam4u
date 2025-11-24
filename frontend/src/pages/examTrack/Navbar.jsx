// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Typography,
//   IconButton,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Divider,
//   CssBaseline,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Link } from "react-router-dom";

// const drawerWidth = 240;
// const navItems = ["Home", "ADD EXAM"];

// export default function Nav(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const drawer = // mobile code
//     (
//       <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
//         <Typography variant="h6" sx={{ my: 2 }}>
//           Exam Countdown
//         </Typography>
//         <Divider />
//         <List>
//           {navItems.map((item) => {
//             // yahan har item ka path decide kiya
//             const path = item === "Home" ? "/" : "/add-exam";

//             return (
//               <ListItem key={item} disablePadding>
//                 <ListItemButton
//                   component={Link} // 🔹 React Router ka Link use kiya
//                   to={path} // 🔹 path assign kiya ("/" ya "/add-exam")
//                   onClick={handleDrawerToggle} // 🔹 click ke baad Drawer band hoga
//                   sx={{ textAlign: "center" }}
//                 >
//                   <ListItemText
//                     primary={item}
//                     primaryTypographyProps={{
//                       fontSize: "1.2rem",
//                       textAlign: "center",
//                     }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//             );
//           })}
//         </List>
//       </Box>
//     );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar component="nav">
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Box
//             sx={{
//               flexGrow: 1,
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               variant="h4"
//               component="div"
//               sx={{ fontSize: "1.5rem", marginRight: "1rem" }}
//             >
//               Exam Countdown
//             </Typography>
//           </Box>
//           <Box sx={{ display: { xs: "none", sm: "block" } }}>
//             {navItems.map((item) => {
//               // aim: Adding new card.  yaha seh ak add request jayaga examTrackRoute.jsx ko or ya ak form ko render kr dega "ExamAddForm"
//               const path = item === "Home" ? "/" : "/add-exam";
//               return (
//                 <Button
//                   key={item}
//                   sx={{ color: "#fff", fontSize: "1rem" }}
//                   component={Link} // Link component
//                   to={path} // yahan dynamically path use karo
//                 >
//                   {item}
//                 </Button>
//               );
//             })}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <nav>
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//     </Box>
//   );
// }



import React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ boxShadow: "none", px: { xs: 1, sm: 3 } }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" }, // MOBILE = COLUMN
          gap: { xs: 1, sm: 0 }, // MOBILE spacing
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.8rem" },
            width: "100%",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Exam Countdown
        </Typography>

        {/* Add Exam Button */}
        <Button
          component={Link}
          to="/add-exam"
          fullWidth={true} // MOBILE → FULL WIDTH
          sx={{
            color: "#fff",
            fontSize: { xs: "1rem", sm: "1rem" },
            border: "1px solid rgba(255,255,255,0.6)",
            px: { xs: 1, sm: 2.5 },
            py: { xs: 1, sm: 1 },
            whiteSpace: "nowrap",
            width: { xs: "100%", sm: "auto" }, // MOBILE FULL WIDTH
            borderRadius: "6px",
          }}
        >
          ADD EXAM
        </Button>
      </Toolbar>
    </AppBar>
  );
}
