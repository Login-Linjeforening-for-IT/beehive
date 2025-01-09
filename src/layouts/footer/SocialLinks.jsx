import "./SocialLinks.css";


const SocialLinks = () => {
  return (
    <div className="footer-social-links" target="_blank" rel="noreferrer">
      <a
        className="footer-social-links__link"
        title="Discord"
        href="https://discord.gg/login-ntnu"
        target="_blank"
        rel="noreferrer"
      >
        <i className="footer-social-links__icon footer-social-links__icon--discord logfont-discord"></i>
      </a>
      <a
        className="footer-social-links__link"
        title="Instagram"
        href="https://www.instagram.com/login_linjeforening/"
        target="_blank"
        rel="noreferrer"
      >
        <i className="footer-social-links__icon footer-social-links__icon--instagram logfont-instagram"></i>
      </a>
      <a
        className="footer-social-links__link"
        title="Facebook"
        href="https://facebook.com/LogNTNU"
        target="_blank"
        rel="noreferrer"
      >
        <i className="footer-social-links__icon footer-social-links__icon--facebook logfont-facebook"></i>
      </a>
      <a
        className="footer-social-links__link"
        title="Linkedin"
        href="https://www.linkedin.com/company/linjeforeningen-login/about"
        target="_blank"
        rel="noreferrer"
      >
        <i className="footer-social-links__icon footer-social-links__icon--linkedin logfont-linkedin"></i>
      </a>
      <a
        className="footer-social-links__link"
        title="Gitlab"
        href="https://gitlab.login.no/tekkom"
        target="_blank"
        rel="noreferrer"
      >
        <i className="footer-social-links__icon footer-social-links__icon--gitlab logfont-gitlab"></i>
      </a>
      <a
        className="footer-social-links__link"
        title="Wiki"
        href="https://wiki.login.no"
        target="_blank"
        rel="noreferrer"
      >
        <i className="footer-social-links__icon footer-social-links__icon--wikijs logfont-wikijs"></i>
      </a>
    </div>
  );
};

export default SocialLinks;
