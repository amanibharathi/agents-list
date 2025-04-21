const yourProffExpDetailsOptions = {
  transactions: [
    { label: "0-3", value: "0-3" },
    { label: "4-10", value: "4-10" },
    { label: "10+", value: "10+" },
  ],
  productionVolume: [
    { label: "$0-$1M", value: "$0-$1M" },
    { label: "$1-$5M", value: "$1-$5M" },
    { label: "$5-$10M", value: "$5-$10M" },
    { label: "$10-20M", value: "$10-20M" },
    { label: "$20M+", value: "$20M+" },
  ],
  transactionTypes: [
    { label: "Residential Sales", value: "Residential Sales" },
    { label: "Commercial Sales", value: "Commercial Sales" },
    { label: "Residential Leases", value: "Residential Leases" },
    { label: "Commercial Leases", value: "Commercial Leases" },
    { label: "Referrals", value: "Referrals" },
    { label: "Farm & Ranch", value: "Farm & Ranch" },
    { label: "Land", value: "Land" },
    { label: "Short Sale", value: "Short Sale" },
    { label: "Foreclosure", value: "Foreclosure" },
  ],
  additionalServices: [
    { label: "Mortgage", value: "Mortgage" },
    { label: "Insurance", value: "Insurance" },
    { label: "Escrow / Title", value: "Escrow / Title" },
    { label: "Property Management", value: "Property Management" },
    { label: "None of the above", value: "None of the above" },
  ],
  propertiesUnderContract: [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ],
};

const yourEmergencyContactOptions = {
  relationship: [
    { label: "Spouse", value: "Spouse" },
    { label: "Child", value: "Child" },
    { label: "Parent", value: "Parent" },
    { label: "Friend", value: "Friend" },
    { label: "Other", value: "Other" },
  ],
};

const licenseDetailsOptions = {
  licenseType: [
    { label: "Broker", value: "broker" },
    { label: "Sales Person", value: "sales_person" },
  ],
};

export {
  yourProffExpDetailsOptions,
  yourEmergencyContactOptions,
  licenseDetailsOptions,
};
