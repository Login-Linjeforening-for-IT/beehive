import React from 'react';
import * as TimeFormatter from "../../utils/DatetimeFormatter";
import { withTranslation } from "react-i18next";
import "./Article.css";


const Article = ({ i18n, title, publishTime, informational, introduction, description }) => {

    const useEng = i18n.language === "en";

    return (
        <div className="article">
            <h1 className="article__header">{title}</h1>
            <p className="article__published">
              {useEng ? "PUBLISHED: " : "PUBLISERT: "}
              {/*TimeFormatter.formatDateTDY(
                new Date(publishTime),
                useEng ? "en" : "no"
              )*/}
              {TimeFormatter.formatPublishedTime(publishTime, useEng ? "en" : "no")}
            </p>
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