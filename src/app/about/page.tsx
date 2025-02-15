import CommitteeTabs from './CommitteeTabs'
import StudyProgramsAcordion from './StudyProgramsAccordion'
import DecoratedPicture from '@components/shared/images/decoratedpicture/DecoratedPicture'
import Contact from '@components/shared/contact/Contact'
import no from '@text/about/no.json'
import en from '@text/about/en.json'
import { cookies } from 'next/headers'
import config from '@config'

export default async function About() {
    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en

    return (
        <div className='page-container'>
            <h1 className='page-section--normal heading-1 heading-1--top-left-corner'>
                {text.title}
            </h1>
            <section className='page-section--normal 800px:mb-[5rem] about-intro'>
                <p
                    className='mt-0 max-w-[50rem] p--highlighted'
                    dangerouslySetInnerHTML={{ __html: text.intro }}
                />
                <div className='flex flex-wrap items-start justify-center gap-[5%] 800px:flex-nowrap 800px:p-[1rem_0] about-intro_grid-container'>
                    <StudyProgramsAcordion />
                    <DecoratedPicture
                        imgUrl={`${config.url.CDN_URL}/img/styret2.jpg`}
                        variant={3}
                        cornerSize={90}
                        width={300}
                        height={200}
                        cover={true}
                        className='max-w-[33rem] w-full m-[3rem_0_1rem_0] 800px:m-0'
                    />
                </div>
            </section>
            <section className='page-section--normal 800px:mb-[5rem]'>
                <h2 className='heading-2'>{text.about.title}</h2>
                <div className='p--columns'>
                    <p
                        className='p--highlighted'
                        dangerouslySetInnerHTML={{ __html: text.about.intro }}
                    />
                    <p
                        className='p--regular'
                        dangerouslySetInnerHTML={{ __html: text.about.body.p1 }}
                    />
                    <p
                        className='p--regular'
                        dangerouslySetInnerHTML={{ __html: text.about.body.p2 }}
                    />
                </div>
            </section>
            <section className='page-section--normal about-committees'>
                <h2 className='heading-2'>{text.committeeSection.title}</h2>
                <p className='p--regular'>{text.committeeSection.intro}</p>
            </section>
            <CommitteeTabs />
            <section className='page-section--normal 800px:mb-[5rem] about-public-docs'>
                <h2 className='heading-2'>{text.publicDocs.title}</h2>
                <p
                    className='p--regular'
                    dangerouslySetInnerHTML={{ __html: text.publicDocs.body }}
                />
                <ul className='list'>
                    <li>{text.publicDocs.bulletPoints.agendas}</li>
                    <li>{text.publicDocs.bulletPoints.minutes}</li>
                    <li>{text.publicDocs.bulletPoints.budgets}</li>
                    <li>{text.publicDocs.bulletPoints.honoraryMember}</li>
                    <li>{text.publicDocs.bulletPoints.bylaws}</li>
                </ul>
            </section>
            <div className='page-section--normal'>
                <Contact />
            </div>
        </div>
    )
}
