exports.drugList = [
    {
        drugName: "Combliflam",
        serialNo: "123433d3r3f234",
        mfgDate: "20-02-2020",
        expDate: "20-02-2025",
        companyCRN: "001",
        organization: "organization",
      },
      {
        drugName: "Zupar",
        serialNo: "1",
        mfgDate: "20-02-2020",
        eDate: "20-02-2025",
        companyCRN: "002",
        organization: "organization",
      },
      {
        drugName: "Crocin-4",
        serialNo: "4",
        mfgDate: "01-01-2019",
        expDate: "01-01-2025",
        companyCRN: "Upma",
        organization: "organization",
      }
]



exports.shipmentList = [
  {
    index: 0,
    buyerCRN: "Retailer1",
    drugName: "Retailer",
    listOfAsset: "Ludhiana",
    transporterCRN: "Suri Transport",
  },
  {
    index: 1,
    buyerCRN: "Retailer1",
    drugName: "Retailer",
    listOfAsset: "Ludhiana",
    transporterCRN: "Suri Transport",
  },
  {
    index: 2,
    buyerCRN: "Upma",
    drugName: "Zupar",
    listOfAsset: "Zupar-1",
    transporterCRN: "Suri Transport",
  }
]


exports.poList = [
  {
    buyerCRN: "DIST001",
    sellerCRN: "MAN001",
    drugName: "Paracetamol",
    quantity: "3",
    organization: "distributor",
  },
  {
    buyerCRN: "DIST002",
    sellerCRN: "MAN002",
    drugName: "Paracetamol-2",
    quantity: "4",
    organization: "distributor",
  },
  {
    buyerCRN: "DIST003",
    sellerCRN: "MAN003",
    drugName: "Paracetamol-3",
    quantity: "5",
    organization: "manufacturer",
  }
]