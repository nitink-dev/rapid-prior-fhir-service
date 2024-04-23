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
Object.defineProperty(exports, "__esModule", { value: true });
class ImagingStudySearch {
    constructor(criteria) {
        this.criteria = criteria;
    }
    imagingStudySearch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Make a GET request to the FHIR server
                const response = yield fetch('https://server.fire.ly/ImagingStudy?_total=accurate&_count=5&_skip=5&_format=json');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Extract the data from the response
                const data = yield response.json();
                // Return the extracted data
                return data;
            }
            catch (error) {
                // Handle errors
                console.error('Error searching for ImagingStudy records:', error);
                throw error;
            }
        });
    }
    patientSearch(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Make a GET request to the patient URL
                const response = yield fetch(criteria.url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Return the response data
                return yield response.json();
            }
            catch (error) {
                console.error('Error fetching patient data from: ', criteria.url);
                throw error;
            }
        });
    }
}
exports.default = ImagingStudySearch;
