import React, { useState } from "react";
import { navbarStyles } from "../../assets/dummyStyles";
import { Link, NavLink } from "react-router-dom";
import { Award, Menu, X, Home } from "lucide-react";

const Navbar = ({ logoSrc }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={navbarStyles.nav}>
      <div
        style={{
          backgroundImage: navbarStyles.decorativePatternBackground,
        }}
        className={navbarStyles.decorativePattern}
      ></div>
      <div className={navbarStyles.bubble1}></div>
      <div className={navbarStyles.bubble2}></div>
      <div className={navbarStyles.bubble3}></div>

      <div className={navbarStyles.container}>
        <div className={navbarStyles.logoContainer}>
          <Link to="/" className={navbarStyles.logoButton}>
            <Home className="h-8 w-8 text-blue-600" />
          </Link>
        </div>

        <div className={navbarStyles.titleContainer}>
          <div className={navbarStyles.titleBackground}>
            <h1 className={navbarStyles.titleText}>Current Affair Quiz</h1>
          </div>
        </div>

        <div className={navbarStyles.desktopButtonsContainer}>
          <div className={navbarStyles.spacer}></div>
          <NavLink to="/result" className={navbarStyles.resultsButton}>
            <Award className={navbarStyles.buttonIcon} />
            My Result
          </NavLink>
        </div>

        <div className={navbarStyles.mobileMenuContainer}>
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className={navbarStyles.menuToggleButton}
          >
            {menuOpen ? (
              <X className={navbarStyles.menuIcon} />
            ) : (
              <Menu className={navbarStyles.menuIcon} />
            )}
          </button>

          {menuOpen && (
            <div className={navbarStyles.mobileMenuPanel}>
              <ul className={navbarStyles.mobileMenuList}>
                <li>
                  <NavLink
                    to="/result"
                    className={navbarStyles.mobileMenuItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Award className={navbarStyles.mobileMenuIcon} />
                    My result
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <style>{navbarStyles.animations}</style>
    </nav>
  );
};
export default Navbar;
