import { uniqueNamesGenerator, Config, names } from "unique-names-generator";

export const getRandomName = (): string => {
  const config: Config = {
    dictionaries: [names],
  };
  return uniqueNamesGenerator(config);
};

// The maximum is exclusive and the minimum is inclusive
export const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
