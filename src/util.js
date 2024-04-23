"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPatientDetails = exports.transformPatientResponseToDTO = exports.extractPatientUrls = void 0;
const patient_response_dto_1 = require("./patient-response.dto");
function extractPatientUrls(response) {
    const patientUrls = [];
    // Iterate through the entry array
    response.entry.forEach((entry) => {
        // Check if the entry has a resource and the resource has a subject
        if (entry.resource && entry.resource.subject && entry.resource.subject.reference) {
            // Extract the subject reference URL and add it to the patientUrls array
            const subjectUrl = entry.resource.subject.reference;
            patientUrls.push(subjectUrl);
        }
    });
    return patientUrls;
}
exports.extractPatientUrls = extractPatientUrls;
function transformPatientResponseToDTO(patientResponse) {
    return new patient_response_dto_1.PatientResponseDTO(patientResponse.identifier, patientResponse.active, patientResponse.name, patientResponse.telecom, patientResponse.gender, patientResponse.birthDate, patientResponse.deceasedBoolean, patientResponse.address, patientResponse.maritalStatus, patientResponse.multipleBirthInteger, patientResponse.id, patientResponse.meta);
}
exports.transformPatientResponseToDTO = transformPatientResponseToDTO;
function extractPatientDetails(patientResponseDTO) {
    const { name, gender, birthDate, address } = patientResponseDTO;
    // Extracting address details
    const { line, city, state, postalCode, country } = address[0];
    // Extracting name details
    const { family, given } = name[0];
    return {
        name: `${given.join(' ')} ${family}`, // Combine given name(s) and family name
        gender,
        birthDate,
        address: {
            line: line.join(', '), // Combine address lines into a single string
            city,
            state,
            postalCode,
            country
        }
    };
}
exports.extractPatientDetails = extractPatientDetails;
