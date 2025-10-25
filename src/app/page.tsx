import HeroSection from '@components/herosection/HeroSection'
import EventsPreview from '@components/event/preview'
import JobadsPreview from '@components/jobad/preview'
import SmallInfo from '@components/smallInfo'
import MusicPreview from '@components/music/preview/preview'

export default function Home() {
    return (
        <>
            <HeroSection />
            <EventsPreview />
            <JobadsPreview />
            <MusicPreview />
            <SmallInfo />
        </>
    )
}
