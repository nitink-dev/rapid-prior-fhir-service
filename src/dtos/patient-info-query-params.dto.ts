// patient-info-query-params.dto.ts

/**
 * Interface representing the query parameters for searching patients.
 */
export interface PatientInfoQueryParams {
    localId: string; // The local ID of the patient.
    system: string; // The system OID associated with the patient.
  }
  