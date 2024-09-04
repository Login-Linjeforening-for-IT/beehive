import { withTranslation } from "react-i18next";
import { config } from "../../Constants";

import CommitteeTabs from "./CommitteeTabs";
import StudyProgramsAcordion from "./StudyProgramsAccordion";
import DecoratedPicture from "../../components/images/decoratedpicture/DecoratedPicture";
import Contact from "../../components/contact/Contact";

import "./About.css";


const About = ({ t }) => {
  return (
    <div className="page-container">
      <h1 className="page-section--normal heading-1 heading-1--top-left-corner">
        {t("title")}
      </h1>
      <section className="page-section--normal about-section about-intro">
        <p
          className="about-intro__p p--highlighted"
          dangerouslySetInnerHTML={{ __html: t("intro") }}
        />
        <div className="about-intro__grid-container">
          <StudyProgramsAcordion />
          <DecoratedPicture
            imgurl={config.url.CDN_URL + "/img/styret2.jpg"}
            variant={3}
            cornerSize={90}
            w={300}
            h={200}
            cover={true}
            className="about-intro__picture"
          />
        </div>
      </section>
      <section className="page-section--normal about-section">
        <h2 className="heading-2">{t("about.title")}</h2>
        <div className="p--columns">
          <p
            className="p--highlighted"
            dangerouslySetInnerHTML={{ __html: t("about.intro") }}
          />
          <p
            className="p--regular"
            dangerouslySetInnerHTML={{ __html: t("about.body.p1") }}
          />
          <p
            className="p--regular"
            dangerouslySetInnerHTML={{ __html: t("about.body.p2") }}
          />
        </div>
      </section>
      <section className="page-section--normal about-committees">
        <h2 className="heading-2">{t("committeeSection.title")}</h2>
        <p className="p--regular">{t("committeeSection.intro")}</p>
      </section>
      <CommitteeTabs />
      <section className="page-section--normal about-section about-public-docs">
        <h2 className="heading-2">{t("publicDocs.title")}</h2>
        <p
          className="p--regular"
          dangerouslySetInnerHTML={{ __html: t("publicDocs.body") }}
        />
        <ul className="list">
          <li>{t("publicDocs.bulletPoints.agendas")}</li>
          <li>{t("publicDocs.bulletPoints.minutes")}</li>
          <li>{t("publicDocs.bulletPoints.budgets")}</li>
          <li>{t("publicDocs.bulletPoints.honorary-member")}</li>
          <li>{t("publicDocs.bulletPoints.bylaws")}</li>
        </ul>
      </section>
      <div className="page-section--normal">
        <Contact />
      </div>
    </div>
  );
};

export default withTranslation("aboutPage")(About);
