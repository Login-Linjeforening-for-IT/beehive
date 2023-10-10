import { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import Spinner from "../../components/spinner/Spinner";
import JobadsListItem from "./JobadsListItem.jsx";
import { Link } from "react-router-dom";
import { config } from "../../Constants";
import "./Jobads.css";

const Jobads = ({ t }) => {
  const [jobads, setJobads] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(config.url.API_URL + "/api/jobs/");
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setJobads(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setJobads(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      {loading && <Spinner w="3rem" h="3rem" />}
      {jobads && (
        <div className="page-container">
          <h1 className="heading-1 heading-1--top-left-corner">{t("title")}</h1>
          <div className="jobads-grid-wrapper">
            <div className="jobads-grid-wrapper--right"></div>
            <div className="jobads-grid-wrapper--left">
              <ul className="jobads-list">
                {jobads.map((job) => (
                  <li key={job.id}>
                    <Link to={"/career/" + job.id}>
                      <JobadsListItem jobad={job} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withTranslation("jobadListPage")(Jobads);
