import HeroSection from '@components/shared/herosection/HeroSection'
import EventsPreview from '@components/event/preview'
// import JobadsPreview from '@components/jobad/preview'
import SmallInfo from '@components/shared/smallInfo'

export default function Home() {
    return (
        <>
            <HeroSection />
            <EventsPreview />
            {/* <JobadsPreview /> */}
            <SmallInfo />
        </>
    )
}
