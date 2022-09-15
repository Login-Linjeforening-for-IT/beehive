import './SocialLinks.css';

const SocialLinks = () => {
  return (
    <div className='SocialLinks' target='_blank' rel='noreferrer'>
      <a href='https://discord.gg/login-ntnu' target='_blank' rel='noreferrer'>
        <i className='logfont-discord'></i>
      </a>
      <a href='https://www.instagram.com/login_linjeforening/' target='_blank' rel='noreferrer'>
        <i className='logfont-instagram'></i>
      </a>
      <a title='hei' href='https://facebook.com/LogNTNU' target='_blank' rel='noreferrer'>
        <i className='logfont-facebook'></i>
      </a>
      <a href='https://www.linkedin.com/company/linjeforeningen-login/about' target='_blank' rel='noreferrer'>
        <i className='logfont-linkedin'></i>
      </a>
      <a href='https://git.logntnu.no/' target='_blank' rel='noreferrer'>
        <i className='logfont-gitlab'></i>
      </a>
      <a href='https://redmine.logntnu.no/' target='_blank' rel='noreferrer'>
        <i className='logfont-redmine'></i>
      </a>
    </div>
  );
}

export default SocialLinks;
