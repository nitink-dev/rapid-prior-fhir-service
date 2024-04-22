class PatientResponseDTO {
  identifier: any; // You can replace 'any' with a more specific type if needed
  active: boolean;
  name: any; // You can replace 'any' with a more specific type if needed
  telecom: any[]; // You can replace 'any' with a more specific type if needed
  gender: string;
  birthDate: string;
  deceasedBoolean: boolean;
  address: any; // You can replace 'any' with a more specific type if needed
  maritalStatus: any; // You can replace 'any' with a more specific type if needed
  multipleBirthInteger: number;
  id: string;
  meta: any; // You can replace 'any' with a more specific type if needed

  constructor(
    identifier: any,
    active: boolean,
    name: any,
    telecom: any[], // You can replace 'any' with a more specific type if needed
    gender: string,
    birthDate: string,
    deceasedBoolean: boolean,
    address: any, // You can replace 'any' with a more specific type if needed
    maritalStatus: any, // You can replace 'any' with a more specific type if needed
    multipleBirthInteger: number,
    id: string,
    meta: any // You can replace 'any' with a more specific type if needed
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

export { PatientResponseDTO };
