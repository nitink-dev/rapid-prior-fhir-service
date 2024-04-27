import FhirService from '../../src/fhir-service';

describe("FhirService", () => {
  let service: FhirService;

  beforeEach(() => {
    // Initialize FhirService with the FHIR server URL
    service = new FhirService("https://server.fire.ly");
  });

  it("should fetch patient data with local ID and system", async () => {
    // Define test local ID and system
    const localId = '123456';
    const system = 'system123';

    // Call the getPatientData method with test local ID and system
    const patientData = await service.getPatientData(localId, system);

    // Print the patient data received from the server
    console.log("Patient Data:", patientData);

    // Assert that patientData is not null and has expected properties
    expect(patientData).toBeDefined();
    // Add more assertions as needed
  });

  it("should fetch patient data by patient ID", async () => {
    // Define test patient ID
    const patientId = '8d67df7f-1743-4083-a873-7786c38d55eb';

    // Call the getPatientData method with test patient ID
    const patientData = await service.getPatientData(patientId);

    // Print the patient data received from the server
    console.log("Patient Data:", patientData);

    // Assert that patientData is not null and has expected properties
    expect(patientData).toBeDefined();
    // Add more assertions as needed
  });

  it("should fetch imaging study data for a specific patient", async () => {
    // Define test patient ID
    const patientId = '8d67df7f-1743-4083-a873-7786c38d55eb';

    // Call the getImagingStudyData method with test patient ID and filterss
    const imagingStudyData = await service.getImagingStudyData(patientId);

    // Print the imaging study data received from the server
    console.log("Imaging Study Data:", imagingStudyData);

    // Assert that imagingStudyData is not null and has expected properties
    expect(imagingStudyData).toBeDefined();
    // Add more assertions as needed
  });

  it("should fetch imaging study data with specific identifier", async () => {
    // Define test patient ID and identifier
    const patientId = '8d67df7f-1743-4083-a873-7786c38d55eb';
    const identifier = 'urn:dicom:uid|urn:oid:1.3.6.1.4.1.39822.1.2.2831156737.31385.1567802474.228833';

    // Call the getImagingStudyData method with test patient ID and identifier
    const imagingStudyData = await service.getImagingStudyData(patientId, `identifier=${identifier}`);

    // Print the imaging study data received from the server
    console.log("Imaging Study Data:", imagingStudyData);

    // Assert that imagingStudyData is not null and has expected properties
    expect(imagingStudyData).toBeDefined();
    // Add more assertions as needed
  });

  it("should fetch imaging study data with specific modality", async () => {
    // Define test patient ID and modality
    const patientId = '8d67df7f-1743-4083-a873-7786c38d55eb';
    const modality = 'CT';

    // Call the getImagingStudyData method with test patient ID and modality
    const imagingStudyData = await service.getImagingStudyData(patientId, `modality=${modality}`);

    // Print the imaging study data received from the server
   console.log("Imaging Study Data:", imagingStudyData);

    // Assert that imagingStudyData is not null and has expected properties
    expect(imagingStudyData).toBeDefined();
    // Add more assertions as needed
  });

  it("should fetch MAMMO imaging study data", async () => {
    // Call the getImagingStudyData method with patient ID and modality filter for MAMMO
    const patientId = '8d67df7f-1743-4083-a873-7786c38d55eb';
    const modality = 'MAMMO';
    const imagingStudyData = await service.getImagingStudyData(patientId, `modality=${modality}`);

    // Print the imaging study data received from the server
    console.log("MAMMO Imaging Study Data:", imagingStudyData);

    // Assert that imagingStudyData is not null and has expected properties
    expect(imagingStudyData).toBeDefined();
    // Add more assertions as needed
  });

  it("should fetch XRAY imaging study data", async () => {
    // Call the getImagingStudyData method with patient ID and modality filter for XRAY
    const patientId = '8d67df7f-1743-4083-a873-7786c38d55eb';
    const modality = 'XRAY';
    const imagingStudyData = await service.getImagingStudyData(patientId, `modality=${modality}`);

    // Print the imaging study data received from the server
    console.log("XRAY Imaging Study Data:", imagingStudyData);

    // Assert that imagingStudyData is not null and has expected properties
    expect(imagingStudyData).toBeDefined();
    // Add more assertions as needed
  });
});
