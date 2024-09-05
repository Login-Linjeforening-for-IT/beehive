import { withTranslation } from "react-i18next";
import { isNew } from "../../utils/DatetimeFormatter";

import Tag from "./Tag";

import "./Tags.css";


const Tags = ({
  t,
  highlight = false,
  timePublish = 0,
  canceled = false,
  full = false,
  ongoing = false
}) => {
  return (
    <>
      {canceled && <Tag variant="danger">{t("canceled")}</Tag>}
      {ongoing && !canceled && <Tag variant="success">{t("ongoing")}</Tag>}
      {highlight && !canceled && <Tag variant="highlight">{t("highlight")}</Tag>}
      {isNew(timePublish) && <Tag variant="info">{t("new")}</Tag>}
      {full && <Tag variant="danger">{t("full")}</Tag>}
    </>
  );
};

export default withTranslation("tags")(Tags);
