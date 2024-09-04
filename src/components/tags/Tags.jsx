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
}) => {
  return (
    <>
      {highlight && <Tag variant="highlight">{t("highlight")}</Tag>}
      {isNew(timePublish) && <Tag variant="info">{t("new")}</Tag>}
      {canceled && <Tag variant="danger">{t("canceled")}</Tag>}
      {full && <Tag variant="danger">{t("full")}</Tag>}
    </>
  );
};

export default withTranslation("tags")(Tags);
