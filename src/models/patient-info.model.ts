import { Element } from "fhir/r2";

/**
 * Model representing patient information.
 */
export class PatientInfoModel {
    name: string;
    mrn: string;
    dob: Element | undefined;
    gender: any;
  
    constructor(name: string, mrn: string, dob: Element, gender: Element) {
      this.name = name;
      this.mrn = mrn;
      this.dob = dob;
      this.gender = gender;
    }
  }
  