'use client'

import { useState, useEffect } from "react"
import config from "@config"
import Tags from "@components/tags/Tags"
import RenderSmoothImage from "@components/shared/images/rendersmoothimage/RenderSmoothImage"
import "./JobadCard.css"
import Link from "next/link"
import { formatDeadlineDate } from "@utils/DatetimeFormatter"
import Image from "next/image"
import getCookie from "@utils/getCookie"

export default function JobadCard({ jobad, disableTags=false }: any) {
    const lang = getCookie('lang') as 'no' | 'en' || 'no'
    const [useFallbackImg, setUseFallbackImg] = useState(false)

    useEffect(() => {
        setUseFallbackImg(false)
    }, [jobad.organization_logo])

    return (
        <Link href={`/career/${jobad.id}`}>
            <div className='jobad-card'>
                <picture className='jobad-card__picture'>
                    {(jobad.organization_logo && !useFallbackImg) ? (
                        <RenderSmoothImage
                            className="jobad-card__img"
                            alt={jobad.organization_logo}
                            src={config.url.CDN_URL + "/img/organizations/" + jobad.organization_logo}
                            onError={() => setUseFallbackImg(true)}
                            transition={false}
                        />
                    ) : (
                        <Image className='jobad-card__img'
                            alt={jobad.organization_logo}
                            src="@assets/img/placeholders/jobad.svg"
                        />
                    )}
                </picture>
                <div className='jobad-card__name'>{lang ? jobad.title_en : jobad.title_no}</div>
                <ul className='jobad-card__details'>
                    <li className='jobad-card__detail'>
                        <i className='jobad-card__icon material-symbols-sharp'>hourglass_bottom</i>
                        {formatDeadlineDate(new Date(jobad.application_deadline), lang ? "en" : "no")}
                    </li>
                </ul>
                {!disableTags &&
          <div className="jobad-card__tags">
              <Tags
                  highlight={jobad.highlight}
                  timePublish={new Date(jobad.time_publish)}
              />
          </div>
                }
            </div>
        </Link>
    )
}
