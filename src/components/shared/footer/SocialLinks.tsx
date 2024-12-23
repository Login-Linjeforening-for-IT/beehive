import "./SocialLinks.css"


export default function SocialLinks() {
    return (
    // @ts-ignore
        <div className="footer-social-links" target="_blank" rel="noreferrer">
            <a
                className="footer-social-links_link"
                title="Discord"
                href="https://discord.gg/login-ntnu"
                target="_blank"
                rel="noreferrer"
            >
                <i className="footer-social-links_icon footer-social-links_icon--discord logfont-discord"></i>
            </a>
            <a
                className="footer-social-links_link"
                title="Instagram"
                href="https://www.instagram.com/login_linjeforening/"
                target="_blank"
                rel="noreferrer"
            >
                <i className="footer-social-links_icon footer-social-links_icon--instagram logfont-instagram"></i>
            </a>
            <a
                className="footer-social-links_link"
                title="Facebook"
                href="https://facebook.com/LogNTNU"
                target="_blank"
                rel="noreferrer"
            >
                <i className="footer-social-links_icon footer-social-links_icon--facebook logfont-facebook"></i>
            </a>
            <a
                className="footer-social-links_link"
                title="Linkedin"
                href="https://www.linkedin.com/company/linjeforeningen-login/about"
                target="_blank"
                rel="noreferrer"
            >
                <i className="footer-social-links_icon footer-social-links_icon--linkedin logfont-linkedin"></i>
            </a>
            <a
                className="footer-social-links_link"
                title="Gitlab"
                href="https://git.logntnu.no/"
                target="_blank"
                rel="noreferrer"
            >
                <i className="footer-social-links_icon footer-social-links_icon--gitlab logfont-gitlab"></i>
            </a>
            <a
                className="footer-social-links_link"
                title="Wiki"
                href="https://wiki.login.no"
                target="_blank"
                rel="noreferrer"
            >
                <i className="footer-social-links_icon footer-social-links_icon--wikijs logfont-wikijs"></i>
            </a>
        </div>
    )
}
