import { PatientInfoModel } from "./patient-info.model";


/**
 * Model representing a collection result of patient information.
 */
export class PatientInfoCollectionResultModel {
  entities: PatientInfoModel[];
  page: number;
  recordsPerPage: number;
  totalRecords: number;
  totalRecordsFiltered: number;
  queryParams: any; // You can replace 'any' with a specific type if needed

  constructor(
    entities: PatientInfoModel[],
    page: number,
    recordsPerPage: number,
    totalRecords: number,
    totalRecordsFiltered: number,
    queryParams: any // You can replace 'any' with a specific type if needed
  ) {
    this.entities = entities;
    this.page = page;
    this.recordsPerPage = recordsPerPage;
    this.totalRecords = totalRecords;
    this.totalRecordsFiltered = totalRecordsFiltered;
    this.queryParams = queryParams;
  }
}
