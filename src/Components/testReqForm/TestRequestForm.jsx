import axios from "axios";
import React, { useState, useEffect } from "react";

// ===================== CONSTANTS =====================
const TESTING_FIELDS = {
  ETO: [
    { name: "etoConcentration", label: "ETO Concentration", placeholder: "e.g. 600 mg/L" },
    { name: "exposureTime", label: "Exposure Time", placeholder: "e.g. 4 hours" },
    { name: "temperature", label: "Temperature", placeholder: "e.g. 54°C" },
    { name: "humidity", label: "Humidity", placeholder: "e.g. 60%" },
    { name: "residueLevel", label: "Residue Level", placeholder: "e.g. < 10 ppm" },
  ],
  Micro: [
    { name: "totalPlateCount", label: "Total Plate Count", placeholder: "e.g. < 100 CFU/g" },
    { name: "yeastMold", label: "Yeast & Mold", placeholder: "e.g. < 10 CFU/g" },
    { name: "eColi", label: "E. Coli", placeholder: "e.g. Absent/25g" },
    { name: "salmonella", label: "Salmonella", placeholder: "e.g. Absent/25g" },
    { name: "coliformBacteria", label: "Coliform Bacteria", placeholder: "e.g. < 3 MPN/g" },
  ],
  Physical: [
    { name: "textureAnalysis", label: "Texture Analysis", placeholder: "e.g. Firm, 8.5 N" },
    { name: "colorMeasurement", label: "Color Measurement", placeholder: "e.g. L*=92" },
    { name: "moistureContent", label: "Moisture Content", placeholder: "e.g. 12.5%" },
    { name: "particleSizeShape", label: "Particle Size & Shape", placeholder: "e.g. 50–100 µm" },
    { name: "viscosity", label: "Viscosity", placeholder: "e.g. 450 mPa·s" },
    { name: "densitySpecificGravity", label: "Density / Specific", placeholder: "e.g. 1.05 g/cm³" },
    { name: "waterActivity", label: "Water Activity", placeholder: "e.g. 0.87 aw" },
  ],
  Chemical: [
    { name: "phLevel", label: "pH Level", placeholder: "e.g. 6.8" },
    { name: "ashContent", label: "Ash Content", placeholder: "e.g. 1.2%" },
    { name: "proteinContent", label: "Protein Content", placeholder: "e.g. 18.5%" },
    { name: "fatContent", label: "Fat Content", placeholder: "e.g. 5.3%" },
    { name: "peroxideValue", label: "Peroxide Value", placeholder: "e.g. 2.1 meq/kg" },
    { name: "heavyMetals", label: "Heavy Metals", placeholder: "e.g. Pb < 0.5 ppm" },
  ],
  Presticide: [
    { name: "activeIngredient", label: "Active Ingredient", placeholder: "e.g. Chlorpyrifos" },
    { name: "concentration", label: "Concentration", placeholder: "e.g. 500 g/L" },
    { name: "solventUsed", label: "Solvent Used", placeholder: "e.g. Xylene" },
    { name: "stabilityTest", label: "Stability Test", placeholder: "e.g. Stable at 54°C" },
    { name: "phOfSolution", label: "pH of Solution", placeholder: "e.g. 6.5" },
  ],
};
const savingLoader = false
const COMPANY_DATA = [
  { name: "Aryan group 1", code: "AG01", type: "Internal" },
  { name: "Aryan group 2", code: "AG02", type: "External" },
  { name: "Aryan group 3", code: "AG03", type: "Internal" },
  { name: "Aryan group 4", code: "AG04", type: "External" },
];

const LAB_DATA = [
  { name: "Central Lab", code: "LAB-C01", type: "Internal" },
  { name: "Micro Analysis Hub", code: "LAB-M02", type: "Internal" },
  { name: "External Partner Lab", code: "LAB-E03", type: "External" },
  { name: "Research Lab", code: "LAB-R04", type: "Internal" },
];

const PRODUCT_DATA = [
  { name: "Medical Gauze", sampleCode: "MG-101" },
  { name: "Surgical Mask", sampleCode: "SM-202" },
  { name: "Nitrile Gloves", sampleCode: "NG-303" },
  { name: "IV Cannula", sampleCode: "IV-404" },
  { name: "Syringe (10ml)", sampleCode: "SY-505" },
];

