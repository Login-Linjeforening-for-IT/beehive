import Contact from '@components/shared/contact/Contact'
import no from '@text/policy/no.json'
import en from '@text/policy/en.json'
import { cookies } from 'next/headers'

export default async function Policy() {
    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en

    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <div className='max-w-[50rem] m-auto pb-[3rem] 800px:pb-[5rem]'>
                    <h1 className='heading-1 heading-1--top-left-corner'>{text.policy.title}</h1>
                    <section>
                        <h2 className='heading-2'>
                            <span>{text.policy.about}</span>
                        </h2>
                        <p className='p--regular'>{text.policy.aboutDescription}</p>
                    </section>
                    <section>
                        <h2 className='heading-2'>
                            <span>{text.policy.intro}</span>
                        </h2>
                        <p className='p--regular'>{text.policy.introDescription}</p>
                    </section>
                    <section>
                        <h2 className='heading-2'>
                            <span>{text.policy.collection}</span>
                        </h2>
                        <p className='p--regular'>{text.policy.collectionDescription}</p>
                    </section>
                    <section>
                        <h2 className='heading-2'>
                            <span>{text.policy.utalization}</span>
                        </h2>
                        <p className='p--regular'>{text.policy.utalizationDescription}</p>
                    </section>
                    <section>
                        <h2 className='heading-2'>
                            <span>{text.policy.security}</span>
                        </h2>
                        <p className='p--regular'>{text.policy.securityDescription}</p>
                    </section>
                    <section>
                        <h2 className='heading-2'>
                            <span>{text.policy.nondis}</span>
                        </h2>
                        <p className='p--regular'>{text.policy.nondisDescription}</p>
                        <p className='p--regular'>{text.policy.transparency}</p>
                    </section>
                    <section>
                        <h2 className='heading-2'>
                            <span>{text.policy.updates}</span>
                        </h2>
                        <p className='p--regular'>{text.policy.updatesDescription}</p>
                    </section>
                    <section>
                        <h2 className='heading-2'>
                            <span>{text.policy.contact}</span>
                        </h2>
                        <p className='p--regular'>{text.policy.contactDescription}</p>
                        <p className='p--regular'>{text.policy.download}</p>
                    </section>
                </div>
                <Contact/>
            </div>
        </div>
    )
}
