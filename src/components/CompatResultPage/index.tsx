import { useTranslation } from "react-i18next";
import Title from "../Title";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { selectors } from "@/store";
import { useCallback, useState } from "react";
import { AICompats, AIRequests, useApi, useApiCall } from "@/api";

function CompatResultPage(): JSX.Element {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIzNjEyLCJpYXQiOjE2OTM0MTg5MTAsImV4cCI6MTcwMjA1ODkxMCwianRpIjoiNzg5MjkwYWItODg0YS00MGUyLTkyNjEtOWI2OGEyNjkwNmE0IiwiZW1haWwiOiJvdGhlckBleGFtcGxlLmNvbSIsInN0YXRlIjoicHJvdmVuIiwibG9jIjoiZW4iLCJ0eiI6LTI4ODAwLCJ0eXBlIjoiZW1haWwiLCJpc3MiOiJjb20ubGlmZS5hdXJhIn0.J2ocWIv5jKzuKMcwMgWMiNMyGg5qLlMAeln-bQm_9lw";
  const { t } = useTranslation();
  const api = useApi();
  const rightUser = useSelector(selectors.selectRightUser);
  const categoryId = useSelector(selectors.selectCategoryId);
  const [text, setText] = useState("Loading...");

  const loadData = useCallback(async () => {
    const right_bday =
      typeof rightUser.birthDate === "string"
        ? rightUser.birthDate
        : `${rightUser.birthDate.year}-${rightUser.birthDate.month}-${rightUser.birthDate.day}`;
    const data: AICompats.Payload = {
      data: {
        left_name: "John",
        left_bday: "1970-01-01",
        right_name: rightUser.name,
        right_bday,
        category_id: categoryId,
      },
      token,
    };
    const aICompat = await api.getAiCompat(data);
    if (aICompat.compat.body_pending) {
      const loadAIRequest = async () => {
        const aIRequest = await api.getAiRequest({
          body_check_path: aICompat.compat.body_check_path,
          token,
        });
        if (aIRequest.ai_request.state !== "ready") {
          setTimeout(loadAIRequest, 3000);
        }
        setText(aIRequest?.ai_request?.response?.body || "Loading...");
        return aIRequest.ai_request;
      };
      return await loadAIRequest();
    }
    setText(aICompat?.compat?.body || "Loading...");

    return aICompat.compat;
  }, [api, rightUser, categoryId]);

  useApiCall<AICompats.ICompat | AIRequests.IAiRequest>(loadData);

  return (
    <section className={`${styles.page} page`}>
      <div className={styles["title-container"]}>
        <Title variant="h1" className={styles.percent}>
          {"46%"}
        </Title>
        <Title variant="h2">{t("you_and", { user: rightUser.name })}</Title>
      </div>
      <div className={styles["result-container"]}>
        <Title variant="h3" className={styles["result-container__title"]}>
          {t("sign")}
        </Title>
        <p className={styles["result-container__text"]}>{text}</p>
      </div>
    </section>
  );
}

export default CompatResultPage;
