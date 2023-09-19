import { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import Spinner from "../../components/spinner/Spinner";
import JobadsListItem from "./JobadsListItem.jsx";
import { Link } from "react-router-dom";
import { config } from "../../Constants";
import "./Jobads.css";

// dummie data
let demoJobs = {
  jobs: [
    {
      id: 1,
      name_no:
        "TekKom er et kult sted, og dette er en lang tittel for å se hvor mye plass jeg har å jobbe med",
      name_en:
        "TekKom is a cool place and this is a long title to see how much space I have to work with",
      position_title_no: "Utvikler",
      position_title_en: "Developer",
      deadline: "2023-09-10T00:00:00Z",
      time_publish: "2023-09-10T00:00:00Z",
      type_no: "verv",
      type_en: "",
      text_short_no: "Utvikler i TekKom",
      text_short_en: "Developer in Tekkom",
      organization: {
        shortname: "",
        name_no: "Login",
        name_en: "",
        logo: "",
      },
      cities: ["Gjøvik"],
    },
    {
      id: 2,
      name_no: "Slavearbeid",
      name_en: "",
      position_title_no: "PHP utvikler",
      position_title_en: "",
      time_publish: "2023-09-12T00:00:00Z",
      deadline: "20.05.2024",
      company_name: "E-corp",
      type_no: "deltid",
      type_en: "part time",
      text_short_no: "Rydde opp i gammel php kode fra helvette",
      text_short_en: "",
      organization: {
        shortname: "",
        name_no: "Bedrift AS",
        name_en: "Company inc.",
        logo: "ctf_hands.png",
      },
      cities: ["Kardemomme by", "Andeby", "Nisseby", "Atlantis", "Sim city"],
    },
  ],
};

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

  console.log(jobads);

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
