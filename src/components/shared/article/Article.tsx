import MarkdownRender from '@components/shared/markdownrender/MarkdownRender'
import Alert from '@components/shared/alert/Alert'
import { formatPublishedDate } from '@utils/DatetimeFormatter'
import { cookies } from 'next/headers'
import './Article.css'

type ArticleProps = {
    title: string
    publishTime: Date
    updateTime: Date
    informational: boolean
    introduction?: string
    description: string
}

export default async function Article({ title, publishTime, updateTime, informational, introduction, description }: ArticleProps) {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang

    return (
        <div className='article'>
            <h1 className='article_header'>{title}</h1>
            <div className='article_meta-display'>
                <span className='article_meta-date'>
                    {lang === 'en' ? 'Published: ' : 'Publisert: '}
                    {formatPublishedDate(publishTime, lang)}
                </span>
                {publishTime < updateTime &&
          <span className='article_meta-date'>
              {lang === 'en' ? 'Updated: ' : 'Oppdatert: '}
              {formatPublishedDate(updateTime, lang)}
          </span>
                }
            </div>
            {informational && (
                <div className='article_informational'>
                    {/* <i className='article_informational-icon material-symbols-sharp'>
            info
          </i>
          <div className='article_informational-msg' >
            {informational}
          </div> */}
                    {/* @ts-ignore */}
                    <Alert className='article_informational-alert'>
                        {informational}
                    </Alert>
                </div>
            )}
            {introduction &&
        <article
            className='article_intro p--highlighted'
            dangerouslySetInnerHTML={{ __html: introduction }}
        />
            }
            <article className='article_main'>
                <MarkdownRender MDstr={description}/>
            </article>
        </div>
    )
}
