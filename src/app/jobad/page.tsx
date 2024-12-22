import { useState, useEffect } from "react"
// @ts-ignore
import { useParams } from "react-router-dom"
import { config } from "../../Constants"

// @ts-ignore
import Spinner from "../../components/spinner/Spinner"
import Article from "../../components/article/Article"
import RenderSmoothImage from "../../components/images/rendersmoothimage/RenderSmoothImage"
import Button from "../../components/button/Button"
import Alert from "../../components/alert/Alert"

import * as DatetimeFormatter from "../../utils/DatetimeFormatter"
import { getJob } from "../../utils/api"

import fallbackImg from "../../assets/img/placeholders/jobad-logo__placeholder.svg"
import "./page.css"
import getCookie from "../../utils/getCookie"

const lang = getCookie('lang') as 'no' | 'en' || 'no'

const jobTypeTranslations = {
    no: {
        summer: "Sommerjobb",
        full: "Fulltid",
        verv: "Verv",
        part: "Deltid"
    },
    en: {
        summer: "Sommer job",
        full: "Fulltime",
        verv: "Voluntary",
        part: "Parttime"
    }
}

function getJobTypeLabel(job_type: any, lang = "no") {
    // @ts-ignore
    const labelNo = jobTypeTranslations["no"][job_type] || job_type
    // @ts-ignore
    const labelEn = jobTypeTranslations["en"][job_type] || labelNo

    return lang === "en" ? labelEn : labelNo
};

function deadlineWarning(deadline: Date) {
    const now = new Date()
    const diff = deadline.getTime() - now.getTime()
    const oneDay = 1000 * 60 * 60 * 24

    return diff < oneDay && diff > 0
}

export default function JobadPage() {
    const { id } = useParams()
    const [useFallbackImg, setUseFallbackImg] = useState(false)
    const [showBannerImg, setShowBannerImg] = useState(false)
    const hideBannerImg = () => setShowBannerImg(false)
    const [jobad, setJobad] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const [response, err] = await getJob(id)
                if (err) throw new Error(err)

                setJobad(response)
                setShowBannerImg(!!response.job.banner_image)
            } catch (error) {
                console.error("Error fetching job ad data:", error)
                setError("Failed to load job ad data.")
            } finally {
                setLoading(false)
            }
        };

        fetchData()
    }, [id])

    return (
        <>
            {loading && <Spinner width={50} height={50} />}
            {!loading && error && 
        <div className="page-container">
            <Alert
                variant='danger'
                icon='sentiment_dissatisfied'
                className="page-section--normal page-section--alert"
            >
                {error}
            </Alert>
        </div>
            }
            {!loading && !error && jobad && (
                <div
                    className={`jobad-page ${
                        showBannerImg ? "jobad-page--banner" : "jobad-page--noBanner"
                    }`}
                >
                    <div className="jobad-details">
                        <div className="jobad-details__company">
                            <picture className="jobad-details__company-logo">
                                <RenderSmoothImage
                                    // @ts-ignore
                                    src={useFallbackImg ? fallbackImg : `${config.url.CDN_URL}/img/organizations/${jobad.organization.logo}`}
                                    // @ts-ignore
                                    alt={jobad.organization.logo}
                                    className='jobad-details__image'
                                    onError={() => setUseFallbackImg(true)}
                                />
                            </picture>
                            <div className="jobad-details__company-name">
                                {/* @ts-ignore */}
                                {jobad.organization.link_homepage ? (
                                    <a
                                        className="jobad-details__company-name-link link--underscore-hover"
                                        // @ts-ignore
                                        href={jobad.organization.link_homepage}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {/* @ts-ignore */}
                                        {tr(jobad.organization.name_en, jobad.organization.name_no) + " "}
                                        <i className="material-symbols-sharp">arrow_outward</i>
                                    </a>
                                ) : (
                                // @ts-ignore
                                    tr(jobad.organization.name_en, jobad.organization.name_no)
                                )}
                            </div>
                        </div>
                        <div className="jobad-details__list">
                            <div className="jobad-details__lable">
                                <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
                                    hourglass_bottom
                                </i>
                                {text.details.deadline}:
                            </div>
                            <div className="jobad-details__value">
                                {DatetimeFormatter.formatDeadlineDate(
                                    // @ts-ignore
                                    new Date(jobad.job.application_deadline),
                                    lang
                                )}
                                {/* @ts-ignore */}
                                {deadlineWarning(new Date(jobad.job.application_deadline)) && (
                                    <i className="material-symbols-sharp jobad-details__icon jobad-details__icon--warning">
                                        acute
                                    </i>
                                )}
                            </div>
                            {/* @ts-ignore */}
                            {jobad.job.position_title_no && 
                <>
                    <div className="jobad-details__lable">
                        <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
                            badge
                        </i>
                        {text.details.position}:
                    </div>
                    <div className="jobad-details__value">
                        {/* @ts-ignore */}
                        {tr(jobad.job.position_title_en, jobad.job.position_title_no)}
                    </div>
                </>
                            }
                            <div className="jobad-details__lable">
                                <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
                                    work_history
                                </i>
                                {text.details.type}:
                            </div>
                            <div className="jobad-details__value">
                                {/* @ts-ignore */}
                                {getJobTypeLabel(jobad.job.job_type, lang)}
                            </div>
                            {/* @ts-ignore */}
                            {jobad.job.cities && jobad.job.cities.length > 0 &&
                <>
                    <div className="jobad-details__lable">
                        <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
                            location_on
                        </i>
                        {/* @ts-ignore */}
                        {jobad.job.cities.length > 1
                            ? text.details.locations
                            : text.details.location}
                        :
                    </div>
                    <div className="jobad-details__value">
                        {/* @ts-ignore */}
                        {jobad.job.cities.join(", ")}
                    </div>
                </>
                            }
                            {/* @ts-ignore */}
                            {jobad.job.skills && jobad.job.skills.length > 0 &&
                <>
                    <div className="jobad-details__lable">
                        <i className="jobad-details__icon jobad-details__icon--lable-color material-symbols-sharp">
                            build
                        </i>
                        {text.details.skills}:
                    </div>
                    <div className="jobad-details__value">
                        {/* @ts-ignore */}
                        {jobad.job.skills.join(", ")}
                    </div>
                </>
                            }
                        </div>
                        {/* @ts-ignore */}
                        {jobad.job.application_url && (
                        // @ts-ignore
                            <Button
                                trailingIcon={<i className="material-symbols-sharp">arrow_outward</i>}
                                // @ts-ignore
                                href={jobad.job.application_url}
                                className="jobad-details__apply-btn"
                            >
                                {text.details.applyButton}
                            </Button>
                        )}
                    </div>
                    {showBannerImg && (
                        <picture className="jobad-banner">
                            <RenderSmoothImage
                                // @ts-ignore
                                src={config.url.CDN_URL + "/img/ads/" + jobad.job.banner_image}
                                // @ts-ignore
                                alt={jobad.job.banner_image}
                                onError={hideBannerImg}
                                className={"jobad-banner__image"}
                            />
                        </picture>
                    )}
                    <div className="jobad-description">
                        <Article
                            title={lang ? jobad.job.title_en : jobad.job.title_no}
                            publishTime={new Date(jobad.job.time_publish)}
                            updateTime={new Date(jobad.job.updated_at)}
                            informational={false}
                            introduction={lang ? jobad.job.description_short_en : jobad.job.description_short_no}
                            description={lang ? jobad.job.description_long_en : jobad.job.description_long_no}
                        />
                    </div>
                </div>
            )}
        </>
    )
};
