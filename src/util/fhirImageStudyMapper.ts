import { ImagingStudyModel } from '@ischemaview/rapid-priors-data/src';
import { ImagingStudyWithPatientInfoModel } from '@ischemaview/rapid-priors-data/src';
import { PatientInfoModel } from '@ischemaview/rapid-priors-data/src';

/**
 * Maps the FHIR response data to ImagingStudyWithPatientInfoModel.
 * @param response FHIR response data.
 * @returns An array of ImagingStudyWithPatientInfoModel instances.
 */
export function mapImageStudyToModel(response: any): ImagingStudyWithPatientInfoModel[] {
    if (!response || !response.entry || !Array.isArray(response.entry)) {
        throw new Error('Invalid response format');
    }

    const models: ImagingStudyWithPatientInfoModel[] = [];

    for (const entry of response.entry) {
        const resource = entry.resource;
        if (resource && resource.resourceType === 'ImagingStudy') {
            const imagingStudy = mapImagingStudy(resource);
            const patientInfo = mapPatientInfo(resource.subject?.reference);
            const model = new ImagingStudyWithPatientInfoModel({ imagingStudy, patientInfo });
            models.push(model);
        }
    }

    return models;
}

/**
 * Maps ImagingStudy properties from FHIR resource to ImagingStudyModel.
 * @param resource FHIR ImagingStudy resource.
 * @returns An instance of ImagingStudyModel.
 */
function mapImagingStudy(resource: any): ImagingStudyModel {
    const imagingStudy = new ImagingStudyModel({
        uid: resource.identifier[0]?.value || '',
        description: resource.description || '',
        modality: resource.series[0]?.modality?.code || '',
        numberOfInstances: resource.series[0]?.numberOfInstances || 0,
        numberOfSeries: resource.series.length || 0,
        // TODO: Map other properties as needed
        // For example:
        // status: resource.status || ''
    });
    return imagingStudy;
}

/**
 * Maps PatientInfo properties from FHIR resource to PatientInfoModel.
 * @param reference Reference URL of the patient.
 * @returns An instance of PatientInfoModel.
 */
function mapPatientInfo(reference: string | undefined): PatientInfoModel {
    if (!reference) {
        return PatientInfoModel.create(); // or return empty PatientInfoModel
    }

    // Extract patient ID from reference URL
    const patientId = reference.split('/').pop() || '';

    // Construct patient info model
    const patientInfo = new PatientInfoModel({
        mrn: patientId,
        // TODO: Map other properties as needed
    });
    return patientInfo;
}
