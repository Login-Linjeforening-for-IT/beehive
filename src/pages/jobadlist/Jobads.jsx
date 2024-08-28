import { useState, useEffect, useRef } from "react";
import { withTranslation } from "react-i18next";
import Spinner from "../../components/spinner/Spinner";
import JobadsListItem from "../../components/jobad/JobadsListItem";
import "./Jobads.css";

import { debounce } from '../../utils/debounce.js';
import FilterGroup from '../../components/filter/filter';
import prepFilter from "../../components/filter/prepFilter.js"
import { getJobs, getJobCityFilters, getJobSkillFilters, getJobJobtypeFilters } from '../../utils/api';

const jobTypeTranslations = {
  no: {
    summer: 'Sommerjobb',
    full: 'Fulltid',
    verv: 'Verv',
    part: 'Deltid'
  },
  en: {
    summer: 'Sommer job',
    full: 'Fulltime',
    verv: 'Voluntary',
    part: 'Parttime'
  }
}

const getLabelKey = (key) => {
  return (v) => {
    return {
      'no': v[key],
      'en': v[key],
    };
  }
}

const getJobTypeLabel = (v) => {  
  const labelNo = jobTypeTranslations['no'][v['job_type']] || v['job_type'];
  let labelEn = jobTypeTranslations['en'][v['job_type']] || labelNo;
  return {
    no: labelNo,
    en: labelEn,
  };
};

const getJobTypeFilters = async () => {
  try {
    const [jobTypeFilterData, err] = await getJobJobtypeFilters();
    if (err) throw new Error(err);

    const label = {
      en: 'Type',
      no: 'Type'
    };

    return prepFilter(jobTypeFilterData, 'jobtypes', label, 'job_type', getJobTypeLabel, 'count', 'check');
  } catch (error) {
    console.error('Error fetching job type filters:', error);
    return null;
  }
}

const getCityFilters = async () => {
  try {
    const [jobCityFilterData, err] = await getJobCityFilters();
    if (err) throw new Error(err);

    const label = {
      en: 'Cities',
      no: 'Byer'
    };

    return prepFilter(jobCityFilterData, 'cities', label, 'city', getLabelKey('city'), 'count', 'tag');
  } catch (error) {
    console.error('Error fetching city filters:', error);
    return null;
  }
}

const getSkillFilters = async () => {
  try {
    const [jobSkillFilterData, err] = await getJobSkillFilters();
    if (err) throw new Error(err);

    const label = {
      en: 'Skills',
      no: 'Ferdigheter'
    };

    return prepFilter(jobSkillFilterData, 'skills', label, 'skill', getLabelKey('skill'), 'count', 'tag');
  } catch (error) {
    console.error('Error fetching skill filters:', error);
    return null;
  }
}

const Jobads = ({ t }) => {

  const [ jobads, setJobads ] = useState([]);
  const [ filterData, setFilterData ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const filters = useRef({});
  const limit = 10;
  const offset = useRef(0);
  const [ showLoadMore, setShowLoadMore ] = useState(false);

  const ap = debounce(async (v) => {
    filters.current = v;

    try {
      const [ response, err ] = await getJobs(v.skills, v.cities, null, v.jobtypes, limit, 0);
      if (err) throw new Error(err);

      setShowLoadMore(response.length === limit);
      setJobads(response);
      offset.current = response.length;
    } catch (error) {
      console.error('Error fetching filtered jobs:', error);
      setError('Failed to load jobs based on filters.');
    } finally {
      setLoading(false);
    }
  }, 50);

  const loadItems = async () => {
    try {
      const [ response, err ] = await getJobs(filters.current.skills, null, null, filters.current.jobtypes, limit, offset.current);
      if (err) throw new Error(err);

      setShowLoadMore(response.length === limit);
      offset.current = jobads.length + response.length;
      setJobads((prevItems) => [...prevItems, ...response]);
    } catch (error) {
      console.error('Error loading more jobs:', error);
      setError('Failed to load job ads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = {};

        const jobtypeFilters = await getJobTypeFilters();
        if (jobtypeFilters) response['jobtypes'] = jobtypeFilters;

        const cityFilters = await getCityFilters();
        if (cityFilters) response['cities'] = cityFilters;

        const skillFilters = await getSkillFilters();
        if (skillFilters) response['skills'] = skillFilters;

        setFilterData(response);
      } catch (error) {
        setError('Failed to initialize job ads data.');
      } finally {
        setLoading(false);
      }
    })();

    loadItems();
  }, []);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(prevState => !prevState);
  };

  return (
    <div className="page-container">
      <h1 className="page-section--normal heading-1 heading-1--top-left-corner">{t("title")}</h1>
      {loading && <Spinner w="50" h="50" />}
      {!loading && error && <p className="page-section--normal">{error}</p>}
      {!loading && !error &&
        <div className="page-section--normal">
          <button
            className={`events-top-bar__button events-top-bar__filter-toggle ${isFilterOpen ? 'events-top-bar__filter-toggle--active' : ''}`}
            onClick={toggleFilter}
          >
            Filter
            <i className='material-symbols-sharp events-top-bar__icon'>
              filter_list
            </i>
          </button>
          <div className="jobads">
            <div className="jobads__section--left">
              <div className={`jobads__filter-container ${isFilterOpen ? 'jobads__filter-container--open' : ''}`}>
                {filterData ? <FilterGroup filters={filterData} onApply={ap}/> : "No filter data available"}
              </div>
            </div>
            <div className="jobads__section--right">
              <ul className="jobads__list">
                {jobads.length ? jobads.map((e, idx) => (
                  <li key={idx}>
                    <JobadsListItem jobad={e} />
                  </li>
                )) :
                  <p>No matches...</p>
                }
              </ul>
              {showLoadMore && jobads.length > 0 && (
                <a className='jobads__load-more-btn standard-button standard-button--primary' onClick={loadItems}>
                  {t('load-more')}
                </a>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default withTranslation('jobadListPage')(Jobads);
