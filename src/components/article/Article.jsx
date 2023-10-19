import React from 'react';
import * as TimeFormatter from "../../utils/DatetimeFormatter";
import { withTranslation } from "react-i18next";
import "./Article.css";


const Article = ({ i18n, title, publishTime, updateTime, informational, introduction, description }) => {

    const useEng = i18n.language === "en";
    const lang = useEng ? "en" : "no";

    return (
        <div className="article">
            <h1 className="article__header">{title}</h1>
            <div className="article__dates">
              <span className="article__date">
                {useEng ? "PUBLISHED: " : "PUBLISERT: "}
                {TimeFormatter.formatPublishedTime(publishTime, lang)}
              </span>
              {Date.parse(publishTime) < Date.parse(updateTime) && 
                <span className="article__date">
                  {useEng ? "UPDATED: " : "OPPDATERT: "}
                  {TimeFormatter.formatPublishedTime(updateTime, lang)}
                </span>
              }
            </div>
            {informational && (
              <div className="article__informational">
                <i className="article__informational-icon material-symbols-sharp">
                  info
                </i>
                <div className="article__informational-msg">
                  {informational}
                </div>
              </div>
            )}
            {introduction && 
              <article
                className="article__intro p--highlighted"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            }
            <article
                className="article__main"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
};

export default withTranslation()(Article);