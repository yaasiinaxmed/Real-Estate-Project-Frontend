import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
    value: country.name.common,
    label: `${country.name.common}`,
    latlng: country.latlng,
    region: country.region
}))

const useCountries = () => {
    const getCountries = () => formattedCountries;
    return {getCountries}
}

export default useCountries