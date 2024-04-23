"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFhirResponseDTO = exports.FhirResponseDTO = void 0;
class FhirResponseDTO {
    constructor(resourceType, type, timestamp, meta, // You can replace 'any' with a more specific type if needed
    entry, // You can replace 'any' with a more specific type if needed
    total, link, id) {
        this.resourceType = resourceType;
        this.type = type;
        this.timestamp = timestamp;
        this.meta = meta;
        this.entry = entry;
        this.total = total;
        this.link = link;
        this.id = id;
    }
}
exports.FhirResponseDTO = FhirResponseDTO;
// Utility function to transform response data into FhirResponseDTO instance
function createFhirResponseDTO(responseData) {
    return new FhirResponseDTO(responseData.resourceType, responseData.type, responseData.timestamp, responseData.meta, responseData.entry, responseData.total, responseData.link, responseData.id);
}
exports.createFhirResponseDTO = createFhirResponseDTO;
