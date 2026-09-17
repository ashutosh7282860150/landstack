import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to read/write data files
const getFilePath = (fileName) => path.join(__dirname, 'data', fileName);

const readJson = (fileName) => {
  try {
    const raw = fs.readFileSync(getFilePath(fileName), 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${fileName}:`, err.message);
    return [];
  }
};

const writeJson = (fileName, data) => {
  try {
    fs.writeFileSync(getFilePath(fileName), JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${fileName}:`, err.message);
    return false;
  }
};

// ==========================================
// 1. STATS & ANALYTICS
// ==========================================
app.get('/api/stats', (req, res) => {
  const parcels = readJson('parcels.json');
  const applications = readJson('applications.json');
  const auditLogs = readJson('auditLogs.json');

  const totalAreaHa = parcels.reduce((acc, p) => acc + (p.spatialAttributes?.areaHectares || 0), 0);
  const totalDues = parcels.reduce((acc, p) => acc + (p.propertyTax?.duesPending || 0), 0);
  const litigationCount = parcels.filter(p => p.litigation?.hasLitigation).length;
  const clearTitleCount = parcels.filter(p => !p.litigation?.hasLitigation && (p.riskScore || 0) >= 90).length;

  res.json({
    totalParcels: parcels.length,
    activeUlpinCount: parcels.length,
    totalAreaHectares: totalAreaHa.toFixed(2),
    totalAreaAcres: (totalAreaHa * 2.47105).toFixed(2),
    totalApplications: applications.length,
    pendingMutations: applications.filter(a => a.status.includes('Pending') || a.status.includes('Progress')).length,
    clearTitlePercentage: Math.round((clearTitleCount / (parcels.length || 1)) * 100),
    flaggedLitigations: litigationCount,
    totalPendingPropertyTaxDues: totalDues,
    auditTrailEventsCount: auditLogs.length,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// 2. PARCEL GIS & SPATIAL APIS
// ==========================================
app.get('/api/parcels', (req, res) => {
  const { query, state, district, taluka, village, landUse, status, riskLevel } = req.query;
  let parcels = readJson('parcels.json');

  if (query) {
    const q = query.toLowerCase().trim();
    parcels = parcels.filter(p => 
      p.ulpin.toLowerCase().includes(q) ||
      p.bhuAadhaar.toLowerCase().includes(q) ||
      p.surveyNo.toLowerCase().includes(q) ||
      p.khasraNo.toLowerCase().includes(q) ||
      p.plotNo.toLowerCase().includes(q) ||
      p.location.village.toLowerCase().includes(q) ||
      p.location.district.toLowerCase().includes(q) ||
      p.location.state.toLowerCase().includes(q) ||
      p.revenueRecords?.owners?.some(o => o.name.toLowerCase().includes(q))
    );
  }

  if (state) {
    parcels = parcels.filter(p => p.location.state.toLowerCase() === state.toLowerCase());
  }
  if (district) {
    parcels = parcels.filter(p => p.location.district.toLowerCase() === district.toLowerCase());
  }
  if (taluka) {
    parcels = parcels.filter(p => p.location.taluka.toLowerCase() === taluka.toLowerCase());
  }
  if (village) {
    parcels = parcels.filter(p => p.location.village.toLowerCase().includes(village.toLowerCase()));
  }
  if (landUse) {
    parcels = parcels.filter(p => p.landUseCategory.toLowerCase() === landUse.toLowerCase());
  }
  if (status) {
    parcels = parcels.filter(p => p.status.toLowerCase().includes(status.toLowerCase()));
  }

  res.json({
    count: parcels.length,
    data: parcels
  });
});

app.get('/api/parcels/:ulpin', (req, res) => {
  const { ulpin } = req.params;
  const parcels = readJson('parcels.json');
  const parcel = parcels.find(p => p.ulpin.toLowerCase() === ulpin.toLowerCase() || p.bhuAadhaar.toLowerCase() === ulpin.toLowerCase());

  if (!parcel) {
    return res.status(404).json({ error: 'Parcel not found for ULPIN ' + ulpin });
  }

  res.json({ data: parcel });
});

// ==========================================
// 3. CITIZEN SERVICES & MUTATION
// ==========================================
app.get('/api/services/applications', (req, res) => {
  const applications = readJson('applications.json');
  res.json({ data: applications });
});

app.get('/api/services/applications/:id', (req, res) => {
  const { id } = req.params;
  const applications = readJson('applications.json');
  const appFound = applications.find(a => a.id.toLowerCase() === id.toLowerCase());

  if (!appFound) {
    return res.status(404).json({ error: 'Application not found' });
  }

  res.json({ data: appFound });
});

app.post('/api/services/mutate', (req, res) => {
  const { ulpin, applicationType, applicantName, applicantPhone, applicantEmail, buyerName, buyerAadhaar, buyerShare, notes } = req.body;

  if (!ulpin || !applicantName) {
    return res.status(400).json({ error: 'ULPIN and Applicant Name are required' });
  }

  const applications = readJson('applications.json');
  const appId = `APP-${new Date().getFullYear()}-MUT-${Math.floor(1000 + Math.random() * 9000)}`;

  const newApp = {
    id: appId,
    applicationType: applicationType || 'Mutation / Khata Transfer',
    ulpin,
    applicantName,
    applicantPhone: applicantPhone || '+91 98XXX XXXXX',
    applicantEmail: applicantEmail || 'applicant@example.com',
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Pending Patwari Verification',
    currentStage: 1,
    buyerDetails: {
      buyerName: buyerName || applicantName,
      buyerAadhaar: buyerAadhaar || 'XXXXXXXX8899',
      buyerShare: Number(buyerShare) || 100
    },
    stages: [
      {
        title: 'Application Submitted Online',
        description: 'Citizen submitted mutation request with deed details',
        timestamp: new Date().toLocaleString(),
        status: 'completed',
        officer: 'Citizen Self-Service'
      },
      {
        title: 'Revenue Inspector / Patwari Field Verification',
        description: 'Physical & Cadastral GIS stone verification & public notice',
        timestamp: 'In Progress',
        status: 'active',
        officer: 'Patwari / Talathi'
      },
      {
        title: 'Sub-Registrar Deed Verification',
        description: 'Validation against SRO Deed Index-II registry',
        timestamp: 'Pending',
        status: 'pending',
        officer: 'Sub-Registrar'
      },
      {
        title: 'Tehsildar Digital Order & 7/12 RoR Update',
        description: 'Final order generation and automated record mutation',
        timestamp: 'Pending',
        status: 'pending',
        officer: 'Tehsildar'
      }
    ],
    documents: [
      { name: 'Registered Deed Copy', file: 'Deed_Uploaded.pdf', verified: true },
      { name: 'Buyer & Seller KYC Identity', file: 'KYC_Aadhaar.pdf', verified: true }
    ],
    notes: notes || 'Online mutation application filed through LAND STACK DPI.'
  };

  applications.unshift(newApp);
  writeJson('applications.json', applications);

  // Add audit log
  const auditLogs = readJson('auditLogs.json');
  auditLogs.unshift({
    id: `AUD-${Math.floor(100000 + Math.random() * 900000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    actorRole: 'Citizen User',
    actorName: applicantName,
    action: 'ONLINE_MUTATION_FILED',
    ulpin,
    ipAddress: '157.34.12.99',
    hash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    details: `Filed ${applicationType || 'Mutation'} application (ID: ${appId}) for ULPIN: ${ulpin}`
  });
  writeJson('auditLogs.json', auditLogs);

  res.status(201).json({
    message: 'Mutation application submitted successfully',
    trackingId: appId,
    application: newApp
  });
});

// ==========================================
// 4. OFFICER WORKFLOW ACTIONS (Patwari / SRO / Tehsildar)
// ==========================================
app.post('/api/officer/workflow/advance', (req, res) => {
  const { applicationId, officerRole, officerName, remarks, action } = req.body;

  const applications = readJson('applications.json');
  const index = applications.findIndex(a => a.id === applicationId);

  if (index === -1) {
    return res.status(404).json({ error: 'Application not found' });
  }

  const appItem = applications[index];

  if (action === 'reject') {
    appItem.status = `Rejected by ${officerRole || 'Officer'}`;
    appItem.rejectionRemarks = remarks || 'Application rejected due to discrepancies in documents';
    writeJson('applications.json', applications);
    return res.json({ message: 'Application rejected', application: appItem });
  }

  // Advance stage
  if (appItem.currentStage < appItem.stages.length) {
    appItem.stages[appItem.currentStage - 1].status = 'completed';
    appItem.stages[appItem.currentStage - 1].timestamp = new Date().toLocaleString();
    appItem.stages[appItem.currentStage - 1].officer = officerName || officerRole || 'Officer';

    appItem.currentStage += 1;
    if (appItem.currentStage <= appItem.stages.length) {
      appItem.stages[appItem.currentStage - 1].status = 'active';
      appItem.stages[appItem.currentStage - 1].timestamp = 'In Progress';
      appItem.status = `In Progress: ${appItem.stages[appItem.currentStage - 1].title}`;
    }
  }

  // If reached last stage and completed
  if (appItem.currentStage === appItem.stages.length && action === 'final_approve') {
    appItem.stages[appItem.currentStage - 1].status = 'completed';
    appItem.stages[appItem.currentStage - 1].timestamp = new Date().toLocaleString();
    appItem.status = 'Approved & RoR Digitally Mutated';

    // Update the parcel RoR in parcels.json!
    const parcels = readJson('parcels.json');
    const pIndex = parcels.findIndex(p => p.ulpin === appItem.ulpin);
    if (pIndex !== -1 && appItem.buyerDetails) {
      parcels[pIndex].revenueRecords.owners.push({
        name: appItem.buyerDetails.buyerName,
        relation: 'Transferee / Purchaser',
        share: appItem.buyerDetails.buyerShare || 50,
        aadhaarSeeded: true,
        aadhaarMasked: 'XXXXXXXX7812',
        panMasked: 'ABCXXXX99K',
        phoneMasked: appItem.applicantPhone,
        address: 'Registered Purchaser'
      });

      parcels[pIndex].revenueRecords.mutationHistory.unshift({
        mutationNo: `MUT-AUTO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        type: 'Digital Public Infrastructure Mutation Order',
        orderNo: `TEH/REV/DPI/${appItem.id}`,
        officer: officerName || 'Tehsildar',
        status: 'Certified & RoR Synchronized'
      });
      writeJson('parcels.json', parcels);
    }
  }

  writeJson('applications.json', applications);

  // Add audit log
  const auditLogs = readJson('auditLogs.json');
  auditLogs.unshift({
    id: `AUD-${Math.floor(100000 + Math.random() * 900000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    actorRole: officerRole || 'Revenue Officer',
    actorName: officerName || 'Officer',
    action: `WORKFLOW_STAGE_ADVANCED_${appItem.currentStage}`,
    ulpin: appItem.ulpin,
    ipAddress: '10.14.90.12',
    hash: Math.random().toString(36).substring(2, 15),
    details: `${officerRole} approved stage for application ${appItem.id}. Remarks: ${remarks || 'Approved'}`
  });
  writeJson('auditLogs.json', auditLogs);

  res.json({
    message: 'Workflow advanced successfully',
    application: appItem
  });
});

// ==========================================
// 5. TAX PAYMENT MOCK GATEWAY
// ==========================================
app.post('/api/tax/pay', (req, res) => {
  const { ulpin, paymentMethod, amountPaid } = req.body;

  const parcels = readJson('parcels.json');
  const index = parcels.findIndex(p => p.ulpin.toLowerCase() === ulpin.toLowerCase());

  if (index === -1) {
    return res.status(404).json({ error: 'Parcel not found' });
  }

  const receiptNo = `REC-TAX-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  parcels[index].propertyTax.duesPending = 0;
  parcels[index].propertyTax.paymentStatus = 'Paid in Full';
  parcels[index].propertyTax.lastPaymentDate = new Date().toISOString().split('T')[0];
  parcels[index].propertyTax.receiptNo = receiptNo;

  writeJson('parcels.json', parcels);

  // Add audit log
  const auditLogs = readJson('auditLogs.json');
  auditLogs.unshift({
    id: `AUD-${Math.floor(100000 + Math.random() * 900000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    actorRole: 'Citizen / Payment Gateway',
    actorName: 'Unified Payments Interface (UPI)',
    action: 'PROPERTY_TAX_PAYMENT_SETTLED',
    ulpin,
    ipAddress: '115.110.45.12',
    hash: Math.random().toString(36).substring(2, 15),
    details: `Online property tax settled for ₹ ${amountPaid || parcels[index].propertyTax.annualTax}. Receipt generated: ${receiptNo}`
  });
  writeJson('auditLogs.json', auditLogs);

  res.json({
    success: true,
    message: 'Property tax payment processed successfully',
    receiptNo,
    updatedPropertyTax: parcels[index].propertyTax
  });
});

// ==========================================
// 6. AUDIT TRAIL LOGS
// ==========================================
app.get('/api/audit-logs', (req, res) => {
  const auditLogs = readJson('auditLogs.json');
  res.json({ data: auditLogs });
});

// Root API Welcome & Health
app.get('/api', (req, res) => {
  res.json({
    platform: 'LAND STACK - Integrated GIS-based Digital Public Infrastructure for Land Governance',
    version: '1.0.0-SIH-Prototype',
    status: 'Operational',
    disclaimer: 'DEMO DATA ONLY - Developed for Smart India Hackathon Demonstration',
    endpoints: [
      '/api/stats',
      '/api/parcels',
      '/api/parcels/:ulpin',
      '/api/services/applications',
      '/api/services/mutate',
      '/api/officer/workflow/advance',
      '/api/tax/pay',
      '/api/audit-logs'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`[LAND STACK DPI Backend] Server running on http://localhost:${PORT}`);
  console.log(`[LAND STACK DPI Backend] Demo data active across 8 Cadastral Parcels`);
});
