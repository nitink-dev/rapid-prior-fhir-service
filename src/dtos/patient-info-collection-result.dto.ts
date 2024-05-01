import { PatientInfo } from './patient-info.dto';

/**
 * Interface representing a collection result of patient information.
 */
export interface PatientInfoCollectionResult {
  entities: PatientInfo[];
  page: number;
  recordsPerPage: number;
  totalRecords: number;
  totalRecordsFiltered: number;
  queryParams: any; // You can replace 'any' with a specific type if needed
}
