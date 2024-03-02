import { useState, useEffect } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import "./MarkdownRender.css";
import EventCard from '../event/EventCard';
import JobadCard from "../jobad/JobadCard";
import { getEvent, getJob } from "../../utils/api"


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


function EventEmbed(id) {

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ response, err ] = await getEvent(id);

        // fix the event object to contain the same values u get when fetching multiple events
        response.event.category_color = response?.category?.color
        response.event.location_name_no = response?.location?.name_no
        response.event.location_name_en = response?.location?.name_en

        setEvent(response.event);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ response, err ] = await getJob(id);

        // fix the job object to contain the same values u get when fetching multiple jobs
        response.job.organization_name_no = response.organization.name_no;
        response.job.organization_name_en = response.organization.name_en;
        response.job.organization_logo = response.organization.logo;

        setJobad(response.job);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job ad data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
      {MDstr.replace(/\\n/g, '  \n')}
    </Markdown>
  );
};

export default MarkdownRender;