"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the ImagingStudySearch class and the utility function
const fhir_service_1 = __importDefault(require("../src/fhir-service"));
const fhir_response_dto_1 = require("../src/fhir-response.dto");
const util_1 = require("../src/util");
function testImagingStudySearch() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Instantiate the ImagingStudySearch class
            const search = new fhir_service_1.default({
                system: '',
                localId: "",
                url: ''
            });
            // Call the search method
            const responseData = yield search.imagingStudySearch();
            // Create an instance of the FhirResponseDTO using the utility function
            const responseDTO = (0, fhir_response_dto_1.createFhirResponseDTO)(responseData);
            // Print the response DTO
            console.log('Response:', responseDTO);
            console.log('Response Entry:', responseDTO.entry);
            // Extract patient URLs from the response DTO
            const patientUrls = (0, util_1.extractPatientUrls)(responseDTO);
            console.log('Patient Urls : ', patientUrls);
            // Iterate over patient URLs and perform patient search
            patientUrls.forEach(url => {
                const criteria = {
                    system: '',
                    localId: '',
                    url: url
                };
                testPatientSearch(criteria);
            });
        }
        catch (error) {
            // Handle errors
            console.error('Error:', error);
        }
    });
}
function testPatientSearch(criteria) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Instantiate the ImagingStudySearch class
            const search = new fhir_service_1.default({
                system: '',
                localId: "",
                url: ''
            });
            // Call the getPatientData method with criteria
            const patientResponse = yield search.patientSearch(criteria);
            // Transform patient response to DTO
            const patientDTO = (0, util_1.transformPatientResponseToDTO)(patientResponse);
            // Extract patient details from DTO
            const patientDetails = (0, util_1.extractPatientDetails)(patientDTO);
            // Print the patient details
            console.log(patientDetails);
        }
        catch (error) {
            // Handle errors
            // console.error('Error:', error);
        }
    });
}
// Call the test function
testImagingStudySearch();
