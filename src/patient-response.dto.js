"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientResponseDTO = void 0;
class PatientResponseDTO {
    constructor(identifier, active, name, telecom, // You can replace 'any' with a more specific type if needed
    gender, birthDate, deceasedBoolean, address, // You can replace 'any' with a more specific type if needed
    maritalStatus, // You can replace 'any' with a more specific type if needed
    multipleBirthInteger, id, meta // You can replace 'any' with a more specific type if needed
    ) {
        this.identifier = identifier;
        this.active = active;
        this.name = name;
        this.telecom = telecom;
        this.gender = gender;
        this.birthDate = birthDate;
        this.deceasedBoolean = deceasedBoolean;
        this.address = address;
        this.maritalStatus = maritalStatus;
        this.multipleBirthInteger = multipleBirthInteger;
        this.id = id;
        this.meta = meta;
    }
}
exports.PatientResponseDTO = PatientResponseDTO;
