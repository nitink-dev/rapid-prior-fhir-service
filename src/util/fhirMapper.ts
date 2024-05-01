import { HumanName, Patient } from "fhir/r2";
import { PatientInfoModel } from "../models/patient-info.model";
import { PatientInfoCollectionResultModel } from "../models/patient-info-collection-result.model";
import FhirService from "../fhir-service";

/**
 * Utility function to map a single FHIR Patient object to a PatientInfoModel object.
 * @param patient The FHIR Patient object to be mapped.
 * @returns The mapped PatientInfoModel object.
 */
export function mapPatientToFhirModel(patient: Patient): PatientInfoModel {
    // Extract the patient's name from the FHIR HumanName object
    const name: string = parseHumanName(patient.name && patient.name[0]); 
    // TODO: Need to figure out the fields to map here..
    return {
        name: name,
        // TODO: Determine the mapping for MRN, DOB, and gender
        mrn: '', // Placeholder for MRN mapping
        dob: patient._birthDate, // Placeholder for DOB mapping
        gender: patient.gender // Placeholder for gender mapping
    };
}

/**
 * Utility function to map an array of FHIR Patient objects to an array of PatientInfoModel objects.
 * @param bundleResponse The bundle response containing FHIR Patient objects.
 * @param fhirService The FhirService instance to fetch patient data.
 * @returns A Promise resolving to a PatientInfoCollectionResultModel object.
 */
export async function mapPatientsToFhirModels(bundleResponse: any, fhirService: FhirService): Promise<PatientInfoCollectionResultModel> {
    const patientUrls: string[] = extractPatientUrlsFromBundle(bundleResponse);

    const entities: PatientInfoModel[] = [];
    for (const patientUrl of patientUrls) {
        const patientId = extractPatientId(patientUrl);
        if (patientId) {
            const patientData = await fhirService.getPatientById(patientId);
            if (patientData) {
                entities.push(patientData);
            }
        }
    }

    // Create a PatientInfoCollectionResultModel object
    const result: PatientInfoCollectionResultModel = {
        entities,
        page: 1, // dummy  page number
        recordsPerPage: entities.length,
        totalRecords: bundleResponse.total, // Total records returned
        totalRecordsFiltered: bundleResponse.total, // Total records matching the query
        queryParams: {} // Assuming you want to pass an empty object for queryParams
    };

    return result;
}

/**
 * Extracts patient URLs from the bundle response.
 * @param bundleResponse The bundle response containing FHIR resources.
 * @returns An array of patient URLs.
 */
function extractPatientUrlsFromBundle(bundleResponse: any): string[] {
    const entries = bundleResponse.entry || [];
    const patientUrls: string[] = [];

    for (const entry of entries) {
        const resource = entry.resource;
        const fullUrl = entry.fullUrl;
        if (resource && resource.resourceType === 'Patient' && fullUrl) {
            patientUrls.push(fullUrl);
        }
    }
    return patientUrls;
}

/**
 * Extracts the patient ID from the patient URL.
 * @param url The URL of the patient resource.
 * @returns The patient ID or null if not found.
 */
function extractPatientId(url: string): string | null {
    const fullUrl: string = url || '';
    const parts = fullUrl.split('/');
    return parts.pop() || null;
}

/**
 * Utility function to parse the patient's name from the FHIR HumanName object to a string.
 * @param humanName The FHIR HumanName object representing the patient's name.
 * @returns The patient's name as a string.
 */
function parseHumanName(humanName: HumanName | undefined): string {
    if (!humanName) {
        return ""; // Return an empty string if humanName is undefined
    }
    return humanName.text || ""; // Return the text property of humanName or an empty string if it's undefined
}
