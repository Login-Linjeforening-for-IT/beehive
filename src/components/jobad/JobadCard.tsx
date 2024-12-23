'use client'

import { useState, useEffect, useContext } from "react"
import config from "@config"
import Tags from "@components/tags/Tags"
import RenderSmoothImage from "@components/shared/images/rendersmoothimage/RenderSmoothImage"
import "./JobadCard.css"
import Link from "next/link"
import { formatDeadlineDate } from "@utils/DatetimeFormatter"
import Image from "next/image"
import AppContext from "@context/context"

export default function JobadCard({ jobad, disableTags=false }: any) {
    const { lang } = useContext(AppContext)
    const [useFallbackImg, setUseFallbackImg] = useState(false)

    useEffect(() => {
        setUseFallbackImg(false)
    }, [jobad.organization_logo])

    return (
        <Link href={`/career/${jobad.id}`}>
            <div className='jobad-card'>
                <picture className='jobad-card_picture'>
                    {(jobad.organization_logo && !useFallbackImg) ? (
                        <RenderSmoothImage
                            className="jobad-card_img"
                            alt={jobad.organization_logo}
                            src={config.url.CDN_URL + "/img/organizations/" + jobad.organization_logo}
                            onError={() => setUseFallbackImg(true)}
                            transition={false}
                        />
                    ) : (
                        <Image className='jobad-card_img'
                            alt={jobad.organization_logo}
                            src="@assets/img/placeholders/jobad.svg"
                        />
                    )}
                </picture>
                <div className='jobad-card_name'>{lang ? jobad.title_en : jobad.title_no}</div>
                <ul className='jobad-card_details'>
                    <li className='jobad-card_detail'>
                        <i className='jobad-card_icon material-symbols-sharp'>hourglass_bottom</i>
                        {formatDeadlineDate(new Date(jobad.application_deadline), lang ? "en" : "no")}
                    </li>
                </ul>
                {!disableTags &&
          <div className="jobad-card_tags">
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
