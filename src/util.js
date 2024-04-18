import { PatientResponseDTO } from './patient-response.dto.js';


export function extractPatientUrls(response) {
    const patientUrls = [];
    
    // Iterate through the entry array
    response.entry.forEach(entry => {
      // Check if the entry has a resource and the resource has a subject
      if (entry.resource && entry.resource.subject && entry.resource.subject.reference) {
        // Extract the subject reference URL and add it to the patientUrls array
        const subjectUrl = entry.resource.subject.reference;
        patientUrls.push(subjectUrl);
      }
    });
  
    return patientUrls;
  }

  export function transformPatientResponseToDTO(patientResponse) {
    return new PatientResponseDTO(
      patientResponse.identifier,
      patientResponse.active,
      patientResponse.name,
      patientResponse.telecom,
      patientResponse.gender,
      patientResponse.birthDate,
      patientResponse.deceasedBoolean,
      patientResponse.address,
      patientResponse.maritalStatus,
      patientResponse.multipleBirthInteger,
      patientResponse.id,
      patientResponse.meta
    );
  }

export function extractPatientDetails(patientResponseDTO) {
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
  