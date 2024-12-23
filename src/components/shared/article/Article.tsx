'use client'

import MarkdownRender from "@components/shared/markdownrender/MarkdownRender"
import Alert from "@components/shared/alert/Alert"
import getCookie from "@utils/getCookie"
import "./Article.css"
import { formatPublishedDate } from "@utils/DatetimeFormatter"

type ArticleProps = { 
  title: string
  publishTime: Date
  updateTime: Date
  informational: boolean
  introduction?: string
  description: string
}

export default function Article({ title, publishTime, updateTime, informational, introduction, description }: ArticleProps) {
    const lang = getCookie('lang') as 'no' | 'en' || 'no'

    return (
        <div className="article">
            <h1 className="article__header">{title}</h1>
            <div className="article__meta-display">
                <span className="article__meta-date">
                    {lang === "en" ? "PUBLISHED: " : "PUBLISERT: "}
                    {formatPublishedDate(publishTime, lang)}
                </span>
                {publishTime < updateTime &&
          <span className="article__meta-date">
              {lang === "en" ? "UPDATED: " : "OPPDATERT: "}
              {formatPublishedDate(updateTime, lang)}
          </span>
                }
            </div>
            {informational && (
                <div className="article__informational">
                    {/* <i className="article__informational-icon material-symbols-sharp">
            info
          </i>
          <div className="article__informational-msg" >
            {informational}
          </div> */}
                    {/* @ts-ignore */}
                    <Alert
                        icon='info'
                        className='article__informational-alert'
                    >
                        {informational}
                    </Alert>
                </div>
            )}
            {introduction && 
        <article
            className="article__intro p--highlighted"
            dangerouslySetInnerHTML={{ __html: introduction }}
        />
            }
            <article className="article__main">
                <MarkdownRender MDstr={description}/>
            </article>
        </div>
    )
}
