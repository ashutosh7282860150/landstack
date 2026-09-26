import { INITIAL_PARCELS, INITIAL_APPLICATIONS, INITIAL_AUDIT_LOGS } from '../utils/sampleParcels';

const STORAGE_KEYS = {
  PARCELS: 'landstack_parcels_v1',
  APPLICATIONS: 'landstack_applications_v1',
  AUDIT_LOGS: 'landstack_audit_logs_v1'
};

// Initialize LocalStorage with sample data if empty
const getLocalParcels = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PARCELS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.PARCELS, JSON.stringify(INITIAL_PARCELS));
    return INITIAL_PARCELS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_PARCELS;
  }
};

const getLocalApplications = () => {
  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    return INITIAL_APPLICATIONS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_APPLICATIONS;
  }
};

const getLocalAuditLogs = () => {
  const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
    return INITIAL_AUDIT_LOGS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_AUDIT_LOGS;
  }
};

export const api = {
  // 1. Get Parcels
  async getParcels(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`/api/parcels?${query}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      console.warn('Backend API unreachable, using local storage fallback');
    }
    
    // Fallback logic
    let parcels = getLocalParcels();
    if (params.query) {
      const q = params.query.toLowerCase().trim();
      parcels = parcels.filter(p => 
        p.ulpin.toLowerCase().includes(q) ||
        p.bhuAadhaar.toLowerCase().includes(q) ||
        p.surveyNo.toLowerCase().includes(q) ||
        p.khasraNo.toLowerCase().includes(q) ||
        p.location.village.toLowerCase().includes(q) ||
        p.location.district.toLowerCase().includes(q) ||
        p.location.state.toLowerCase().includes(q) ||
        p.revenueRecords?.owners?.some(o => o.name.toLowerCase().includes(q))
      );
    }
    if (params.state) {
      parcels = parcels.filter(p => p.location.state.toLowerCase() === params.state.toLowerCase());
    }
    if (params.district) {
      parcels = parcels.filter(p => p.location.district.toLowerCase() === params.district.toLowerCase());
    }
    if (params.landUse) {
      parcels = parcels.filter(p => p.landUseCategory.toLowerCase() === params.landUse.toLowerCase());
    }
    return parcels;
  },

  // 2. Get Parcel by ULPIN
  async getParcelByUlpin(ulpin) {
    try {
      const res = await fetch(`/api/parcels/${ulpin}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      console.warn('Backend API unreachable, using local storage fallback');
    }

    const parcels = getLocalParcels();
    return parcels.find(p => p.ulpin.toLowerCase() === ulpin.toLowerCase() || p.bhuAadhaar.toLowerCase() === ulpin.toLowerCase()) || null;
  },

  // 3. Submit Mutation Application
  async submitMutation(data) {
    try {
      const res = await fetch('/api/services/mutate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      console.warn('Backend API unreachable, using local storage fallback');
    }

    // Local fallback
    const apps = getLocalApplications();
    const appId = `APP-${new Date().getFullYear()}-MUT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp = {
      id: appId,
      applicationType: data.applicationType || 'Mutation / Khata Transfer',
      ulpin: data.ulpin,
      applicantName: data.applicantName,
      applicantPhone: data.applicantPhone || '+91 98XXX XXXXX',
      applicantEmail: data.applicantEmail || 'applicant@example.com',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending Patwari Verification',
      currentStage: 1,
      buyerDetails: {
        buyerName: data.buyerName || data.applicantName,
        buyerAadhaar: data.buyerAadhaar || 'XXXXXXXX8899',
        buyerShare: Number(data.buyerShare) || 100
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
      notes: data.notes || 'Online mutation application filed through BHOO BHUMI DPI.'
    };

    apps.unshift(newApp);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));

    const logs = getLocalAuditLogs();
    logs.unshift({
      id: `AUD-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actorRole: 'Citizen User',
      actorName: data.applicantName,
      action: 'ONLINE_MUTATION_FILED',
      ulpin: data.ulpin,
      ipAddress: '157.34.12.99',
      hash: Math.random().toString(36).substring(2, 15),
      details: `Filed Mutation application (${appId}) for ULPIN: ${data.ulpin}`
    });
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));

    return {
      message: 'Mutation application submitted successfully',
      trackingId: appId,
      application: newApp
    };
  },

  // 4. Get Applications
  async getApplications() {
    try {
      const res = await fetch('/api/services/applications');
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      console.warn('Backend API unreachable, using local storage fallback');
    }
    return getLocalApplications();
  },

  // 5. Advance Workflow (Officer Approval)
  async advanceWorkflow({ applicationId, officerRole, officerName, remarks, action }) {
    try {
      const res = await fetch('/api/officer/workflow/advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, officerRole, officerName, remarks, action })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      console.warn('Backend API unreachable, using local storage fallback');
    }

    // Local fallback
    const apps = getLocalApplications();
    const index = apps.findIndex(a => a.id === applicationId);
    if (index === -1) return { error: 'Application not found' };

    const appItem = apps[index];

    if (action === 'reject') {
      appItem.status = `Rejected by ${officerRole || 'Officer'}`;
      appItem.rejectionRemarks = remarks || 'Application rejected due to discrepancies in documents';
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
      return { message: 'Application rejected', application: appItem };
    }

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

    if (appItem.currentStage === appItem.stages.length && action === 'final_approve') {
      appItem.stages[appItem.currentStage - 1].status = 'completed';
      appItem.stages[appItem.currentStage - 1].timestamp = new Date().toLocaleString();
      appItem.status = 'Approved & RoR Digitally Mutated';

      // Update parcel
      const parcels = getLocalParcels();
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
        localStorage.setItem(STORAGE_KEYS.PARCELS, JSON.stringify(parcels));
      }
    }

    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    return { message: 'Workflow advanced', application: appItem };
  },

  // 6. Pay Property Tax
  async payTax({ ulpin, amountPaid }) {
    try {
      const res = await fetch('/api/tax/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ulpin, amountPaid })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      console.warn('Backend API unreachable, using local storage fallback');
    }

    const parcels = getLocalParcels();
    const index = parcels.findIndex(p => p.ulpin.toLowerCase() === ulpin.toLowerCase());
    if (index === -1) return { error: 'Parcel not found' };

    const receiptNo = `REC-TAX-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    parcels[index].propertyTax.duesPending = 0;
    parcels[index].propertyTax.paymentStatus = 'Paid in Full';
    parcels[index].propertyTax.lastPaymentDate = new Date().toISOString().split('T')[0];
    parcels[index].propertyTax.receiptNo = receiptNo;

    localStorage.setItem(STORAGE_KEYS.PARCELS, JSON.stringify(parcels));
    return {
      success: true,
      message: 'Property tax payment processed successfully',
      receiptNo,
      updatedPropertyTax: parcels[index].propertyTax
    };
  },

  // 7. Get Audit Logs
  async getAuditLogs() {
    try {
      const res = await fetch('/api/audit-logs');
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      console.warn('Backend API unreachable, using local storage fallback');
    }
    return getLocalAuditLogs();
  },

  // 8. Get Stats
  async getStats() {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      console.warn('Backend API unreachable, calculating stats locally');
    }

    const parcels = getLocalParcels();
    const applications = getLocalApplications();
    const auditLogs = getLocalAuditLogs();

    const totalAreaHa = parcels.reduce((acc, p) => acc + (p.spatialAttributes?.areaHectares || 0), 0);
    const totalDues = parcels.reduce((acc, p) => acc + (p.propertyTax?.duesPending || 0), 0);
    const litigationCount = parcels.filter(p => p.litigation?.hasLitigation).length;
    const clearTitleCount = parcels.filter(p => !p.litigation?.hasLitigation && (p.riskScore || 0) >= 90).length;

    return {
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
    };
  },

  // Reset to initial demo dataset
  resetDemoData() {
    localStorage.setItem(STORAGE_KEYS.PARCELS, JSON.stringify(INITIAL_PARCELS));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
  }
};
