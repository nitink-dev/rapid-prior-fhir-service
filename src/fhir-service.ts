import { Patient } from "fhir/r2";
import { PatientInfoModel } from "./models/patient-info.model";
import { mapPatientToFhirModel, mapPatientsToFhirModels } from "./util/fhirMapper";
import { PatientInfoQueryParamsModel } from "./models/patient-info-query-params.model";
import { PatientInfoCollectionResultModel } from "./models/patient-info-collection-result.model";

/**
 * FhirService class handles interactions with the FHIR server.
 * @author Shirshir Choudhary
 */
class FhirService {
  private fhirEndpoint: string;

  /**
   * Constructor for FhirService.
   * @param fhirEndpoint The URL of the FHIR server.
   */
  constructor(fhirEndpoint: string) {
    this.fhirEndpoint = fhirEndpoint;
  }

  /**
   * Get patient data from the FHIR server based on the provided patient ID.
   * @param id The ID of the patient.
   * @returns A Promise resolving to the patient information.
   * @throws Error if there is an issue fetching patient data.
   */
  async getPatientById(id: string): Promise<PatientInfoModel> {
    try {
      // Construct the query URL for fetching patient by ID
      const queryUrl = `${this.fhirEndpoint}/Patient/${id}`;

      console.log("QueryURL: ", queryUrl);

      // Fetch patient data from the FHIR server
      const response = await fetch(queryUrl);

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error fetching patient by ID: ${response.statusText}`);
      }

      // Parse and map the response data to our model
      const responseData = await response.json() as Patient;
      // mapping fhir patient to desired modal
      return mapPatientToFhirModel(responseData);

    } catch (error) {
        console.error("Error parsing response data as Patient:", error);
        throw error;
    }
  }

 
  /**
   * Search patients on the FHIR server based on the provided query parameters.
   * @param queryParams The query parameters for patient search.
   * @returns A Promise resolving to the patient collection result.
   * @throws Error if there is an issue fetching patient data.
   */
  async searchPatients(queryParams: PatientInfoQueryParamsModel): Promise<PatientInfoCollectionResultModel> {
    try{
        // Construct the query URL based on the provided query parameters
        const queryUrl = `${this.fhirEndpoint}/Patient/?localId=${queryParams.localId}&system=${queryParams.system}`;

        console.log("QueryURL: ", queryUrl);

        const response = await fetch(queryUrl);
        
        if (!response.ok) {
            throw new Error(`Error fetching patient data: ${response.statusText}`);
        }

        const responseData = await response.json();

        console.log("response Data: ", responseData);

        
        // Map the FHIR Patient objects to PatientInfoModel objects using the utility method
        return mapPatientsToFhirModels(responseData, this); // Pass both responseData and this (FhirService instance)
    } catch (error) {
        console.error("Error parsing response data as Patient:", error);
        throw error;
    }
}


  /**
   * Retrieves ImagingStudy data for a specific patient from the FHIR server.
   * @param patientId The ID of the patient.
   * @param filters Additional filters to apply to the query.
   * @returns A Promise resolving to the ImagingStudy data.
   * @throws Error if there is an issue fetching imaging study data.
   */
  //async getImagingStudyData(patientId: string, filters: string): Promise<any> {
  async getImagingStudyData(patientId: string, filters?: string): Promise<any> {
    let queryUrl: string;
    
    if(filters){
      queryUrl = `${this.fhirEndpoint}/ImagingStudy/?subject=patient/${patientId}&${filters}`;
    } else {
      queryUrl = `${this.fhirEndpoint}/ImagingStudy/?subject=patient/${patientId}`;
    }

    console.log("QueryURL: ", queryUrl);

    const response = await fetch(queryUrl);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error fetching imaging study data: ${response.statusText}`);
    }

    // Parse and return the response data as JSON
    //return await response.json();
    //
    const responseData = await response.json();
    return responseData;
    //return responseData as ImagingObjectSelectionStudy
  }
}

export default FhirService;
