import { withTranslation } from "react-i18next";
import Contact from "../../components/contact/Contact";
import "./page.css";


function CompaniesPage({ t }: {t: any}) {
  return (
    <div className="page-container">
      <div className="page-section--normal">
        <h1 className="heading-1 heading-1--top-left-corner">
          {t("title")}
        </h1>
        <section>
          <p className="p--highlighted">{t("intro")}</p>
        </section>
        <div className="companies-info">
          <section>
            <h2 className="heading-2 heading-2--icon">
              <i className="heading-2__icon material-symbols-sharp">
                flowsheet
              </i>
              <span>{t("bedpres.title")}</span>
            </h2>
            <p className="p--regular">{t("bedpres.body")}</p>
            <p className="p--regular">
              {t("bedpres.footer1")}
              <a
                className="link link--primary link--underscore-hover"
                href="mailto:bedpres@login.no"
              >
                bedpres@login.no
              </a>
              {t("bedpres.footer2")}
            </p>
          </section>
          <section>
            <h2 className="heading-2 heading-2--icon">
              <i className="heading-2__icon logfont-bedkom"></i>
              {t("cyberdays.title")}
            </h2>
            <p className="p--regular">{t("cyberdays.body")}</p>
            <p className="p--regular">
              {t("cyberdays.footer1")}
              <a
                className="link link--primary link--underscore-hover"
                href="mailto:cyberdagene@login.no"
              >
                cyberdagene@login.no
              </a>
              {t("cyberdays.footer2")}
            </p>
          </section>
          <section>
            <h2 className="heading-2">
              <i className="heading-2__icon logfont-ctfkom"></i>
              {t("ctf.title")}
            </h2>
            <p className="p--regular">{t("ctf.body")}</p>
          </section>
          <section>
            <h2 className="heading-2 heading-2--icon">
              <i className="heading-2__icon material-symbols-sharp">campaign</i>
              <span>{t("profiling.title")}</span>
            </h2>
            <p className="p--regular">{t("profiling.body")}</p>
          </section>
          <section>
            <h2 className="heading-2 heading-2--icon">
              <i className="heading-2__icon material-symbols-sharp">build</i>
              <span>{t("workshop.title")}</span>
            </h2>
            <p className="p--regular">{t("workshop.body")}</p>
          </section>
        </div>
        <Contact />
      </div>
    </div>
  );
};

export default withTranslation("companiesPage")(CompaniesPage);
