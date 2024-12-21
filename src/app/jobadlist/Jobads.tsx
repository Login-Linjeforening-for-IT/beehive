import { useState, useEffect, useRef } from "react"
// @ts-ignore
import { withTranslation } from "react-i18next"
// @ts-ignore
import Spinner from "../../components/spinner/Spinner"
import JobadsListItem from "../../components/jobad/JobadsListItem"
import Button from "../../components/button/Button.jsx"
import FilterGroup from "../../components/filter/filter"
import Alert from "../../components/alert/Alert.jsx"
// @ts-ignore
import { debounce } from "../../utils/debounce.js"
import prepFilter from "../../components/filter/prepFilter.js"
import { getJobs, getJobCityFilters, getJobSkillFilters, getJobJobtypeFilters } from "../../utils/api"

import "./Jobads.css"


const jobTypeTranslations = {
    no: {
        summer: "Sommerjobb",
        full: "Fulltid",
        verv: "Verv",
        part: "Deltid"
    },
    en: {
        summer: "Sommer job",
        full: "Fulltime",
        verv: "Voluntary",
        part: "Parttime"
    }
}

function getLabelKey(key: string) {
    return (v: any) => {
        return {
            "no": v[key],
            "en": v[key],
        }
    }
}

function getJobTypeLabel(v: any) {
    // @ts-ignore  
    const labelNo = jobTypeTranslations["no"][v["job_type"]] || v["job_type"]
    // @ts-ignore
    const labelEn = jobTypeTranslations["en"][v["job_type"]] || labelNo
    return {
        no: labelNo,
        en: labelEn,
    }
};

async function getJobTypeFilters() {
    try {
        const [jobTypeFilterData, err] = await getJobJobtypeFilters()
        if (err) throw new Error(err)

        const label = {
            en: "Type",
            no: "Type"
        }

        return prepFilter(jobTypeFilterData, "jobtypes", label, "job_type", getJobTypeLabel, "count", "check")
    } catch (error) {
        console.error("Error fetching job type filters:", error)
        return null
    }
}

async function getCityFilters() {
    try {
        const [jobCityFilterData, err] = await getJobCityFilters()
        if (err) throw new Error(err)

        const label = {
            en: "Cities",
            no: "Byer"
        }

        return prepFilter(jobCityFilterData, "cities", label, "city", getLabelKey("city"), "count", "tag")
    } catch (error) {
        console.error("Error fetching city filters:", error)
        return null
    }
}

async function getSkillFilters() {
    try {
        const [jobSkillFilterData, err] = await getJobSkillFilters()
        if (err) throw new Error(err)

        const label = {
            en: "Skills",
            no: "Ferdigheter"
        }

        return prepFilter(jobSkillFilterData, "skills", label, "skill", getLabelKey("skill"), "count", "tag")
    } catch (error) {
        console.error("Error fetching skill filters:", error)
        return null
    }
}

function Jobads({ t }: any) {

    const [ jobads, setJobads ] = useState<any[]>([])
    const [ filterData, setFilterData ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState<string | null>(null)
    const filters = useRef<any>({})
    const limit = 10
    const offset = useRef(0)
    const [ showLoadMore, setShowLoadMore ] = useState(false)

    const ap = debounce(async (v: any) => {
        filters.current = v

        try {
            const [ response, err ] = await getJobs(v.skills, v.cities, null, v.jobtypes, limit, 0)
            if (err) throw new Error(err)

            setShowLoadMore(response.length === limit)
            setJobads(response)
            offset.current = response.length
        } catch (error) {
            console.error("Error fetching filtered jobs:", error)
            setError("Failed to load jobs based on filters.")
        } finally {
            setLoading(false)
        }
    }, 50)

    async function loadItems() {
        try {
            const [ response, err ] = await getJobs(filters.current.skills, null, null, filters.current.jobtypes, limit, offset.current)
            if (err) throw new Error(err)

            setShowLoadMore(response.length === limit)
            offset.current = jobads.length + response.length
            setJobads((prevItems) => [...prevItems, ...response])
        } catch (error) {
            console.error("Error loading more jobs:", error)
            setError("Failed to load job ads.")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = {}

                const jobtypeFilters = await getJobTypeFilters()
                // @ts-ignore
                if (jobtypeFilters) response["jobtypes"] = jobtypeFilters

                const cityFilters = await getCityFilters()
                // @ts-ignore
                if (cityFilters) response["cities"] = cityFilters

                const skillFilters = await getSkillFilters()
                // @ts-ignore
                if (skillFilters) response["skills"] = skillFilters

                setFilterData(response)
            } catch (error) {
                setError("Failed to initialize job ads data.")
            } finally {
                setLoading(false)
            }
        })()

        loadItems()
    }, [])

    const [isFilterOpen, setIsFilterOpen] = useState(false)

    function toggleFilter() {
        setIsFilterOpen(prevState => !prevState)
    };

    return (
        <div className="page-container">
            <h1 className="page-section--normal heading-1 heading-1--top-left-corner">{t("title")}</h1>
            {loading && <Spinner width={50} height={50} />}
            {/* @ts-ignore */}
            {!loading && error && <Alert variant='danger' className="page-section--normal page-section--alert">{error}</Alert>}
            {!loading && !error &&
        <div className="page-section--normal">
            {/* @ts-ignore */}
            <Button
                variant="secondary-outlined"
                trailingIcon={<i className='material-symbols-sharp'>filter_list</i>}
                onClick={toggleFilter}
                size="medium"
                className={`jobads__filter-toggle ${isFilterOpen ? "active" : ""}`}
            >
                Filter
            </Button>

            <div className="jobads">
                <div className="jobads__section--left">
                    <div className={`jobads__filter-container ${isFilterOpen ? "jobads__filter-container--open" : ""}`}>
                        {filterData ? <FilterGroup filters={filterData} onApply={ap} close={toggleFilter}/> : "No filter data available"}
                    </div>
                </div>
                <div className="jobads__section--right">
                    <ul className="jobads__list">
                        {jobads.length ? jobads.map((e, idx) => (
                            <li key={idx}>
                                <JobadsListItem jobad={e} />
                            </li>
                        )) :
                            <p>{t("noResults")}</p>
                        }
                    </ul>
                    {showLoadMore && jobads.length > 0 && (
                        <div className='jobads__load-more'>
                            {/* @ts-ignore */}
                            <Button 
                                onClick={loadItems}
                                variant='secondary'
                                className='jobads__load-more-btn'
                                trailingIcon={<i className='material-symbols-sharp'>arrow_downward</i>}
                            >
                                {t("load-more")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
            }
        </div>
    )
};

export default withTranslation("jobadListPage")(Jobads)