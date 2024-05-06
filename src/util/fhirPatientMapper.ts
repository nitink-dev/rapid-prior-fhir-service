import { PatientInfoModel } from '@ischemaview/rapid-priors-data/src/typescript/model/patient-info.model';
import { PatientInfoCollectionResultModel } from '@ischemaview/rapid-priors-data/src/typescript/model/patient-info-collection-result.model';
import { PatientInfoQueryParamsModel } from '@ischemaview/rapid-priors-data/src/typescript/model/patient-info-query-params.model';


/**
 * Maps JSON data representing a Patient resource to a PatientInfoModel object.
 * @param patientJsonData JSON data representing a Patient resource.
 * @returns A PatientInfoModel object mapped from the JSON data.
 */
export function mapPatientToFhirModel(patientJsonData: any): PatientInfoModel {
  const patientModel = new PatientInfoModel();

  // Map MRN identifier data
  const mrnIdentifier = patientJsonData.identifier.find((id: any) => id.type.coding[0].code === 'MR');
  if (mrnIdentifier) {
    patientModel.mrn = mrnIdentifier.value;
  }

  // Map name data (considering all entries)
  if (patientJsonData.name && patientJsonData.name.length > 0) {
    const names = patientJsonData.name.map((nameEntry: any) => {
      return nameEntry.family + ', ' + nameEntry.given.join(' ');
    });
    patientModel.name = names.join('; ');
  }

  // Map gender data
  patientModel.gender = patientJsonData.gender;

  // Map date of birth data
  patientModel.dob = patientJsonData.birthDate;

  // Additional mapping logic for other properties can be added here

  return patientModel;
}


/**
 * Maps an array of JSON data representing Patient resources to a PatientInfoCollectionResultModel object.
 * @param patientsJsonData Array of JSON data representing Patient resources.
 * @returns A PatientInfoCollectionResultModel object containing mapped PatientInfoModel objects.
 */
export function mapPatientsToFhirModels(patientsJsonData: any[]): PatientInfoCollectionResultModel {
  const patients = patientsJsonData.map(mapPatientToFhirModel);

  // Create a new PatientInfoQueryParamsModel from the object
  // TODO: need to define values for queryParams...
  const queryParams = PatientInfoQueryParamsModel.fromObject({ localId: '', system: '' });

  // Create a new PatientInfoCollectionResultModel with the mapped patients and queryParams
  return new PatientInfoCollectionResultModel(
    patients,
    0, // Set appropriate page number
    patients.length, // Set recordsPerPage to the number of patients
    patients.length, // Set totalPatients to the number of patients
    patients.length, // Set totalPatientsFiltered to the number of patients
    queryParams
  );

}
