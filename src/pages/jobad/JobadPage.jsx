import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { config } from "../../Constants";
import Spinner from "../../components/spinner/Spinner";
import Article from '../../components/article/Article';
import RenderSmoothImage from '../../components/picture/RenderSmoothImage/RenderSmoothImage'
import * as DatetimeFormatter from "../../utils/DatetimeFormatter";
import * as Translator from "../../utils/GetTranslation";
import { getJob } from '../../utils/api';
import fallbackImg from '../../assets/img/placeholders/jobad-logo__placeholder.svg'
import "./JobadPage.css";

const jobTypeTranslations = {
  no: {
    summer: 'Sommerjobb',
    full: 'Fulltid',
    verv: 'Verv',
    part: 'Deltid'
  },
  en: {
    summer: 'Sommer job',
    full: 'Fulltime',
    verv: 'Voluntary',
    part: 'Parttime'
  }
}

const getJobTypeLabel = (job_type, lang="no") => {

  const labelNo = jobTypeTranslations['no'][job_type] || job_type;
  let labelEn = jobTypeTranslations['en'][job_type] || labelNo;

  return lang === "en" ? labelEn : labelNo;
};

function deadlineWarning(deadline) {
  const now = new Date();
  const diff = deadline - now;
  const oneDay = 1000 * 60 * 60 * 24;

  return diff < oneDay && diff > 0;
}


const JobadPage = ({ t, i18n }) => {

  const { id } = useParams();
  const useEng = i18n.language === "en";
  const lang = useEng ? 'en' : 'no';
  const tr = Translator.getTranslation(useEng);
  
  const [useFallbackImg, setUseFallbackImg] = useState(false);

  const [showBannerImg, setShowBannerImg] = useState(false);
  const hideBannerImg = () => setShowBannerImg(false);

  const [jobad, setJobad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ response, err ] = await getJob(id);

        setJobad(response);
        if (response.job.banner_image ? setShowBannerImg(true) : setShowBannerImg(false));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job ad data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading && <Spinner w="50" h="50" />}
      {jobad && (
        <div
          className={`jobad-page ${
            showBannerImg ? "jobad-page--banner" : "jobad-page--noBanner"
          }`}
        >
          <div className="jobad-details">
            <div className="jobad-details__company">
              <picture>
                <RenderSmoothImage
                  src={useFallbackImg ? fallbackImg : config.url.CDN_URL + '/img/organizations/' + jobad.organization.logo}
                  alt={jobad.organization.logo}
                  className='jobad-details__company-logo'
                  onError={() => setUseFallbackImg(true)}
                />
              </picture>
              <div className="jobad-details__company-name">
                {jobad.organization.link_homepage ?
                  <a
                    className="jobad-details__company-name-link standard-link--underscore-hover"
                    href={jobad.organization.link_homepage}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {tr(jobad.organization.name_en, jobad.organization.name_no) + " "}
                    <i className="material-symbols-sharp">arrow_outward</i>
                  </a>
                  :
                  tr(jobad.organization.name_en, jobad.organization.name_no)
                }
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
                {DatetimeFormatter.formatDeadlineDate(
                  new Date(jobad.job.application_deadline),
                  lang
                )}
                {deadlineWarning(new Date(jobad.job.application_deadline)) && (
                  <i className="material-symbols-sharp jobad-details__icon jobad-details__icon--warning">
                    acute
                  </i>
                )}
              </div>
              {jobad.job.position_title_no && 
                <>
                  <div className="jobad-details__lable">
                    <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
                      badge
                    </i>
                    {t("details.position")}:
                  </div>
                  <div className="jobad-details__value">
                    {tr(jobad.job.position_title_en, jobad.job.position_title_no)}
                  </div>
                </>
              }
              <div className="jobad-details__lable">
                <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
                  work_history
                </i>
                {t("details.type")}:
              </div>
              <div className="jobad-details__value">
                {getJobTypeLabel(jobad.job.job_type, lang)}
              </div>
              {jobad.job.cities && jobad.job.cities.length > 0 &&
                <>
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
                </>
              }
              {jobad.job.skills && jobad.job.skills.length > 0 &&
                <>
                  <div className="jobad-details__lable">
                    <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
                      build
                    </i>
                    {t("details.skills")}:
                  </div>
                  <div className="jobad-details__value">
                    {jobad.job.skills.join(", ")}
                  </div>
                </>
              }
            </div>
            {jobad.job.application_url && (
              <a
                href={jobad.job.application_url}
                target="_blank"
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
                <RenderSmoothImage
                  src={config.url.CDN_URL + "/img/ads/" + jobad.job.banner_image}
                  alt={jobad.job.banner_image}
                  onError={hideBannerImg}
                />
              </picture>
            </div>
          )}
          <div className="jobad-description">
            <Article
              title={tr(jobad.job.title_en, jobad.job.title_no)}
              publishTime={new Date(jobad.job.time_publish)}
              updateTime={new Date(jobad.job.updated_at)}
              informational={false}
              introduction={tr(jobad.job.description_short_en, jobad.job.description_short_no)}
              description={tr(jobad.job.description_long_en, jobad.job.description_long_no)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default withTranslation("jobadPage")(JobadPage);
