import countries from "world-countries";

const formattedCountries = countries.map((country) => {
   const {cca2, name, flag, latlng, region} = country;
   return {
      value: cca2,
      label: name.common,
      flag,
      latlng,
      region
   };
});

const useCountries = () => {
   const getAll = () => formattedCountries;

   const getByValue = (value: string) => {
      return formattedCountries.find((item) => item.value === value);
   };

   return {getAll, getByValue};
};

export default useCountries;