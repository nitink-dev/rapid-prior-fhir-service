// Import the ImagingStudySearch class and the utility function
import ImagingStudySearch from '../src/fhir-service.mjs';
import { createFhirResponseDTO } from '../src/fhir-response.dto.js';
import { extractPatientUrls, transformPatientResponseToDTO, extractPatientDetails } from '../src/util.js';

async function testImagingStudySearch() {
  try {
    // Instantiate the ImagingStudySearch class
    const search = new ImagingStudySearch();

    // Call the search method
    const responseData = await search.imagingStudySearch();

    // Create an instance of the FhirResponseDTO using the utility function
    const responseDTO = createFhirResponseDTO(responseData);

    // Print the response DTO
    console.log('Response:', responseDTO);
    console.log('Response Entry:', responseDTO.entry);

    // Extract patient URLs from the response DTO
    let patientUrls = extractPatientUrls(responseDTO);
    console.log('Patient Urls : ', patientUrls);

    // Iterate over patient URLs and perform patient search
    patientUrls.forEach(url => {
      const criteria = {
        system: '',
        localId: '',
        url: url
      };
      testPatientSearch(criteria);
    });
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
  }
}

async function testPatientSearch(criteria) {
  try {
    // Instantiate the ImagingStudySearch class
    const search = new ImagingStudySearch();

    // Call the getPatientData method with criteria
    const patientResponse = await search.patientSearch(criteria);

    // Transform patient response to DTO
    const patientDTO = transformPatientResponseToDTO(patientResponse);

    // Extract patient details from DTO
    const patientDetails = extractPatientDetails(patientDTO);

    // Print the patient details
    console.log(patientDetails);
  } catch (error) {
    // Handle errors
    // console.error('Error:', error);
  }
}

// Call the test function
testImagingStudySearch();
