import { Currency, Locale, Price } from "../PaymentTable";
import { IPrice } from "../PriceList";
import styles from "./styles.module.css";

const currency = Currency.USD;
const locale = Locale.EN;

const roundToWhole = (value: string | number): number => {
  value = Number(value);
  if (value % Math.floor(value) !== 0) {
    return value;
  }
  return Math.floor(value);
};

const removeAfterDot = (value: string): string => {
  const _value = Number(value.split("$")[1]);
  if (_value % Math.floor(_value) !== 0 && _value !== 0) {
    return value;
  }
  return value.split(".")[0];
};

interface PriceItemProps {
  active: boolean;
  click: () => void;
}

function PriceItem({
  id,
  value,
  active,
  click,
}: IPrice & PriceItemProps): JSX.Element {
  const _price = new Price(roundToWhole(value), currency, locale);
  console.log(id, active);
  

  const compatClassName = () => {
    const isPopular = id === 3;
    // const isActive = active;
    return `${styles.container} ${isPopular ? styles.popular : ""}`;
  };

  return (
    <div onClick={click} className={compatClassName()}>
      {removeAfterDot(_price.format())}
    </div>
  );
}

export default PriceItem;
