import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { config } from "../../Constants";
import Spinner from "../../components/spinner/Spinner";
import * as ImageLinker from "../../utils/ImageLinker";
import * as TimeFormatter from "../../utils/DatetimeFormatter";
import fallbackImg from "./jobad-fallback-logo.svg";
import "./JobadPage.css";
import "../../description.css";

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
    },
  ],
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

function stuff(jobad) {
  const deadlineDate = new Date(jobad.job.deadline);
  const publishDate = new Date(jobad.job.published_date);

  return "stuff";
}

const JobadPage = ({ t, i18n }) => {
  let { id } = useParams();

  const [jobad, setJobad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const useEng = i18n.language === "en";
  const tr = getTranslation(useEng);

  const [logoImgSrc, setlogoImgSrc] = useState(fallbackImg);
  const handleLogoImgError = () => setlogoImgSrc(fallbackImg);

  const [showBannerImg, setShowBannerImg] = useState(true);
  const hideBannerImg = () => {
    setShowBannerImg(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(config.url.API_URL + "/api/jobs/" + id);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setJobad(actualData);
        setlogoImgSrc(ImageLinker.getCDNLink(actualData.organization.logo));
        if (actualData.job.banner_image == "") hideBannerImg();
        setError(null);
      } catch (err) {
        setError(err.message);
        setJobad(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  console.log(jobad);

  return (
    <>
      {loading && <Spinner w="3rem" h="3rem" />}
      {jobad && (
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
                  alt={tr(jobad.job.name_en, jobad.job.name_no)}
                  src={logoImgSrc}
                  onError={handleLogoImgError}
                />
              </picture>
              <div className="jobad-details__company-name">
                {tr(jobad.organization.name_en, jobad.organization.name_no)}
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
                {TimeFormatter.formatDateDT(
                  new Date(jobad.job.application_deadline),
                  useEng ? "en" : "no"
                )}
                {deadlineWarning(new Date(jobad.job.application_deadline)) && (
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
                {tr(jobad.job.position_title_no, jobad.job.position_title_no)}
              </div>
              <div className="jobad-details__lable">
                <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
                  work_history
                </i>
                {t("details.type")}:
              </div>
              <div className="jobad-details__value">
                {tr(jobad.job.job_type, jobad.job.job_type)}
              </div>
              <div className="jobad-details__lable">
                <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
                  location_on
                </i>
                {jobad.job.cities.length > 1
                  ? t("details.locations")
                  : t("details.location")}
                :
              </div>
              <div className="jobad-details__value">
                {jobad.job.cities.join(", ")}
              </div>
            </div>
            {jobad.job.application_url && (
              <a
                href={jobad.job.application_url}
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
                  alt={jobad.job.banner_image}
                  src={jobad.job.banner_image}
                  onError={hideBannerImg}
                />
              </picture>
            </div>
          )}
          <div className="description">
            <h1 className="description__header">
              {tr(jobad.job.title_en, jobad.job.title_no)}
            </h1>
            <p className="description__published">
              {t("published")}:{" "}
              {TimeFormatter.formatDateTDY(
                new Date(jobad.job.time_publish),
                useEng ? "en" : "no"
              )}
            </p>
            <div className="description__main"
              dangerouslySetInnerHTML={{
                __html: tr(
                  jobad.job.description_long_en,
                  jobad.job.description_long_no
                )
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default withTranslation("jobadPage")(JobadPage);
