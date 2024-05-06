import FhirService from '../../src/fhir-service';
import { PatientInfoQueryParamsModel } from '@ischemaview/rapid-priors-data/src/typescript/model/patient-info-query-params.model';


describe("FhirService", () => {
  let service: FhirService;

  beforeEach(() => {
    // Initialize FhirService with the FHIR server URL
    service = new FhirService("https://server.fire.ly");
  });

  it("should fetch patient data with local ID and system", async () => {
    // Define test local ID and system
  const queryParams = PatientInfoQueryParamsModel.fromObject({ localId: '123456', system: 'system123' });

    // Call the searchPatients method with test query parameters
    const patientData = await service.searchPatients(queryParams);

    // Assert that patientData is not null and has expected properties
    expect(patientData).toBeDefined();
    // Add more assertions as needed
  }, 10000); // Set the timeout to 10000 ms (10 seconds)

  it("should fetch patient data by patient ID", async () => {
    // Define test patient ID
    const patientId = '8d67df7f-1743-4083-a873-7786c38d55eb';

    // Call the getPatientById method with test patient ID
    const patientData = await service.getPatientById(patientId);

    // Assert that patientData is not null and has expected properties
    expect(patientData).toBeDefined();
    // Add more assertions as needed
  });

  it("should fetch imaging study data for a specific patient", async () => {
    // Define test patient ID
    const patientId = '8d67df7f-1743-4083-a873-7786c38d55eb';

    // Call the getImagingStudyDataByPatientId method with test patient ID
    const imagingStudyData = await service.getImagingStudyDataByPatientId(patientId);

    // Assert that imagingStudyData is not null and has expected properties
    expect(imagingStudyData).toBeDefined();
    // Add more assertions as needed
  });

  it("should fetch imaging study data with specific identifier", async () => {
    // Define test identifier
    const identifier = 'urn:dicom:uid|urn:oid:1.3.6.1.4.1.39822.1.2.2831156737.31385.1567802474.228833';

    // Call the getImagingStudyDataWithFilters method with test identifier as filter
    const imagingStudyData = await service.getImagingStudyDataWithFilters(`identifier=${identifier}`);

    // Assert that imagingStudyData is not null and has expected properties
    expect(imagingStudyData).toBeDefined();
    // Add more assertions as needed
  });

  it("should fetch imaging study data with specific modality", async () => {
    // Define test modality
    const modality = 'CT';

    // Call the getImagingStudyDataWithFilters method with test modality as filter
    const imagingStudyData = await service.getImagingStudyDataWithFilters(`modality=${modality}`);

    // Assert that imagingStudyData is not null and has expected properties
    expect(imagingStudyData).toBeDefined();
    // Add more assertions as needed
  });

  it("should fetch MAMMO imaging study data", async () => {
    // Define test modality
    const modality = 'MAMMO';

    // Call the getImagingStudyDataWithFilters method with test modality as filter
    const imagingStudyData = await service.getImagingStudyDataWithFilters(`modality=${modality}`);

    // Assert that imagingStudyData is not null and has expected properties
    expect(imagingStudyData).toBeDefined();
    // Add more assertions as needed
  });

  it("should fetch XRAY imaging study data", async () => {
    // Define test modality
    const modality = 'XRAY';

    // Call the getImagingStudyDataWithFilters method with test modality as filter
    const imagingStudyData = await service.getImagingStudyDataWithFilters(`modality=${modality}`);

    // Assert that imagingStudyData is not null and has expected properties
    expect(imagingStudyData).toBeDefined();
    // Add more assertions as needed
  });
});