const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;

const buildInitialFields = (testKey) =>
  TESTING_FIELDS[testKey].map((f) => ({
    id: `predefined-${f.name}`,
    fieldName: f.label,
    fieldValue: "",
    placeholder: f.placeholder,
    isPredefined: true,
  }));

const SAMPLE_REQUESTS = [
  {
    id: "1713264000000-abc12345",
    companyName: "Aryan group 1",
    companyCode: "AG01",
    requestName: "Batch #24-05 Stability",
    labName: "Central Lab",
    labCode: "LAB-C01",
    labType: "Internal",
    productName: "Medical Gauze",
    lotNo: "LOT-2409",
    sampleCode: "MG-101",
    selectedTests: ["Physical", "Chemical"],
    testData: {
      Physical: { fields: buildInitialFields("Physical") },
      Chemical: { fields: buildInitialFields("Chemical") },
    },
    remark: "Routine stability testing at ambient conditions",
    createdAt: new Date("2024-04-16").toISOString(),
  },
  {
    id: "1713350400000-def67890",
    companyName: "Aryan group 2",
    companyCode: "AG02",
    requestName: "Microbiological Analysis",
    labName: "Micro Analysis Hub",
    labCode: "LAB-M02",
    labType: "Internal",
    productName: "Surgical Mask",
    lotNo: "LOT-2410",
    sampleCode: "SM-202",
    selectedTests: ["Micro"],
    testData: { Micro: { fields: buildInitialFields("Micro") } },
    remark: "Bioburden testing for medical device",
    createdAt: new Date("2024-04-15").toISOString(),
  },
];

// ===================== SPINNER =====================
const Spinner = ({ color = "#ffffff", size = 14 }) => (
  <span
    style={{
      display: "inline-block",
      width: size,
      height: size,
      border: `2px solid ${color}33`,
      borderTopColor: color,
      borderRadius: "50%",
      animation: "trf-spin 0.65s linear infinite",
      flexShrink: 0,
    }}
  />
);

// ===================== TABLE LOADER =====================
const TableLoader = ({ text }) => (
  <div style={styles.tableLoaderWrap}>
    <div style={styles.tableLoaderInner}>
      <span style={styles.tableLoaderSpinner} />
      <span style={styles.tableLoaderText}>{text}</span>
    </div>
  </div>
);

// ===================== SKELETON ROW =====================
const SkeletonRow = () => (
  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
    {[36, 130, 110, 110, 100, 70, 72].map((w, i) => (
      <td key={i} style={{ padding: "14px 16px", verticalAlign: "middle" }}>
        <div style={{ ...styles.skeletonBase, width: w, height: 14, borderRadius: 6 }} />
      </td>
    ))}
  </tr>
);

