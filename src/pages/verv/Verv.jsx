import { useTranslation } from "react-i18next";

import ImageCarousel from "../../components/imagecarousel/ImageCarousel";
import Button from "../../components/button/Button";
import VervTabs from "./VervTabs";

import "./Verv.css";


const Verv = () => {

  const { t } = useTranslation('vervPage');
  const slides = [];

  for (let i = 1; i <= 15; i++) {
    slides.push({
      imgSrc: `https://cdn.login.no/img/imagecarousel/${i}.jpg`,
      title: t(`imageCarousel.${i}.title`),
      description: t(`imageCarousel.${i}.description`),
    });
  }

  return (
    <div className="verv-page page-container">
      <div className="page-section--normal">
        <h1 className="heading-1 heading-1--top-left-corner">{t("title")}</h1>
      </div>
      <section className="verv-page__section verv-intro page-section--normal">
        <p className="verv-intro__p p--highlighted">
          {t("intro")}
        </p>
        <p className="verv-intro__p p--regular">
          {t("intro2")}
        </p>
      </section>
      <section className="verv-page__section page-section--full-width">
        <ImageCarousel slides={slides} />
      </section>
      <section className="verv-committees page-section--normal">
        <h2 className="heading-2">{t("committeeSection.title")}</h2>
        <p className="p--regular">{t("committeeSection.intro")}</p>
      </section>
      <VervTabs />
      <section className="verv-page__section verv-apply page-section--normal">
        <h2
          className="heading-2"
        >
          {t("apply.title")}
        </h2>
        <p
          className="p--regular"
          dangerouslySetInnerHTML={{ __html:  t("apply.body") }}
        />
        <Button
          href="https://forms.gle/nQrJuqo3C9URLRM29"
          size="xl"
          className="verv-apply__button"
        >
          {t("apply.action")}
        </Button>
      </section>
    </div>
  );
};

export default Verv;
