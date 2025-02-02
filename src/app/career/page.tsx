'use client'

import { useState, useEffect, useContext } from 'react'
import config from '@config'
import Spinner from '@components/shared/spinner/spinner'
import Article from '@components/shared/article/Article'
import RenderSmoothImage from '@components/shared/images/rendersmoothimage/RenderSmoothImage'
import Button from '@components/shared/button/Button'
import Alert from '@components/shared/alert/Alert'
import { getJob } from '@utils/api'
import no from '@text/jobadPage/no.json'
import en from '@text/jobadPage/en.json'
import './page.css'
import { formatDeadlineDate } from '@utils/DatetimeFormatter'
import AppContext from '@context/context'
import ArrowOutward from '@components/svg/symbols/ArrowOutward'
import Pin from '@components/svg/symbols/Pin'

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

// eslint-disable-next-line
function getJobTypeLabel(job_type: any, lang = 'no') {
    // @ts-ignore
    const labelNo = jobTypeTranslations['no'][job_type] || job_type
    // @ts-ignore
    const labelEn = jobTypeTranslations['en'][job_type] || labelNo

    return lang === 'en' ? labelEn : labelNo
}

function deadlineWarning(deadline: Date) {
    const now = new Date()
    const diff = deadline.getTime() - now.getTime()
    const oneDay = 1000 * 60 * 60 * 24

    return diff < oneDay && diff > 0
}

export default function JobadPage({ params }: PromisedPageProps) {
    // @ts-expect-error - this is client side, async await doesnt work here
    const id = params.id
    const [useFallbackImg, setUseFallbackImg] = useState(false)
    const [showBannerImg, setShowBannerImg] = useState(false)
    function hideBannerImg() {
        setShowBannerImg(false)
    }
    // eslint-disable-next-line
    const [jobad, setJobad] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { lang } = useContext(AppContext)
    const text = lang === 'en' ? en : no

    useEffect(() => {
        async function fetchData() {
            try {
                const [response, err] = await getJob(id)
                if (err) throw new Error(err)

                setJobad(response)
                setShowBannerImg(!!response.job.banner_image)
            } catch (error) {
                console.error('Error fetching job ad data:', error)
                setError('Failed to load job ad data.')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    return (
        <>
            {loading && <Spinner width={50} height={50} />}
            {!loading && error && 
        <div className='page-container'>
            <Alert
                variant='danger'
                className='page-section--normal page-section--alert'
            >
                {error}
            </Alert>
        </div>
            }
            {!loading && !error && jobad && (
                <div
                    className={`jobad-page ${
                        showBannerImg ? 'jobad-page--banner' : 'jobad-page--noBanner'
                    }`}
                >
                    <div className='jobad-details'>
                        <div className='jobad-details_company'>
                            <picture className='jobad-details_company-logo'>
                                <RenderSmoothImage
                                    // @ts-ignore
                                    src={useFallbackImg ? '@assets/img/placeholders/jobad.svg' : `${config.url.CDN_URL}/img/organizations/${jobad.organization.logo}`}
                                    // @ts-ignore
                                    alt={jobad.organization.logo}
                                    className='jobad-details_image'
                                    onError={() => setUseFallbackImg(true)}
                                    transition={false}
                                />
                            </picture>
                            <div className='jobad-details_company-name'>
                                {/* @ts-ignore */}
                                {jobad.organization.link_homepage ? (
                                    <a
                                        className='jobad-details_company-name-link link--underscore-hover'
                                        // @ts-ignore
                                        href={jobad.organization.link_homepage}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        {/* @ts-ignore */}
                                        {tr(jobad.organization.name_en, jobad.organization.name_no) + ' '}
                                        <ArrowOutward size='1.5rem' fill='white' className=''/>
                                    </a>
                                ) : (
                                // @ts-ignore
                                    tr(jobad.organization.name_en, jobad.organization.name_no)
                                )}
                            </div>
                        </div>
                        <div className='jobad-details_list'>
                            <div className='jobad-details_lable'>
                                <i className='jobad-details_icon jobad-details_icon--lable-color material-symbols-sharp'>
                                    hourglass_bottom
                                </i>
                                {text.details.deadline}:
                            </div>
                            <div className='jobad-details_value'>
                                {formatDeadlineDate(
                                    // @ts-ignore
                                    new Date(jobad.job.application_deadline),
                                    lang
                                )}
                                {/* @ts-ignore */}
                                {deadlineWarning(new Date(jobad.job.application_deadline)) && (
                                    <i className='material-symbols-sharp jobad-details_icon jobad-details_icon--warning'>
                                        acute
                                    </i>
                                )}
                            </div>
                            {/* @ts-ignore */}
                            {jobad.job.position_title_no && 
                <>
                    <div className='jobad-details_lable'>
                        <i className='jobad-details_icon jobad-details_icon--lable-color material-symbols-sharp'>
                            badge
                        </i>
                        {text.details.position}:
                    </div>
                    <div className='jobad-details_value'>
                        {/* @ts-ignore */}
                        {tr(jobad.job.position_title_en, jobad.job.position_title_no)}
                    </div>
                </>
                            }
                            <div className='jobad-details_lable'>
                                <i className='jobad-details_icon jobad-details_icon--lable-color material-symbols-sharp'>
                                    work_history
                                </i>
                                {text.details.type}:
                            </div>
                            <div className='jobad-details_value'>
                                {/* @ts-ignore */}
                                {getJobTypeLabel(jobad.job.job_type, lang)}
                            </div>
                            {/* @ts-ignore */}
                            {jobad.job.cities && jobad.job.cities.length > 0 &&
                <>
                    <div className='flex flex-row items-center jobad-details_lable'>
                        <Pin size='1.5rem' fill='white' className='jobad-details_icon jobad-details_icon--lable-color' />
                        {/* @ts-ignore */}
                        {jobad.job.cities.length > 1
                            ? text.details.locations
                            : text.details.location}
                        :
                    </div>
                    <div className='jobad-details_value'>
                        {/* @ts-ignore */}
                        {jobad.job.cities.join(', ')}
                    </div>
                </>
                            }
                            {/* @ts-ignore */}
                            {jobad.job.skills && jobad.job.skills.length > 0 &&
                <>
                    <div className='jobad-details_lable'>
                        <i className='jobad-details_icon jobad-details_icon--lable-color material-symbols-sharp'>
                            build
                        </i>
                        {text.details.skills}:
                    </div>
                    <div className='jobad-details_value'>
                        {/* @ts-ignore */}
                        {jobad.job.skills.join(', ')}
                    </div>
                </>
                            }
                        </div>
                        {/* @ts-ignore */}
                        {jobad.job.application_url && (
                        // @ts-ignore
                            <Button
                                trailingIcon={<ArrowOutward size='1.5rem' fill='white' className=''/>}
                                // @ts-ignore
                                href={jobad.job.application_url}
                                className='jobad-details_apply-btn'
                            >
                                {text.details.applyButton}
                            </Button>
                        )}
                    </div>
                    {showBannerImg && (
                        <picture className='jobad-banner'>
                            <RenderSmoothImage
                                // @ts-ignore
                                src={config.url.CDN_URL + '/img/ads/' + jobad.job.banner_image}
                                // @ts-ignore
                                alt={jobad.job.banner_image}
                                onError={hideBannerImg}
                                className={'jobad-banner_image'}
                                transition={false}
                            />
                        </picture>
                    )}
                    <div className='jobad-description'>
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
}
