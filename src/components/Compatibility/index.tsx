import { useTranslation } from "react-i18next";
import MainButton from "../MainButton";
import Title from "../Title";
import styles from "./styles.module.css";
import { useCallback, useState } from "react";
import NameInput from "./nameInput";
// import { DatePicker } from "../DateTimePicker";
// import { IDate } from "@/services/date";
// import { IDate, getDateAsString } from "@/services/date";

import { AICompatCategories, useApi, useApiCall } from "@/api";
import { useNavigate } from "react-router-dom";
import routes from "@/routes";
import { useDispatch } from "react-redux";
import { actions } from "@/store";
import DatePicker from "./DatePicker";

function CompatibilityPage(): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledName, setIsDisabledName] = useState(true);
  const [isDisabledDate] = useState(false);
  // const [isDisabledDate, setIsDisabledDate] = useState(false);

  const [name, setName] = useState<string>("");
  // const [date] = useState<string | IDate>("");
  // const [date, setDate] = useState<string | IDate>("");

  const [compatCategory, setCompatCategory] = useState(2);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [time, setTime] = useState<Date>(new Date());
  // const handleClick = () => {
  //   setIsOpen(true);
  // };

  // const handleCancel = () => {
  //   setIsOpen(false);
  // };

  // const handleSelect = (_time: Date) => {
  //   setIsOpen(false);
  //   setTime(_time);
  // };
  const handleNext = () => {
    if (!selectedDate) return;

    // Format the selected date as "yyyy-MM-dd"
    const formattedDate = `${selectedDate.getFullYear()}-${(
      "0" +
      (selectedDate.getMonth() + 1)
    ).slice(-2)}-${("0" + selectedDate.getDate()).slice(-2)}`;

    // console.log({
    //   rightUser: {
    //     name,
    //     birthDate: formattedDate,
    //   },
    //   categoryId: compatCategory,
    // });
    dispatch(
      actions.compatibility.update({
        rightUser: {
          name,
          birthDate: formattedDate,
        },
        categoryId: compatCategory,
      })
    );
    navigate(routes.client.compatibilityResult());
  };

  const api = useApi();
  const locale = i18n.language;
  const loadData = useCallback(() => {
    return api
      .getAiCompatCategories({ locale })
      .then((resp: AICompatCategories.Response) => resp.compat_categories);
  }, [api, locale]);
  const { data } = useApiCall<AICompatCategories.CompatCategory[]>(loadData);

  const handleValidName = (name: string) => {
    setIsDisabledName(!name.length);
    setName(name);
    checkAllDisabled();
  };

  // const handleValidDate = (date: IDate | string) => {
  //   setIsDisabledDate(date === "");
  //   setDate(date);
  //   checkAllDisabled();
  // };

  const checkAllDisabled = () => {
    setIsDisabled(isDisabledName || isDisabledDate);
  };

  const changeCompatCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompatCategory(parseInt(event.target.value));
  };

  // Added by me
  // const handleDateSelect = (date: Date) => {
  //   setSelectedDate(date);
  // };

  return (
    <section className={`${styles.page} page`}>
      <Title variant="h1" className={styles.title}>
        {t("compatibility")}
      </Title>
      <div className={styles.content}>
        <Title variant="h2" className={styles.iam}>
          {t("iAm")}
        </Title>
        <Title variant="h3" className={styles.plus}>
          +
        </Title>
        <div className={styles["inputs-container"]}>
          <div className={styles["input-container__name-container"]}>
            <NameInput
              name="name"
              value={name}
              placeholder={t("name")}
              onValid={handleValidName}
              onInvalid={() => setIsDisabledName(true)}
            />
          </div>
          <div className={styles["input-container__date-container"]}>
            {/* <DatePicker
              name="birthdate"
              value={getDateAsString(date)}
              inputClassName={styles["date-input"]}
              onValid={handleValidDate}
              onInvalid={() => setIsDisabledDate(true)}
            /> */}
            {/* <DatePicker onSelect={handleDateSelect} /> */}
            <DatePicker onDateChange={setSelectedDate} />
            {/* <div style={{ color: "wheat" }}>
              {selectedDate && selectedDate.toString()}
            </div> */}
          </div>
        </div>
        {data && data.length && (
          <div className={styles["compatibility-categories"]}>
            {data.map((item, index) => (
              <div className="compatibility-categories__item" key={index}>
                <input
                  className={`${styles["compatibility-categories__input"]} ${
                    compatCategory === item.id
                      ? styles["compatibility-categories__input--checked"]
                      : ""
                  }`}
                  type="radio"
                  name="compatCategory"
                  id={String(item.id)}
                  value={item.id}
                  checked={compatCategory === item.id}
                  onChange={changeCompatCategory}
                />
                <label htmlFor={String(item.id)}>{item.name}</label>
              </div>
            ))}
          </div>
        )}
        <MainButton
          className={styles["check-btn"]}
          onClick={handleNext}
          disabled={isDisabled}
        >
          {t("check")}
        </MainButton>
      </div>
    </section>
  );
}

export default CompatibilityPage;
