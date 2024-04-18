// https://server.fire.ly/ImagingStudy?_total=accurate&_count=1&_skip=5&_format=json

export default class FhirResponseDTO {
    constructor(
      resourceType,
      type,
      timestamp,
      meta,
      entry,
      total,
      link,
      id
    ) {
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
  
  // Utility function to transform response data into FhirResponseDTO instance
  export function createFhirResponseDTO(responseData) {
    return new FhirResponseDTO(
      responseData.resourceType,
      responseData.type,
      responseData.timestamp,
      responseData.meta,
      responseData.entry,
      responseData.total,
      responseData.link,
      responseData.id
    );
  }
  
  //module.exports = { FhirResponseDTO, createFhirResponseDTO };
  