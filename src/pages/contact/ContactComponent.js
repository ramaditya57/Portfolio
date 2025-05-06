import React, { useRef, useState } from "react"; // Add this line
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SocialMedia from "../../components/socialMedia/SocialMedia";
// import BlogsImg from "./BlogsImg";
import { Fade } from "react-awesome-reveal";
import "./ContactComponent.css";
import { greeting, contactPageData } from "../../portfolio.js";
import { style } from "glamor";
import emailjs from "emailjs-com";

const ContactData = contactPageData.contactSection;
// const blogSection = contactPageData.blogSection;

function Contact(props) {
  const theme = props.theme;

  const styles = style({
    backgroundColor: `${theme.accentBright}`,
    ":hover": {
      boxShadow: `0 5px 15px ${theme.accentBright}`,
    },
  });

  const form = useRef(); // Reference for the form
  const [status, setStatus] = useState(""); // To display success/failure messages

  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Call the emailjs.sendForm method
    emailjs
      .sendForm(
        "service_6wc87aw", // Replace with your EmailJS service ID
        "template_v69qvkm", // Replace with your EmailJS template ID
        form.current, // The form reference
        "Bk2SmiAFf9VkaGzrh" // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          window.alert("Message sent successfully!");
          console.log(result.text); // Log the result
        },
        (error) => {
          setStatus("Failed to send message, please try again.");
          window.alert("Failed to send message, please try again.");
          console.log(error.text); // Log the error
        }
      );
  };

  return (
    <div className="contact-main">
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-contact">
        <Fade bottom duration={1000} distance="40px">
          <div className="contact-heading-div">
            <div className="contact-heading-img-div">
              <img
                style={{ borderRadius: "50%" }}
                className="profile-pic"
                src={require(`../../assests/images/${ContactData["profile_image_path"]}`)}
                alt="harikanani-profile-pic"
              />
            </div>
            <div className="contact-heading-text-div">
              <h1
                className="contact-heading-text"
                style={{ color: theme.text }}
              >
                {ContactData["title"]}
              </h1>
              <p
                className="contact-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {ContactData["description"]}
              </p>
              <SocialMedia />
              <br />
              <br />
              <a
                {...styles}
                target="_blank"
                rel="noopener noreferrer"
                className="general-btn"
                href={greeting.resumeLink}
              >
                See my Resume
              </a>
            </div>
          </div>
        </Fade>
        <Fade bottom duration={1000} distance="40px">
          <div className="blog-heading-div">
            <div className="blog-heading-text-div">
              <h1 className="blog-heading-text" style={{ color: theme.text }}>
                Contact Me
              </h1>
              <p
                className="blog-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                Feel free to reach out for collaborations, questions, or just to
                connect.
              </p>
              <form ref={form} onSubmit={sendEmail} className="contact-form">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  required
                ></textarea>
                <div className="blogsite-btn-div">
                  <button {...styles} type="submit" className="general-btn">
                    Send Message
                  </button>
                </div>
              </form>
              {status && <p className="status-message">{status}</p>}{" "}
              {/* Display status message */}
            </div>
          </div>
        </Fade>
      </div>
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Contact;
