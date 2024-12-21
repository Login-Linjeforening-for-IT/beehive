//
// This page is a work in progress ( not is use )
//

{/* @ts-ignore */}
import {withTranslation} from "react-i18next"

import "./page.css"

function Profile({t}: any) {
    return (
        <div className='profile-page page-container'>
            <h1 className='heading-1 heading-1--top-left-corner'>{t("title")}</h1>
            <section className='profile-section profile-intro'>
                <p className='profile-intro__p profile-section__p p--highlighted' dangerouslySetInnerHTML={{__html: t("intro")}}/>
            </section>
            <section className='profile-section profile-mid'>
                <h2 className='profile-section__heading heading-2'>{t("title")}</h2>
                <p className='profile-section__p p--regular'>{t("intro")}</p>
            </section>
        </div>
    )
}

export default withTranslation("profilePage")(Profile)
