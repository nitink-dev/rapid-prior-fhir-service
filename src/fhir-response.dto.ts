class FhirResponseDTO {
  resourceType: string;
  type: string;
  timestamp: string;
  meta: any; // You can replace 'any' with a more specific type if needed
  entry: any[]; // You can replace 'any' with a more specific type if needed
  total: number;
  link: string;
  id: string;

  constructor(
    resourceType: string,
    type: string,
    timestamp: string,
    meta: any, // You can replace 'any' with a more specific type if needed
    entry: any[], // You can replace 'any' with a more specific type if needed
    total: number,
    link: string,
    id: string
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
function createFhirResponseDTO(responseData: any): FhirResponseDTO {
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

export { FhirResponseDTO, createFhirResponseDTO };
