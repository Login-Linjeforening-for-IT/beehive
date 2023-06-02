import {withTranslation} from "react-i18next";
import InputFields from "./InputFields";
import { useState } from "react";
import './Form.css'

const Form = ({ t, user, event}) => {
    const [joinState, setJoinState] = useState(null)
    const [data, setData] = useState({})

    const Join = () => {
        const handleClick = () => {
            if (user.autoSubmit == true) {
                // handle database send call here
                setJoinState("sent")
            } else {
                setJoinState("manual")
            }
        }
        
        if (joinState != null) return null

        if (event.joined.length < event.capacity) {
            return <div className='form-button' onClick={handleClick}>{t('form.button')}</div>
        } else {
            return <h2>{t('form.full')}</h2>
        }
    }

    const Send = () => {
        const handleSend = () => {
            // handle database send call here
            setJoinState("sent")
            setData({})
        }

        if (joinState == "manual") {
            return <div className='form-send-button' onClick={handleSend}>{t('form.send')}</div>
        } else return null
    }

    const Confirmation = () => {
        const handleCancel = () => {
            // handle database cancel call here
            setJoinState(null)
        }

        if (joinState == "sent") {
            return (
                <div className="form-confirmation">
                    <h2>{t('form.sent')}</h2>
                    <div className='form-cancel-button' onClick={handleCancel}>{t('form.cancel')}</div>
                </div>
            )
        } else return null
    }

    return (
        <div className="form-parent">
            <Join/>
            <InputFields data={data} setData={setData} joinState={joinState}/>
            <Send/>
            <Confirmation/>
        </div>
    )
}

Form.defaultProps = {
    user: {
        autoSubmit: false
    },
    event: {
        eventID: 0,
        capacity: 5,
        joined: [1,2,3,4]
    }
};

export default withTranslation('aboutPage')(Form)