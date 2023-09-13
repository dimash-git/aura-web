import { AssetCategory } from "@/api/resources/AssetCategories";

export const getZodiacSignByDate = (birthDate: string): string => {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const zodiac = [
    "Capricorn",
    "Aquarius",
    "Pisces",
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
  ];
  const last_day = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
  return day > last_day[month - 1] ? zodiac[month * 1] : zodiac[month - 1];
};

export const getCategoryIdByZodiacSign = (
  zodiacSign: string,
  categories: AssetCategory[]
) => {
  const categoryId = categories.find(
    (category) => category.slug === zodiacSign.toLowerCase()
  )?.id;
  return categoryId;
};
