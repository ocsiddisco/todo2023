import React from "react";
import linkedin from "../Images/linkedin.png";
import email from "../Images/email.png";
import github from "../Images/github.png";

function Footer() {
  return (
    <footer>
      <div className="container-footer">
        <p className="text-footer">© Made by Céline</p>
        <nav className="navFooter">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ocsiddisco/todo2023"
          >
            <img src={github} alt="github" width="60px" height="60px" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/celinelecorvaisier/"
          >
            <img src={linkedin} alt="linkedin" width="60px" height="60px" />
          </a>
          <a href="mailto:celine.le.corv@gmail.com">
            <img src={email} alt="email" width="60px" height="60px" />
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
