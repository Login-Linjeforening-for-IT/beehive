import { useState, useEffect } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import "./MarkdownRender.css";
import EventCard from '../event/EventCard';
import JobadCard from "../jobad/JobadCard";
import DropDownBox from "../dropdownbox/DropDownBox";
import { getEventRow, getJobRow } from "../../utils/api"


const CustomLink = ({ href, children }) => {
  if (typeof children === 'string') {
    if (children === ':event') {
      return EventEmbed(href)
    }
    if (children === ':jobad') {
      return JobadEmbed(href)
    }
  }

  return (
    <a
      className='standard-link standard-link--underscore-hover'
      href={href} target='_blank'
      rel='noopener noreferrer'>
      {children}
    </a>
  )
}

function ErrorMessage({ err, title }) {
  if (!err.error) {
    return JSON.stringify(err);
  }

  return (
    <DropDownBox title={title}>
      {err.status && <p>Status: {err.status}</p>}
      {err.error && <p>Error: {err.error}</p>}
    </DropDownBox>
  );
}


function EventEmbed(id) {

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, err] = await getEventRow(id);
        if (err) {
          setError(err);
          return;
        } else {
          setError(null);
        }

        setEvent(response);
        setLoading(false);
      } catch (error) {
        console.error('Error Fetching Event Data:', error);
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return (
      <ErrorMessage err={error} title={"Error Fetching Event #" + id} />
    )
  }

  return (
    <div className="markdown-render__card">
      {loading ? (
        <p>Loading...</p>
      ) : event ? (
        <EventCard event={event} disableTags={true} />
      ) : (
        <p>Event not found</p>
      )}
    </div>
  );
}

function JobadEmbed(id) {

  const [jobad, setJobad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ response, err ] = await getJobRow(id);
        if (err) {
          setError(err);
          return;
        } else {
          setError(null);
        }

        setJobad(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job ad data:', error);
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return (
      <ErrorMessage err={error} title={"Error Fetching Job Ad #" + id} />
    )
  }

  return (
    <div className="markdown-render__card">
      {loading ? (
        <p>Loading...</p>
      ) : jobad ? (
        <JobadCard jobad={jobad} disableTags={true} />
      ) : (
        <p>Job ad not found</p>
      )}
    </div>
  );
}

const components = {
    // The md string should not contain a main header (#), the h1 header is  
    // rendered by the parent component. If by mistake it cointains 
    // a "# main header" this returns h2 instead.
    h1: ({children}) => <h2 className='markdown-render__h2'>{children}</h2>,
    h2: ({children}) => <h2 className='markdown-render__h2'>{children}</h2>,
    h3: ({children}) => <h3 className='markdown-render__h3'>{children}</h3>,
    h4: ({children}) => <h4 className='markdown-render__h4'>{children}</h4>,
    h5: ({children}) => <h5 className='markdown-render__h5'>{children}</h5>,
    h6: ({children}) => <h6 className='markdown-render__h6'>{children}</h6>,
    p:  ({children}) => <section className='markdown-render__section'>{children}</section>,
    em: ({children}) => <em className='markdown-render__em'>{children}</em>,
    strong: ({children}) => <strong className='markdown-render__strong'>{children}</strong>,
    table: ({children}) => <table className='markdown-render__table'>{children}</table>,
    th: ({children}) => <th className='markdown-render__th'>{children}</th>,
    td: ({children}) => <td className='markdown-render__td'>{children}</td>,
    ul: ({children}) => <ul className='markdown-render__ul'>{children}</ul>,
    ol: ({children}) => <ol className='markdown-render__ol'>{children}</ol>,
    li: ({children}) => <li className='markdown-render__li'>{children}</li>,
    a: CustomLink
}

const MarkdownRender = ({MDstr}) => {
  return (
    <Markdown components={components} remarkPlugins={[remarkGfm]}>
      {MDstr.replace(/\\n/g, '\n')}
    </Markdown>
  );
};

export default MarkdownRender;