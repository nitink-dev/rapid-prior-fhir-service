import { Patient, ImagingObjectSelectionStudy } from "fhir/r2";

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
   * Retrieves patient data from the FHIR server based on local ID and system.
   * @param localId The local ID of the patient.
   * @param system The system OID associated with the patient.
   * @returns A Promise resolving to the patient response from the server.
   * @throws Error if there is an issue fetching patient data.
   */
  async getPatientData(patientId: string, system?: string, localId?: string): Promise<any> {
    let queryUrl: string;

    if (patientId && system && localId) {
        // If all three parameters are provided, search by localId and system
        queryUrl = `${this.fhirEndpoint}/Patient/?localId=${localId}&system=${system}`;
    } else if (patientId) {
        // If only patientId is provided, search by patientId
        queryUrl = `${this.fhirEndpoint}/Patient/${patientId}`;
    } else {
        throw new Error("Invalid parameters provided.");
    }

    console.log("QueryURL: ", queryUrl);

    const response = await fetch(queryUrl);
    
    if (!response.ok) {
        throw new Error(`Error fetching patient data: ${response.statusText}`);
    }

    const responseData = await response.json();

    try {
        return responseData as Patient;
    } catch (error) {
        console.error("Error parsing response data as Patient:", error);
        return null;
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
