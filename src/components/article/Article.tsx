import * as TimeFormatter from "../../utils/DatetimeFormatter"
// @ts-ignore
import MarkdownRender from "../markdownrender/MarkdownRender"
import Alert from "../alert/Alert"

import "./Article.css"
import getCookie from "../../utils/getCookie"

type ArticleProps = { 
  title: string
  publishTime: Date
  updateTime: Date
  informational: string
  introduction: string
  description: string
}

const lang = getCookie('lang') as 'no' | 'en' || 'no'

export default function Article({ title, publishTime, updateTime, informational, introduction, description }: ArticleProps) {
    return (
        <div className="article">
            <h1 className="article__header">{title}</h1>
            <div className="article__meta-display">
                <span className="article__meta-date">
                    {useEng ? "PUBLISHED: " : "PUBLISERT: "}
                    {TimeFormatter.formatPublishedDate(publishTime, lang)}
                </span>
                {publishTime < updateTime &&
          <span className="article__meta-date">
              {useEng ? "UPDATED: " : "OPPDATERT: "}
              {TimeFormatter.formatPublishedDate(updateTime, lang)}
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
};