// ===================== MAIN COMPONENT =====================
const TestRequestForm = () => {
  // ========== State ==========
  const [allTestingFilds, setAllTestingFilds] = useState({}); // object: { testName: [fields] }
  const [companiesData, setCompaniesData] = useState([]);
  const [allLabs, setAllLabs] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Form fields – Cards 1,2,3,5
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [requestName, setRequestName] = useState("");
  const [selectedLabName, setSelectedLabName] = useState("");
  const [labCode, setLabCode] = useState("");
  const [labType, setLabType] = useState("");
  const [productName, setProductName] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [sampleCode, setSampleCode] = useState("");
  const [remark, setRemark] = useState("");

  // Card 4 – Tests
  const [selectedTests, setSelectedTests] = useState([]); // array of test_name strings
  const [testData, setTestData] = useState({}); // { test_name: { fields: [...] } }

  // Editing & Table
  const [editingId, setEditingId] = useState(null);
  const [trfList, setTrfList] = useState([]); // array from backend (full payload)

  // ========== Helper: build fields for a test from predefined object ==========
  const buildInitialFields = (testName) => {
    const fieldsArray = allTestingFilds[testName];
    if (!fieldsArray) return [];
    return fieldsArray.map((f) => ({
      id: `predefined-${f.id}-${f.name}`,
      fieldName: f.label,
      fieldValue: "",
      placeholder: f.placeholder,
      isPredefined: true,
      dbFieldId: f.id, // store original field id
    }));
  };

  // ========== API calls ==========
  const handleGetAllTests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tests");
      if (response.data && response.data.TESTING_FIELDS) {
        // Expecting an object: { "Physical": [...], "Chemical": [...] }
        setAllTestingFilds(response.data.TESTING_FIELDS);
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
      alert("Failed to load test definitions");
    }
  };

  const handleGetAllCompany = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/getCompanies",
      );
      if (response.data && response.data.allCompanies) {
        setCompaniesData(response.data.allCompanies);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleGetLab = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/labs");
      if (response.data && response.data.allLabs) {
        setAllLabs(response.data.allLabs);
      }
    } catch (error) {
      console.error("Error fetching labs:", error);
    }
  };

  const handleGetProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      if (response.data && response.data.allProducts) {
        setAllProducts(response.data.allProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchTrfList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/trf");
      // Backend returns array directly (as per your requirement)
      setTrfList(response.data);
    } catch (error) {
      console.error("Error fetching TRF list:", error);
      alert("Failed to load TRF list");
    }
  };

  // ========== Auto‑fill helpers ==========
  useEffect(() => {
    const selected = companiesData.find(
      (c) => c.companyName === selectedCompanyName,
    );
    setCompanyCode(selected ? selected.companyCode : "");
  }, [selectedCompanyName, companiesData]);

  useEffect(() => {
    const selected = allLabs.find((l) => l.labName === selectedLabName);
    if (selected) {
      setLabCode(selected.labCode);
      setLabType(selected.labType);
    } else {
      setLabCode("");
      setLabType("");
    }
  }, [selectedLabName, allLabs]);

  useEffect(() => {
    const selectedProduct = allProducts.find(
      (p) => p.productName === productName,
    );
    setSampleCode(selectedProduct ? selectedProduct.productId : "");
  }, [productName, allProducts]);

  // ========== Test selection & field initialisation ==========
  const initializeTestData = (testName) => {
    if (!testData[testName]) {
      setTestData((prev) => ({
        ...prev,
        [testName]: { fields: buildInitialFields(testName) },
      }));
    }
  };

  useEffect(() => {
    selectedTests.forEach((testName) => {
      if (!testData[testName]) initializeTestData(testName);
    });
  }, [selectedTests]);

  const toggleTest = (testName) => {
    if (selectedTests.includes(testName)) {
      setSelectedTests(selectedTests.filter((t) => t !== testName));
    } else {
      setSelectedTests([...selectedTests, testName]);
      initializeTestData(testName);
    }
  };

  // ========== Custom field management ==========
  const addCustomField = (testName) => {
    const newField = {
      id: generateUniqueId(),
      fieldName: "",
      fieldValue: "",
      placeholder: "e.g., enter parameter name",
      isPredefined: false,
      dbFieldId: null,
    };
    setTestData((prev) => ({
      ...prev,
      [testName]: {
        ...prev[testName],
        fields: [...(prev[testName]?.fields || []), newField],
      },
    }));
  };

  const updateCustomFieldName = (testName, fieldId, value) => {
    setTestData((prev) => ({
      ...prev,
      [testName]: {
        ...prev[testName],
        fields: prev[testName].fields.map((f) =>
          f.id === fieldId && !f.isPredefined ? { ...f, fieldName: value } : f,
        ),
      },
    }));
  };

  const removeCustomField = (testName, fieldId) => {
    setTestData((prev) => ({
      ...prev,
      [testName]: {
        ...prev[testName],
        fields: prev[testName].fields.filter(
          (f) => f.id !== fieldId || f.isPredefined,
        ),
      },
    }));
  };

  // ========== Form reset & load for edit ==========
  const resetForm = () => {
    setSelectedCompanyName(""); setCompanyCode(""); setRequestName("");
    setSelectedLabName(""); setLabCode(""); setLabType("");
    setProductName(""); setLotNo(""); setSampleCode("");
    setSelectedTests([]); setTestData({}); setRemark(""); setEditingId(null);
  };

  // Load TRF for editing – uses the same array response (full payload)
  const loadRequestForEdit = async (trf) => {
    // trf comes from the list (or you can fetch by id)
    const response = await axios.get(`http://localhost:5000/api/trf/${trf.id}`);
    const data = response.data;

    setEditingId(trf.id);
    setSelectedCompanyName(
      companiesData.find((c) => c.id === data.companyId)?.companyName || "",
    );
    setCompanyCode(
      companiesData.find((c) => c.id === data.companyId)?.companyCode || "",
    );
    setRequestName(data.requestName);
    setSelectedLabName(allLabs.find((l) => l.id === data.labId)?.labName || "");
    setLabCode(allLabs.find((l) => l.id === data.labId)?.labCode || "");
    setLabType(allLabs.find((l) => l.id === data.labId)?.labType || "");
    setProductName(
      allProducts.find((p) => p.id === data.productId)?.productName || "",
    );
    setSampleCode(
      allProducts.find((p) => p.id === data.productId)?.productId || "",
    );
    setLotNo(data.lotNo);
    setRemark(data.remark);

    // Reconstruct testData and selectedTests using the new fields
    const newSelectedTests = [];
    const newTestData = {};

    for (const test of data.selectedTests) {
      // Find test name from testId using allTestingFilds
      let testName = null;
      for (const [name, fields] of Object.entries(allTestingFilds)) {
        if (fields[0]?.id === test.testId) {
          testName = name;
          break;
        }
      }
      if (!testName) testName = `Test_${test.testId}`;
      newSelectedTests.push(testName);

      const fieldsArray = test.fields.map((f, idx) => ({
        id: f.isPredefined ? `predefined-${f.fieldId}` : generateUniqueId(),
        fieldName: f.isPredefined
          ? f.label || "Predefined"
          : f.customLabel || "",
        fieldValue: "",
        placeholder: f.placeholder,
        isPredefined: f.isPredefined,
        dbFieldId: f.isPredefined ? f.fieldId : null,
      }));
      newTestData[testName] = { fields: fieldsArray };
    }

    setSelectedTests(newSelectedTests);
    setTestData(newTestData);
  };

  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/trf/${id}`,
      );
      if (response.data.success) {
        alert("TRF deleted successfully");
        fetchTrfList(); // refresh list
        if (editingId === id) resetForm();
      } else {
        alert(response.data.error || "Delete failed");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error.response?.data?.error || "Failed to delete TRF");
    }
  };

  const handleSaveRequest = async () => {
    if (
      !selectedCompanyName ||
      !selectedLabName ||
      !requestName ||
      !productName
    ) {
      alert(
        "Please fill required fields: Company, Lab Name, Request Name, Product Name",
      );
      return;
    }

    const companyObj = companiesData.find(
      (c) => c.companyName === selectedCompanyName,
    );
    const labObj = allLabs.find((l) => l.labName === selectedLabName);
    const productObj = allProducts.find((p) => p.productName === productName);

    if (!companyObj || !labObj || !productObj) {
      alert("Invalid selection. Please reselect.");
      return;
    }

    // Build selectedTests payload using object access
    const selectedTestsPayload = selectedTests.map((testName) => {
      const fieldsArrayForTest = allTestingFilds[testName];
      if (!fieldsArrayForTest) throw new Error(`Test ${testName} not found`);
      // Get testId from the first field's id (all fields under same test share test id)
      const testId = fieldsArrayForTest[0]?.id;
      if (!testId) throw new Error(`No testId found for ${testName}`);
      const userFields = testData[testName]?.fields || [];
      console.log("userFields", userFields);

      return {
        testId: testId,
        fields: userFields.map((f) => ({
          fieldId: f.isPredefined ? f.dbFieldId : null,
          customLabel: f.fieldName,
          placeholder: f.placeholder,
          isPredefined: f.isPredefined,
        })),
      };
    });

    const payload = {
      companyId: companyObj.id,
      requestName,
      labId: labObj.id,
      productId: productObj.id,
      lotNo,
      remark,
      createdBy: "admin@example.com",
      selectedTests: selectedTestsPayload,
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/trf/${editingId}`, payload);
        alert("TRF updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/trf",
          payload,
        );
        if (response.data.success) {
          alert(`TRF created: ${response.data.trfCode}`);
        }
      }
      resetForm();
      fetchTrfList();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to save TRF");
    }
  };

  const cancelEdit = () => resetForm();

  // ========== Initial data load ==========
  useEffect(() => {
    handleGetAllTests();
    handleGetAllCompany();
    handleGetLab();
    handleGetProduct();
    fetchTrfList();
  }, []);

  // ========== Render ==========
  return (
    <div style={styles.container}>
      <style>{`
        @keyframes trf-spin { to { transform: rotate(360deg); } }
        @keyframes trf-shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .trf-skeleton {
          background: linear-gradient(90deg, #ebebeb 25%, #f5f5f5 50%, #ebebeb 75%);
          background-size: 600px 100%;
          animation: trf-shimmer 1.4s infinite linear;
        }
      `}</style>

      <h1 style={styles.mainTitle}>📋 Admin – Define Test Proform</h1>

      {/* Card 1: Company Details */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🏢 1. Company Details</h2>
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label>Company Name *</label>
            <select value={selectedCompanyName} onChange={(e) => setSelectedCompanyName(e.target.value)} style={styles.input}>
              <option value="">-- Select Company --</option>
              {companiesData.map((comp) => (
                <option key={comp.id} value={comp.companyName}>
                  {comp.companyName}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <label>Code</label>
            <input type="text" value={companyCode} readOnly style={{ ...styles.input, backgroundColor: "#f5f5f5" }} />
          </div>
          <div style={styles.fieldGroup}>
            <label>Request Name *</label>
            <input type="text" value={requestName} onChange={(e) => setRequestName(e.target.value)} style={styles.input} />
          </div>
        </div>
      </div>

      {/* Card 2: Laboratory Information */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🔬 2. Laboratory Information</h2>
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label>Lab Name *</label>
            <select value={selectedLabName} onChange={(e) => setSelectedLabName(e.target.value)} style={styles.input}>
              <option value="">-- Select Lab --</option>
              {allLabs.map((lab) => (
                <option key={lab.id} value={lab.labName}>
                  {lab.labName}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <label>Lab Code</label>
            <input type="text" value={labCode} readOnly style={{ ...styles.input, backgroundColor: "#f5f5f5" }} />
          </div>
          <div style={styles.fieldGroup}>
            <label>Type</label>
            <input type="text" value={labType} readOnly style={{ ...styles.input, backgroundColor: "#f5f5f5" }} />
          </div>
        </div>
      </div>

      {/* Card 3: Product Details */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📦 3. Product Details</h2>
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label>Product Name *</label>
            <select value={productName} onChange={(e) => setProductName(e.target.value)} style={styles.input}>
              <option value="">-- Select Product --</option>
              {allProducts.map((prod) => (
                <option key={prod.id} value={prod.productName}>
                  {prod.productName}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <label>Lot No.</label>
            <input type="text" value={lotNo} onChange={(e) => setLotNo(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.fieldGroup}>
            <label>Sample Code</label>
            <input type="text" value={sampleCode} readOnly style={{ ...styles.input, backgroundColor: "#f5f5f5" }} />
          </div>
        </div>
      </div>

      {/* Card 4: Define Test Proform */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🧪 4. Define Test Proform (Structure only)</h2>
        <div style={styles.testCheckboxGroup}>
          {Object.keys(allTestingFilds).map((testKey) => (
            <label key={testKey} style={styles.checkboxLabel}>
              <input type="checkbox" checked={selectedTests.includes(testKey)} onChange={() => toggleTest(testKey)} />
              {testKey}
            </label>
          ))}
        </div>

        {selectedTests.map((testName) => (
          <div key={testName} style={styles.testSection}>
            <div style={styles.testHeader}>
              <h3>🔬 {testName} </h3>
              <button
                onClick={() => addCustomField(testName)}
                style={styles.addCustomBtn}
              >
                + Add Custom Field
              </button>
            </div>
            <div style={styles.grid2Col}>
              {testData[testName]?.fields?.map((field) => (
                <div key={field.id} style={styles.fieldGroup}>
                  {field.isPredefined ? (
                    <label style={styles.label}>{field.fieldName}</label>
                  ) : (
                    <input
                      type="text"
                      placeholder="Parameter name (e.g., Viscosity Index)"
                      value={field.fieldName}
                      onChange={(e) =>
                        updateCustomFieldName(
                          testName,
                          field.id,
                          e.target.value,
                        )
                      }
                      style={{
                        ...styles.input,
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    />
                  )}
                  <div
                    style={{
                      ...styles.input,
                      backgroundColor: "#f9f9f9",
                      color: "#888",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
                      {field.placeholder || "(Value will be filled later)"}
                    </span>
                    {!field.isPredefined && (
                      <button
                        onClick={() => removeCustomField(testName, field.id)}
                        style={styles.removeIconBtn}
                        title="Remove field"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {selectedTests.length === 0 && (
          <div style={styles.emptyTestsMsg}>☑️ Select at least one test category.</div>
        )}
      </div>

      {/* Card 5: Remark */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📝 5. Remark / Purpose</h2>
        <textarea rows="3" value={remark} onChange={(e) => setRemark(e.target.value)} style={{ ...styles.input, width: "100%" }} />
      </div>

      {/* ===== ACTION BAR ===== */}
      <div style={styles.actionBar}>
        <button
          onClick={handleSaveRequest}
          // disabled={savingLoader}
          style={{
            ...styles.primaryBtn,
            opacity: savingLoader ? 0.8 : 1,
            cursor: savingLoader ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {savingLoader && <Spinner color="#ffffff" size={14} />}
          {savingLoader
            ? (editingId ? "Updating..." : "Creating...")
            : (editingId ? "Update Request" : "Create Request")}
        </button>
        {editingId && (
          <button onClick={cancelEdit} style={styles.secondaryBtn}>Cancel Edit</button>
        )}
      </div>

      {/* List of saved TRFs */}
      <div style={styles.tableWrapper}>
        <h2 style={styles.cardTitle}>📋 Submitted Requests</h2>
        {trfList.length === 0 ? (
          <div style={styles.emptyTable}>No requests created yet.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Company</th>
                <th>Request Name</th>
                <th>Lab Name</th>
                <th>Product</th>
                <th>Tests</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trfList.map((trf, idx) => {
                const company = companiesData.find(
                  (c) => c.id === trf.companyId,
                );
                const product = allProducts.find((p) => p.id === trf.productId);
                const testNames = trf.selectedTests.map((t) => {
                  const entry = Object.entries(allTestingFilds).find(
                    ([, fields]) => fields[0]?.id === t.testId,
                  );
                  return entry ? entry[0] : `Test_${t.testId}`;
                });
                return (
                  <tr key={idx}>
                    <td>{trf.trfCode}</td>
                    <td>{trf.companyName}</td>
                    <td>{trf.requestName}</td>
                    <td>{trf.labName}</td>
                    <td>{trf.productName}</td>
                    <td>{testNames.join(", ")}</td>
                    <td>
                      <button
                        onClick={() => loadRequestForEdit(trf)}
                        style={styles.editBtn}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRequest(trf.id)}
                        style={styles.delBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// ===================== Styles (unchanged) =====================
const styles = {
  container: {
    maxWidth: "95vw",
    margin: "0 auto",
    padding: "50px 16px",
    background: "#ffffff",
    color: "#000000",
  },
  mainTitle: {
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "28px",
    paddingLeft: "18px",
    letterSpacing: "-0.3px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #eaeaea",
    borderRadius: "24px",
    padding: "24px 28px",
    marginBottom: "28px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.05)",
  },
  cardTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
    marginBottom: "20px",
    paddingBottom: "8px",
    borderBottom: "2px solid #f0f0f0",
  },
  row: { display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "flex-end" },
  fieldGroup: { flex: "1 1 200px", minWidth: "180px" },
  label: { display: "block", marginBottom: "6px", fontWeight: "500", fontSize: "0.85rem", color: "#1a1a1a" },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cccccc",
    borderRadius: "12px",
    fontSize: "0.9rem",
    backgroundColor: "#ffffff",
    color: "#000000",
    outline: "none",
    transition: "0.2s",
    boxSizing: "border-box",
  },
  testCheckboxGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    marginBottom: "28px",
    padding: "12px 0",
    borderBottom: "1px dashed #ddd",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    background: "#fafafa",
    padding: "6px 14px",
    borderRadius: "40px",
    border: "1px solid #e2e2e2",
    gap: "8px",
  },
  testSection: {
    background: "#fefefe",
    border: "1px solid #ededed",
    borderRadius: "20px",
    padding: "18px 22px",
    marginBottom: "24px",
  },
  testHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  addCustomBtn: {
    background: "#ffffff",
    border: "1px solid #000000",
    borderRadius: "40px",
    padding: "6px 14px",
    fontSize: "0.8rem",
    fontWeight: "500",
    cursor: "pointer",
    color: "#000000",
  },
  grid2Col: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px",
  },
  removeIconBtn: { background: "none", border: "none", fontSize: "1rem", cursor: "pointer", color: "#cc0000", padding: "0 0 0 8px" },
  emptyTestsMsg: { textAlign: "center", color: "#6c6c6c", padding: "28px 12px", fontStyle: "italic" },
  actionBar: { display: "flex", gap: "18px", justifyContent: "flex-end", margin: "16px 0 32px 0" },
  primaryBtn: {
    background: "#000000",
    color: "#ffffff",
    border: "none",
    padding: "12px 28px",
    borderRadius: "40px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#ffffff",
    color: "#000000",
    border: "1px solid #aaaaaa",
    padding: "12px 28px",
    borderRadius: "40px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
  },
  tableWrapper: { marginTop: "20px" },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  requestCount: {
    fontSize: "0.8rem",
    color: "#999",
    background: "#f4f4f4",
    padding: "4px 12px",
    borderRadius: "40px",
    fontWeight: "500",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "0.72rem",
    fontWeight: "600",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    background: "#f9f9f9",
    borderBottom: "1px solid #eaeaea",
    whiteSpace: "nowrap",
  },
  tr: { borderBottom: "1px solid #f0f0f0", transition: "background 0.15s" },
  td: { padding: "14px 16px", verticalAlign: "middle", color: "#1a1a1a" },
  testBadge: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "20px",
    background: "#f0f0f0",
    color: "#444",
    fontSize: "0.72rem",
    fontWeight: "500",
    border: "1px solid #e4e4e4",
  },
  editBtn: {
    background: "none",
    border: "1px solid #d0d0d0",
    borderRadius: "8px",
    padding: "0",
    width: "32px",
    height: "32px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#555",
    transition: "border-color 0.15s, background 0.15s",
  },
  delBtn: {
    background: "none",
    border: "1px solid #ffcccc",
    color: "#cc0000",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.75rem",
  },
  emptyTable: {
    textAlign: "center",
    padding: "48px 32px",
    background: "#fafafa",
    borderRadius: "20px",
    color: "#888",
    fontSize: "0.9rem",
  },

  // ===== TABLE CENTER LOADER =====
  tableLoaderWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "52px 32px",
    background: "#fafafa",
    borderRadius: "20px",
    border: "1px solid #eaeaea",
  },
  tableLoaderInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
  },
  tableLoaderSpinner: {
    display: "inline-block",
    width: "36px",
    height: "36px",
    border: "3px solid #e8e8e8",
    borderTopColor: "#000000",
    borderRadius: "50%",
    animation: "trf-spin 0.75s linear infinite",
  },
  tableLoaderText: {
    fontSize: "0.85rem",
    color: "#888",
    fontWeight: "500",
    letterSpacing: "0.2px",
  },

  // ===== SKELETON =====
  skeletonBase: {
    display: "inline-block",
    background: "linear-gradient(90deg, #ebebeb 25%, #f5f5f5 50%, #ebebeb 75%)",
    backgroundSize: "600px 100%",
    animation: "trf-shimmer 1.4s infinite linear",
  },
};

export default TestRequestForm;