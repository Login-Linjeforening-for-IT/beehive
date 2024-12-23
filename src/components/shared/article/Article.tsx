'use client'

import MarkdownRender from '@components/shared/markdownrender/MarkdownRender'
import Alert from '@components/shared/alert/Alert'
import './Article.css'
import { formatPublishedDate } from '@utils/DatetimeFormatter'
import { useContext } from 'react'
import AppContext from '@context/context'

type ArticleProps = { 
  title: string
  publishTime: Date
  updateTime: Date
  informational: boolean
  introduction?: string
  description: string
}

export default function Article({ title, publishTime, updateTime, informational, introduction, description }: ArticleProps) {
    const { lang } = useContext(AppContext)

    return (
        <div className="article">
            <h1 className="article_header">{title}</h1>
            <div className="article_meta-display">
                <span className="article_meta-date">
                    {lang === 'en' ? 'PUBLISHED: ' : 'PUBLISERT: '}
                    {formatPublishedDate(publishTime, lang)}
                </span>
                {publishTime < updateTime &&
          <span className="article_meta-date">
              {lang === 'en' ? 'UPDATED: ' : 'OPPDATERT: '}
              {formatPublishedDate(updateTime, lang)}
          </span>
                }
            </div>
            {informational && (
                <div className="article_informational">
                    {/* <i className="article_informational-icon material-symbols-sharp">
            info
          </i>
          <div className="article_informational-msg" >
            {informational}
          </div> */}
                    {/* @ts-ignore */}
                    <Alert
                        icon='info'
                        className='article_informational-alert'
                    >
                        {informational}
                    </Alert>
                </div>
            )}
            {introduction && 
        <article
            className="article_intro p--highlighted"
            dangerouslySetInnerHTML={{ __html: introduction }}
        />
            }
            <article className="article_main">
                <MarkdownRender MDstr={description}/>
            </article>
        </div>
    )
}
