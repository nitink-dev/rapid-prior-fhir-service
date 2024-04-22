interface Criteria {
  system: string;
  localId: string;
  url: string;
}

export default class ImagingStudySearch {
  criteria: Criteria;

  constructor(criteria: Criteria) {
    this.criteria = criteria;
  }

  async imagingStudySearch(): Promise<any> {
    try {
      // Make a GET request to the FHIR server
      const response = await fetch('https://server.fire.ly/ImagingStudy?_total=accurate&_count=5&_skip=5&_format=json');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Extract the data from the response
      const data = await response.json();

      // Return the extracted data
      return data;
    } catch (error) {
      // Handle errors
      console.error('Error searching for ImagingStudy records:', error);
      throw error;
    }
  }

  async patientSearch(criteria: Criteria): Promise<any> {
    try {
      // Make a GET request to the patient URL
      const response = await fetch(criteria.url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Return the response data
      return await response.json();
    } catch (error) {
      console.error('Error fetching patient data from: ', criteria.url);
      throw error;
    }
  }
}
