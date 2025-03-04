const BASE_URL = "https://www.swapi.tech/api/";

// Generic function to fetch data from the API
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Fetch all people and their detailed information
export const getPeople = async () => {
  try {
    const response = await fetch(`${BASE_URL}people`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();

    // Fetch detailed information for each person
    const peopleWithDetails = await Promise.all(
      data.results.map(async (person) => {
        const detailsResponse = await fetch(person.url);
        if (!detailsResponse.ok) {
          throw new Error(`Error: ${detailsResponse.status} - ${detailsResponse.statusText}`);
        }
        const detailsData = await detailsResponse.json();
        return detailsData.result; 
      })
    );

    return peopleWithDetails; 
  } catch (error) {
    console.error("Error fetching people:", error);
    return [];
  }
};

// Fetch all vehicles and their detailed information
export const getVehicles = async () => {
  try {
    const response = await fetch(`${BASE_URL}vehicles`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();

    // Fetch detailed information for each vehicle
    const vehiclesWithDetails = await Promise.all(
      data.results.map(async (vehicle) => {
        const detailsResponse = await fetch(vehicle.url);
        if (!detailsResponse.ok) {
          throw new Error(`Error: ${detailsResponse.status} - ${detailsResponse.statusText}`);
        }
        const detailsData = await detailsResponse.json();
        return detailsData.result; 
      })
    );

    return vehiclesWithDetails; 
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
};

// Fetch all planets and their detailed information
export const getPlanets = async () => {
  try {
    const response = await fetch(`${BASE_URL}planets`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();

    // Fetch detailed information for each planet
    const planetsWithDetails = await Promise.all(
      data.results.map(async (planet) => {
        const detailsResponse = await fetch(planet.url);
        if (!detailsResponse.ok) {
          throw new Error(`Error: ${detailsResponse.status} - ${detailsResponse.statusText}`);
        }
        const detailsData = await detailsResponse.json();
        return detailsData.result;
      })
    );

    return planetsWithDetails;
  } catch (error) {
    console.error("Error fetching planets:", error);
    return [];
  }
};

// Fetch the root endpoint of the API
export const getRoot = async () => {
  return await fetchData("");
};

// Search for a specific resource by name
export const searchResource = async (resource, query) => {
  return await fetchData(`${resource}/?name=${query}`);
};

// Fetch data in Wookiee format
export const getWookieeData = async (endpoint) => {
  return await fetchData(`${endpoint}?format=wookiee`);
};

// Fetch the total number of people in the API
export const getTotalPeople = async () => {
  try {
    const response = await fetch(`${BASE_URL}people/`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data.total_records;
  } catch (error) {
    console.error("Error fetching total people:", error);
    return null;
  }
};

// Fetch the total number of starships in the API
export const getTotalStarships = async () => {
  try {
    const response = await fetch(`${BASE_URL}starships/`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data.total_records;
  } catch (error) {
    console.error("Error fetching total starships:", error);
    return null;
  }
}