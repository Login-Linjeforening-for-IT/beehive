//
// This page is a work in progress ( not is use )
//

import {withTranslation} from "react-i18next";
import './InputFields.css'

function InputField({t, text, data, setData}) {
    function handleChange(e) {
        setData({...data, [text]: e.target.value})
    }

    return(
        <div className="inputfield-parent">
            <h2 className="input-text">{t(`form.${text}`)}</h2>
            <input className="inputfield" name={`${text}`} placeholder={t(`form.${text}`)} value={data[text] ? data[text] : ''} onChange={handleChange}/> 
        </div>
    )
}

function InputFields({t, data, setData, joinState}) {
    if (joinState == "manual") {
        return(
            <div>
                <InputField t={t} text="name" data={data} setData={setData} />
                <InputField t={t} text="degree" data={data} setData={setData} />
                <InputField t={t} text="study_year" data={data} setData={setData} />
                <InputField t={t} text="mail" data={data} setData={setData} />
                <InputField t={t} text="preferences" data={data} setData={setData} />
                <InputField t={t} text="allergies" data={data} setData={setData} />
            </div>
        )
    } else return null
}

export default withTranslation('aboutPage')(InputFields)