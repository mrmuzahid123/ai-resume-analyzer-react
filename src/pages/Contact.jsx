import "../assets/css/contact.css";

function Contact() {
  return (
    <div className="contact-page">

      <div className="contact-container">

        <div className="contact-info">
          <h2>Get In Touch</h2>

          <p>
            Have questions or suggestions? We'd love to hear from you.
          </p>

          <div className="info-box">
            <h4>Email</h4>
            <p>support@airesumeanalyzer.com</p>
          </div>

          <div className="info-box">
            <h4>Phone</h4>
            <p>+91 8077115653</p>
          </div>

          <div className="info-box">
            <h4>Address</h4>
            <p>Bareilly, Uttar Pradesh, India</p>
          </div>

        </div>

        <div className="contact-form">

          <h2>Send Message</h2>

          <form>

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="6"
              placeholder="Write your message..."
            ></textarea>

            <button>
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;