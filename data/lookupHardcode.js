export const employmentTypeLookup = [
  { key: 1, value: "Full-Time (HC)" },
  { key: 2, value: "Part-Time (HC)" },
  { key: 3, value: "Freelance (HC)" },
  { key: 4, value: "Self-Employed (HC)" },
  { key: 5, value: "Temporary (HC)" },
  { key: 6, value: "Student (HC)" },
];
export const housingStatusLookup = [
  { key: 1, value: "Owned - Mortgage Paid (HC)" },
  { key: 2, value: "Owned - Mortgage Outstanding (HC)" },
  { key: 3, value: "Private Rental (HC)" },
  { key: 4, value: "Public Housing (HC)" },
  { key: 5, value: "Student Accomodation (HC)" },
  { key: 6, value: "Living With Family (HC)" },
  { key: 7, value: "Unhoused (HC)" },
];

export const loanTypeLookup = [
  { key: 1, value: "Personal (HC)" },
  { key: 2, value: "Mortgage (HC)" },
  { key: 3, value: "Automotive (HC)" },
];

/**
 * Some tables for dropdown lookups
 * Indexes
 * 0 - employment
 * 1 - housing
 * 2 - loan type
 */
export const lookupTableNames = ["employment", "housing", "loan type"]

/**
 * Primary field names for some tables, matching with lookupTableNames
 * Indexes
 * 0 - employmentTypeID
 * 1 - housingStatusID
 * 2 - loanTypeID
 */
export const lookupTablePrimaryKeys = ["employmentTypeID", "housingStatusID", "loanTypeID"]