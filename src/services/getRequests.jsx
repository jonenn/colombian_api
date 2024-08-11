//The base URL for the API is set as follows:
const BASE_URL = 'https://api-colombia.com/api/v1';

//Fetches data about Presidents from the API.
const getPresidents = async () => {
   try {
      const response = await fetch(`${BASE_URL}/President/`, {
         method: 'GET',
      });

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
   } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
   }
};

export { getPresidents };
