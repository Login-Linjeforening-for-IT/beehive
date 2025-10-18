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
import Wrench from '@components/svg/symbols/Wrench'
import DefaultJobBanner from '@components/svg/defaultbanners/DefaultJobBanner'

function deadlineWarning(deadline: Date) {
    const now = new Date()
    const diff = deadline.getTime() - now.getTime()
    const oneDay = 1000 * 60 * 60 * 24

    return diff < oneDay && diff > 0
}

export default async function JobadPage({ params }: PromisedPageProps) {
    const id = (await params).id
    const jobads = (await getJob(id))
    const jobad = typeof jobads === 'object' ? jobads : null
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const text = lang === 'no' ? no : en
    const temp_empty = lang === 'no'
        ? 'Oi! Her var det tomt... '
        : 'Oh! Looks empty... '
    return (
        <>
            {jobad && (
                <div className={`jobad-page jobad-page--${jobad.banner_image ? 'banner' : 'noBanner'}`}>
                    <div className='jobad-details'>
                        <div className='flex flex-row flex-wrap gap-[1rem] mb-[2rem] 800px:flex-col'>
                            <div className='aspect-[3/2]  jobad-details_image'>
                                {jobad?.organization?.logo ? (
                                    <Image
                                        src={`${config.url.CDN_URL}/img/organizations/${jobad.organization.logo}`}
                                        alt={jobad.organization.logo ?? 'Organization logo'}
                                        objectFit='cover'
                                        width={300}
                                        height={200}
                                    />
                                ) : (
                                    <DefaultJobBanner color='#545b5f' className='h-full w-full' transition={true} />
                                )}
                            </div>
                            <div className='jobad-details_company-name'>
                                {/* @ts-ignore */}
                                {jobad.organization.link_homepage ? (
                                    <a
                                        className='flex flex-row items-center link--underscore-hover'
                                        // @ts-ignore
                                        href={jobad.organization.link_homepage}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        {/* @ts-ignore */}
                                        {lang && jobad.organization.name_en ? jobad.organization.name_en : jobad.organization.name_no + ' '}
                                        <ArrowOutward className='w-[1.6rem] h-[1.6rem] fill-[var(--color-text-main)]'/>
                                    </a>
                                ) : (
                                    <>
                                        {lang ? jobad.organization.name_en : jobad.organization.name_no}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='grid grid-cols-[min-content_auto] gap-[1rem] mb-[3rem]'>
                            <div className='text-[var(--color-text-discreet)] inline-flex items-start'>
                                <HourglassBottom className='fill-[var(--color-text-discreet)] jobad-details_icon jobad-details_icon--lable-color'/>
                                {text.details.deadline}:
                            </div>
                            <div className='jobad-details_value'>
                                {formatDeadlineDate(
                                    // @ts-ignore
                                    new Date(jobad.time_expire),
                                    lang
                                )}
                                {/* @ts-ignore */}
                                {deadlineWarning(new Date(jobad.time_expire)) && (
                                    <Acute className='fill-[var(--color-text-discreet)] jobad-details_icon jobad-details_icon--warning'/>
                                )}
                            </div>
                            {/* @ts-ignore */}
                            {jobad.position_title_no &&
                                <>
                                    <div className='text-[var(--color-text-discreet)] inline-flex items-start'>
                                        <Badge className='fill-[var(--color-text-discreet)] jobad-details_icon jobad-details_icon--lable-color'/>
                                        {text.details.position}:
                                    </div>
                                    <div className='jobad-details_value'>
                                        {/* @ts-ignore */}
                                        {lang == 'en' && jobad.position_title_en ? jobad.position_title_en : jobad.position_title_no}
                                    </div>
                                </>
                            }
                            <div className='text-[var(--color-text-discreet)] inline-flex items-start'>
                                <WorkHistory className='fill-[var(--color-text-discreet)] jobad-details_icon jobad-details_icon--lable-color'/>
                                {text.details.type}:
                            </div>
                            <div className='jobad-details_value'>
                                {/* @ts-ignore */}
                                {lang == 'en' ? jobad.job_type.name_en : jobad.job_type.name_no}
                            </div>
                            {/* @ts-ignore */}
                            {jobad.cities && jobad.cities.length > 0 &&
                                <>
                                    <div className='flex-row items-center text-[var(--color-text-discreet)] inline-flex items-start'>
                                        <Pin className='w-[1.5rem] h-[1.5rem] fill-[var(--color-text-discreet)] jobad-details_icon jobad-details_icon--lable-color' />
                                        {/* @ts-ignore */}
                                        {jobad.cities.length > 1
                                            ? text.details.locations
                                            : text.details.location}
                                        :
                                    </div>
                                    <div className='jobad-details_value'>
                                        {/* @ts-ignore */}
                                        {jobad.cities.join(', ')}
                                    </div>
                                </>
                            }
                            {/* @ts-ignore */}
                            {jobad.skills && jobad.skills.length > 0 &&
                                <>
                                    <div className='text-[var(--color-text-discreet)] inline-flex items-start'>
                                        <Wrench className='fill-[var(--color-text-discreet)] jobad-details_icon jobad-details_icon--lable-color' />
                                        {text.details.skills}:
                                    </div>
                                    <div className='jobad-details_value'>
                                        {/* @ts-ignore */}
                                        {jobad.skills.join(', ')}
                                    </div>
                                </>
                            }
                        </div>
                        {/* @ts-ignore */}
                        {jobad.application_url && (
                            // @ts-ignore
                            <Button
                                trailingIcon={<ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>}
                                // @ts-ignore
                                href={jobad.application_url}
                                className='jobad-details_apply-btn w-full 400px:w-fit'
                            >
                                {text.details.applyButton}
                            </Button>
                        )}
                    </div>
                    {jobad.banner_image &&
                            <div className='relative w-full aspect-[10/4] jobad-banner'>
                                <Image
                                    src={`${config.url.CDN_URL}/img/ads/${jobad.banner_image}`}
                                    alt={jobad.banner_image}
                                    fill={true}
                                />
                            </div>
                    }
                    <div className='jobad-description'>
                        <Article
                            title={lang == 'en' && jobad.title_en ? jobad.title_en : jobad.title_no}
                            publishTime={new Date(jobad.time_publish)}
                            updateTime={new Date(jobad.updated_at)}
                            informational={false}
                            introduction={lang == 'en' && jobad.description_short_en ? jobad.description_short_en : jobad.description_short_no}
                            description={lang == 'en' && jobad.description_long_en ? jobad.description_long_en : jobad.description_long_no}
                        />
                    </div>
                </div>
            )}
            {!jobad && (
                <Alert
                    variant='danger'
                    className='page-section--normal page-section--alert'
                >
                    {temp_empty}
                </Alert>
            )}
        </>
    )
}
