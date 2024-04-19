import { useState, useEffect, useRef } from "react";
import { withTranslation } from "react-i18next";
import Spinner from "../../components/spinner/Spinner";
import JobadsListItem from "../../components/jobad/JobadsListItem";
import DropDownBox from "../../components/dropdownbox/DropDownBox";
import { Link } from "react-router-dom";
import { config } from "../../Constants";
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
  const [ jobTypeFilterData, err ] = await getJobJobtypeFilters();
  if (err) {
    console.error(err);
    return;
  }

  const label = {
    en: 'Type',
    no: 'Type'
  };

  return prepFilter(jobTypeFilterData, 'jobtypes', label, 'job_type', getJobTypeLabel, 'count', 'check')
}

const getCityFilters = async () => {
  const [ jobCityFilterData, err ] = await getJobCityFilters();
  if (err) {
    console.error(err);
    return;
  }

  const label = {
    en: 'Cities',
    no: 'Byer'
  };

  return prepFilter(jobCityFilterData, 'cities', label, 'city', getLabelKey('city'), 'count', 'tag')
}

const getSkillFilters = async () => {
  const [ jobSkillFilterData, err ] = await getJobSkillFilters();
  if (err) {
    console.error(err);
    return;
  }

  const label = {
    en: 'Skills',
    no: 'Ferdigheter'
  };

  return prepFilter(jobSkillFilterData, 'skills', label, 'skill', getLabelKey('skill'), 'count', 'tag')
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

    const [ response, err ] = await getJobs(v.skills, v.cities, null, v.jobtypes, limit, 0);
      if (err) {
        console.error(err);
        setJobads(err);
        return;
      }
      
      setShowLoadMore(response.length === limit);
      setJobads(response);
      offset.current = response.length;

  }, 50);


  const loadItems = async () => {
    try {
      const [ response, err ] = await getJobs(filters.current.skills, null, null, filters.current.jobtypes, limit, offset.current);
      if (err) {
        console.error(err);
        setJobads(err);
        return;
      }

      setShowLoadMore(response.length === limit);
      offset.current = jobads.length + response.length;
      setJobads((prevItems) => [...prevItems, ...response]);
      setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };

  useEffect(() => {
    (async () => {
      const response = {};
      const jobtypeFilters = await getJobTypeFilters();
      if (jobtypeFilters) response['jobtypes'] = jobtypeFilters;

      const cityFilters = await getCityFilters();
      if (cityFilters) response['cities'] = cityFilters;

      const skillFilters = await getSkillFilters();
      if (skillFilters) response['skills'] = skillFilters;

      setFilterData(response);
    })()

    loadItems();
  }, []);

  return (
    <div className="page-container">
      <h1 className="heading-1 heading-1--top-left-corner">{t("title")}</h1>
      <div className="jobads">
        {loading && <Spinner w="50" h="50" />}
        <div className="jobads__section--left">
          <DropDownBox 
            title={<><i className='material-symbols-sharp'>filter_alt</i> Filter</>}
          >
            <div className='jobads__filter-container'>
              {filterData ? <FilterGroup filters={filterData} onApply={ap}/> : "no filter data"}
            </div>
          </DropDownBox>
        </div>
        <div className="jobads__section--right">
          {!loading &&
            <ul className="jobads__list">
              {jobads.length ? jobads.map((e, idx) => (
                <li key={idx}>
                  <JobadsListItem jobad={e} />
                </li>
              )) :
                <p>No matches...</p>
              }
            </ul>
          }
          {!loading && showLoadMore &&
            <a className='jobads__load-more-btn standard-button standard-button--primary' onClick={loadItems}>{t('load-more')}</a>
          }
        </div>
      </div>
    </div>
  );
};

export default withTranslation('jobadListPage')(Jobads);
