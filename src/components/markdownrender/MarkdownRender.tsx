import { useState, useEffect } from "react"
// @ts-ignore
import Markdown from "react-markdown"
// @ts-ignore
import remarkGfm from "remark-gfm"

import EventItem from "../event/EventItem"
import EventCardSkeleton from "../event/EventCardSkeleton"
import JobadCard from "../jobad/JobadCard"
import JobadCardSkeleton from "../jobad/JobadCardSkeleton"
import Alert from "../alert/Alert"

import { getEventRow, getJobRow } from "../../utils/api"

import "./MarkdownRender.css"

type CustomLinkProps = {
  href: number
  children: any
}

type ErrorMessageProps = {
  err: any
  title: string
}

function CustomLink({ href, children }: CustomLinkProps) {
    if (typeof children === "string") {
        if (children === ":event") {
            return EventEmbed(href)
        }
        if (children === ":jobad") {
            return JobadEmbed(href)
        }
    }

    return (
        <a
            className='link link--primary link--underscore-hover'
            href={String(href)}
            target='_blank'
            rel='noopener noreferrer'
        >
            {children}
        </a>
    )
}

function ErrorMessage({ err, title }: ErrorMessageProps) {
    if (!err.error) {
        return "Unknown error"
    }

    return (
    // @ts-ignore
        <Alert variant='danger' icon='error'>
            {title}
            <br/>
            {err.status && <p>Status: {err.status}</p>}
            {err.error && <p>Error: {err.error}</p>}
        </Alert>
    )
}


function EventEmbed(id: number) {

    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const [response, err] = await getEventRow(id)
                if (err) {
                    setError(err)
                    return
                } else {
                    setError(null)
                }

                setEvent(response)
                setLoading(false)
            } catch (error: any) {
                console.error("Error Fetching Event Data:", error)
                setLoading(false)
                setError(error)
            }
        };

        fetchData()
    }, [id])

    if (error) {
        return (
            <ErrorMessage err={error} title={"Error Fetching Event #" + id} />
        )
    }

    return (
        <div className="markdown-render__card">
            {loading ? (
                <EventCardSkeleton />
            ) : event ? (
                <EventItem event={event} variant='card' highlight={false} />
            ) : (
                <p>Event not found</p>
            )}
        </div>
    )
}

function JobadEmbed(id: number) {

    const [jobad, setJobad] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const [ response, err ] = await getJobRow(id)
                if (err) {
                    setError(err)
                    return
                } else {
                    setError(null)
                }

                setJobad(response)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching job ad data:", error)
                setLoading(false)
                setError(JSON.stringify(error))
            }
        };

        fetchData()
    }, [id])

    if (error) {
        return (
            <ErrorMessage err={error} title={"Error Fetching Job Ad #" + id} />
        )
    }

    return (
        <div className="markdown-render__card">
            {loading ? (
                <JobadCardSkeleton/>
            ) : jobad ? (
                <JobadCard jobad={jobad} disableTags={true} />
            ) : (
                <p>Job ad not found</p>
            )}
        </div>
    )
}

const components = {
    // The md string should not contain a main header (#), the h1 header is  
    // rendered by the parent component. If by mistake it cointains 
    // a "# main header" this returns h2 instead.
    h1: ({children}: any) => <h2 className='markdown-render__h2'>{children}</h2>,
    h2: ({children}: any) => <h2 className='markdown-render__h2'>{children}</h2>,
    h3: ({children}: any) => <h3 className='markdown-render__h3'>{children}</h3>,
    h4: ({children}: any) => <h4 className='markdown-render__h4'>{children}</h4>,
    h5: ({children}: any) => <h5 className='markdown-render__h5'>{children}</h5>,
    h6: ({children}: any) => <h6 className='markdown-render__h6'>{children}</h6>,
    p:  ({children}: any) => <section className='markdown-render__section'>{children}</section>,
    em: ({children}: any) => <em className='markdown-render__em'>{children}</em>,
    strong: ({children}: any) => <strong className='markdown-render__strong'>{children}</strong>,
    table: ({children}: any) => <table className='markdown-render__table'>{children}</table>,
    th: ({children}: any) => <th className='markdown-render__th'>{children}</th>,
    td: ({children}: any) => <td className='markdown-render__td'>{children}</td>,
    ul: ({children}: any) => <ul className='markdown-render__ul'>{children}</ul>,
    ol: ({children}: any) => <ol className='markdown-render__ol'>{children}</ol>,
    li: ({children}: any) => <li className='markdown-render__li'>{children}</li>,
    a: CustomLink
}

export function MarkdownRender({MDstr}: {MDstr: string}) {
    return (
        <Markdown components={components} remarkPlugins={[remarkGfm]}>
            {MDstr.replace(/\\n/g, "\n")}
        </Markdown>
    )
};
