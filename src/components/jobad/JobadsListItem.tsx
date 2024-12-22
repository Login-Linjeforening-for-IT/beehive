import { useState, useEffect } from "react"
import "./JobadsListItem.css"
import fallbackImg from "@assets/img/placeholders/jobad-logo__placeholder.svg"
import * as DatetimeFormatter from "@utils/DatetimeFormatter"
import * as Translator from "@utils/GetTranslation"
import { config } from "@constants"
import Tags from "../tags/Tags"
import RenderSmoothImage from "../images/rendersmoothimage/RenderSmoothImage"
import Link from "next/link"
import getCookie from "@utils/getCookie"

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


function formatCities(cities: any[]) {

    const characterLimit = 30
    let counter = 0
    const arr = []

    for (let i = 0; i < cities.length; i++) {
        counter += cities[i].length + 2

        if (counter >= characterLimit) {
            return (
                <>
                    {arr.join(", ")}, <span className='jobads-item__detail-overflow-number'>+{cities.length - i}</span>
                </>
            )
        }
        arr.push(cities[i])
    }

    return (arr.join(", "))
}

export default function JobadsListItem({ jobad }: any) {
    // @ts-ignore
    const tr = Translator.getTranslation(useEng)

    const [useFallbackImg, setUseFallbackImg] = useState(false)

    useEffect(() => {
        setUseFallbackImg(false)
    }, [jobad.organization_logo])
  
    function useTags(publishTime: any, highlight: any) {
        if (highlight) return true
        if (DatetimeFormatter.isNew(publishTime)) return true
        return false
    }

    return (
        <Link href={`/career/${jobad.id}`}>
            <div className={jobad.highlight ? "jobads-item jobads-item--highlight" : "jobads-item" }>
                <div className={useTags(jobad.time_publish, jobad.highlight) ? "jobads-item__wrapper jobads-item__wrapper--with-tags" : "jobads-item__wrapper" }>
                    {useTags(jobad.time_publish, jobad.highlight) && 
            <div className="jobads-item__tags">
                <Tags
                    highlight={jobad.highlight}
                    timePublish={new Date(jobad.time_publish)}
                />
            </div>
                    }
                    <picture className='jobads-item__picture'>
                        {(jobad.organization_logo && !useFallbackImg) ? (
                            <RenderSmoothImage
                                className="jobads-item__img"
                                alt={jobad.organization_logo}
                                src={config.url.CDN_URL + "/img/organizations/" + jobad.organization_logo}
                                onError={() => setUseFallbackImg(true)}
                                transition={false}
                            />
                        ) : (
                            <img className='jobads-item__img'
                                alt={jobad.organization_logo}
                                src={fallbackImg}
                            />
                        )}
                    </picture>
                    <div className='jobads-item__info'>
                        <div className='jobads-item__name'>{tr(jobad.title_en, jobad.title_no)}</div>
                        <ul className='jobads-item__details'>
                            <li className='jobads-item__detail'>
                                <i className='jobads-item__icon material-symbols-sharp'>hourglass_bottom</i>
                                {DatetimeFormatter.formatDeadlineDate(new Date(jobad.application_deadline), useEng ? "en" : "no")}
                            </li>
                            <li className='jobads-item__detail'>
                                <i className='jobads-item__icon material-symbols-sharp'>apartment</i>
                                {tr(jobad.organization_name_en, jobad.organization_name_no)}
                            </li>
                            {jobad.job_type && 
                <li className='jobads-item__detail'>
                    <i className='jobads-item__icon material-symbols-sharp'>work_history</i>
                    {getJobTypeLabel(jobad.job_type, useEng ? "en" : "no")}
                </li>
                            }
                            {jobad.cities && jobad.cities.length > 0 &&
                <li className='jobads-item__detail'>
                    <i className='jobads-item__icon material-symbols-sharp'>location_on</i>
                    {formatCities(jobad.cities)}
                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </Link>
    )
}
