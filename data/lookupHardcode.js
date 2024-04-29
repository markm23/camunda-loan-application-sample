export const employmentTypeLookup = [
  { employmentTypeID: 1, name: "Full-Time (HC)" },
  { employmentTypeID: 2, name: "Part-Time (HC)" },
  { employmentTypeID: 3, name: "Freelance (HC)" },
  { employmentTypeID: 4, name: "Self-Employed (HC)" },
  { employmentTypeID: 5, name: "Temporary (HC)" },
  { employmentTypeID: 6, name: "Student (HC)" },
];
export const housingStatusLookup = [
  { housingStatusID: 1, name: "Owned - Mortgage Paid (HC)" },
  { housingStatusID: 2, name: "Owned - Mortgage Outstanding (HC)" },
  { housingStatusID: 3, name: "Private Rental (HC)" },
  { housingStatusID: 4, name: "Public Housing (HC)" },
  { housingStatusID: 5, name: "Student Accomodation (HC)" },
  { housingStatusID: 6, name: "Living With Family (HC)" },
  { housingStatusID: 7, name: "Unhoused (HC)" },
];

export const loanTypeLookup = [
  { loanTypeID: 1, name: "Personal (HC)" },
  { loanTypeID: 2, name: "Mortgage (HC)" },
  { loanTypeID: 3, name: "Automotive (HC)" },
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
 * 0 - employmentStatusID
 * 1 - housingStatusID
 * 2 - loanTypeID
 */
export const lookupTablePrimaryKeys = ["employmentStatusID", "housingStatusID", "loanTypeID"]