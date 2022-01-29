import './SocialLinks.css';

const SocialLinks = () => {
  return (
    <div className="SocialLinks">
      <a className="SocialIcon" href="https://www.linkedin.com/company/linjeforeningen-login/about">
        <picture>
          <source srcSet={process.env.PUBLIC_URL + '/icons/Linkedin_logo.svg'} />
          <img alt="Linkedin's logo" />
        </picture>
      </a>
      <div className="SocialSpacer" />
      <a className="SocialIcon" href="https://facebook.com/LogNTNU">
        <picture>
          <source srcSet={process.env.PUBLIC_URL + '/icons/Facebook_logo.svg'} />
          <img alt="Facebook's logo" />
        </picture>
      </a>
      <div className="SocialSpacer" />
      <a className="SocialIcon" href="https://www.instagram.com/login_linjeforening/">
        <picture>
          <source srcSet={process.env.PUBLIC_URL + '/icons/Instagram_logo.svg'} />
          <img alt="Instagram's logo" />
        </picture>
      </a>
      <div className="SocialSpacer" />
      <a className="SocialIcon" href="https://git.logntnu.no/">
        <picture>
          <source srcSet={process.env.PUBLIC_URL + '/icons/Gitlab_logo.svg'} />
          <img alt="GitLab's logo" />
        </picture>
      </a>
      <div className="SocialSpacer" />
      <a className="SocialIcon" href="https://redmine.logntnu.no/">
        <picture>
          <source srcSet={process.env.PUBLIC_URL + '/icons/Redmine_logo.svg'} />
          <img alt="Redmine's logo" />
        </picture>
      </a>
      <div className="SocialSpacer" />
      <a className="SocialIcon" href="https://discord.gg/login-ntnu">
        <picture>
          <source srcSet={process.env.PUBLIC_URL + '/icons/Discord_logo.svg'} />
          <img alt="Discord's logo" />
        </picture>
      </a>
    </div>
  );
}

export default SocialLinks;
