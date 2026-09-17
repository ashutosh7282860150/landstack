// Embedded fallback sample parcels dataset (matches backend data)

export const INITIAL_PARCELS = [
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
      "sroOffice": "Sub-Registrar Office, Mulshi",
      "registrationDate": "2018-05-22",
      "stampDutyPaid": "₹ 62,500",
      "registrationFee": "₹ 30,000",
      "marketValuationGuideline": "₹ 1,84,00,000",
      "index2Verified": true,
      "digitalSignature": "SHA256:d84f29a009c...VERIFIED"
    },
    "townPlanning": {
      "masterPlanName": "PMRDA Comprehensive Master Plan 2038",
      "zoningClassification": "Agricultural & Agri-Tourism Permitted Zone",
      "permissibleFAR": 0.20,
      "maxHeightMeters": 7.5,
      "roadAccessWidthMeters": 12.0,
      "bufferRestrictions": "No construction within 30m from irrigation canal boundary",
      "naConversionEligibility": "Eligible for NA-IT / Warehousing subject to PMRDA sanction & premium"
    },
    "buildingPermissions": {
      "sanctionStatus": "No Active Building Proposal (Agricultural Farmland)",
      "fileNo": "N/A",
      "nocChecklist": {
        "fireNoc": "Not Required (Agri)",
        "environmentalNoc": "Clear (Green Category)",
        "aviationNoc": "Clear (Within 120m AGL)",
        "treeAuthority": "Exempt"
      }
    },
    "propertyTax": {
      "taxAssessmentId": "PT-PMRDA-AGR-09871",
      "currentAssessmentYear": "2024-25",
      "annualTax": 1420,
      "duesPending": 0,
      "paymentStatus": "Paid",
      "lastPaymentDate": "2024-04-10",
      "receiptNo": "REC-PMRDA-2024-88912"
    },
    "encumbrance": {
      "status": "Active Crop Loan Hypothecation",
      "bankName": "Bank of Maharashtra (Hinjawadi Branch)",
      "cersaiId": "CERSAI-AGR-2022-77182",
      "loanType": "Kisan Credit Card (Agri Term Loan)",
      "sanctionedAmount": 450000,
      "chargeCreatedDate": "2022-11-15",
      "necEligibility": "Conditional (Lien to be discharged upon repayment)"
    },
    "litigation": {
      "hasLitigation": false,
      "activeCasesCount": 0,
      "courtCases": [],
      "caveats": [],
      "revenueAppeals": [],
      "eCourtsIntegrationStatus": "Clean Title / No Injunction (Queried e-Courts API v2.4)"
    },
    "utilities": {
      "electricity": {
        "provider": "MSEDCL",
        "consumerNumber": "028491829001",
        "category": "Agricultural 3-Phase Pump",
        "sanctionedLoad": "10 HP",
        "status": "Active & Metered"
      },
      "water": {
        "provider": "Pawana Irrigation Canal Division",
        "sluiceGateNo": "4B",
        "status": "Active Seasonal Release"
      },
      "gas": {
        "provider": "N/A (Rural Cadastre)",
        "status": "Not Applicable"
      }
    }
  },
  {
    "ulpin": "IN-KA-BLR-2024-084912",
    "bhuAadhaar": "29-012-0088-00010",
    "surveyNo": "88/1",
    "subDivision": "1",
    "khasraNo": "88/1",
    "plotNo": "Tech Zone IT/04",
    "location": {
      "state": "Karnataka",
      "district": "Bengaluru Urban",
      "taluka": "Bengaluru East",
      "village": "Bellandur (Hobli: Varthur)",
      "pincode": "560103",
      "sroOffice": "SRO Shivajinagar / Indiranagar",
      "municipalBody": "BBMP (Bruhat Bengaluru Mahanagara Palike - Mahadevapura Zone)",
      "center": [12.9260, 77.6762]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.6748, 12.9248],
          [77.6782, 12.9252],
          [77.6778, 12.9275],
          [77.6745, 12.9270],
          [77.6748, 12.9248]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 1.80,
      "areaAcres": 4.45,
      "areaSqMeters": 18000,
      "perimeterMeters": 580,
      "elevationMeters": 875,
      "surveyDate": "2023-11-10",
      "surveyMethod": "Karnataka Dishaank GPS Cadastral Survey",
      "accuracyLevel": "Class-A (+/- 3cm)"
    },
    "landClassification": "Commercial (IT / ITES Special Tech Park)",
    "landUseCategory": "Commercial",
    "colorCode": "#2563EB",
    "status": "Clear Title / Sanctioned Tech Hub",
    "riskScore": 88,
    "riskLevel": "Low-Moderate Risk",
    "revenueRecords": {
      "rorType": "Karnataka Bhoomi RTC (Form 16) & BBMP A-Khata",
      "khataNumber": "BBMP/MDP/A-KH/1042",
      "soilClass": "Converted Non-Agricultural Commercial",
      "irrigationSource": "BWSSB Commercial & Rainwater Harvesting",
      "cropPattern": "N/A (Built-up IT Infrastructure)",
      "cultivatorType": "Corporate Entity",
      "landRevenueAssessment": "N/A (Urban Municipal Tax Regime)",
      "owners": [
        {
          "name": "Nexus Infotech Infrastructure Pvt Ltd",
          "relation": "Represented by Director Rajesh K. Nair",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX8831",
          "panMasked": "AABCNXXXXL",
          "phoneMasked": "+91 80XXX XX900",
          "address": "Tower-C, Outer Ring Road, Bellandur, Bengaluru 560103"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-KA-BLR-2021-992",
          "date": "2021-04-18",
          "type": "Commercial Purchase Conveyance",
          "orderNo": "REV/BLR/EAST/MUT/21",
          "officer": "Tahsildar, Bengaluru East",
          "status": "Certified in Bhoomi Portal"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-BLR-2021-14092",
      "deedType": "Commercial Conveyance Deed",
      "sroOffice": "SRO Indiranagar, Bengaluru",
      "registrationDate": "2021-03-29",
      "stampDutyPaid": "₹ 4,85,00,000",
      "registrationFee": "₹ 78,00,000",
      "marketValuationGuideline": "₹ 92,00,00,000",
      "index2Verified": true,
      "digitalSignature": "SHA256:8b41a99cf02...VERIFIED"
    },
    "townPlanning": {
      "masterPlanName": "BDA Revised Master Plan (RMP) 2031",
      "zoningClassification": "High-Tech / IT Commercial Zone",
      "permissibleFAR": 3.25,
      "maxHeightMeters": 55.0,
      "roadAccessWidthMeters": 45.0,
      "bufferRestrictions": "50m lake buffer from Bellandur catchment canal compliant",
      "naConversionEligibility": "Converted (DC Order No. ALN/CR/2019/54)"
    },
    "buildingPermissions": {
      "sanctionStatus": "Sanctioned G+12 Tech Hub (Occupancy Certificate Applied)",
      "fileNo": "BBMP/TP/COM/2022/8812",
      "nocChecklist": {
        "fireNoc": "Approved (Karnataka Fire Dept NOC #KFES-2022-901)",
        "environmentalNoc": "SEIAA Karnataka Clearance (SEIAA/2021/EC/104)",
        "aviationNoc": "AAI Height Clearance Sanctioned up to 75m AGL",
        "treeAuthority": "Compensatory Afforestation 100 Trees Planted"
      }
    },
    "propertyTax": {
      "taxAssessmentId": "BBMP-SAS-BLR-084912",
      "currentAssessmentYear": "2024-25",
      "annualTax": 890450,
      "duesPending": 0,
      "paymentStatus": "Paid",
      "lastPaymentDate": "2024-05-02",
      "receiptNo": "BBMP-REC-2024-99812"
    },
    "encumbrance": {
      "status": "Active Commercial Consortium Mortgage",
      "bankName": "State Bank of India (Lead Bank Consortium)",
      "cersaiId": "CERSAI-COM-2021-99841",
      "loanType": "Commercial Real Estate Construction Loan",
      "sanctionedAmount": 450000000,
      "chargeCreatedDate": "2021-06-10",
      "necEligibility": "Charge Registered with ROC & Sub-Registrar"
    },
    "litigation": {
      "hasLitigation": true,
      "activeCasesCount": 1,
      "courtCases": [
        {
          "caseNumber": "WP 18492/2023",
          "court": "High Court of Karnataka (Bengaluru)",
          "petitioner": "Resident Welfare Association (Bellandur)",
          "respondent": "BBMP & Nexus Infotech Pvt Ltd",
          "matter": "Plea on Storm Water Drain setback alignment",
          "status": "Interim Stay Vacated by Division Bench; Final Hearing Scheduled",
          "riskImpact": "Low impact on ownership title; Drainage audit compliant"
        }
      ],
      "caveats": [],
      "revenueAppeals": [],
      "eCourtsIntegrationStatus": "Litigation Flagged (Queried e-Courts API v2.4)"
    },
    "utilities": {
      "electricity": {
        "provider": "BESCOM",
        "consumerNumber": "BESCOM-HT-881920",
        "category": "High Tension Commercial (11 kV)",
        "sanctionedLoad": "2500 kVA",
        "status": "Active & Operational"
      },
      "water": {
        "provider": "BWSSB",
        "consumerNumber": "BWSSB-COM-09941",
        "category": "Commercial Dual Piped & STP Recycled",
        "status": "Active"
      },
      "gas": {
        "provider": "GAIL Gas Ltd",
        "consumerNumber": "GAIL-IND-2022-771",
        "status": "Connected (Kitchen / Canteen Facility)"
      }
    }
  },
  {
    "ulpin": "IN-RJ-JAI-2024-031204",
    "bhuAadhaar": "08-012-0341-00720",
    "surveyNo": "341/12",
    "subDivision": "Plot-72",
    "khasraNo": "341/12",
    "plotNo": "Plot No. 72, Sector 8",
    "location": {
      "state": "Rajasthan",
      "district": "Jaipur",
      "taluka": "Sanganer",
      "village": "Mansarovar Extension",
      "pincode": "302020",
      "sroOffice": "SRO Sanganer-I, Jaipur",
      "municipalBody": "JDA (Jaipur Development Authority) / Nagar Nigam Greater",
      "center": [26.8521, 75.7612]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [75.7602, 26.8512],
          [75.7622, 26.8514],
          [75.7620, 26.8530],
          [75.7600, 26.8528],
          [75.7602, 26.8512]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 0.032,
      "areaAcres": 0.079,
      "areaSqMeters": 320,
      "perimeterMeters": 76,
      "elevationMeters": 431,
      "surveyDate": "2024-01-20",
      "surveyMethod": "JDA GIS Cadastral Digital Mapping",
      "accuracyLevel": "Class-A (+/- 2cm)"
    },
    "landClassification": "Residential (Urban Plotted Development)",
    "landUseCategory": "Residential",
    "colorCode": "#F59E0B",
    "status": "Clear Title / Pending Property Tax Due",
    "riskScore": 96,
    "riskLevel": "Low Risk",
    "revenueRecords": {
      "rorType": "Rajasthan Jamabandi / Apna Khata & JDA Leased Patta",
      "khataNumber": "JDA-MSR-PL-72",
      "soilClass": "Urban Abadi Residential",
      "irrigationSource": "PHED Water Supply",
      "cropPattern": "N/A (Residential)",
      "cultivatorType": "Owner Occupied",
      "landRevenueAssessment": "N/A (Urban Property Regime)",
      "owners": [
        {
          "name": "Vikram Singh Rathore",
          "relation": "S/o Mahendra Singh Rathore",
          "share": 50,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX3491",
          "panMasked": "BRHPXXXX1K",
          "phoneMasked": "+91 94XXX XX781",
          "address": "Plot 72, Sector 8, Mansarovar Ext, Jaipur 302020"
        },
        {
          "name": "Anandi Devi Rathore",
          "relation": "W/o Vikram Singh Rathore",
          "share": 50,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX7720",
          "panMasked": "APTRXXXX9M",
          "phoneMasked": "+91 94XXX XX781",
          "address": "Plot 72, Sector 8, Mansarovar Ext, Jaipur 302020"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-RJ-JAI-2019-331",
          "date": "2019-08-11",
          "type": "Allotment Patta Transfer",
          "orderNo": "JDA/ZONE-8/MUT/19/33",
          "officer": "Deputy Commissioner, Zone-8 JDA",
          "status": "Approved & Patta Issued"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-JAI-2019-003321",
      "deedType": "Registered Sale Deed & JDA Patta",
      "sroOffice": "SRO Sanganer-I, Jaipur",
      "registrationDate": "2019-07-15",
      "stampDutyPaid": "₹ 3,40,000",
      "registrationFee": "₹ 55,000",
      "marketValuationGuideline": "₹ 68,00,000",
      "index2Verified": true,
      "digitalSignature": "SHA256:7f901ab880...VERIFIED"
    },
    "townPlanning": {
      "masterPlanName": "Jaipur Master Development Plan 2025",
      "zoningClassification": "Residential (R-1 Low/Medium Density)",
      "permissibleFAR": 1.75,
      "maxHeightMeters": 15.0,
      "roadAccessWidthMeters": 18.0,
      "bufferRestrictions": "Standard front setback 3.0m, rear setback 1.5m",
      "naConversionEligibility": "Standard Approved Residential Sector"
    },
    "buildingPermissions": {
      "sanctionStatus": "Online Building Sanction Approved (Stilt + 3 Floors)",
      "fileNo": "JDA/BP/RES/2023/4491",
      "nocChecklist": {
        "fireNoc": "Exempt (< 15m Residential)",
        "environmentalNoc": "Exempt",
        "aviationNoc": "Approved (Jaipur Airport OLS clearance)",
        "treeAuthority": "Approved"
      }
    },
    "propertyTax": {
      "taxAssessmentId": "PT-NNG-JAI-031204",
      "currentAssessmentYear": "2024-25",
      "annualTax": 4800,
      "duesPending": 4800,
      "paymentStatus": "Pending Payment",
      "lastPaymentDate": "2023-03-28",
      "receiptNo": "NNG-REC-2023-41092"
    },
    "encumbrance": {
      "status": "Active Home Loan Mortgage",
      "bankName": "HDFC Bank Ltd (Mansarovar Branch)",
      "cersaiId": "CERSAI-HL-2019-44109",
      "loanType": "Individual Housing Loan",
      "sanctionedAmount": 3800000,
      "chargeCreatedDate": "2019-08-02",
      "necEligibility": "Equitable Mortgage marked with CERSAI & SRO"
    },
    "litigation": {
      "hasLitigation": false,
      "activeCasesCount": 0,
      "courtCases": [],
      "caveats": [],
      "revenueAppeals": [],
      "eCourtsIntegrationStatus": "Clean Title / No Adverse Orders (Queried e-Courts API v2.4)"
    },
    "utilities": {
      "electricity": {
        "provider": "JVVNL (Jaipur Vidyut Vitran Nigam)",
        "consumerNumber": "JVVNL-DOM-1408271",
        "category": "Domestic Single Phase",
        "sanctionedLoad": "7 kW",
        "status": "Active"
      },
      "water": {
        "provider": "PHED Rajasthan",
        "consumerNumber": "PHED-JAI-994812",
        "category": "Metered Piped Supply",
        "status": "Active"
      },
      "gas": {
        "provider": "Torrent Gas Jaipur",
        "consumerNumber": "TORRENT-PNG-11204",
        "status": "Piped Gas Operational"
      }
    }
  },
  {
    "ulpin": "IN-UP-VAR-2024-019482",
    "bhuAadhaar": "09-067-0512-00000",
    "surveyNo": "512",
    "subDivision": "NA",
    "khasraNo": "512",
    "plotNo": "Gata No. 512",
    "location": {
      "state": "Uttar Pradesh",
      "district": "Varanasi",
      "taluka": "Sadar",
      "village": "Shivpur",
      "pincode": "221003",
      "sroOffice": "SRO Varanasi Sadar",
      "municipalBody": "VDA (Varanasi Development Authority) / Nagar Nigam",
      "center": [25.3582, 82.9734]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [82.9720, 25.3570],
          [82.9750, 25.3572],
          [82.9745, 25.3595],
          [82.9715, 25.3590],
          [82.9720, 25.3570]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 1.15,
      "areaAcres": 2.84,
      "areaSqMeters": 11500,
      "perimeterMeters": 460,
      "elevationMeters": 81,
      "surveyDate": "2023-08-14",
      "surveyMethod": "UP Bhulekh Digital Drone Cadastre",
      "accuracyLevel": "Class-B (+/- 10cm)"
    },
    "landClassification": "Agricultural (Disputed Partition)",
    "landUseCategory": "Agricultural",
    "colorCode": "#DC2626",
    "status": "COURT STAY / TRANSACTION LOCKED",
    "riskScore": 34,
    "riskLevel": "High Risk - Sub-Registrar Locked",
    "revenueRecords": {
      "rorType": "UP Bhulekh Khatauni (Form 45)",
      "khataNumber": "KH-312/SHIVPUR",
      "soilClass": "Alluvial Loam (Doab Class I)",
      "irrigationSource": "State Tubewell #14",
      "cropPattern": "Paddy / Mustard / Seasonal Pulses",
      "cultivatorType": "Disputed Joint Family Possession",
      "landRevenueAssessment": "₹ 34.00 / year",
      "owners": [
        {
          "name": "Om Prakash Tiwari",
          "relation": "S/o Late Ramakant Tiwari",
          "share": 50,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX4419",
          "panMasked": "ABGPTXXXXK",
          "phoneMasked": "+91 94XXX XX192",
          "address": "Shivpur Bazar, Tehsil Sadar, Varanasi 221003"
        },
        {
          "name": "Shivendra Tiwari",
          "relation": "S/o Late Ramakant Tiwari",
          "share": 50,
          "aadhaarSeeded": false,
          "aadhaarMasked": "NOT SEEDED",
          "panMasked": "PENDING",
          "phoneMasked": "+91 91XXX XX401",
          "address": "Shivpur, Varanasi 221003"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-UP-VAR-2017-410",
          "date": "2017-03-12",
          "type": "Contested Succession (Challenged in Court)",
          "orderNo": "TAH/VAR/17/DISP",
          "officer": "Nayab Tehsildar, Shivpur",
          "status": "Under Judicial Stay Order"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-VAR-2017-004102 (Flagged)",
      "deedType": "Contested Partition Deed",
      "sroOffice": "SRO Varanasi Sadar",
      "registrationDate": "2017-02-18",
      "stampDutyPaid": "₹ 44,000",
      "registrationFee": "₹ 15,000",
      "marketValuationGuideline": "₹ 1,12,00,000",
      "index2Verified": false,
      "digitalSignature": "LOCKED_DUE_TO_COURT_INJUNCTION"
    },
    "townPlanning": {
      "masterPlanName": "Varanasi Master Plan 2031 (VDA)",
      "zoningClassification": "Urban Peripheral Controlled Zone",
      "permissibleFAR": 0.5,
      "maxHeightMeters": 9.0,
      "roadAccessWidthMeters": 9.0,
      "bufferRestrictions": "Encroachment sensitive zone along NH-31 feeder",
      "naConversionEligibility": "BLOCKED: NA conversion prohibited until civil suit adjudication"
    },
    "buildingPermissions": {
      "sanctionStatus": "REJECTED / FROZEN: Subject to Civil Court Restraining Order",
      "fileNo": "VDA/REJ/2023/0091",
      "nocChecklist": {
        "fireNoc": "Rejected",
        "environmentalNoc": "Pending",
        "aviationNoc": "N/A",
        "treeAuthority": "N/A"
      }
    },
    "propertyTax": {
      "taxAssessmentId": "PT-VDA-VAR-019482",
      "currentAssessmentYear": "2024-25",
      "annualTax": 980,
      "duesPending": 1960,
      "paymentStatus": "Overdue (2 Years Unpaid)",
      "lastPaymentDate": "2022-03-15",
      "receiptNo": "N/A"
    },
    "encumbrance": {
      "status": "Active Kisan Credit Loan & Legal Caveat",
      "bankName": "Union Bank of India (Shivpur Branch)",
      "cersaiId": "CERSAI-AGR-2020-11928",
      "loanType": "Kisan Credit Card Loan",
      "sanctionedAmount": 200000,
      "chargeCreatedDate": "2020-04-12",
      "necEligibility": "BLOCKED: Non-Encumbrance Certificate CANNOT be issued"
    },
    "litigation": {
      "hasLitigation": true,
      "activeCasesCount": 2,
      "courtCases": [
        {
          "caseNumber": "Civil Original Suit No. 441/2022",
          "court": "Court of Civil Judge (Senior Division), Varanasi",
          "petitioner": "Shivendra Tiwari",
          "respondent": "Om Prakash Tiwari & 3 Others",
          "matter": "Declaration of 1/2 Partition Share & Permanent Injunction",
          "status": "ACTIVE RESTRAINING STAY ORDER (No alienation / transfer permitted)",
          "riskImpact": "HIGH RISK: All deed registration & mutation completely barred"
        }
      ],
      "caveats": [
        {
          "caveatNo": "CAV-VAR-2024-991",
          "applicant": "Shivendra Tiwari",
          "lodgedAt": "SRO Varanasi Sadar",
          "expiryDate": "2027-01-15"
        }
      ],
      "revenueAppeals": ["Appeal No. 89/2023 before SDO Sadar"],
      "eCourtsIntegrationStatus": "Automated Freeze Alert Triggered on e-Courts CNR: UPVR01004412022"
    },
    "utilities": {
      "electricity": {
        "provider": "UPPCL (Purvanchal Vidyut)",
        "consumerNumber": "UPPCL-RUR-550912",
        "category": "Rural Agricultural Unmetered",
        "sanctionedLoad": "5 HP",
        "status": "Notice Issued for Outstanding Dues"
      },
      "water": {
        "provider": "State Tubewell Irrigation Canal",
        "status": "Active"
      },
      "gas": {
        "provider": "N/A",
        "status": "Not Applicable"
      }
    }
  },
  {
    "ulpin": "IN-GJ-AHM-2024-055819",
    "bhuAadhaar": "24-007-0210-0000P",
    "surveyNo": "210/P",
    "subDivision": "Plot-GIDC-992",
    "khasraNo": "210/P",
    "plotNo": "Plot 210/P, Phase II",
    "location": {
      "state": "Gujarat",
      "district": "Ahmedabad",
      "taluka": "Sanand",
      "village": "GIDC Sanand Phase II",
      "pincode": "382110",
      "sroOffice": "SRO Sanand",
      "municipalBody": "GIDC (Gujarat Industrial Development Corporation)",
      "center": [22.9868, 72.3812]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [72.3795, 22.9855],
          [72.3830, 22.9860],
          [72.3825, 22.9882],
          [72.3790, 22.9877],
          [72.3795, 22.9855]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 1.25,
      "areaAcres": 3.08,
      "areaSqMeters": 12500,
      "perimeterMeters": 480,
      "elevationMeters": 53,
      "surveyDate": "2023-12-05",
      "surveyMethod": "AnyRoR Gujarat High Precision DGPS",
      "accuracyLevel": "Class-A (+/- 2cm)"
    },
    "landClassification": "Industrial (Heavy Engineering / Auto Component Hub)",
    "landUseCategory": "Industrial",
    "colorCode": "#9333EA",
    "status": "Clear Title / Operational Manufacturing Unit",
    "riskScore": 95,
    "riskLevel": "Low Risk",
    "revenueRecords": {
      "rorType": "Gujarat AnyRoR Form 7/12 & GIDC Lease Register",
      "khataNumber": "GIDC-SAN-992",
      "soilClass": "Industrial Converted Land",
      "irrigationSource": "GIDC Bulk Industrial Supply & CETP",
      "cropPattern": "N/A (Automotive Component Fabrication Plant)",
      "cultivatorType": "Corporate LLP",
      "landRevenueAssessment": "N/A (GIDC Lease Rent Regime)",
      "owners": [
        {
          "name": "Precision Forge AutoTech India LLP",
          "relation": "Designated Partner: Harshvardhan Mehta",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX5521",
          "panMasked": "AAGFPXXXXP",
          "phoneMasked": "+91 79XXX XX100",
          "address": "Plot 210/P, GIDC Sanand-II, Ahmedabad 382110"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-GJ-AHM-2020-671",
          "date": "2020-09-15",
          "type": "99-Year GIDC Industrial Lease Allotment",
          "orderNo": "GIDC/RO/AHM/ALLOT/20",
          "officer": "Regional Manager, GIDC Ahmedabad",
          "status": "Certified in AnyRoR"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-SAN-2020-006710",
      "deedType": "Industrial 99-Year Lease Deed",
      "sroOffice": "SRO Sanand, Ahmedabad",
      "registrationDate": "2020-08-28",
      "stampDutyPaid": "₹ 18,50,000",
      "registrationFee": "₹ 3,75,000",
      "marketValuationGuideline": "₹ 32,50,00,000",
      "index2Verified": true,
      "digitalSignature": "SHA256:1a84f0289b...VERIFIED"
    },
    "townPlanning": {
      "masterPlanName": "GIDC Sanand Industrial Master Plan 2030",
      "zoningClassification": "Heavy & Engineering Industrial Zone",
      "permissibleFAR": 1.50,
      "maxHeightMeters": 21.0,
      "roadAccessWidthMeters": 30.0,
      "bufferRestrictions": "15m green belt along industrial spine highway maintained",
      "naConversionEligibility": "Permanent Industrial Allotment"
    },
    "buildingPermissions": {
      "sanctionStatus": "Factory Inspectorate & GIDC Engineering Wing Approved",
      "fileNo": "GIDC/ENG/SAN/2021/119",
      "nocChecklist": {
        "fireNoc": "Approved (GIDC Fire Station Sanand NOC #FS-219)",
        "environmentalNoc": "GPCB CTE/CCA Granted (Order #GPCB/AHM/CCA/4412)",
        "aviationNoc": "Exempt (< 30m height)",
        "treeAuthority": "Approved (Green Plantation Coverage 20% on plot)"
      }
    },
    "propertyTax": {
      "taxAssessmentId": "PT-GIDC-SAN-055819",
      "currentAssessmentYear": "2024-25",
      "annualTax": 145000,
      "duesPending": 0,
      "paymentStatus": "Paid",
      "lastPaymentDate": "2024-04-18",
      "receiptNo": "GIDC-REC-2024-1184"
    },
    "encumbrance": {
      "status": "Active Industrial Project Finance Lien",
      "bankName": "ICICI Bank Ltd (Large Corporate Branch, Ahmedabad)",
      "cersaiId": "CERSAI-IND-2020-88412",
      "loanType": "Industrial Term Loan & CAPEX Facility",
      "sanctionedAmount": 120000000,
      "chargeCreatedDate": "2020-10-04",
      "necEligibility": "First Charge Registered with MCA & CERSAI"
    },
    "litigation": {
      "hasLitigation": false,
      "activeCasesCount": 0,
      "courtCases": [],
      "caveats": [],
      "revenueAppeals": [],
      "eCourtsIntegrationStatus": "Clean Title / No Encumbrance Breach"
    },
    "utilities": {
      "electricity": {
        "provider": "UGVCL (Uttar Gujarat Vij Company)",
        "consumerNumber": "UGVCL-HT-0094129",
        "category": "Industrial High Tension 66 kV",
        "sanctionedLoad": "1800 kVA",
        "status": "Active & Operational"
      },
      "water": {
        "provider": "GIDC Bulk Industrial Supply",
        "consumerNumber": "GIDC-WAT-SAN-210",
        "status": "Active"
      },
      "gas": {
        "provider": "Gujarat Gas Ltd",
        "consumerNumber": "GGL-IND-44912",
        "status": "Connected (Industrial Burner Feed)"
      }
    }
  },
  {
    "ulpin": "IN-MH-PUN-2024-099411",
    "bhuAadhaar": "27-025-0029-00010",
    "surveyNo": "29/1",
    "subDivision": "1",
    "khasraNo": "29/1",
    "plotNo": "Government Riparian Green Belt",
    "location": {
      "state": "Maharashtra",
      "district": "Pune",
      "taluka": "Haveli",
      "village": "Mula-Mutha Riparian Zone",
      "pincode": "411001",
      "sroOffice": "SRO Haveli-I",
      "municipalBody": "PMC (Pune Municipal Corporation) / Forest Dept",
      "center": [18.5398, 73.8992]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [73.8975, 18.5385],
          [73.9015, 18.5390],
          [73.9010, 18.5412],
          [73.8970, 18.5408],
          [73.8975, 18.5385]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 3.20,
      "areaAcres": 7.90,
      "areaSqMeters": 32000,
      "perimeterMeters": 780,
      "elevationMeters": 548,
      "surveyDate": "2024-01-08",
      "surveyMethod": "Eco-Cadastre Satellite & LiDAR Boundary",
      "accuracyLevel": "Class-A (+/- 5cm)"
    },
    "landClassification": "Protected / Eco-Sensitive Riverfront Buffer",
    "landUseCategory": "Protected / Government",
    "colorCode": "#0284C7",
    "status": "GOVERNMENT PROTECTED / PROHIBITED DEVELOPMENT",
    "riskScore": 100,
    "riskLevel": "Strictly Prohibited For Private Sale",
    "revenueRecords": {
      "rorType": "Maharashtra 7/12 (Government Land Registry)",
      "khataNumber": "KH-GOV-01-HAVELI",
      "soilClass": "Riverine Riparian Wetland",
      "irrigationSource": "Mula-Mutha River Basin",
      "cropPattern": "N/A (Native Riparian Flora / Flood Attenuation Basin)",
      "cultivatorType": "State Forest & Irrigation Department",
      "landRevenueAssessment": "EXEMPT (Government Sovereign Land)",
      "owners": [
        {
          "name": "Government of Maharashtra (Forest & Water Resources Dept)",
          "relation": "Custodian: Chief Conservator of Forests, Pune Division",
          "share": 100,
          "aadhaarSeeded": false,
          "aadhaarMasked": "GOVT_ENTITY",
          "panMasked": "GOVTM0001A",
          "phoneMasked": "+91 20 2553 4100",
          "address": "Central Forest Bhavan, Senapati Bapat Road, Pune 411016"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-GOV-2014-198",
          "date": "2014-07-22",
          "type": "Eco-Sensitive Gazette Reservation Notification",
          "orderNo": "ENV/2014/198/CR-44",
          "officer": "Principal Secretary (Environment & Forests)",
          "status": "Permanent Gazette Entry"
        }
      ]
    },
    "registration": {
      "deedNo": "GAZETTE-MAH-2014-198",
      "deedType": "State Sovereign Gazette Vesting",
      "sroOffice": "SRO Haveli-I",
      "registrationDate": "2014-07-22",
      "stampDutyPaid": "Exempt",
      "registrationFee": "Exempt",
      "marketValuationGuideline": "Non-Saleable Sovereign Public Asset",
      "index2Verified": true,
      "digitalSignature": "GOVT_PUBLIC_TRUST_ROOT_CA"
    },
    "townPlanning": {
      "masterPlanName": "Pune Development Plan 2041 (PMC & PMRDA)",
      "zoningClassification": "Blue Flood Line & Bio-Diversity Park (BDP) Zone",
      "permissibleFAR": 0.00,
      "maxHeightMeters": 0.0,
      "roadAccessWidthMeters": 18.0,
      "bufferRestrictions": "Total prohibition on concrete construction within 100m high-floodline",
      "naConversionEligibility": "PROHIBITED (Protected Wetland & Eco-Corridor)"
    },
    "buildingPermissions": {
      "sanctionStatus": "PERMANENTLY PROHIBITED (Conservation Reserve)",
      "fileNo": "N/A",
      "nocChecklist": {
        "fireNoc": "N/A",
        "environmentalNoc": "Protected Zone",
        "aviationNoc": "N/A",
        "treeAuthority": "Strict Forest Conservation Act 1980 Enforced"
      }
    },
    "propertyTax": {
      "taxAssessmentId": "EXEMPT-GOVT-099411",
      "currentAssessmentYear": "2024-25",
      "annualTax": 0,
      "duesPending": 0,
      "paymentStatus": "Exempt (Govt Land)",
      "lastPaymentDate": "N/A",
      "receiptNo": "N/A"
    },
    "encumbrance": {
      "status": "Nil (Inalienable Government Asset)",
      "bankName": "None",
      "cersaiId": "N/A",
      "loanType": "None",
      "sanctionedAmount": 0,
      "chargeCreatedDate": "N/A",
      "necEligibility": "Inalienable Public Trust Property"
    },
    "litigation": {
      "hasLitigation": true,
      "activeCasesCount": 1,
      "courtCases": [
        {
          "caseNumber": "Original Application No. 102/2021 (WZ)",
          "court": "National Green Tribunal (Western Zone Bench Pune)",
          "petitioner": "Save River Action Committee",
          "respondent": "PMC & State of Maharashtra",
          "matter": "Suo-motu protection of Blue Line from construction debris dumping",
          "status": "Affirmative compliance order in force / Geo-fencing mandated",
          "riskImpact": "Reinforces permanent non-developable conservation status"
        }
      ],
      "caveats": [],
      "revenueAppeals": [],
      "eCourtsIntegrationStatus": "NGT Geo-fenced Compliance Monitored"
    },
    "utilities": {
      "electricity": {
        "provider": "MSEDCL",
        "consumerNumber": "MSEDCL-SEN-9921",
        "category": "Govt Automated Flood Monitoring Telemetry Station",
        "sanctionedLoad": "2 kW (Solar Backed)",
        "status": "Active"
      },
      "water": {
        "provider": "River Monitoring Hydrology Station",
        "status": "Active Sensor Network"
      },
      "gas": {
        "provider": "N/A",
        "status": "Not Applicable"
      }
    }
  },
  {
    "ulpin": "IN-UP-NOI-2024-077182",
    "bhuAadhaar": "09-020-0078-00004",
    "surveyNo": "GH-04",
    "subDivision": "Sector-78",
    "khasraNo": "GH-04",
    "plotNo": "Group Housing Plot GH-04",
    "location": {
      "state": "Uttar Pradesh",
      "district": "Gautam Buddha Nagar",
      "taluka": "Dadri",
      "village": "Sector 78, Noida",
      "pincode": "201301",
      "sroOffice": "SRO Noida Sector-33",
      "municipalBody": "NOIDA Authority",
      "center": [28.5684, 77.3820]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.3800, 28.5668],
          [77.3845, 28.5672],
          [77.3840, 28.5700],
          [77.3795, 28.5695],
          [77.3800, 28.5668]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 4.50,
      "areaAcres": 11.12,
      "areaSqMeters": 45000,
      "perimeterMeters": 880,
      "elevationMeters": 204,
      "surveyDate": "2023-10-18",
      "surveyMethod": "NOIDA Master Cadastre Digital GIS",
      "accuracyLevel": "Class-A (+/- 2cm)"
    },
    "landClassification": "Residential (Group Housing High-Rise Township)",
    "landUseCategory": "Residential",
    "colorCode": "#F59E0B",
    "status": "Clear Title / OC Sanctioned (480 Units)",
    "riskScore": 92,
    "riskLevel": "Low Risk",
    "revenueRecords": {
      "rorType": "NOIDA Master Lease Registry & UP RERA Registration",
      "khataNumber": "NOIDA-GH-78-004",
      "soilClass": "Urban Converted Group Housing",
      "irrigationSource": "Noida Authority Recycled STP & Piped Ganga Water",
      "cropPattern": "N/A (Multi-Tower G+24 Residential Complex)",
      "cultivatorType": "Apartment Owners Association (AOA)",
      "landRevenueAssessment": "N/A (Urban Lease Rent Paid)",
      "owners": [
        {
          "name": "Green Meadows Residency Apartment Owners Association",
          "relation": "Represented by President Dr. S.K. Verma",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX6102",
          "panMasked": "AAATGXXXXR",
          "phoneMasked": "+91 120 XX 4410",
          "address": "Green Meadows Township, Sector 78, Noida 201301"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-NOI-2022-8812",
          "date": "2022-04-10",
          "type": "Sub-Lease Execution to Individual Allottees",
          "orderNo": "NOIDA/COMM/GH/22",
          "officer": "Officer on Special Duty, NOIDA",
          "status": "Certified in Master Cadastre"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-NOI-2019-005541",
      "deedType": "NOIDA Master Group Housing Lease Deed",
      "sroOffice": "SRO Noida Sector-33",
      "registrationDate": "2019-03-24",
      "stampDutyPaid": "₹ 12,40,00,000",
      "registrationFee": "₹ 1,80,00,000",
      "marketValuationGuideline": "₹ 310,00,00,000",
      "index2Verified": true,
      "digitalSignature": "SHA256:4a009c91fe2...VERIFIED"
    },
    "townPlanning": {
      "masterPlanName": "Noida Master Plan 2031",
      "zoningClassification": "High-Density Group Housing (GH-Zone)",
      "permissibleFAR": 2.75,
      "maxHeightMeters": 78.0,
      "roadAccessWidthMeters": 45.0,
      "bufferRestrictions": "Internal 12m perimeter fire driveways maintained",
      "naConversionEligibility": "Permanent Sanctioned Group Housing Sector"
    },
    "buildingPermissions": {
      "sanctionStatus": "Full Occupancy Certificate (OC) Granted for Towers A through F",
      "fileNo": "NOIDA/PLG/GH/2019/5541/OC",
      "nocChecklist": {
        "fireNoc": "Permanent Fire NOC Active (#UP-FIRE-2023-881)",
        "environmentalNoc": "MoEFCC Clearance Compliant",
        "aviationNoc": "Hindon IAF & Jewar Safe Zone",
        "treeAuthority": "Central Green 35% Area Compliant"
      }
    },
    "propertyTax": {
      "taxAssessmentId": "PT-NOIDA-GH-077182",
      "currentAssessmentYear": "2024-25",
      "annualTax": 1840000,
      "duesPending": 0,
      "paymentStatus": "Paid",
      "lastPaymentDate": "2024-03-31",
      "receiptNo": "NOIDA-TAX-2024-99120"
    },
    "encumbrance": {
      "status": "Builder Project Loan Completely Closed (Master NOC Issued)",
      "bankName": "Punjab National Bank (Master NOC #PNB/LC/2022/90)",
      "cersaiId": "CERSAI-GH-RELEASED-2022",
      "loanType": "Individual Unit Mortgages with Retail Banks",
      "sanctionedAmount": 0,
      "chargeCreatedDate": "Project Loan Cleared",
      "necEligibility": "Clear Title (Deeds Executed for Sub-Leasees)"
    },
    "litigation": {
      "hasLitigation": false,
      "activeCasesCount": 0,
      "courtCases": [],
      "caveats": [],
      "revenueAppeals": [],
      "eCourtsIntegrationStatus": "Clean Title / UP RERA Project Completed"
    },
    "utilities": {
      "electricity": {
        "provider": "NPCL / PVVNL (Noida Power)",
        "consumerNumber": "NPCL-HT-GH-78004",
        "category": "Single Point Bulk Residential (33 kV Substation)",
        "sanctionedLoad": "4500 kW",
        "status": "Active & Dual Source Redundancy"
      },
      "water": {
        "provider": "Noida Authority Water Works",
        "consumerNumber": "NOIDA-WAT-GH-78",
        "category": "Piped Ganga Water Supply",
        "status": "Active"
      },
      "gas": {
        "provider": "IGL (Indraprastha Gas Ltd)",
        "consumerNumber": "IGL-PNG-GH-78480",
        "status": "Piped Natural Gas Active"
      }
    }
  },
  {
    "ulpin": "IN-TG-HYD-2024-041829",
    "bhuAadhaar": "36-030-0122-0000P",
    "surveyNo": "122/P",
    "subDivision": "Campus-A",
    "khasraNo": "122/P",
    "plotNo": "Knowledge Park Institutional Block",
    "location": {
      "state": "Telangana",
      "district": "Rangareddy",
      "taluka": "Serilingampally",
      "village": "Gachibowli",
      "pincode": "500032",
      "sroOffice": "SRO Serilingampally, Hyderabad",
      "municipalBody": "GHMC / TSIIC",
      "center": [17.4401, 78.3489]
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [78.3465, 17.4385],
          [78.3515, 17.4390],
          [78.3510, 17.4420],
          [78.3460, 17.4415],
          [78.3465, 17.4385]
        ]
      ]
    },
    "spatialAttributes": {
      "areaHectares": 6.00,
      "areaAcres": 14.82,
      "areaSqMeters": 60000,
      "perimeterMeters": 1050,
      "elevationMeters": 542,
      "surveyDate": "2023-09-25",
      "surveyMethod": "Telangana Dharani Precision Cadastral Survey",
      "accuracyLevel": "Class-A (+/- 2cm)"
    },
    "landClassification": "Institutional (Higher Education & Research Campus)",
    "landUseCategory": "Institutional",
    "colorCode": "#6366F1",
    "status": "Clear Title / Higher Research Institute",
    "riskScore": 99,
    "riskLevel": "Low Risk",
    "revenueRecords": {
      "rorType": "Telangana Dharani Integrated Land Portal Passbook",
      "khataNumber": "DH-INST-HYD-882",
      "soilClass": "Urban Institutional Converted",
      "irrigationSource": "HMWSSB Bulk Campus Supply & RWH",
      "cropPattern": "N/A (Academic Campus & Labs)",
      "cultivatorType": "Educational Trust / Non-Profit",
      "landRevenueAssessment": "Exempt (Concession for Higher Education)",
      "owners": [
        {
          "name": "Bharat Science & Advanced Technology Foundation",
          "relation": "Chairman of Board of Trustees: Prof. K. Chandrashekhar Rao",
          "share": 100,
          "aadhaarSeeded": true,
          "aadhaarMasked": "XXXXXXXX7741",
          "panMasked": "AAATBXXXXH",
          "phoneMasked": "+91 40 2300 8800",
          "address": "Campus Boulevard, Gachibowli, Hyderabad 500032"
        }
      ],
      "mutationHistory": [
        {
          "mutationNo": "MUT-TG-HYD-2018-902",
          "date": "2018-05-18",
          "type": "Institutional Grant & Trust Conveyance",
          "orderNo": "REV/RRD/SERI/MUT/18",
          "officer": "Tahsildar, Serilingampally",
          "status": "Recorded in Dharani Portal"
        }
      ]
    },
    "registration": {
      "deedNo": "DOC-HYD-2018-009941",
      "deedType": "Institutional Trust Deed & Grant",
      "sroOffice": "SRO Serilingampally",
      "registrationDate": "2018-04-30",
      "stampDutyPaid": "₹ 42,00,000",
      "registrationFee": "₹ 10,50,00,000",
      "marketValuationGuideline": "₹ 140,00,00,000",
      "index2Verified": true,
      "digitalSignature": "SHA256:9c001ef441...VERIFIED"
    },
    "townPlanning": {
      "masterPlanName": "HMDA Master Plan 2031",
      "zoningClassification": "Public & Semi-Public Institutional Zone",
      "permissibleFAR": 2.00,
      "maxHeightMeters": 35.0,
      "roadAccessWidthMeters": 36.0,
      "bufferRestrictions": "Standard 15m arterial setbacks complied",
      "naConversionEligibility": "Permanent Sanctioned Institutional Complex"
    },
    "buildingPermissions": {
      "sanctionStatus": "GHMC Town Planning Sanctioned Academic Complex",
      "fileNo": "GHMC/TP/INST/2018/902",
      "nocChecklist": {
        "fireNoc": "Approved (Telangana Fire Services)",
        "environmentalNoc": "Green Campus Platinum Rating Certified",
        "aviationNoc": "Begumpet Safe Zone",
        "treeAuthority": "Approved Botanical Arboretum"
      }
    },
    "propertyTax": {
      "taxAssessmentId": "PT-GHMC-INST-041829",
      "currentAssessmentYear": "2024-25",
      "annualTax": 230000,
      "duesPending": 0,
      "paymentStatus": "Paid (Institutional Concession)",
      "lastPaymentDate": "2024-04-05",
      "receiptNo": "GHMC-REC-2024-77192"
    },
    "encumbrance": {
      "status": "Nil (Debt-Free Institutional Property)",
      "bankName": "None",
      "cersaiId": "N/A",
      "loanType": "None",
      "sanctionedAmount": 0,
      "chargeCreatedDate": "N/A",
      "necEligibility": "Clear Title / Non-Encumbered"
    },
    "litigation": {
      "hasLitigation": false,
      "activeCasesCount": 0,
      "courtCases": [],
      "caveats": [],
      "revenueAppeals": [],
      "eCourtsIntegrationStatus": "Clean Title / No Adverse Proceedings"
    },
    "utilities": {
      "electricity": {
        "provider": "TSSPDCL (Southern Power)",
        "consumerNumber": "TSSPDCL-HT-041920",
        "category": "High Tension Institutional (33 kV Dedicated Feeder)",
        "sanctionedLoad": "3200 kVA",
        "status": "Active with 500 kW Rooftop Solar"
      },
      "water": {
        "provider": "HMWSSB",
        "consumerNumber": "HMWSSB-BULK-9902",
        "category": "Institutional Bulk Connection",
        "status": "Active"
      },
      "gas": {
        "provider": "Bhagyanagar Gas Ltd",
        "consumerNumber": "BGL-PNG-88412",
        "status": "Active"
      }
    }
  }
];

export const INITIAL_APPLICATIONS = [
  {
    "id": "APP-2024-MUT-8841",
    "applicationType": "Mutation / Khata Transfer",
    "ulpin": "IN-MH-PUN-2024-009871",
    "applicantName": "Sunita Rameshwar Patil",
    "applicantPhone": "+91 98230 91823",
    "applicantEmail": "sunita.patil@example.com",
    "appliedDate": "2026-09-02",
    "status": "Pending Patwari Verification",
    "currentStage": 2,
    "stages": [
      {
        "title": "Application Submitted",
        "description": "Online application received with uploaded deed & identity proof",
        "timestamp": "2026-09-02 10:30 AM",
        "status": "completed",
        "officer": "Citizen Self-Service"
      },
      {
        "title": "Field Survey & GIS Verification",
        "description": "Revenue Inspector / Patwari boundary verification and notice issuance",
        "timestamp": "In Progress",
        "status": "active",
        "officer": "Patwari (Hinjawadi Saja)"
      },
      {
        "title": "Sub-Registrar Cross-Check",
        "description": "Validation against SRO Deed Index-II and Encumbrance records",
        "timestamp": "Pending",
        "status": "pending",
        "officer": "Sub-Registrar Mulshi-II"
      },
      {
        "title": "Tehsildar Digital Order & RoR Update",
        "description": "Final sanction with digital signature and update of 7/12 extract",
        "timestamp": "Pending",
        "status": "pending",
        "officer": "Tahsildar Mulshi"
      }
    ],
    "documents": [
      { "name": "Registered Sale Deed", "file": "Deed_DOC_2018_9412.pdf", "verified": true },
      { "name": "Aadhaar Card", "file": "Aadhaar_Sunita_Patil.pdf", "verified": true },
      { "name": "Latest 7/12 Extract", "file": "7_12_Extract_489.pdf", "verified": true }
    ],
    "notes": "Application for consolidation of family share following family settlement."
  },
  {
    "id": "APP-2024-NOC-1029",
    "applicationType": "Building Permission NOC",
    "ulpin": "IN-RJ-JAI-2024-031204",
    "applicantName": "Vikram Singh Rathore",
    "applicantPhone": "+91 94140 38291",
    "applicantEmail": "vikram.rathore@example.com",
    "appliedDate": "2026-09-05",
    "status": "Under Municipal Scrutiny",
    "currentStage": 2,
    "stages": [
      {
        "title": "NOC Application Submitted",
        "description": "Architectural drawings and structural drawings uploaded",
        "timestamp": "2026-09-05 11:15 AM",
        "status": "completed",
        "officer": "Citizen Portal"
      },
      {
        "title": "GIS Zoning & Setback Scrutiny",
        "description": "Automated cross-check against Master Plan 2025 road widening & buffer lines",
        "timestamp": "In Progress",
        "status": "active",
        "officer": "JDA Town Planning Wing"
      },
      {
        "title": "Site Inspection by Junior Engineer",
        "description": "Physical setback verification on ground",
        "timestamp": "Pending",
        "status": "pending",
        "officer": "JE Zone-8 JDA"
      },
      {
        "title": "Digital Sanction Letter Issued",
        "description": "Building permit sanction QR code generated",
        "timestamp": "Pending",
        "status": "pending",
        "officer": "Executive Engineer JDA"
      }
    ],
    "documents": [
      { "name": "Sanctioned Site Plan", "file": "Site_Plan_Plot72.pdf", "verified": true },
      { "name": "Structural Stability Certificate", "file": "Structure_Cert.pdf", "verified": true }
    ],
    "notes": "Proposed Stilt+3 Residential House as per Master Plan R-1 norms."
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    "id": "AUD-991204",
    "timestamp": "2026-09-10 18:30:12",
    "actorRole": "Revenue Officer (Patwari)",
    "actorName": "Anand S. Kulkarni",
    "action": "GIS_FIELD_SURVEY_VERIFIED",
    "ulpin": "IN-MH-PUN-2024-009871",
    "ipAddress": "10.24.110.42",
    "hash": "8f39a01bce29408e01824a7bc91024",
    "details": "Verified DGPS coordinates of boundary stone #4 on Western edge."
  },
  {
    "id": "AUD-991203",
    "timestamp": "2026-09-10 16:14:05",
    "actorRole": "Registration Officer (Sub-Registrar)",
    "actorName": "K. R. Venkatraman",
    "action": "ENCUMBRANCE_PRE_CHECK_CLEARED",
    "ulpin": "IN-KA-BLR-2024-084912",
    "ipAddress": "10.33.88.19",
    "hash": "77bc901aef44091a998124018ba201",
    "details": "Validated CERSAI mortgage lien against SBI consortium before deed indexing."
  },
  {
    "id": "AUD-991202",
    "timestamp": "2026-09-10 14:02:40",
    "actorRole": "Citizen User",
    "actorName": "Vikram Singh Rathore",
    "action": "PROPERTY_TAX_ONLINE_QUERY",
    "ulpin": "IN-RJ-JAI-2024-031204",
    "ipAddress": "157.34.88.90",
    "hash": "33bfa89012cd889021a88b14e99124",
    "details": "Queried pending municipal tax dues for FY 2024-25."
  },
  {
    "id": "AUD-991201",
    "timestamp": "2026-09-10 11:45:19",
    "actorRole": "Court Liaison Officer",
    "actorName": "e-Courts Automated Gateway",
    "action": "COURT_STAY_ALERT_LOCKED",
    "ulpin": "IN-UP-VAR-2024-019482",
    "ipAddress": "10.0.12.8",
    "hash": "119284fae890bc4412984ea00918ef",
    "details": "Automated freeze lock engaged following Civil Suit 441/2022 interim restraining order."
  }
];
