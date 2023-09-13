import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import routes from "@/routes";
import styles from "./styles.module.css";
import { useApi, useApiCall } from "@/api";
import { Asset } from "@/api/resources/Assets";
import { useCallback, useEffect, useState } from "react";
import BlurringSubstrate from "../BlurringSubstrate";
import EnergyValues from "../EnergyValues";
import { UserAura } from "@/api/resources/Auras";
import { useSelector } from "react-redux";
import { getCategoryIdByZodiacSign, getZodiacSignByDate } from "@/services/zodiac-sign";
import { selectors } from "@/store";
import { getRandomArbitrary } from "@/services/random-value";

const buttonTextFormatter = (text: string): JSX.Element => {
  const sentences = text.split(".");
  return (
    <>
      <strong>{sentences[0]}</strong>
      <br />
      <span style={{ fontSize: "12px" }}>{sentences[1]}</span>
    </>
  );
};

function HomePage(): JSX.Element {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIzNjEyLCJpYXQiOjE2OTM0MTg5MTAsImV4cCI6MTcwMjA1ODkxMCwianRpIjoiNzg5MjkwYWItODg0YS00MGUyLTkyNjEtOWI2OGEyNjkwNmE0IiwiZW1haWwiOiJvdGhlckBleGFtcGxlLmNvbSIsInN0YXRlIjoicHJvdmVuIiwibG9jIjoiZW4iLCJ0eiI6LTI4ODAwLCJ0eXBlIjoiZW1haWwiLCJpc3MiOiJjb20ubGlmZS5hdXJhIn0.J2ocWIv5jKzuKMcwMgWMiNMyGg5qLlMAeln-bQm_9lw";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleCompatibility = () => {
    navigate(routes.client.compatibility());
  };
  const handleBreath = () => {
    navigate(routes.client.breath());
  };

  const { i18n } = useTranslation();
  const locale = i18n.language;
  const birthdate = useSelector(selectors.selectBirthdate);
  const zodiacSign = getZodiacSignByDate(birthdate);
  const [asset, setAsset] = useState<Asset>();
  const api = useApi();

  const assetsData = useCallback(async () => {
    const { asset_categories } = await api.getAssetCategories({ locale });
    const categoryId = getCategoryIdByZodiacSign(zodiacSign, asset_categories);
    const { assets } = await api.getAssets({ category: String(categoryId || "1") });
    return assets;
  }, [api]);

  const {
    data: assets,
    // isPending
  } = useApiCall<Asset[]>(assetsData);

  useEffect(() => {
    if (assets) {
      setAsset(assets[getRandomArbitrary(0, assets?.length || 0)]);
    }
  }, [assets]);

  const auraData = useCallback(async () => {
    const { user_aura } = await api.getAuras({ token });
    return user_aura;
  }, [api, token]);

  const {
    data: aura,
    // isPending
  } = useApiCall<UserAura>(auraData);

  return (
    <section
      className={`${styles.page} page`}
      style={{ backgroundImage: `url(${asset?.url})` }}
    >
      <div className={styles.header}>
        <BlurringSubstrate>
          <div className={styles["header__energies"]}>
            <div className={styles["header__energies-header"]}>
              <div className={styles["header__energies-aura"]}></div>
              <span className={styles["header__energies-title"]}>
                Your energy today
              </span>
            </div>
            {aura && <EnergyValues values={aura.stats} />}
          </div>
        </BlurringSubstrate>
      </div>
      <div className={styles.content}>
        <div className={styles["content__buttons"]}>
          <BlurringSubstrate
            style={{ color: "#fa71ea" }}
            className={styles["content__buttons-item"]}
            clickHandler={handleCompatibility}
          >
            {buttonTextFormatter(t("aura-money_compatibility-button"))}
          </BlurringSubstrate>
          <BlurringSubstrate
            style={{ color: "#00f0ff" }}
            className={styles["content__buttons-item"]}
            clickHandler={handleBreath}
          >
            {buttonTextFormatter(t("aura-10_breath-button"))}
          </BlurringSubstrate>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
