import config from '@config'
import Article from '@components/shared/article/Article'
import Button from '@components/shared/button/Button'
import { getJob } from '@utils/api'
import no from '@text/jobadPage/no.json'
import en from '@text/jobadPage/en.json'
import './page.css'
import { formatDeadlineDate } from '@utils/DatetimeFormatter'
import ArrowOutward from '@components/svg/symbols/ArrowOutward'
import Pin from '@components/svg/symbols/Pin'
import HourglassBottom from '@components/svg/symbols/HourglassBottom'
import WorkHistory from '@components/svg/symbols/WorkHistory'
import Acute from '@components/svg/symbols/Acute'
import Badge from '@components/svg/symbols/Badge'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Alert from '@components/shared/alert/Alert'

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

export default async function JobadPage({ params }: PromisedPageProps) {
    const id = (await params).id
    const jobads = (await getJob(id))
    const jobad = Array.isArray(jobads) ? jobads[0] : null
    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en
    const temp_empty = lang === 'no'
        ? 'Oi! Her var det tomt... Kanskje din bedrift kunne vært interessert i å annonsere her?'
        : 'Oh! Looks empty... Maybe your company would be interested in advertising here?'
    const temp_deactivated = lang === 'no' 
        ? 'Filtre er midlertidig deaktivert. De kommer tilbake snart!' 
        : 'Filters are temporarily disabled. They will be back soon.'

    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
            </div>
            {jobad && (
                <div className={'jobad-page jobad-page--noBanner'}>
                    <div className='jobad-details'>
                        <div className='jobad-details_company'>
                            <picture className='jobad-details_company-logo'>
                                <Image
                                    src={!jobad?.organization?.logo ? '@assets/img/placeholders/jobad.svg' : `${config.url.CDN_URL}/img/organizations/${jobad.organization.logo}`}
                                    alt={jobad.organization.logo}
                                    width={800}
                                    height={200}
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
                                        <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
                                    </a>
                                ) : (
                                // @ts-ignore
                                    tr(jobad.organization.name_en, jobad.organization.name_no)
                                )}
                            </div>
                        </div>
                        <div className='jobad-details_list'>
                            <div className='jobad-details_lable'>
                                <HourglassBottom className='jobad-details_icon jobad-details_icon--lable-color'/>
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
                                    <Acute className='jobad-details_icon jobad-details_icon--warning'/>
                                )}
                            </div>
                            {/* @ts-ignore */}
                            {jobad.job.position_title_no && 
                <>
                    <div className='jobad-details_lable'>
                        <Badge className='jobad-details_icon jobad-details_icon--lable-color'/>
                        {text.details.position}:
                    </div>
                    <div className='jobad-details_value'>
                        {/* @ts-ignore */}
                        {tr(jobad.job.position_title_en, jobad.job.position_title_no)}
                    </div>
                </>
                            }
                            <div className='jobad-details_lable'>
                                <WorkHistory className='jobad-details_icon jobad-details_icon--lable-color'/>
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
                        <Pin className='w-[1.5rem] h-[1.5rem] fill-white jobad-details_icon jobad-details_icon--lable-color' />
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
                                trailingIcon={<ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>}
                                // @ts-ignore
                                href={jobad.job.application_url}
                                className='jobad-details_apply-btn'
                            >
                                {text.details.applyButton}
                            </Button>
                        )}
                    </div>
                    <picture className='jobad-banner'>
                        <Image
                            src={`${config.url.CDN_URL}/img/ads/${jobad.job.banner_image}`}
                            alt={jobad.job.banner_image}
                            fill={true}
                        />
                    </picture>
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
            <Alert
                variant='danger'
                className='page-section--normal page-section--alert'
            >
                {Array.isArray(jobads) ? temp_deactivated : temp_empty}
            </Alert>
        </div>
    )
}
