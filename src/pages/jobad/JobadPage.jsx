import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { config } from "../../Constants";
import Spinner from "../../components/spinner/Spinner";
import Article from '../../components/article/Article';
import * as ImageLinker from "../../utils/ImageLinker";
import * as TimeFormatter from "../../utils/DatetimeFormatter";
import * as Translator from "../../utils/GetTranslation";
import fallbackImg from "./jobad-fallback-logo.svg";
import "./JobadPage.css";


function deadlineWarning(deadline) {
  const currentTime = new Date();

  const timeDifference = deadline - currentTime;

  const hoursRemaining = timeDifference / (1000 * 60 * 60);

  return hoursRemaining < 24 && hoursRemaining > 0;
}


const JobadPage = ({ t, i18n }) => {
  let { id } = useParams();

  const [jobad, setJobad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const useEng = i18n.language === "en";
  const tr = Translator.getTranslation(useEng);

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
          <div className="jobad-description">
            <Article
              title={tr(jobad.job.title_en, jobad.job.title_no)}
              publishTime={jobad.job.time_publish}
              informational={false}
              description={tr(jobad.job.description_long_en, jobad.job.description_long_no)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default withTranslation("jobadPage")(JobadPage);
