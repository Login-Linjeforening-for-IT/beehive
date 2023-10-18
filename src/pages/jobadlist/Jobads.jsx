import { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import Spinner from "../../components/spinner/Spinner";
import JobadsListItem from "./JobadsListItem.jsx";
import DropDownBox from "../../components/dropdownbox/DropDownBox";
import { Link } from "react-router-dom";
import { config } from "../../Constants";
import "./Jobads.css";

import { debounce } from '../../utils/utils'; // change name to debounce or somthin
import { FilterGroup } from '../../components/filter/filter.jsx';
import { getEventCategoryFilters, getJobs, getJobSkillFilters, getJobJobtypeFilters } from '../../utils/api';

function prepFilter(data, id, label, idKey='id', labelKey='label', countKey='count', type) {
  const filters = {};

  for (let value of Object.values(data)) {
    filters[value[idKey]] = {
      id: value[idKey],
      label: value[labelKey],
      count: value[countKey],
    };
  }

  return {
    id: id,
    label: label,
    filters: filters,
    type: type
  };
}

async function getCategoryFilters(label='name_no') {
  const [ categoryFilterData, err ] = await getEventCategoryFilters();
  if (err) {
    console.error(err);
    return;
  }

  return prepFilter(categoryFilterData, 'categories', 'Categories', 'id', label, 'count')
}

async function getJobTypeFilters(lang) {
  const [ jobTypeFilterData, err ] = await getJobJobtypeFilters();
  if (err) {
    console.error(err);
    return;
  }

  const title = {
    en: 'Type',
    no: 'Type'
  };

  return prepFilter(jobTypeFilterData, 'jobtypes', title[lang], 'job_type', 'job_type', 'count', 'check')
}

async function getSkillFilters(lang) {
  const [ jobSkillFilterData, err ] = await getJobSkillFilters();
  if (err) {
    console.error(err);
    return;
  }

  const title = {
    en: 'Skills',
    no: 'Ferdigheter'
  };

  return prepFilter(jobSkillFilterData, 'skills', title[lang], 'skill', 'skill', 'count', 'tag')
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

      console.log('jobads', jobadsData)

      setJobads(jobadsData);
  }, 50);

  const lang = i18n.language === "en" ? "en" : "no";

  useEffect(() => {
    (async () => {
      const d = {};

      const jobtypeFilters = await getJobTypeFilters(lang);
      if (jobtypeFilters) d['jobtypes'] = jobtypeFilters;

      const skillFilters = await getSkillFilters(lang);
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
