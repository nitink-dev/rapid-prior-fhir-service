/**
 * Model representing the query parameters for searching patients.
 */
export class PatientInfoQueryParamsModel {
    public localId: string;
    public system: string;

    /**
     * Constructor for PatientInfoQueryParamsModel.
     * @param localId The local ID of the patient.
     * @param system The system OID associated with the patient.
     */
    constructor(localId: string, system: string) {
        this.localId = localId;
        this.system = system;
    }
}
