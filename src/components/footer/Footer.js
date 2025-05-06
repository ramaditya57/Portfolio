import React from "react";
import "./Footer.css";
import { Fade } from "react-awesome-reveal";
// import { greeting } from "../../portfolio.js";
/* eslint-disable jsx-a11y/accessible-emoji */

export default function Footer(props) {
  return (
    <div className="footer-div">
      <Fade>
        <p className="footer-text" style={{ color: props.theme.secondaryText }}>
          <span id="copyright-symbol">&copy;</span> {new Date().getFullYear()}{" "}
          Ramaditya Chaudhary. All rights reserved.
        </p>
      </Fade>
    </div>
  );
}
