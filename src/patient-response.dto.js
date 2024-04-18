export class PatientResponseDTO {
    constructor(
      identifier,
      active,
      name,
      telecom,
      gender,
      birthDate,
      deceasedBoolean,
      address,
      maritalStatus,
      multipleBirthInteger,
      id,
      meta
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
  
  