// @ts-ignore
import { withTranslation } from "react-i18next"
import * as TimeFormatter from "../../utils/DatetimeFormatter"
// @ts-ignore
import MarkdownRender from "../markdownrender/MarkdownRender"
import Alert from "../alert/Alert"

import "./Article.css"

type ArticleProps = { 
  i18n: any
  title: string
  publishTime: Date
  updateTime: Date
  informational: string
  introduction: string
  description: string
}

function Article({ i18n, title, publishTime, updateTime, informational, introduction, description }: ArticleProps) {

    const useEng = i18n.language === "en"
    const lang = useEng ? "en" : "no"

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

export default withTranslation()(Article)