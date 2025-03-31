export interface Contact {
  id: string;
  phone?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}

export interface GHLContact extends Contact {
  locationId: string;
  searchAfter: any[];
}