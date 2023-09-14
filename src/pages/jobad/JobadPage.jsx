import { useState } from "react";
import { Navigate, useParams } from 'react-router-dom';
import { withTranslation } from "react-i18next";
import * as ImageLinker from "../../utils/ImageLinker";
import * as TimeFormatter from "../../utils/DatetimeFormatter";
import fallbackImg from "./jobad-fallback-logo.svg";
import "./JobadPage.css";
import "./jobad-description.css";

// dummie data
let demoJobs = {
  jobs: [
    {
      id: 1,
      name_no:
        "TekKom er et kult sted, og dette er en lang tittel for å se hvor mye plass jeg har å jobbe med",
      name_en:
        "TekKom is a cool place and this is a long title to see how much space I have to work with",
      position_title_no: "utvikler",
      position_title_en: "developer",
      deadline: "2023-09-14T23:59",
      published_date: "2023-09-15T00:00:00Z",
      type_no: "Deltid",
      type_en: "Part-time",
      text_short_no: "Utvikler i TekKom",
      text_short_en: "",
      application_url:
        "https://www.mnemonic.io/careers/open-positions/minternship-security-consultant/",
      organization: {
        shortname: "",
        name_no: "Login - Linjeforening for IT",
        name_en: "",
        logo: "",
      },
      cities: ["Gjøvik"],
      banner_image: "https://cdn.login.no/img/styret2.jpg",
      description_en:
        "<p>Steve wants reflections, so let's give him reflections. Maybe there's a happy little bush that lives right there. Steve wants reflections, so let's give him reflections. Maybe there's a happy little bush that lives right there. Steve wants reflections, so let's give him reflections. Maybe there's a happy little bush that lives right there. Steve wants reflections, so let's give him reflections. Maybe there's a happy little bush that lives right there. Steve wants reflections, so let's give him reflections. Maybe there's a happy little bush that lives right there. </p>",
      description_no:
        "<p>Gira på å progge litt eller? Søk verv da vel bitch! Her er mer tekst. Her er mer tekst. Her er mer tekst. Her er mer tekst. Her er mer tekst.</p>",
    }
  ]
};

const getTranslation = (useEng) => {
  if (!useEng)
    return (_, no) => {
      return no;
    };

  return (en, no) => {
    return en ? en : no;
  };
};

function deadlineWarning(deadline) {
  const currentTime = new Date();

  const timeDifference = deadline - currentTime;

  const hoursRemaining = timeDifference / (1000 * 60 * 60);

  return hoursRemaining < 24 && hoursRemaining > 0;
}

const JobadPage = ({ t, i18n }) => {
  let { id } = useParams();

  // TODO: use api to get job using id
  const job = demoJobs.jobs[0];
  const deadlineDate = new Date(job.deadline);
  const publishDate = new Date(job.published_date);

  const useEng = i18n.language === "en";
  const tr = getTranslation(useEng);

  const [imgSrc, setImgSrc] = useState(
    ImageLinker.getCDNLink(job.organization.logo)
  );
  const handleError = () => setImgSrc(fallbackImg);

  const [showBannerImg, setShowBannerImg] = useState(
    job.banner_image !== ""
  );
  const hideBannerImg = () => {
    setShowBannerImg(false);
  };

  // remove this when implementing api
  const showDummieData = false;
  if(showDummieData) {
  // ^
  return (
    <div
      className={`jobad-page page-container ${
        showBannerImg ? "jobad-page--banner" : "jobad-page--noBanner"
      }`}
    >
      <div className="jobad-details">
        <div className="jobad-details__company">
          <picture>
            <img
              className="jobad-details__company-logo"
              alt={tr(
                job.name_en,
                job.name_no
              )}
              src={imgSrc}
              onError={handleError}
            />
          </picture>
          <div className="jobad-details__company-name">
            {tr(
              job.organization.name_en,
              job.organization.name_no
            )}
          </div>
        </div>
        <div className="jobad-details__list">
          <div className="jobad-details__lable">
            <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
              hourglass_bottom
            </i>
            {t("details.deadline")}:
          </div>
          <div className="jobad-details__value">
            {TimeFormatter.formatDateDT(deadlineDate, useEng ? "en" : "no")}
            {deadlineWarning(deadlineDate) && (
              <i className="material-symbols-sharp jobad-details__icon jobad-details__icon--warning">
                acute
              </i>
            )}
          </div>
          <div className="jobad-details__lable">
            <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
              badge
            </i>
            {t("details.position")}:
          </div>
          <div className="jobad-details__value">
            {tr(
              job.position_title_en,
              job.position_title_no
            )}
          </div>
          <div className="jobad-details__lable">
            <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
              work_history
            </i>
            {t("details.type")}:
          </div>
          <div className="jobad-details__value">
            {tr(job.type_en, job.type_no)}
          </div>
          <div className="jobad-details__lable">
            <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
              location_on
            </i>
            {job.cities.length > 1
              ? t("details.locations")
              : t("details.location")}
            :
          </div>
          <div className="jobad-details__value">
            {job.cities.join(", ")}
          </div>
        </div>
        {job.application_url && (
          <a
            href={job.application_url}
            className="jobad-details__apply-btn standard-button standard-button--primary"
          >
            {t("details.apply-btn")}{" "}
            <i className="material-symbols-sharp">arrow_outward</i>
          </a>
        )}
      </div>
      {showBannerImg && (
        <div className="jobad-banner">
          <picture>
            <img
              alt={job.banner_image}
              src={ImageLinker.getCDNLink(job.banner_image)}
              onError={hideBannerImg}
            />
          </picture>
        </div>
      )}
      <div className="jobad-description">
        <h1 className="jobad-description__h1">
          {tr(job.name_en, job.name_no)}
        </h1>
        <p className="jobad-description__published">
          {t("published")}:{" "}
          {TimeFormatter.formatDateTDY(publishDate, useEng ? "en" : "no")}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: tr(
              job.description_en,
              job.description_no
            ),
          }}
        />
      </div>
    </div>
  );
  // remove this when implementing api
  } else {
    return (<Navigate to='/404' />)
  }
  // ^
};

export default withTranslation("jobadPage")(JobadPage);
