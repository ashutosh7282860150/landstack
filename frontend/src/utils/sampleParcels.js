// Comprehensive Land Parcels Dataset across Indian States
// Supports hierarchical location: State -> District -> Taluka/Block -> Village
// Includes ULPIN, Khasra, Survey No, Ready Reckoner Valuation, Ownership, Agriculture, Encumbrance, Litigation, Mutations

export const INITIAL_PARCELS = [
  // 1. MAHARASHTRA - Pune (Mulshi / Hinjawadi)
  {
    "ulpin": "IN-MH-PUN-2024-009871",
    "bhuAadhaar": "27-025-0142-0002A",
    "surveyNo": "142/2A",
    "subDivision": "2A",
    "khasraNo": "142/2A",
    "plotNo": "NA (Agricultural Cadastre)",
    "location": {
      "state": "Maharashtra",
      "district": "Pune",
      "taluka": "Mulshi",
      "village": "Hinjawadi",
      "pincode": "411057",
      "sroOffice": "SRO Mulshi-II (Paud)",
      "municipalBody": "PMRDA (Pune Metropolitan Region Dev. Authority)",
      "center": [18.5912, 73.7389]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [73.7375, 18.5905],
          [73.7405, 18.5908],
          [73.7402, 18.5925],
          [73.7378, 18.5921],
          [73.7375, 18.5905]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 2.45,
      "areaAcres": 6.05,
      "areaBigha": 9.8,
      "areaGuntha": 242,
      "areaSqMeters": 24500,
      "perimeterMeters": 640,
      "elevationMeters": 562,
      "surveyDate": "2024-02-15",
      "surveyMethod": "DGPS & Drone Cadastral Mapping (SVAMITVA Standard)",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Agricultural (Jirayat - Seasonal Irrigated)",
    "landUseCategory": "Agricultural",
    "colorCode": "#059669",
    "status": "Clear Title / Active Agricultural",
    "riskScore": 98,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 4500,
      "readyReckonerValue": 110250000,
      "estimatedMarketValue": 145000000,
      "stampDutyApplicable": "7% (State + LBT + Metro Cess)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "Maharashtra 7/12 & 8A Extract",
      "khataNumber": "KH-489/2024",
      "soilClass": "Medium Black Cotton (Class II)",
      "irrigationSource": "Pawana River Left Canal & Borewell",
      "cropPattern": "Kharif: Soybean, Rabi: Wheat / Vegetables",
      "cultivatorType": "Self Cultivated (Khatedar)",
      "landRevenueAssessment": "₹ 48.50 / year",
      "owners": [
        {
          "name": "Rameshwar Dattatray Patil",
          "relation": "S/o Dattatray Patil",
          "share": 60,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX9284",
          "panMasked": "ABCXXXX78F",
          "phoneMasked": "+91 98XXX XX312",
          "address": "At Post Hinjawadi, Taluka Mulshi, Dist. Pune 411057"
        },
        {
          "name": "Sunita Rameshwar Patil",
          "relation": "W/o Rameshwar Patil",
          "share": 40,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX1109",
          "panMasked": "BKJXXXX44D",
          "phoneMasked": "+91 98XXX XX312",
          "address": "At Post Hinjawadi, Taluka Mulshi, Dist. Pune 411057"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-PUN-2018-8812",
          "date": "2018-06-14",
          "type": "Succession / Virasat (Farishte)",
          "orderNo": "TAL/MUL/MUT/18/88",
          "officer": "Circle Officer, Hinjawadi Circle",
          "status": "Certified & RoR Updated"
        },
        {
          "mutationNo": "MUT-PUN-2022-3104",
          "date": "2022-11-20",
          "type": "Bank Crop Hypothecation Entry",
          "orderNo": "BOM/AGRI/HYP/2022/9",
          "officer": "Talathi, Saja Hinjawadi",
          "status": "Lien Recorded in Other Rights Column"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-PUN-2018-009412",
      "deedType": "Partition & Family Settlement Deed",
      "registrationDate": "2018-06-10",
      "considerationAmount": 0,
      "stampDutyPaid": 12500,
      "subRegistrarCode": "SRO-PUN-MUL-02"
    },
    "planningZoning": {
      "masterPlan": "PMRDA Regional Development Plan 2038",
      "zone": "Green Zone-1 (Agricultural / Agritourism Permitted)",
      "permissibleFAR": 0.20,
      "maxHeightMeters": 9.0,
      "roadWidthFrontage": "12.0 Meter DP Road Proposed",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Not in Eco-Sensitive Zone"
    },
    "encumbrance": {
      "hasLien": true,
      "bankName": "Bank of Maharashtra",
      "branch": "Hinjawadi Branch",
      "loanType": "Kisan Credit Card (Agri Term Loan)",
      "sanctionAmount": 850000,
      "cersaiId": "CER-2022-AGR-99812",
      "clearanceStatus": "Active Mortgage (Sub-Registrar Lien Active)"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "Civil Court Senior Division, Pune",
      "interimStay": false,
      "status": "No Pending Disputes Reported in e-Courts Registry"
    },
    "propertyTax": {
      "annualDemand": 1200,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-01-10",
      "receiptNo": "PMRDA-TAX-2024-771"
    }
  },

  // 2. MAHARASHTRA - Pune (Haveli / Wagholi)
  {
    "ulpin": "IN-MH-PUN-2024-015523",
    "bhuAadhaar": "27-025-0819-0012B",
    "surveyNo": "819/12B",
    "subDivision": "12B",
    "khasraNo": "819/12B",
    "plotNo": "Plot C-4, Prime Enclave",
    "location": {
      "state": "Maharashtra",
      "district": "Pune",
      "taluka": "Haveli",
      "village": "Wagholi",
      "pincode": "412207",
      "sroOffice": "SRO Haveli-V",
      "municipalBody": "PMC (Pune Municipal Corporation)",
      "center": [18.5801, 73.9782]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [73.9765, 18.5792],
          [73.9802, 18.5795],
          [73.9798, 18.5815],
          [73.9769, 18.5811],
          [73.9765, 18.5792]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 1.15,
      "areaAcres": 2.84,
      "areaBigha": 4.6,
      "areaGuntha": 113.6,
      "areaSqMeters": 11500,
      "perimeterMeters": 460,
      "elevationMeters": 570,
      "surveyDate": "2023-11-04",
      "surveyMethod": "DGPS Total Station Survey",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Non-Agricultural (Commercial / Mixed Use NA)",
    "landUseCategory": "Commercial",
    "colorCode": "#2563eb",
    "status": "Clear Title / NA Sanctioned",
    "riskScore": 95,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 18500,
      "readyReckonerValue": 212750000,
      "estimatedMarketValue": 260000000,
      "stampDutyApplicable": "7% (State + LBT + Metro Cess)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "Maharashtra 7/12 (NA Form 8A)",
      "khataNumber": "KH-902/2024",
      "soilClass": "NA Converted (Urban Land)",
      "irrigationSource": "PMC Municipal Water Connection",
      "cropPattern": "Non-Agricultural / Commercial Complex",
      "cultivatorType": "Owner / Commercial Developer",
      "landRevenueAssessment": "₹ 1,840.00 / year",
      "owners": [
        {
          "name": "Kailash Realty & Infra LLP",
          "relation": "Managing Partner: Aditya Shinde",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX5521",
          "panMasked": "AAAFKXXXXL",
          "phoneMasked": "+91 97XXX XX444",
          "address": "Office 402, Trade Hub, Nagar Road, Pune 411014"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-PUN-2021-4401",
          "date": "2021-04-18",
          "type": "Non-Agricultural (NA) Order Sanction",
          "orderNo": "COLL/PUN/NA/2021/119",
          "officer": "Collector Pune",
          "status": "Certified & NA Status Updated"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-PUN-2021-004491",
      "deedType": "Registered Conveyance Deed",
      "registrationDate": "2021-05-12",
      "considerationAmount": 185000000,
      "stampDutyPaid": 12950000,
      "subRegistrarCode": "SRO-PUN-HAV-05"
    },
    "planningZoning": {
      "masterPlan": "PMC Comprehensive Master Plan 2041",
      "zone": "Commercial C-2 Zone",
      "permissibleFAR": 2.50,
      "maxHeightMeters": 45.0,
      "roadWidthFrontage": "24.0 Meter DP Road",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": false,
      "bankName": "None",
      "branch": "N/A",
      "loanType": "Clear Title / No Charge",
      "sanctionAmount": 0,
      "cersaiId": "CER-NIL",
      "clearanceStatus": "No Active Mortgage / Encumbrance Certificate Issued"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "N/A",
      "interimStay": false,
      "status": "Clear Title Verified"
    },
    "propertyTax": {
      "annualDemand": 45000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-02-14",
      "receiptNo": "PMC-TX-2024-8890"
    }
  },

  // 3. KARNATAKA - Bengaluru Urban (Anekal / Electronic City)
  {
    "ulpin": "IN-KA-BLR-2024-084912",
    "bhuAadhaar": "29-018-0088-00010",
    "surveyNo": "88/1",
    "subDivision": "1",
    "khasraNo": "88/1",
    "plotNo": "Plot 12-A, E-City Phase II",
    "location": {
      "state": "Karnataka",
      "district": "Bengaluru Urban",
      "taluka": "Anekal",
      "village": "Electronic City",
      "pincode": "560100",
      "sroOffice": "SRO Anekal",
      "municipalBody": "BMRDA / ELCITA Municipal Authority",
      "center": [12.8452, 77.6602]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.6585, 12.8441],
          [77.6625, 12.8443],
          [77.6621, 12.8468],
          [77.6588, 12.8465],
          [77.6585, 12.8441]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 1.80,
      "areaAcres": 4.45,
      "areaBigha": 7.2,
      "areaGuntha": 178,
      "areaSqMeters": 18000,
      "perimeterMeters": 580,
      "elevationMeters": 915,
      "surveyDate": "2023-12-08",
      "surveyMethod": "DGPS & LIDAR Cadastral Survey (Bhoomi Standard)",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Industrial & IT Park (Hi-Tech Zone)",
    "landUseCategory": "Industrial",
    "colorCode": "#7c3aed",
    "status": "Clear Title / KIADB Allotted",
    "riskScore": 96,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 28000,
      "readyReckonerValue": 504000000,
      "estimatedMarketValue": 680000000,
      "stampDutyApplicable": "5.65% (Karnataka Stamp Act)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "Karnataka Bhoomi RTC (Pahani) Form-16",
      "khataNumber": "E-KHATA-BLR-99120",
      "soilClass": "Red Laterite (Urban Converted)",
      "irrigationSource": "BWSSB Industrial Water Line",
      "cropPattern": "IT / Electronics R&D Campus",
      "cultivatorType": "KIADB Industrial Lease-cum-Sale",
      "landRevenueAssessment": "₹ 3,420 / year",
      "owners": [
        {
          "name": "Zenith Techpark Solutions Pvt Ltd",
          "relation": "Authorized Signatory: Priya Swaminathan",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX8831",
          "panMasked": "AABCPXXXXM",
          "phoneMasked": "+91 94XXX XX800",
          "address": "Campus 4B, Electronic City Phase 2, Bengaluru 560100"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-KA-BLR-2020-0081",
          "date": "2020-09-15",
          "type": "KIADB Allotment & Bhoomi RTC Mutation",
          "orderNo": "KIADB/ALLOT/BLR/2020/41",
          "officer": "Tahsildar Anekal",
          "status": "Certified & Digitally Signed"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-BLR-ANK-2020-003881",
      "deedType": "KIADB 99-Year Lease Deed",
      "registrationDate": "2020-09-02",
      "considerationAmount": 420000000,
      "stampDutyPaid": 23730000,
      "subRegistrarCode": "SRO-KA-BLR-ANK"
    },
    "planningZoning": {
      "masterPlan": "BMRDA Revised Master Plan 2031",
      "zone": "Industrial Hi-Tech (T-1 Zone)",
      "permissibleFAR": 3.00,
      "maxHeightMeters": 60.0,
      "roadWidthFrontage": "30.0 Meter Arterial Road",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": true,
      "bankName": "State Bank of India",
      "branch": "CAG Branch, Bengaluru",
      "loanType": "Commercial Infrastructure Project Loan",
      "sanctionAmount": 150000000,
      "cersaiId": "CER-2021-INFRA-8812",
      "clearanceStatus": "Active Project Mortgage Registered with CERSAI"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "City Civil Court Bengaluru",
      "interimStay": false,
      "status": "Clear Title / No Injunctions"
    },
    "propertyTax": {
      "annualDemand": 120000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-03-01",
      "receiptNo": "ELCITA-TAX-2024-0192"
    }
  },

  // 4. KARNATAKA - Bengaluru Urban (Bengaluru East / Whitefield)
  {
    "ulpin": "IN-KA-BLR-2024-099418",
    "bhuAadhaar": "29-018-0402-0005C",
    "surveyNo": "402/5C",
    "subDivision": "5C",
    "khasraNo": "402/5C",
    "plotNo": "Plot 58, Palm Meadows Extension",
    "location": {
      "state": "Karnataka",
      "district": "Bengaluru Urban",
      "taluka": "Bengaluru East",
      "village": "Whitefield",
      "pincode": "560066",
      "sroOffice": "SRO K.R. Puram",
      "municipalBody": "BBMP (Bruhat Bengaluru Mahanagara Palike)",
      "center": [12.9698, 77.7499]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.7481, 12.9685],
          [77.7515, 12.9688],
          [77.7511, 12.9712],
          [77.7484, 12.9709],
          [77.7481, 12.9685]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 0.85,
      "areaAcres": 2.10,
      "areaBigha": 3.4,
      "areaGuntha": 84,
      "areaSqMeters": 8500,
      "perimeterMeters": 380,
      "elevationMeters": 890,
      "surveyDate": "2024-01-20",
      "surveyMethod": "DGPS Survey & e-Swathu Cadastral Sync",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Residential (R-2 Zone Converted)",
    "landUseCategory": "Residential",
    "colorCode": "#d97706",
    "status": "Clear Title / A-Khata Registered",
    "riskScore": 97,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 32000,
      "readyReckonerValue": 272000000,
      "estimatedMarketValue": 350000000,
      "stampDutyApplicable": "5.65%",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "BBMP e-Khata Certificate (Form-A)",
      "khataNumber": "BBMP-PID-1049281",
      "soilClass": "Urban Converted Land",
      "irrigationSource": "BBMP Municipal Water Supply",
      "cropPattern": "Residential Apartment Project",
      "cultivatorType": "Private Residential Landowner",
      "landRevenueAssessment": "₹ 2,100 / year",
      "owners": [
        {
          "name": "Narayana Murthy Hegde",
          "relation": "S/o Subrahmanya Hegde",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX7722",
          "panMasked": "ABCPHXXXXR",
          "phoneMasked": "+91 98XXX XX119",
          "address": "Villa 12, Whitefield Main Road, Bengaluru 560066"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-KA-BLR-2019-9941",
          "date": "2019-11-12",
          "type": "e-Swathu to BBMP A-Khata Transition",
          "orderNo": "BBMP/REV/KH/2019/58",
          "officer": "Assistant Revenue Officer, Whitefield Ward",
          "status": "Certified & e-Khata Issued"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-BLR-KRP-2019-012891",
      "deedType": "Sale Deed",
      "registrationDate": "2019-10-25",
      "considerationAmount": 240000000,
      "stampDutyPaid": 13560000,
      "subRegistrarCode": "SRO-KA-BLR-KRP"
    },
    "planningZoning": {
      "masterPlan": "BBMP Comprehensive Development Plan 2031",
      "zone": "Residential R-2 Zone",
      "permissibleFAR": 2.25,
      "maxHeightMeters": 36.0,
      "roadWidthFrontage": "18.0 Meter Public Road",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": false,
      "bankName": "HDFC Bank (Cleared)",
      "branch": "Whitefield",
      "loanType": "Home Construction Loan",
      "sanctionAmount": 0,
      "cersaiId": "CER-2019-HDF-7718",
      "clearanceStatus": "No Objection Certificate (NOC) Issued / Lien Closed"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "N/A",
      "interimStay": false,
      "status": "Clear Title / Certified Non-Encumbrance"
    },
    "propertyTax": {
      "annualDemand": 28000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-04-05",
      "receiptNo": "BBMP-SAS-2024-88192"
    }
  },

  // 5. UTTAR PRADESH - Varanasi (Pindra / Babatpur)
  {
    "ulpin": "IN-UP-VAR-2024-019482",
    "bhuAadhaar": "09-184-0512-00000",
    "surveyNo": "512",
    "subDivision": "0",
    "khasraNo": "Gata 512",
    "plotNo": "Gata 512 (Highway Frontage)",
    "location": {
      "state": "Uttar Pradesh",
      "district": "Varanasi",
      "taluka": "Pindra",
      "village": "Babatpur",
      "pincode": "221006",
      "sroOffice": "SRO Pindra",
      "municipalBody": "VDA (Varanasi Development Authority)",
      "center": [25.4475, 82.8592]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [82.8572, 25.4461],
          [82.8615, 25.4464],
          [82.8611, 25.4489],
          [82.8576, 25.4485],
          [82.8572, 25.4461]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 3.20,
      "areaAcres": 7.90,
      "areaBigha": 12.8,
      "areaGuntha": 316,
      "areaSqMeters": 32000,
      "perimeterMeters": 780,
      "elevationMeters": 84,
      "surveyDate": "2023-10-18",
      "surveyMethod": "DGPS & UP Bhulekh Total Station Integration",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Agricultural (Alluvial Fertile - Canal Irrigated)",
    "landUseCategory": "Agricultural",
    "colorCode": "#dc2626",
    "status": "Flagged / Civil Court Interim Stay Order",
    "riskScore": 42,
    "riskLevel": "High Risk (Active Litigation)",
    "valuation": {
      "circleRatePerSqM": 3200,
      "readyReckonerValue": 102400000,
      "estimatedMarketValue": 130000000,
      "stampDutyApplicable": "7% (UP Stamp Act)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "UP Bhulekh Khatauni (Khatiyan Extract)",
      "khataNumber": "KH-312/1430F",
      "soilClass": "Gangetic Alluvium (Domat / Sandy Loam)",
      "irrigationSource": "Sharda Sahayak Feeder Canal & Tubewell",
      "cropPattern": "Kharif: Paddy, Rabi: Wheat / Mustard",
      "cultivatorType": "Co-Sharers (Disputed Succession)",
      "landRevenueAssessment": "₹ 64.00 / year (Lagaan)",
      "owners": [
        {
          "name": "Awadhesh Prasad Tiwari",
          "relation": "S/o Late Ram Sundar Tiwari",
          "share": 50,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX3319",
          "panMasked": "ADXPTXXXXH",
          "phoneMasked": "+91 94XXX XX211",
          "address": "Village Babatpur, Tehsil Pindra, Dist. Varanasi 221006"
        },
        {
          "name": "Brijesh Prasad Tiwari (Disputed Co-Sharer)",
          "relation": "S/o Late Ram Sundar Tiwari",
          "share": 50,
          "aadhaarSeeded": false,
          "aadhaarMasked": "XXXXXXXX0918",
          "panMasked": "Unseeded",
          "phoneMasked": "+91 99XXX XX542",
          "address": "Village Babatpur, Tehsil Pindra, Dist. Varanasi 221006"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-UP-VAR-2022-1082",
          "date": "2022-03-14",
          "type": "Virasat Entry (Challenged in Court)",
          "orderNo": "NAIB/PIN/VIR/2022/108",
          "officer": "Naib Tehsildar, Pindra Circle",
          "status": "Under Judicial Review / Sub-Judice"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-VAR-PIN-2015-001201",
      "deedType": "Inheritance Document / Will Registration",
      "registrationDate": "2015-08-20",
      "considerationAmount": 0,
      "stampDutyPaid": 500,
      "subRegistrarCode": "SRO-UP-VAR-PIN"
    },
    "planningZoning": {
      "masterPlan": "Varanasi Master Plan 2031 (Airport Influence Corridor)",
      "zone": "Agricultural Zone (Restricted Development Zone)",
      "permissibleFAR": 0.25,
      "maxHeightMeters": 7.5,
      "roadWidthFrontage": "15.0 Meter PWD Road",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": false,
      "bankName": "None",
      "branch": "N/A",
      "loanType": "No Bank Mortgage",
      "sanctionAmount": 0,
      "cersaiId": "CER-NIL",
      "clearanceStatus": "Clear of Bank Mortgages, but Flagged for Court Injunction"
    },
    "litigation": {
      "hasLitigation": true,
      "caseNumber": "Civil Suit No. 2023/184",
      "courtName": "Civil Judge (Senior Division), Varanasi",
      "interimStay": true,
      "status": "Temporary Injunction under Order 39 Rule 1 & 2 CPC Active. Alienation / Sale Restricted."
    },
    "propertyTax": {
      "annualDemand": 850,
      "duesPending": 1700,
      "paymentStatus": "Dues Pending (2 Years)",
      "lastPaymentDate": "2022-05-18",
      "receiptNo": "REV-LGN-2022-441"
    }
  },

  // 6. UTTAR PRADESH - Gautam Buddha Nagar (Dadri / Knowledge Park)
  {
    "ulpin": "IN-UP-GBN-2024-041890",
    "bhuAadhaar": "09-201-0220-0004A",
    "surveyNo": "220/4A",
    "subDivision": "4A",
    "khasraNo": "Khasra 220",
    "plotNo": "Institutional Plot KP-III/18",
    "location": {
      "state": "Uttar Pradesh",
      "district": "Gautam Buddha Nagar",
      "taluka": "Dadri",
      "village": "Knowledge Park",
      "pincode": "201310",
      "sroOffice": "SRO Greater Noida",
      "municipalBody": "GNIDA (Greater Noida Industrial Dev. Authority)",
      "center": [28.4682, 77.5115]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5095, 28.4671],
          [77.5135, 28.4674],
          [77.5131, 28.4698],
          [77.5099, 28.4695],
          [77.5095, 28.4671]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 2.05,
      "areaAcres": 5.06,
      "areaBigha": 8.2,
      "areaGuntha": 202.4,
      "areaSqMeters": 20500,
      "perimeterMeters": 610,
      "elevationMeters": 198,
      "surveyDate": "2024-01-14",
      "surveyMethod": "DGPS & GNIDA Master Cadastral Layer",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Institutional (University / Research Campus)",
    "landUseCategory": "Institutional",
    "colorCode": "#4f46e5",
    "status": "Clear Title / GNIDA 90-Yr Lease",
    "riskScore": 99,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 22000,
      "readyReckonerValue": 451000000,
      "estimatedMarketValue": 580000000,
      "stampDutyApplicable": "5% (Institutional Concession)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "GNIDA Institutional Cadastral Ledger",
      "khataNumber": "GNIDA-KP3-PLT-18",
      "soilClass": "Yamuna Floodplain Alluvium (Stable Foundation)",
      "irrigationSource": "GNIDA Recycled STP Water Line",
      "cropPattern": "Academic Campus & Advanced Research Labs",
      "cultivatorType": "Educational Trust / Institute",
      "landRevenueAssessment": "₹ 8,200 / year (Authority Maintenance)",
      "owners": [
        {
          "name": "Aryavart Foundation of Technical Education",
          "relation": "Trustee & Secretary: Dr. Vinod Kashyap",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX6601",
          "panMasked": "AAATAXXXXP",
          "phoneMasked": "+91 98XXX XX771",
          "address": "Plot KP-III/18, Greater Noida, Gautam Buddha Nagar 201310"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-UP-GNIDA-2021-098",
          "date": "2021-08-11",
          "type": "GNIDA Institutional Lease Execution",
          "orderNo": "GNIDA/INST/2021/892",
          "officer": "CEO, Greater Noida Authority",
          "status": "Certified & Allotment Active"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-NOIDA-DAD-2021-008121",
      "deedType": "90-Year Institutional Lease Deed",
      "registrationDate": "2021-08-25",
      "considerationAmount": 390000000,
      "stampDutyPaid": 19500000,
      "subRegistrarCode": "SRO-UP-NOI-01"
    },
    "planningZoning": {
      "masterPlan": "GNIDA Master Plan 2031",
      "zone": "Institutional Zone (Education & R&D)",
      "permissibleFAR": 2.00,
      "maxHeightMeters": 40.0,
      "roadWidthFrontage": "45.0 Meter Express Boulevard",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": false,
      "bankName": "None",
      "branch": "N/A",
      "loanType": "No Mortgage",
      "sanctionAmount": 0,
      "cersaiId": "CER-NIL",
      "clearanceStatus": "Free of Encumbrances"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "N/A",
      "interimStay": false,
      "status": "Clear Title / No Disputes"
    },
    "propertyTax": {
      "annualDemand": 55000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-02-28",
      "receiptNo": "GNIDA-TAX-2024-118"
    }
  },

  // 7. GUJARAT - Ahmedabad (Sanand / Bol)
  {
    "ulpin": "IN-GJ-AHM-2024-055819",
    "bhuAadhaar": "24-007-0210-0000P",
    "surveyNo": "210/P",
    "subDivision": "P",
    "khasraNo": "210/P",
    "plotNo": "Plot GIDC-SN-88",
    "location": {
      "state": "Gujarat",
      "district": "Ahmedabad",
      "taluka": "Sanand",
      "village": "Bol",
      "pincode": "382170",
      "sroOffice": "SRO Sanand",
      "municipalBody": "GIDC (Gujarat Industrial Dev. Corp.)",
      "center": [22.9812, 72.3789]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [72.3768, 22.9798],
          [72.3812, 22.9802],
          [72.3808, 22.9828],
          [72.3772, 22.9824],
          [72.3768, 22.9798]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 4.10,
      "areaAcres": 10.13,
      "areaBigha": 16.4,
      "areaGuntha": 405.2,
      "areaSqMeters": 41000,
      "perimeterMeters": 850,
      "elevationMeters": 48,
      "surveyDate": "2023-09-22",
      "surveyMethod": "DGPS & Gujarat AnyRoR DILRMP Verification",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Industrial (Heavy Automobile & EV Ancillary GIDC)",
    "landUseCategory": "Industrial",
    "colorCode": "#7c3aed",
    "status": "Clear Title / GIDC Allotted",
    "riskScore": 99,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 7500,
      "readyReckonerValue": 307500000,
      "estimatedMarketValue": 420000000,
      "stampDutyApplicable": "4.9% (Gujarat Industrial Policy Incentive)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "Gujarat AnyRoR Village Form 7/12 & 8A",
      "khataNumber": "VF7-SAN-2104",
      "soilClass": "Goradu / Loamy Sandy Soil",
      "irrigationSource": "Narmada Canal Industrial Offtake Line",
      "cropPattern": "Automotive Stamping & EV Battery Assembly Facility",
      "cultivatorType": "GIDC Industrial Allottee",
      "landRevenueAssessment": "₹ 5,120 / year",
      "owners": [
        {
          "name": "Astra Mobility Technologies Pvt Ltd",
          "relation": "Director: Bhavesh Shah",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX4190",
          "panMasked": "AACCAXXXXN",
          "phoneMasked": "+91 98XXX XX099",
          "address": "Plot 88, GIDC Industrial Estate Sanand-II, Ahmedabad 382170"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-GJ-AHM-2022-0412",
          "date": "2022-05-19",
          "type": "GIDC NA Conversion & Village Form 6 Entry",
          "orderNo": "COL/AHM/GIDC/2022/194",
          "officer": "Mamlatdar Sanand",
          "status": "Certified & RoR Synchronized"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-AHM-SAN-2022-007718",
      "deedType": "GIDC Industrial Lease Deed",
      "registrationDate": "2022-06-05",
      "considerationAmount": 280000000,
      "stampDutyPaid": 13720000,
      "subRegistrarCode": "SRO-GJ-AHM-SAN"
    },
    "planningZoning": {
      "masterPlan": "Sanand Special Investment Region (SIR) Master Plan 2035",
      "zone": "Industrial Zone (I-2 Heavy / Engineering)",
      "permissibleFAR": 2.50,
      "maxHeightMeters": 30.0,
      "roadWidthFrontage": "30.0 Meter Dedicated GIDC Road",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": true,
      "bankName": "ICICI Bank Ltd",
      "branch": "Sanand Industrial Branch",
      "loanType": "Industrial Term Loan & Working Capital",
      "sanctionAmount": 120000000,
      "cersaiId": "CER-2022-ICI-8910",
      "clearanceStatus": "Active Mortgage Registered with ROC & CERSAI"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "N/A",
      "interimStay": false,
      "status": "Clear Title / Certified Non-Encumbrance"
    },
    "propertyTax": {
      "annualDemand": 72000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-01-28",
      "receiptNo": "GIDC-TAX-2024-551"
    }
  },

  // 8. GUJARAT - Ahmedabad (Daskroi / Bopal)
  {
    "ulpin": "IN-GJ-AHM-2024-077192",
    "bhuAadhaar": "24-007-0094-0001R",
    "surveyNo": "94/1R",
    "subDivision": "1R",
    "khasraNo": "94/1R",
    "plotNo": "Plot 14, Sun Villa Enclave",
    "location": {
      "state": "Gujarat",
      "district": "Ahmedabad",
      "taluka": "Daskroi",
      "village": "Bopal",
      "pincode": "380058",
      "sroOffice": "SRO Daskroi-Memnagar",
      "municipalBody": "AMC (Ahmedabad Municipal Corporation)",
      "center": [23.0345, 72.4678]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [72.4660, 23.0335],
          [72.4695, 23.0338],
          [72.4692, 23.0358],
          [72.4664, 23.0355],
          [72.4660, 23.0335]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 0.65,
      "areaAcres": 1.60,
      "areaBigha": 2.6,
      "areaGuntha": 64.2,
      "areaSqMeters": 6500,
      "perimeterMeters": 330,
      "elevationMeters": 53,
      "surveyDate": "2024-02-02",
      "surveyMethod": "DGPS & AMC TP Scheme Sync",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Residential (TP Scheme Finalized R-1)",
    "landUseCategory": "Residential",
    "colorCode": "#d97706",
    "status": "Clear Title / TP Plot Allotted",
    "riskScore": 98,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 24000,
      "readyReckonerValue": 156000000,
      "estimatedMarketValue": 210000000,
      "stampDutyApplicable": "4.9% (Female Owner Concession)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "Gujarat AnyRoR VF 7/12 & TP Form F",
      "khataNumber": "AMC-TP3-PLT-14",
      "soilClass": "Sandy Loam (Urban Developed)",
      "irrigationSource": "AMC Municipal Water Line",
      "cropPattern": "Luxury Residential Housing",
      "cultivatorType": "Private Residential Owner",
      "landRevenueAssessment": "₹ 1,450 / year",
      "owners": [
        {
          "name": "Manjulaben Hasmukhbhai Patel",
          "relation": "W/o Hasmukhbhai Patel",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX8810",
          "panMasked": "AABPPXXXXK",
          "phoneMasked": "+91 99XXX XX330",
          "address": "B-14 Sun Villa, South Bopal, Ahmedabad 380058"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-GJ-AHM-2021-8890",
          "date": "2021-10-05",
          "type": "Town Planning (TP) Final Allotment Entry",
          "orderNo": "AUDA/TP/BOPAL/2021/72",
          "officer": "Town Planning Officer, AMC",
          "status": "Certified & Final FP Number Issued"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-AHM-DAS-2021-009941",
      "deedType": "Registered Sale Deed",
      "registrationDate": "2021-10-20",
      "considerationAmount": 140000000,
      "stampDutyPaid": 6860000,
      "subRegistrarCode": "SRO-GJ-AHM-DAS"
    },
    "planningZoning": {
      "masterPlan": "AUDA Development Plan 2031",
      "zone": "Residential R-1 Zone",
      "permissibleFAR": 2.70,
      "maxHeightMeters": 45.0,
      "roadWidthFrontage": "18.0 Meter TP Road",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": false,
      "bankName": "None",
      "branch": "N/A",
      "loanType": "Clear Title / No Charge",
      "sanctionAmount": 0,
      "cersaiId": "CER-NIL",
      "clearanceStatus": "Free of Encumbrance"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "N/A",
      "interimStay": false,
      "status": "Clean Title / Non-Encumbrance Certificate Issued"
    },
    "propertyTax": {
      "annualDemand": 22000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-03-12",
      "receiptNo": "AMC-PT-2024-99120"
    }
  },

  // 9. RAJASTHAN - Jaipur (Sanganer / Mansarovar)
  {
    "ulpin": "IN-RJ-JAI-2024-031204",
    "bhuAadhaar": "08-012-0072-0000M",
    "surveyNo": "Khasra 72",
    "subDivision": "Plot 72",
    "khasraNo": "72/M",
    "plotNo": "Plot 72, Sector 8, Mansarovar",
    "location": {
      "state": "Rajasthan",
      "district": "Jaipur",
      "taluka": "Sanganer",
      "village": "Mansarovar",
      "pincode": "302020",
      "sroOffice": "SRO Jaipur-IV (Sanganer)",
      "municipalBody": "JDA (Jaipur Development Authority)",
      "center": [26.8521, 75.7689]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [75.7672, 26.8510],
          [75.7705, 26.8512],
          [75.7702, 26.8532],
          [75.7675, 26.8530],
          [75.7672, 26.8510]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 0.50,
      "areaAcres": 1.23,
      "areaBigha": 2.0,
      "areaGuntha": 49.4,
      "areaSqMeters": 5000,
      "perimeterMeters": 290,
      "elevationMeters": 431,
      "surveyDate": "2023-11-19",
      "surveyMethod": "DGPS & JDA Cadastral GIS Integration",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Residential (JDA Approved Sector Layout)",
    "landUseCategory": "Residential",
    "colorCode": "#d97706",
    "status": "Clear Title / JDA Patta Issued",
    "riskScore": 97,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 35000,
      "readyReckonerValue": 175000000,
      "estimatedMarketValue": 230000000,
      "stampDutyApplicable": "6% (Rajasthan Stamp Act)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "Rajasthan Apna Khata / JDA Patta (Leasehold to Freehold)",
      "khataNumber": "JDA-MSR-SEC8-72",
      "soilClass": "Sandy Loam (Urban Developed)",
      "irrigationSource": "PHED Water Connection",
      "cropPattern": "Residential Villa Complex",
      "cultivatorType": "Private Residential Owner",
      "landRevenueAssessment": "₹ 1,200 / year (Urban Assessment)",
      "owners": [
        {
          "name": "Surendra Singh Rathore",
          "relation": "S/o Kalyan Singh Rathore",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX9944",
          "panMasked": "ACXPRXXXXE",
          "phoneMasked": "+91 94XXX XX881",
          "address": "Plot 72, Sector 8, Mansarovar, Jaipur 302020"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-RJ-JAI-2020-3312",
          "date": "2020-07-22",
          "type": "JDA Freehold Conversion Order",
          "orderNo": "JDA/ZONE-8/FREEHOLD/2020/99",
          "officer": "Deputy Commissioner, Zone-8 JDA",
          "status": "Certified & Patta Issued"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-JAI-SAN-2020-008129",
      "deedType": "JDA Freehold Conveyance Deed",
      "registrationDate": "2020-08-04",
      "considerationAmount": 150000000,
      "stampDutyPaid": 9000000,
      "subRegistrarCode": "SRO-RJ-JAI-04"
    },
    "planningZoning": {
      "masterPlan": "Jaipur Master Development Plan 2025",
      "zone": "Residential R-1 Zone",
      "permissibleFAR": 2.00,
      "maxHeightMeters": 18.0,
      "roadWidthFrontage": "24.0 Meter Sector Road",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": false,
      "bankName": "None",
      "branch": "N/A",
      "loanType": "Clear Title / No Active Lien",
      "sanctionAmount": 0,
      "cersaiId": "CER-NIL",
      "clearanceStatus": "No Active Mortgages"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "N/A",
      "interimStay": false,
      "status": "Clear Title / No Judicial Orders"
    },
    "propertyTax": {
      "annualDemand": 18000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-02-19",
      "receiptNo": "JMC-UD-2024-4412"
    }
  },

  // 10. MADHYA PRADESH - Indore (Sanwer / Super Corridor)
  {
    "ulpin": "IN-MP-IND-2024-061298",
    "bhuAadhaar": "23-019-0118-0003A",
    "surveyNo": "118/3A",
    "subDivision": "3A",
    "khasraNo": "Khasra 118/3",
    "plotNo": "Plot SC-45, IT Tech Corridor",
    "location": {
      "state": "Madhya Pradesh",
      "district": "Indore",
      "taluka": "Sanwer",
      "village": "Super Corridor",
      "pincode": "452005",
      "sroOffice": "SRO Indore-III",
      "municipalBody": "IDA (Indore Development Authority)",
      "center": [22.7681, 75.8214]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [75.8195, 22.7668],
          [75.8235, 22.7672],
          [75.8231, 22.7695],
          [75.8199, 22.7692],
          [75.8195, 22.7668]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 2.20,
      "areaAcres": 5.43,
      "areaBigha": 8.8,
      "areaGuntha": 217.4,
      "areaSqMeters": 22000,
      "perimeterMeters": 640,
      "elevationMeters": 553,
      "surveyDate": "2024-01-08",
      "surveyMethod": "DGPS & MP Bhulekh GIS Integration",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Commercial & IT Hub (Tech Park Zone)",
    "landUseCategory": "Commercial",
    "colorCode": "#2563eb",
    "status": "Clear Title / IDA TPS Approved",
    "riskScore": 98,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 14000,
      "readyReckonerValue": 308000000,
      "estimatedMarketValue": 410000000,
      "stampDutyApplicable": "7.5% (MP Stamp Act)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "MP Bhulekh Khasra Extract & B1 Kishtbandi",
      "khataNumber": "KH-882/2024",
      "soilClass": "Deep Black Malwa Soil",
      "irrigationSource": "Narmada Phase-III Water Supply Pipeline",
      "cropPattern": "Corporate Tech Hub / R&D Centre",
      "cultivatorType": "Corporate Commercial Owner",
      "landRevenueAssessment": "₹ 2,400 / year",
      "owners": [
        {
          "name": "Malwa FinTech Hub LLP",
          "relation": "Managing Partner: Vivek Agrawal",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX5512",
          "panMasked": "AAAFMXXXXJ",
          "phoneMasked": "+91 98XXX XX445",
          "address": "Floor 7, Crystal IT Park, Ring Road, Indore 452001"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-MP-IND-2022-7712",
          "date": "2022-09-18",
          "type": "IDA Scheme Final Plot Handover & Khasra Mutation",
          "orderNo": "TEH/SAN/MUT/2022/411",
          "officer": "Tehsildar Sanwer",
          "status": "Certified & MP Bhulekh Synchronized"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-IND-SAN-2022-005510",
      "deedType": "Registered Lease-cum-Conveyance Deed",
      "registrationDate": "2022-10-02",
      "considerationAmount": 290000000,
      "stampDutyPaid": 21750000,
      "subRegistrarCode": "SRO-MP-IND-03"
    },
    "planningZoning": {
      "masterPlan": "Indore Master Plan 2035",
      "zone": "Commercial High-Density IT Corridor",
      "permissibleFAR": 3.00,
      "maxHeightMeters": 60.0,
      "roadWidthFrontage": "45.0 Meter Super Corridor Expressway",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": false,
      "bankName": "None",
      "branch": "N/A",
      "loanType": "No Mortgage",
      "sanctionAmount": 0,
      "cersaiId": "CER-NIL",
      "clearanceStatus": "No Active Bank Charges"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "N/A",
      "interimStay": false,
      "status": "Clear Title / No Court Orders"
    },
    "propertyTax": {
      "annualDemand": 48000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-03-10",
      "receiptNo": "IMC-TX-2024-7819"
    }
  },

  // 11. TAMIL NADU - Kanchipuram (Sriperumbudur / Vallam)
  {
    "ulpin": "IN-TN-KCH-2024-082341",
    "bhuAadhaar": "33-003-0314-0002B",
    "surveyNo": "314/2B",
    "subDivision": "2B",
    "khasraNo": "Survey 314/2B",
    "plotNo": "SIPCOT Industrial Plot V-12",
    "location": {
      "state": "Tamil Nadu",
      "district": "Kanchipuram",
      "taluka": "Sriperumbudur",
      "village": "Vallam",
      "pincode": "602105",
      "sroOffice": "SRO Sriperumbudur",
      "municipalBody": "SIPCOT (State Industries Promotion Corp. of TN)",
      "center": [12.9124, 79.9452]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [79.9435, 12.9112],
          [79.9472, 12.9115],
          [79.9468, 12.9138],
          [79.9439, 12.9135],
          [79.9435, 12.9112]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 3.50,
      "areaAcres": 8.65,
      "areaBigha": 14.0,
      "areaGuntha": 346,
      "areaSqMeters": 35000,
      "perimeterMeters": 760,
      "elevationMeters": 37,
      "surveyDate": "2023-12-14",
      "surveyMethod": "DGPS & TN Patta-Chitta Cadastral Sync",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Industrial (Electronics & EV Manufacturing SIPCOT)",
    "landUseCategory": "Industrial",
    "colorCode": "#7c3aed",
    "status": "Clear Title / SIPCOT Leasehold",
    "riskScore": 99,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 6500,
      "readyReckonerValue": 227500000,
      "estimatedMarketValue": 310000000,
      "stampDutyApplicable": "7% (Tamil Nadu Registration Act)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "Tamil Nadu e-Services Patta / Chitta Extract",
      "khataNumber": "PATTA-NO-4192",
      "soilClass": "Red Sandy Loam",
      "irrigationSource": "SIPCOT Industrial Water Supply Pipeline",
      "cropPattern": "Advanced Semiconductor Packaging Plant",
      "cultivatorType": "SIPCOT Industrial Tenant",
      "landRevenueAssessment": "₹ 4,200 / year",
      "owners": [
        {
          "name": "Coromandel Microchips India Pvt Ltd",
          "relation": "Managing Director: R. Soundararajan",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX2201",
          "panMasked": "AACCCXXXXF",
          "phoneMasked": "+91 94XXX XX310",
          "address": "SIPCOT Industrial Park, Vallam Vadagal, Sriperumbudur 602105"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-TN-KCH-2021-9912",
          "date": "2021-11-20",
          "type": "SIPCOT Patta Sub-Division & e-Services Update",
          "orderNo": "TAH/SRI/PATTA/2021/81",
          "officer": "Tahsildar Sriperumbudur",
          "status": "Certified & Digitally Synchronized"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-KCH-SRI-2021-004491",
      "deedType": "99-Year SIPCOT Lease Deed",
      "registrationDate": "2021-11-10",
      "considerationAmount": 210000000,
      "stampDutyPaid": 14700000,
      "subRegistrarCode": "SRO-TN-KCH-SRI"
    },
    "planningZoning": {
      "masterPlan": "CMDA & SIPCOT Master Layout 2036",
      "zone": "Special Industrial & Export Processing Zone",
      "permissibleFAR": 2.50,
      "maxHeightMeters": 35.0,
      "roadWidthFrontage": "30.0 Meter SIPCOT Highway Access",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": true,
      "bankName": "State Bank of India",
      "branch": "Industrial Finance Branch, Chennai",
      "loanType": "Project Term Loan",
      "sanctionAmount": 95000000,
      "cersaiId": "CER-2022-SBI-4418",
      "clearanceStatus": "Active Mortgage Recorded with SRO & CERSAI"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "N/A",
      "interimStay": false,
      "status": "Clear Title / Encumbrance Certificate Verified (Nil Encumbrance on Title)"
    },
    "propertyTax": {
      "annualDemand": 62000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-02-10",
      "receiptNo": "SIPCOT-TX-2024-1109"
    }
  },

  // 12. HARYANA - Gurugram (Wazirabad / Golf Course Extension)
  {
    "ulpin": "IN-HR-GUR-2024-091402",
    "bhuAadhaar": "06-018-0054-0001G",
    "surveyNo": "54/1G",
    "subDivision": "1G",
    "khasraNo": "Mustil 54, Killa 1",
    "plotNo": "Plot GCE-88, Sector 65",
    "location": {
      "state": "Haryana",
      "district": "Gurugram",
      "taluka": "Wazirabad",
      "village": "Golf Course Extension",
      "pincode": "122101",
      "sroOffice": "SRO Wazirabad",
      "municipalBody": "HSVP / DTCP Haryana",
      "center": [28.4112, 77.0812]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.0795, 28.4101],
          [77.0832, 28.4105],
          [77.0828, 28.4128],
          [77.0799, 28.4124],
          [77.0795, 28.4101]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 1.40,
      "areaAcres": 3.46,
      "areaBigha": 5.6,
      "areaGuntha": 138.4,
      "areaSqMeters": 14000,
      "perimeterMeters": 510,
      "elevationMeters": 218,
      "surveyDate": "2024-01-28",
      "surveyMethod": "DGPS & Haryana Jamabandi Digital Sync",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Commercial & High-End Retail (DTCP Licensed)",
    "landUseCategory": "Commercial",
    "colorCode": "#2563eb",
    "status": "Clear Title / DTCP License Active",
    "riskScore": 97,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 48000,
      "readyReckonerValue": 672000000,
      "estimatedMarketValue": 920000000,
      "stampDutyApplicable": "7% (Haryana Stamp Act)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "Haryana Jamabandi (Nakhal Form)",
      "khataNumber": "JAM-WAZ-2024-119",
      "soilClass": "Sandy Clay Loam (Urban Converted)",
      "irrigationSource": "GMDA Municipal Treated Water",
      "cropPattern": "Grade-A Commercial Office Tower",
      "cultivatorType": "Commercial Developer",
      "landRevenueAssessment": "₹ 3,800 / year",
      "owners": [
        {
          "name": "Horizon Towers & Infra Developer Ltd",
          "relation": "Director: Raghavender Singhal",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX1189",
          "panMasked": "AAACHXXXXP",
          "phoneMasked": "+91 98XXX XX001",
          "address": "Floor 12, Golf View Tower, Sector 65, Gurugram 122101"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-HR-GUR-2022-8192",
          "date": "2022-07-14",
          "type": "DTCP Commercial License & Jamabandi Intiqal Mutation",
          "orderNo": "TEH/WAZ/INT/2022/901",
          "officer": "Tehsildar Wazirabad",
          "status": "Certified & Digitally Locked"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-GUR-WAZ-2022-009941",
      "deedType": "Commercial Conveyance Deed",
      "registrationDate": "2022-08-01",
      "considerationAmount": 650000000,
      "stampDutyPaid": 45500000,
      "subRegistrarCode": "SRO-HR-GUR-WAZ"
    },
    "planningZoning": {
      "masterPlan": "Gurugram-Manesar Urban Complex Master Plan 2031",
      "zone": "Commercial High FAR Zone",
      "permissibleFAR": 3.25,
      "maxHeightMeters": 90.0,
      "roadWidthFrontage": "60.0 Meter Golf Course Ext Expressway",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear (Non-Aravali Zone Verified)"
    },
    "encumbrance": {
      "hasLien": true,
      "bankName": "Axis Bank Ltd",
      "branch": "MG Road Corporate Branch, Gurugram",
      "loanType": "Commercial Construction Finance",
      "sanctionAmount": 200000000,
      "cersaiId": "CER-2022-AXI-9912",
      "clearanceStatus": "Active Mortgage Registered with CERSAI"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "N/A",
      "interimStay": false,
      "status": "Clear Title / No Court Stay"
    },
    "propertyTax": {
      "annualDemand": 140000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-03-25",
      "receiptNo": "MCG-PT-2024-01991"
    }
  },

  // 13. BIHAR - Patna (Danapur / Bihta)
  {
    "ulpin": "IN-BR-PAT-2024-044192",
    "bhuAadhaar": "10-028-0091-0000B",
    "surveyNo": "Khasra 91",
    "subDivision": "0",
    "khasraNo": "Gata 91",
    "plotNo": "Plot 91, Bihta Industrial Zone",
    "location": {
      "state": "Bihar",
      "district": "Patna",
      "taluka": "Danapur",
      "village": "Bihta",
      "pincode": "801103",
      "sroOffice": "SRO Danapur",
      "municipalBody": "BIADA (Bihar Industrial Area Dev. Authority)",
      "center": [25.5681, 84.8692]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [84.8672, 25.5668],
          [84.8715, 25.5672],
          [84.8711, 25.5695],
          [84.8676, 25.5691],
          [84.8672, 25.5668]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 2.80,
      "areaAcres": 6.92,
      "areaBigha": 11.2,
      "areaGuntha": 276.8,
      "areaSqMeters": 28000,
      "perimeterMeters": 710,
      "elevationMeters": 58,
      "surveyDate": "2024-02-11",
      "surveyMethod": "DGPS & Bihar Bhumi DILRMP Sync",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Industrial (Food Processing & Logistics Hub)",
    "landUseCategory": "Industrial",
    "colorCode": "#7c3aed",
    "status": "Clear Title / BIADA Allotted",
    "riskScore": 96,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 4200,
      "readyReckonerValue": 117600000,
      "estimatedMarketValue": 160000000,
      "stampDutyApplicable": "6% (Bihar Stamp Act)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "Bihar Bhumi Dakhil Kharij Record & Khatiyan",
      "khataNumber": "KH-512/2024",
      "soilClass": "Gangetic Alluvial Loam",
      "irrigationSource": "Sone River Canal System & Tubewell",
      "cropPattern": "Agro-Processing & Cold Chain Facility",
      "cultivatorType": "BIADA Allottee",
      "landRevenueAssessment": "₹ 1,850 / year (Malguzari)",
      "owners": [
        {
          "name": "Magadh Agro Logistics Pvt Ltd",
          "relation": "Managing Director: Alok Kumar Sinha",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX7741",
          "panMasked": "AABCMXXXXL",
          "phoneMasked": "+91 94XXX XX190",
          "address": "BIADA Industrial Growth Centre, Bihta, Patna 801103"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-BR-PAT-2022-4410",
          "date": "2022-04-20",
          "type": "BIADA Allotment & Dakhil-Kharij Mutation",
          "orderNo": "CO/DAN/DK/2022/19",
          "officer": "Circle Officer (CO), Danapur",
          "status": "Certified & RoR Synchronized"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-PAT-DAN-2022-003319",
      "deedType": "90-Year BIADA Lease Deed",
      "registrationDate": "2022-04-12",
      "considerationAmount": 105000000,
      "stampDutyPaid": 6300000,
      "subRegistrarCode": "SRO-BR-PAT-DAN"
    },
    "planningZoning": {
      "masterPlan": "Patna Metropolitan Region Master Plan 2031",
      "zone": "Industrial & Logistics Growth Zone",
      "permissibleFAR": 2.25,
      "maxHeightMeters": 25.0,
      "roadWidthFrontage": "30.0 Meter SH-2 Link Road",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": false,
      "bankName": "None",
      "branch": "N/A",
      "loanType": "No Mortgage",
      "sanctionAmount": 0,
      "cersaiId": "CER-NIL",
      "clearanceStatus": "Clear Title / No Charge"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "N/A",
      "interimStay": false,
      "status": "Clear Title / Certified in Bihar Bhumi e-Records"
    },
    "propertyTax": {
      "annualDemand": 24000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-01-19",
      "receiptNo": "BIADA-TAX-2024-881"
    }
  },

  // 14. TELANGANA - Medchal-Malkajgiri (Ghatkesar / Korremula)
  {
    "ulpin": "IN-TG-HYD-2024-071190",
    "bhuAadhaar": "36-021-0155-0003A",
    "surveyNo": "155/3A",
    "subDivision": "3A",
    "khasraNo": "Sy 155/3",
    "plotNo": "Plot 8-B, Outer Ring Road Zone",
    "location": {
      "state": "Telangana",
      "district": "Medchal-Malkajgiri",
      "taluka": "Ghatkesar",
      "village": "Korremula",
      "pincode": "500088",
      "sroOffice": "SRO Uppal",
      "municipalBody": "HMDA (Hyderabad Metropolitan Dev. Authority)",
      "center": [17.4412, 78.6789]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [78.6765, 17.4398],
          [78.6812, 17.4402],
          [78.6808, 17.4428],
          [78.6772, 17.4424],
          [78.6765, 17.4398]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 2.10,
      "areaAcres": 5.19,
      "areaBigha": 8.4,
      "areaGuntha": 207.6,
      "areaSqMeters": 21000,
      "perimeterMeters": 630,
      "elevationMeters": 512,
      "surveyDate": "2024-01-15",
      "surveyMethod": "DGPS & Dharani Portal Cadastral Integration",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Mixed Use Commercial (HMDA Approved)",
    "landUseCategory": "Commercial",
    "colorCode": "#2563eb",
    "status": "Clear Title / Dharani Passbook Active",
    "riskScore": 99,
    "riskLevel": "Low Risk",
    "valuation": {
      "circleRatePerSqM": 16000,
      "readyReckonerValue": 336000000,
      "estimatedMarketValue": 450000000,
      "stampDutyApplicable": "7.5% (Telangana Registration Act)",
      "currency": "INR"
    },
    "revenueRecords": {
      "rorType": "Telangana Dharani e-Pattadar Passbook",
      "khataNumber": "DH-PPB-TG-991204",
      "soilClass": "Red Sandy Loam (Chalaka)",
      "irrigationSource": "HMDA Municipal Supply & Borewell",
      "cropPattern": "Commercial Tech Hub & Retail Complex",
      "cultivatorType": "Pattadar / Commercial Developer",
      "landRevenueAssessment": "₹ 2,900 / year",
      "owners": [
        {
          "name": "Kondareddy Venkat Reddy",
          "relation": "S/o K. Narsimha Reddy",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX6619",
          "panMasked": "ABCPKXXXXT",
          "phoneMasked": "+91 98XXX XX881",
          "address": "Plot 18, Road No. 2, Banjara Hills, Hyderabad 500034"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-TG-HYD-2021-0081",
          "date": "2021-06-18",
          "type": "Dharani Instant Slot Booking & Automatic Mutation",
          "orderNo": "TAH/GHT/DHARANI/2021/88",
          "officer": "Tahsildar Ghatkesar",
          "status": "Certified & Passbook Issued"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-HYD-UPP-2021-009182",
      "deedType": "Sale Deed (Dharani Portal Execution)",
      "registrationDate": "2021-06-18",
      "considerationAmount": 310000000,
      "stampDutyPaid": 23250000,
      "subRegistrarCode": "SRO-TG-HYD-UPP"
    },
    "planningZoning": {
      "masterPlan": "HMDA Metropolitan Development Plan 2031",
      "zone": "Commercial / Mixed Use Zone Along ORR Corridor",
      "permissibleFAR": 3.50,
      "maxHeightMeters": 60.0,
      "roadWidthFrontage": "36.0 Meter Radial Road",
      "coastalBuffer": "Not Applicable",
      "forestBufferClearance": "Clear"
    },
    "encumbrance": {
      "hasLien": false,
      "bankName": "None",
      "branch": "N/A",
      "loanType": "No Mortgage",
      "sanctionAmount": 0,
      "cersaiId": "CER-NIL",
      "clearanceStatus": "Dharani Clear Title Verified"
    },
    "litigation": {
      "hasLitigation": false,
      "caseNumber": "Nil",
      "courtName": "N/A",
      "interimStay": false,
      "status": "Clear Title / No Court Stay"
    },
    "propertyTax": {
      "annualDemand": 38000,
      "duesPending": 0,
      "paymentStatus": "Paid in Full",
      "lastPaymentDate": "2024-02-22",
      "receiptNo": "HMDA-PT-2024-1192"
    }
  }
];

export const INITIAL_APPLICATIONS = [
  {
    "id": "APP-2026-MUT-8812",
    "applicationType": "Mutation / Khata Transfer",
    "ulpin": "IN-MH-PUN-2024-009871",
    "applicantName": "Rameshwar Dattatray Patil",
    "applicantPhone": "+91 98230 91823",
    "applicantEmail": "rameshwar.patil@example.com",
    "appliedDate": "2026-03-10",
    "status": "Pending Patwari Verification",
    "currentStage": 2,
    "buyerDetails": {
      "buyerName": "Suresh Balkrishna Jagtap",
      "buyerAadhaar": "XXXXXXXX4419",
      "buyerShare": 100
    },
    "stages": [
      {
        "title": "Application Submitted Online",
        "description": "Citizen filed mutation with registered sale deed copy",
        "timestamp": "10 Mar 2026, 10:45 AM",
        "status": "completed",
        "officer": "Citizen Portal Self-Service"
      },
      {
        "title": "Revenue Inspector / Patwari Field Verification",
        "description": "Cadastral DGPS stone verification & 15-day public notice issuance",
        "timestamp": "In Progress (Due: 18 Mar 2026)",
        "status": "active",
        "officer": "Patwari (Mulshi Circle)"
      },
      {
        "title": "Sub-Registrar Deed Verification",
        "description": "Cross-validation against e-Registration deed records",
        "timestamp": "Pending",
        "status": "pending",
        "officer": "Sub-Registrar Mulshi"
      },
      {
        "title": "Tehsildar Digital Order & 7/12 RoR Mutation",
        "description": "Sanction order generation and digital signature on 7/12 & 8A",
        "timestamp": "Pending",
        "status": "pending",
        "officer": "Tehsildar Mulshi"
      }
    ],
    "documents": [
      { "name": "Registered Deed Extract", "file": "Deed_PUN_2026_99.pdf", "verified": true },
      { "name": "Aadhaar KYC Verification", "file": "KYC_Buyer_Seller.pdf", "verified": true }
    ],
    "notes": "Mutation filed following execution of registered sale deed at SRO Paud."
  },
  {
    "id": "APP-2026-DEM-4419",
    "applicationType": "Survey & Boundary Demarcation",
    "ulpin": "IN-KA-BLR-2024-084912",
    "applicantName": "Zenith Techpark Solutions Pvt Ltd",
    "applicantPhone": "+91 94480 12800",
    "applicantEmail": "compliance@zenithtech.com",
    "appliedDate": "2026-03-01",
    "status": "Approved & RoR Digitally Mutated",
    "currentStage": 4,
    "buyerDetails": {
      "buyerName": "Zenith Techpark Solutions Pvt Ltd",
      "buyerAadhaar": "XXXXXXXX8831",
      "buyerShare": 100
    },
    "stages": [
      {
        "title": "Application Submitted Online",
        "description": "Demarcation fee paid online through KCRIS portal",
        "timestamp": "01 Mar 2026, 09:15 AM",
        "status": "completed",
        "officer": "Citizen Portal"
      },
      {
        "title": "Surveyor Drone & DGPS Inspection",
        "description": "Physical survey completed with high-precision GNSS rovers",
        "timestamp": "04 Mar 2026, 02:30 PM",
        "status": "completed",
        "officer": "ADLR Surveyor (Anekal)"
      },
      {
        "title": "Neighboring Boundary NOC",
        "description": "All adjacent survey numbers verified without objection",
        "timestamp": "07 Mar 2026, 11:00 AM",
        "status": "completed",
        "officer": "Revenue Inspector"
      },
      {
        "title": "Final Tippan & Mojani Sheet Certified",
        "description": "Digital Boundary Certificate generated with tamper-evident QR code",
        "timestamp": "09 Mar 2026, 04:20 PM",
        "status": "completed",
        "officer": "Tahsildar Anekal"
      }
    ],
    "documents": [
      { "name": "Survey Mojani Sheet", "file": "Mojani_ANK_88.pdf", "verified": true }
    ],
    "notes": "Boundary stones fixed and Geo-fenced in Bhoomi GIS."
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    "id": "AUD-2026-981023",
    "timestamp": "2026-03-12 11:32:05",
    "actorRole": "Revenue Officer (Tehsildar)",
    "actorName": "Anand S. Kulkarni",
    "action": "MUTATION_ORDER_SANCTIONED",
    "ulpin": "IN-MH-PUN-2024-009871",
    "ipAddress": "10.45.192.88 (Govt NICNET)",
    "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "details": "Sanctioned digital mutation order under Sec 150 MLRC. Updated 7/12 ownership shares."
  },
  {
    "id": "AUD-2026-981024",
    "timestamp": "2026-03-12 10:15:40",
    "actorRole": "Sub-Registrar",
    "actorName": "Mahesh V. Deshmukh",
    "action": "ENCUMBRANCE_CHECK_COMPLETED",
    "ulpin": "IN-KA-BLR-2024-084912",
    "ipAddress": "10.45.198.12",
    "hash": "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    "details": "Verified 30-year non-encumbrance index against e-Registration database. Title clear."
  },
  {
    "id": "AUD-2026-981025",
    "timestamp": "2026-03-11 16:44:12",
    "actorRole": "Citizen User",
    "actorName": "Rameshwar Dattatray Patil",
    "action": "PROPERTY_TAX_PAID",
    "ulpin": "IN-MH-PUN-2024-009871",
    "ipAddress": "157.34.12.99",
    "hash": "cb8379ac2098aa165029e3938a51da0bcecfc008fd6795f401178647f96c5b34",
    "details": "Online payment of ₹1,200 property tax via Bharat Bill Payment System (BBPS)."
  }
];
