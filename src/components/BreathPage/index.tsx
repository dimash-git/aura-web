import styles from "./styles.module.css";
import BreathCircle from "../BreathCircle";
import { useCallback, useEffect, useState } from "react";
import { useApi, useApiCall } from "@/api";
import { Asset } from "@/api/resources/Assets";
import { useSelector } from "react-redux";
import { selectors } from "@/store";
import {
  getCategoryIdByZodiacSign,
  getZodiacSignByDate,
} from "@/services/zodiac-sign";
import { useTranslation } from "react-i18next";
import { getRandomArbitrary } from "@/services/random-value";
import FullScreenModal from "../FullScreenModal";
import StartBreathModalChild from "../StartBreathModalChild";

function BreathPage(): JSX.Element {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const birthdate = useSelector(selectors.selectBirthdate);
  const zodiacSign = getZodiacSignByDate(birthdate);
  const [asset, setAsset] = useState<Asset>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true);
  const api = useApi();

  const assetsData = useCallback(async () => {
    const { asset_categories } = await api.getAssetCategories({ locale });
    const categoryId = getCategoryIdByZodiacSign(zodiacSign, asset_categories);
    const { assets } = await api.getAssets({
      category: String(categoryId || "1"),
    });
    return assets;
  }, [api, locale, zodiacSign]);

  const {
    data,
    // isPending
  } = useApiCall<Asset[]>(assetsData);

  useEffect(() => {
    if (data) {
      setAsset(data[getRandomArbitrary(0, data?.length || 0)]);
    }
  }, [data]);

  const beginBreath = () => {
    setIsOpenModal(false);
  }

  return (
    <>
      <section
        className={`${styles.page} page`}
        style={{ backgroundImage: `url(${asset?.url})` }}
      >
        <FullScreenModal isOpen={isOpenModal}>
          <StartBreathModalChild handleBegin={beginBreath} />
        </FullScreenModal>
        {!isOpenModal && <BreathCircle />}
      </section>
    </>
  );
}

export default BreathPage;
