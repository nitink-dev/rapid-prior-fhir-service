import { PatientInfoModel } from '@ischemaview/rapid-priors-data/src';

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
