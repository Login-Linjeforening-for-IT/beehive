import { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import Spinner from "../../components/spinner/Spinner";
import JobadsListItem from "./JobadsListItem";
import DropDownBox from "../../components/dropdownbox/DropDownBox";
import { Link } from "react-router-dom";
import { config } from "../../Constants";
import "./Jobads.css";

import { debounce } from '../../utils/debounce.js';
import FilterGroup from '../../components/filter/filter';
import prepFilter from "../../components/filter/prepFilter.js"
import { getEventCategoryFilters, getJobs, getJobSkillFilters, getJobJobtypeFilters } from '../../utils/api';

const jobTypeTranslations = {
  'no': {
    'summer': 'Sommerjobb',
    'full': 'Fulltid',
    'verv': 'Verv',
    'part': 'Deltid',
  },
  'en': {
    'summer': 'Sommer job',
    'full': 'Fulltime',
    'verv': 'Voluntary',
    'part': 'Parttime',
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

async function getSkillFilters() {
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

const Jobads = ({ t, i18n }) => {

  const [ filterData, setFilterData ] = useState({});
  const [ jobads, setJobads ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const ap = debounce(async (v) => {
    const [ jobadsData, err ] = await getJobs(v.skills, null, null, v.jobtypes);
      if (err) {
        console.error(err);
        setJobads(err);
        return;
      }

      setJobads(jobadsData);
  }, 50);

  const lang = i18n.language === "en" ? "en" : "no";

  useEffect(() => {
    (async () => {
      const d = {};

      const jobtypeFilters = await getJobTypeFilters();
      if (jobtypeFilters) d['jobtypes'] = jobtypeFilters;

      const skillFilters = await getSkillFilters();
      if (skillFilters) d['skills'] = skillFilters;

      setFilterData(d);

      const [ jobadsData, err2 ] = await getJobs();
      if (err2) {
        console.error(err2);
        setJobads(err2);
        return;
      }

      setLoading(false);
      setJobads(jobadsData);
    })();
  }, []);

  return (
    <>
      <div className="page-container">
        <h1 className="heading-1 heading-1--top-left-corner">{t("title")}</h1>
        <div className="jobads">
          {loading && <Spinner w="3rem" h="3rem" />}
          <div className="jobads__section--left">
            <DropDownBox 
              title={<><i className='material-symbols-sharp'>filter_alt</i> Filter</>} 
              content={ 
                <div className='jobads__filter-container'>
                  {filterData ? <FilterGroup filters={filterData} onApply={ap}/> : "no filter data"}
                </div>
              }
            />
          </div>
          <div className="jobads__section--right">
            <ul className="jobads__list">
              {jobads && jobads.map((e) => (
                <li key={e.id}>
                  <Link to={"/career/" + e.id}>
                    <JobadsListItem jobad={e} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default withTranslation("jobadListPage")(Jobads);
