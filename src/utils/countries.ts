import axios from 'axios';

// Define the structure of the API response
interface Currency {
  name: string;
  symbol?: string;
}

interface Country {
  flags: {
    png: string;
    svg: string;
  };
  currencies: {
    [key: string]: Currency; // Currencies object with dynamic keys
  };
}

// Function Return Type
interface CountryData {
  flagUrl: string;
  currencyName: string;
  currencySymbol: string;
}

export const getCountryData = async (countryName: string): Promise<CountryData | null> => {
  try {
    const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = response.data;
    const country = data[0]; // Assuming the first result is the correct one

    // Extract flag and currency information
    const flagUrl = country.flags?.png || 'No flag available';
    const currencies = country.currencies ? Object.values(country.currencies) : [];
    const currencyName = currencies[0]?.name || 'N/A';
    const currencySymbol = currencies[0]?.symbol || 'N/A';

    return { flagUrl, currencyName, currencySymbol };
  } catch (error) {
    console.error('Error fetching country data:', error);
    return null; // Return null on failure
  }
};
