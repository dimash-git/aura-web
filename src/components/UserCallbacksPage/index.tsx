import Title from "../Title";
import styles from "./styles.module.css";
import { useCallback, useState } from "react";
import { UserCallbacks, useApi, useApiCall } from "@/api";
import { IPrevStateChanges } from "@/api/resources/UserCallbacks";

function UserCallbacksPage(): JSX.Element {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIzNjEyLCJpYXQiOjE2OTM0MTg5MTAsImV4cCI6MTcwMjA1ODkxMCwianRpIjoiNzg5MjkwYWItODg0YS00MGUyLTkyNjEtOWI2OGEyNjkwNmE0IiwiZW1haWwiOiJvdGhlckBleGFtcGxlLmNvbSIsInN0YXRlIjoicHJvdmVuIiwibG9jIjoiZW4iLCJ0eiI6LTI4ODAwLCJ0eXBlIjoiZW1haWwiLCJpc3MiOiJjb20ubGlmZS5hdXJhIn0.J2ocWIv5jKzuKMcwMgWMiNMyGg5qLlMAeln-bQm_9lw";
  const api = useApi();
  const [text, setText] = useState("Loading...");
  const [statChanges, setStatChanges] = useState([] as IPrevStateChanges[]);

  const createCallback = useCallback(async () => {
    const data: UserCallbacks.PayloadPost = {
      data: {
        user_callback: {
          kind: "breathing_end",
        },
      },
      token,
    };
    const createCallbackRequest = await api.createUserCallbacks(data);
    setStatChanges(createCallbackRequest.user_callback.prev_stat_changes);
    if (!createCallbackRequest.user_callback.is_complete) {
      const getUserCallbacksRequest = async () => {
        const getCallback = await api.getUserCallbacks({
          id: createCallbackRequest.user_callback.id,
          token,
        });
        if (!getCallback.user_callback.is_complete) {
          setTimeout(getUserCallbacksRequest, 3000);
        }
        setText(getCallback.user_callback.description || "Loading...");
        return getCallback.user_callback;
      };
      return await getUserCallbacksRequest();
    }

    return createCallbackRequest.user_callback;
  }, [api]);

  useApiCall<UserCallbacks.IUserCallbacks>(createCallback);

  return (
    <section className={`${styles.page} page`}>
      <div className={styles["title-container"]}>
        <Title variant="h3" className={styles.percent}>
          <>
            <p>Well done!</p>
            <p>Your results has changes...</p>
          </>
        </Title>
        {/* <Title variant="h2">{t("you_and", { user: rightUser.name })}</Title> */}
      </div>
      <div className={styles["result-container"]}>
        <div className={styles["result-container__values"]}>
          {statChanges.map((change, index) => (
            <div className={styles["result-container__value"]} key={index}>
              <span className={styles["result-container__value-label"]}>
                {change.label}
              </span>
              <span
                style={{ color: change.value > 0 ? "#00ea00" : "red" }}
                className={styles["result-container__value-value"]}
              >
                {change.value > 0 ? "+" : ""}
                {(change.value * 100).toFixed()}%
              </span>
            </div>
          ))}
        </div>
        <p className={styles["result-container__text"]}>{text}</p>
      </div>
    </section>
  );
}

export default UserCallbacksPage;
