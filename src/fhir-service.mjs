import axios from 'axios';

 export default class ImagingStudySearch {
  constructor(criteria) {
    this.criteria = criteria;
  }

  async imagingStudySearch(criteria) {
    try {
      // Make a GET request to the FHIR server
      const response = await axios.get('https://server.fire.ly/ImagingStudy', {
        params: {
          _total: 'accurate',
          _count: 5,
          _skip: 5,
          _format: 'json'
        }
      });

      // Extract the data from the response
      const { data } = response;

      // Return the extracted data
      return data;
    } catch (error) {
      // Handle errors
      console.error('Error searching for ImagingStudy records:', error);
      throw error;
    }
  }

  async patientSearch(criteria) {
    try {
      // Construct the patient URL using criteria
      // const patientUrl = `https://server.fire.ly/Patient?system=${criteria.system}&localId=${criteria.localId}`;
      const patientUrl = criteria.url;
  
      // Make a GET request to the patient URL
      const response = await axios.get(patientUrl);
  
      // Return the response data
      return response.data;
    } catch (error) {
      console.error('Error fetching patient data from: ', patientUrl);
      //console.error('Error fetching patient data:', error);
      throw error;
    }
  }

}
