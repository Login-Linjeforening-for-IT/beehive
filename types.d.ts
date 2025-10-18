declare global {
    type time_type = 'default' | 'no_end' | 'whole_day' | 'tbd'
    type location_type = 'mazemap' | 'coords' | 'address' | 'digital'
    type embed_type = 'on' | 'off'

    // Events
    type Event = {
        visible: boolean
        name_no: string
        name_en: string
        description_no: string
        description_en: string
        informational_no: string
        informational_en: string
        time_type: time_type
        time_start: string
        time_end: string
        time_publish: string
        time_signup_release: string | null
        time_signup_deadline: string | null
        canceled: boolean
        digital: boolean
        highlight: boolean
        image_small: string | null
        image_banner: string | null
        link_facebook: string | null
        link_discord: string | null
        link_signup: string | null
        link_stream: string | null
        capacity: number | null
        is_full: boolean
    }

    type GetEventProps = Event & {
        id: number
        category: GetCategoryProps
        location: GetLocationProps | null
        parent_id: number | null
        rule: GetRuleProps | null
        audience: GetAudienceProps | null
        organization: GetOrganizationProps | null
        updated_at: string
        created_at: string
    }

    type GetEventsProps = {
        events: GetEventProps[]
        total_count: number
    }

    type PostEventProps = Event & {
        category_id: number
        location_id: number | null
        parent_id: number | null
        rule_id: number | null
        audience_id: number | null
        organization_id: number | null
    }

    type PutEventProps = PostEventProps

    // Jobs
    type Job = {
        visible: boolean
        highlight: boolean
        title_no: string
        title_en: string
        cities: string[] | null
        skills: string[] | null
        position_title_no: string
        position_title_en: string
        description_short_no: string
        description_short_en: string
        description_long_no: string
        description_long_en: string
        job_type: GetJobTypeProps
        time_publish: string
        time_expire: string
        banner_image: string | null
        application_url: string | null
    }

    type GetJobProps = Job & {
        id: number
        organization: GetOrganizationProps
        created_at: string
        updated_at: string
    }

    type GetJobsProps = {
        jobs: GetJobProps[]
        total_count: number
    }

    type PostJobProps = Job & {
        organization_id: number
    }

    type PutJobProps = PostJobProps

    // Organizations
    type Organization = {
        name_no: string
        name_en: string
        description_no: string
        description_en: string
        link_homepage: string | null
        link_linkedin: string | null
        link_facebook: string | null
        link_instagram: string | null
        logo: string | null
    }

    type GetOrganizationProps = Organization & {
        id: number
        created_at: string
        updated_at: string
    }

    type GetOrganizationsProps = {
        organizations: GetOrganizationProps[]
        total_count: number
    }

    type PostOrganizationProps = Organization
    type PutOrganizationProps = Organization

    // Locations
    type Location = {
        name_no: string
        name_en: string
        type: string
        mazemap_campus_id: number | null
        mazemap_poi_id: number | null
        address_street: string | null
        address_postcode: number | null
        city_name: string | null
        coordinate_lat: number | null
        coordinate_lon: number | null
        url: string | null
    }

    type GetLocationProps = Location & {
        id: number
        created_at: string
        updated_at: string
    }

    type GetLocationsProps = {
        locations: GetLocationProps[]
        total_count: number
    }

    type PostLocationProps = Location
    type PutLocationProps = Location

    // Rules
    type Rule = {
        name_no: string
        name_en: string
        description_no: string
        description_en: string
    }

    type GetRuleProps = Rule & {
        id: number
        created_at: string
        updated_at: string
    }

    type GetRulesProps = {
        rules: GetRuleProps[]
        total_count: number
    }

    type PostRuleProps = Rule
    type PutRuleProps = Rule

    // Audience
    type GetAudienceProps = {
        id: number
        name_no: string
        name_en: string
        created_at: string
        updated_at: string
    }

    type GetAudiencesProps = {
        audiences: GetAudienceProps[]
        total_count: number
    }

    type PostAudienceProps = {
        name_no: string
        name_en: string
    }

    type PutAudienceProps = PostAudienceProps

    // Categories
    type GetCategoryProps = {
        id: number
        name_no: string
        name_en: string
        color: string
        created_at: string
        updated_at: string
    }

    // Job Type
    type GetJobTypeProps = {
        id: number
        name_no: string
        name_en: string
        updated_at: string
        created_at: string
    }

    // Categories
    type GetCategoriesProps = {
        categories: GetCategoryProps[]
        total_count: number
    }

    // Announcements
    type GetAnnouncementProps = {
        id: number
        title: string
        description: string
        channel: string
        roles: string[]
        embed: boolean
        color: string
        interval: string
        time: string | null
    }

    type PostAnnouncementProps = {
        title: string
        description: string
        channel: string
        roles: string[]
        embed: boolean
        color: string
        interval: string
        time: string | null
        active: true
    }

    type PostAnnouncementPropsUnparsed = {
        title: string
        description: string
        channel: string
        roles: string
        embed: boolean
        color: string
        interval: string
        time: string | null
        active: true
    }

    type PutAnnouncementProps = PostAnnouncementProps & {
        id: number
    }

    type PutAnnouncementPropsUnparsed = PostAnnouncementPropsUnparsed & {
        id: number
    }

    // Enum types
    type GetTypesProps = {
        en: string
        no: string
    }[]

    // Images
    type GetImageProps = {
        filepath: string
        name: string
        size: number
    }[]

    type PostImageProps = {
        file: File
    }

    // Other types

    type Coupon = {
        id: string
        user: string
        image: string | StaticImport
    }

    type AdProps = {
        id: number
        highlight: boolean
        title_no: string
        title_en: string
        position_title_no: string
        position_title_en: string
        job_type: string
        time_publish: string
        application_deadline: string
        organization_shortname: string
        organization_name_no: string
        organization_name_en: string
        organization_logo: string
        skills: string[] | undefined
        cities: string[] | undefined
    }

    type EventProps = {
        id: number
        name_no: string
        name_en: string
        highlight: boolean
        canceled: boolean
        full: boolean
        time_type: string
        time_start: string
        time_end: string
        time_publish: string
        image_small: string
        location_name_no: string
        location_name_en: string
        category_color: string
        category_name_no: string
        category_name_en: string
    }

    type DetailedEventData = {
        id: number
        visible: boolean
        name_no: string
        name_en: string
        description_no: string
        description_en: string
        informational_no: string
        informational_en: string
        time_type: 'default' | 'no_end' | 'whole_day' | 'tbd'
        time_start: string
        time_end: string
        time_publish: string
        time_signup_release: string
        time_signup_deadline: string
        canceled: boolean
        digital: boolean
        highlight: boolean
        image_small: string
        image_banner: string
        link_facebook: string
        link_discord: string
        link_signup: string
        link_stream: string
        capacity: number | null
        full: boolean
        category: number
        location: number | null
        parent: number | null
        rule: number | null
        updated_at: string
        created_at: string
        deleted_at: string
    }

    type Category = {
        id: number
        color: string
        name_no: string
        name_en: string
        description_no: string
        description_en: string
        updated_at: string
        created_at: string
    }

    type EventLocation = {
        id: number
        name_no: string
        name_en: string
        type: 'mazmap' | 'coords' | 'address' | 'none'
        mazemap_campus_id: number | null
        mazemap_poi_id: number | null
        address_street: string
        address_postcode: number | null
        city_name: string
        coordinate_lat: number | null
        coordinate_lang: number | null
        url: string
        updated_at: string
        created_at: string
        deleted_at: string
    }

    type Rule = {
        id: number
        name_no: string
        name_en: string
        description_no: string
        description_en: string
        updated_at: string
        created_at: string
        deleted_at: string
    }

    type Organization = {
        shortname: string
        name_no: string
        name_en: string
        description_no: string
        description_en: string
        type: string
        link_homepage: string
        link_linkedin: string
        link_facebook: string
        link_instagram: string
        logo: string
        created_at: string
        updated_at: string
        deleted_at: string
    }

    type Audience = {
        id: number
        name_no: string
        name_en: string
        description_no: string
        description_en: string
        created_at: string
        updated_at: string
        deleted_at: string
    }

    type DetailedAd = {
        id: number
        visible: boolean
        highlight: boolean
        title_no: string
        title_en: string
        position_title_no: string
        position_title_en: string
        description_short_no: string
        description_short_en: string
        description_long_no: string
        description_long_en: string
        job_type: 'full' | 'part' | 'summer' | 'verv'
        time_publish: string
        time_expire: string
        application_deadline: string
        banner_image: string
        organization: number
        application_url: string
        updated_at: string
        created_at: string
        deleted_at: string
        skills: string[] | undefined
        cities: string[] | undefined
    }

    type DetailedEventResponse = {
        event: DetailedEventData
        category: Category
        location: EventLocation | undefined
        rule: Rule | undefined
        organizations: Organization[]
        audiences: Audience[]
    } | undefined

    type DetailedAdResponse = {
        job: DetailedAd
        organization: Organization
    } | undefined

    type ColorTransitionClassNameProps = {
        color: string
        transition: boolean
        className: string
    }

    type PromisedPageProps = {
        params: Promise<{ id: number }>
    }

    type Lang = 'en' | 'no'

    type Music = {
        stats: MusicStats
        currentlyListening: CurrentlyPlaying[]
        mostPlayedAlbums: Album[]
        mostPlayedArtists: ArtistPlayed[]
        mostPlayedSongs: CountedSong[]
        mostPlayedSongsPerDay: SongDay[]
        topFiveToday: TopXSong[]
        topFiveYesterday: TopXSong[]
        topFiveThisWeek: TopXSong[]
        topFiveLastWeek: TopXSong[]
        topFiveThisMonth: TopXSong[]
        topFiveLastMonth: TopXSong[]
        topFiveThisYear: TopXSong[]
        topFiveLastYear: TopXSong[]
        mostActiveUsers: MusicUser[]
        mostSkippingUsers: MusicSkipUser[]
        mostLikedAlbums: LikedAlbum[]
        mostLikedArtists: LikedArtist[]
        mostLikedSongs: LikedSong[]
        mostSkippedAlbums: SkippedAlbum[]
        mostSkippedArtists: SkippedArtist[]
        mostSkippedSongs: SkippedSong[]
    }

    type CurrentlyListening = {
        id: number
        song_id: string
        user_id: string
        start: string
        end: string
        source: string
        skipped: boolean
        timestamp: string
        image: string
        name: string
        artist: string
        album: string
    }

    type Activity = {
        id: string
        song: string
        artist: string
        album: string
        start: string
        end: string
        source: string
        user: string
        timestamp: string
    }

    type Artist = {
        id: number
        name: string
        listens: number
        timestamp: string
        artist_id: string
        song_id: string
    }

    type ArtistPlayed = {
        artist: string
        artist_id: string
        listens: number
        top_song: string
        album: string
        image: string
        song_id: string
    }

    type Album = {
        album: string
        album_id: string
        artist: string
        listens: number
        top_song: string
        top_song_image: string
        song_id: string
    }

    type CountedSong = {
        song: string
        artist: string
        album: string
        listens: number
        image: string
        song_id: string
    }

    type SongDay = {
        day: string
        songs_played: string
        albums: Album[]
    }

    type ActiveUser = {
        user: string
        total_minutes: number
        image: string
    }

    type TopXSong = {
        song: string
        artist: string
        album: string
        listens: string
        image: string
        song_id: string
        start?: string
        end?: string
    }

    type MusicUser = {
        name: string
        avatar: string
        user_id: string
        songs_played: number
    }

    type MusicSkipUser = {
        name: string
        avatar: string
        user_id: string
        songs_skipped: number
    }

    type MusicUserCategory = 'listens' | 'skips'

    type LikedAlbum = {
        album: string
        album_id: string
        artist: string
        total_listens: number
        total_skips: number
        like_ratio: number
        image: string
        song_id: string
    }

    type LikedArtist = {
        artist: string
        artist_id: string
        total_listens: number
        total_skips: number
        like_ratio: number
        image: string
        song_id: string
    }

    type LikedSong = {
        song: string
        artist: string
        album: string
        skips: number
        listens: number
        image: string
        like_ratio: number
        song_id: string
    }

    type SkippedAlbum = {
        album: string
        album_id: string
        artist: string
        skips: number
        top_song: string
        top_song_image: string
        song_id: string
    }

    type SkippedArtist = {
        artist: string
        artist_id: string
        skips: number
        top_song: string
        album: string
        image: string
        song_id: string
    }

    type SkippedSong = {
        song: string
        artist: string
        album: string
        skips: number
        image: string
        song_id: string
    }

    type MusicStats = {
        avg_seconds: number
        total_minutes: number
        total_minutes_this_year: number
        total_songs: number
    }

    type MusicText = {
        title: string
        intro: string
        average_duration: string
        total_minutes: string
        minutes_this_year: string
        total_songs: string
        most_played_albums: string
        most_played_artists: string
        most_played_songs: string
        currently_playing: string
        users: string[]
        mostx: MostX
        topx: TopX
    }

    type MostX = {
        most_liked_albums: string
        most_skipped_albums: string
        most_liked_artists: string
        most_skipped_artists: string
        most_liked_songs: string
        most_skipped_songs: string
    }

    type TopX = {
        intro: string
        today: string
        yesterday: string
        thisWeek: string
        lastWeek: string
        thisMonth: string
        lastMonth: string
        thisYear: string
        lastYear: string
    }

    type MinimalSong = {
        start: string | undefined
        end: string | undefined
        image: string | undefined
        song_id: string | undefined
        name: string | undefined
    }

    interface ExtendedNavigator extends Navigator {
        globalPrivacyControl: boolean
    }
}

export {}