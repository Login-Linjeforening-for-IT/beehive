import MazeMapEmbed from "../mazemap/MazeMapEmbed"
import "./Contact.css"

export default function Contact() {
    return(
        <div className='contact-card'>
            <h2 className='heading-2 heading-2--icon'>
                <i className='heading-2__icon material-symbols-sharp'>travel_explore</i>
                <span>{text.contact.title}</span>
            </h2>
            <div className='contact-card__info'>
                <div className='contact-card__text'>
                    <h4 className='heading-4'>{text.contact.address}:</h4>
                    <p className='p--regular'>
                        Login - Linjeforeningen for IT
                        <br/>
                        Teknologivegen 22
                        <br/>
                        Bygg A, rom 155
                        <br/>
                        2815 GJØVIK
                    </p>
                    <h4 className='heading-4'>{text.contact.email}:</h4>
                    <p className='p--regular'>
                        <a
                            className='link link--primary link--underscore-hover'
                            href='mailto:kontakt@login.no'
                        >
                            kontakt@login.no
                        </a>
                    </p>
                </div>
                <div className='contact-card__map'>
                    <MazeMapEmbed 
                        poi={229153}
                    />
                </div>
            </div>
        </div>
    )
}
