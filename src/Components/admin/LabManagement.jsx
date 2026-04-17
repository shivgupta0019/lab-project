import { useState } from "react";

const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #ffffff;
    font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, sans-serif;
  }

  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap');

  .lm-app {
    min-height: 100vh;
    background: #ffffff;
  }

  .lm-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem 2rem 3rem;
  }

  .lm-header {
    margin-bottom: 2.5rem;
    border-bottom: 1px solid #eaeef2;
    padding-bottom: 1.5rem;
  }

  .lm-title {
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #000000;
    margin-bottom: 0.25rem;
  }

  .lm-subtitle {
    font-size: 0.9rem;
    color: #5b677b;
    font-weight: 400;
  }

  .lm-tabs {
    display: flex;
    gap: 0.5rem;
    border-bottom: 1px solid #eaeef2;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .lm-tab {
    background: transparent;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: #5b677b;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    font-family: inherit;
  }

  .lm-tab:hover {
    color: #000000;
  }

  .lm-tab.active {
    color: #000000;
    font-weight: 600;
  }

  .lm-tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: #000000;
    border-radius: 2px 2px 0 0;
  }

  .lm-panel {
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .lm-form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .lm-full-width {
    grid-column: span 2;
  }

  .lm-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .lm-label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #2c3e4e;
  }

  .lm-input,
  .lm-select,
  .lm-textarea {
    width: 100%;
    padding: 0.85rem 1rem;
    font-size: 0.95rem;
    font-family: inherit;
    background: #ffffff;
    border: 1px solid #dce3e9;
    border-radius: 12px;
    transition: all 0.2s;
    outline: none;
    color: #000000;
  }

  .lm-textarea {
    resize: vertical;
    min-height: 100px;
  }

  .lm-input:focus,
  .lm-select:focus,
  .lm-textarea:focus {
    border-color: #000000;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
  }

  .lm-input::placeholder,
  .lm-textarea::placeholder {
    color: #a0abb9;
  }

  .lm-check-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .lm-checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.5rem 0;
  }

  .lm-checkbox-item input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #000000;
  }

  .lm-checkbox-item label {
    font-size: 0.95rem;
    color: #000000;
    cursor: pointer;
  }

  .lm-new-test {
    background: #f8f9fc;
    border-radius: 16px;
    padding: 1.2rem;
    margin: 1.5rem 0;
    border: 1px solid #eef2f5;
  }

  .lm-new-test-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #000000;
    margin-bottom: 1rem;
  }

  .lm-row {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
    margin-bottom: 1rem;
  }

  .lm-row .lm-field {
    flex: 1;
  }

  .lm-btn-small {
    background: #000000;
    border: none;
    padding: 0.7rem 1.2rem;
    border-radius: 40px;
    font-weight: 500;
    font-size: 0.8rem;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
    white-space: nowrap;
  }

  .lm-btn-small:hover {
    background: #2c2c2c;
  }

  .lm-btn-outline {
    background: transparent;
    border: 1px solid #dce3e9;
    padding: 0.5rem 1rem;
    border-radius: 40px;
    font-weight: 500;
    font-size: 0.75rem;
    color: #2c3e4e;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lm-btn-outline:hover {
    border-color: #000000;
    background: #fafcfc;
  }

  .lm-dynamic-field-row {
    display: flex;
    gap: 0.75rem;
    align-items: flex-end;
    margin-bottom: 0.75rem;
  }

  .lm-dynamic-field-row .lm-field {
    flex: 1;
    margin-bottom: 0;
  }

  .lm-test-section {
    margin-top: 2rem;
    border-top: 1px solid #eaeef2;
    padding-top: 1.5rem;
  }

  .lm-test-heading {
    font-size: 1.1rem;
    font-weight: 600;
    color: #000000;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .lm-test-fields {
    background: #ffffff;
    border: 1px solid #eef2f5;
    border-radius: 16px;
    padding: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .lm-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eaeef2;
  }

  .lm-btn-secondary {
    background: transparent;
    border: 1px solid #dce3e9;
    padding: 0.7rem 1.5rem;
    border-radius: 40px;
    font-weight: 500;
    font-size: 0.85rem;
    color: #2c3e4e;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
  }

  .lm-btn-secondary:hover {
    border-color: #000000;
    background: #fafcfc;
  }

  .lm-btn-primary {
    background: #000000;
    border: none;
    padding: 0.7rem 1.8rem;
    border-radius: 40px;
    font-weight: 500;
    font-size: 0.85rem;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
  }

  .lm-btn-primary:hover {
    background: #2c2c2c;
    transform: scale(0.98);
  }

  .lm-info-card {
    background: #f8f9fc;
    border-radius: 16px;
    padding: 1rem 1.2rem;
    margin-top: 1.5rem;
    border: 1px solid #eef2f5;
    font-size: 0.85rem;
    color: #2c3e4e;
  }

  .lm-badge {
    display: inline-block;
    background: #0000000c;
    padding: 0.2rem 0.7rem;
    border-radius: 30px;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    color: #000000;
    margin-left: 0.5rem;
  }

  .lm-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
    font-size: 0.85rem;
    overflow-x: auto;
    display: block;
  }

  .lm-table thead,
  .lm-table tbody {
    display: table;
    width: 100%;
  }

  .lm-table th,
  .lm-table td {
    border: 1px solid #eaeef2;
    padding: 0.75rem;
    text-align: left;
    vertical-align: top;
  }

  .lm-table th {
    background: #f8f9fc;
    font-weight: 600;
    color: #000000;
  }

  .lm-table td {
    color: #2c3e4e;
  }

  .lm-test-fields-preview {
    margin: 0;
    padding-left: 1rem;
  }

  .lm-editable-input {
    width: 100%;
    padding: 0.4rem;
    border: 1px solid #dce3e9;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.85rem;
  }

  .lm-editable-select {
    width: 100%;
    padding: 0.4rem;
    border: 1px solid #dce3e9;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.85rem;
  }

  .lm-action-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .lm-icon-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .lm-icon-btn:hover {
    background: #f0f0f0;
  }

  @media (max-width: 720px) {
    .lm-container {
      padding: 1.5rem;
    }
    .lm-form-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .lm-full-width {
      grid-column: span 1;
    }
    .lm-tab {
      padding: 0.6rem 1rem;
      font-size: 0.85rem;
    }
    .lm-title {
      font-size: 1.4rem;
    }
    .lm-row, .lm-dynamic-field-row {
      flex-direction: column;
      align-items: stretch;
    }
    .lm-btn-small {
      align-self: flex-start;
    }
    .lm-table {
      font-size: 0.75rem;
    }
    .lm-table th,
    .lm-table td {
      padding: 0.5rem;
    }
  }
`;

// Helper to generate unique codes
const generateCode = (prefix = "ARY") => {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${datePart}-${random}`;
};

// Predefined test fields (same as original)
const TESTING_FIELDS = {
  ETO: [
    {
      name: "etoConcentration",
      label: "ETO Concentration",
      placeholder: "e.g. 600 mg/L",
    },
    {
      name: "exposureTime",
      label: "Exposure Time",
      placeholder: "e.g. 4 hours",
    },
    { name: "temperature", label: "Temperature", placeholder: "e.g. 54°C" },
    { name: "humidity", label: "Humidity", placeholder: "e.g. 60%" },
    {
      name: "residueLevel",
      label: "Residue Level",
      placeholder: "e.g. < 10 ppm",
    },
  ],
  Micro: [
    {
      name: "totalPlateCount",
      label: "Total Plate Count",
      placeholder: "e.g. < 100 CFU/g",
    },
    {
      name: "yeastMold",
      label: "Yeast & Mold",
      placeholder: "e.g. < 10 CFU/g",
    },
    { name: "eColi", label: "E. Coli", placeholder: "e.g. Absent/25g" },
    { name: "salmonella", label: "Salmonella", placeholder: "e.g. Absent/25g" },
    {
      name: "coliformBacteria",
      label: "Coliform Bacteria",
      placeholder: "e.g. < 3 MPN/g",
    },
  ],
  Physical: [
    {
      name: "textureAnalysis",
      label: "Texture Analysis",
      placeholder: "e.g. Firm, 8.5 N",
    },
    {
      name: "colorMeasurement",
      label: "Color Measurement",
      placeholder: "e.g. L*=92",
    },
    {
      name: "moistureContent",
      label: "Moisture Content",
      placeholder: "e.g. 12.5%",
    },
    {
      name: "particleSizeShape",
      label: "Particle Size & Shape",
      placeholder: "e.g. 50–100 µm",
    },
    { name: "viscosity", label: "Viscosity", placeholder: "e.g. 450 mPa·s" },
    {
      name: "densitySpecificGravity",
      label: "Density / Specific",
      placeholder: "e.g. 1.05 g/cm³",
    },
    {
      name: "waterActivity",
      label: "Water Activity",
      placeholder: "e.g. 0.87 aw",
    },
  ],
  Chemical: [
    { name: "phLevel", label: "pH Level", placeholder: "e.g. 6.8" },
    { name: "ashContent", label: "Ash Content", placeholder: "e.g. 1.2%" },
    {
      name: "proteinContent",
      label: "Protein Content",
      placeholder: "e.g. 18.5%",
    },
    { name: "fatContent", label: "Fat Content", placeholder: "e.g. 5.3%" },
    {
      name: "peroxideValue",
      label: "Peroxide Value",
      placeholder: "e.g. 2.1 meq/kg",
    },
    {
      name: "heavyMetals",
      label: "Heavy Metals",
      placeholder: "e.g. Pb < 0.5 ppm",
    },
  ],
  Presticide: [
    {
      name: "activeIngredient",
      label: "Active Ingredient",
      placeholder: "e.g. Chlorpyrifos",
    },
    {
      name: "concentration",
      label: "Concentration",
      placeholder: "e.g. 500 g/L",
    },
    { name: "solventUsed", label: "Solvent Used", placeholder: "e.g. Xylene" },
    {
      name: "stabilityTest",
      label: "Stability Test",
      placeholder: "e.g. Stable at 54°C",
    },
    { name: "phOfSolution", label: "pH of Solution", placeholder: "e.g. 6.5" },
  ],
};

export default function LabManagement() {
  const [activeTab, setActiveTab] = useState("lab");

  // ---------- Company State ----------
  const [companyData, setCompanyData] = useState({
    companyName: "",
    gst: "",
    address: "",
    phone: "",
    headName: "",
  });
  const [savedCompanies, setSavedCompanies] = useState([]);
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [editingCompanyData, setEditingCompanyData] = useState(null);

  // ---------- Lab State (unchanged) ----------
  const [labData, setLabData] = useState({
    labName: "",
    gst: "",
    address: "",
    phone: "",
    headName: "",
    tabType: "",
  });
  const [savedLabs, setSavedLabs] = useState([]);
  const [editingLabId, setEditingLabId] = useState(null);
  const [editingLabData, setEditingLabData] = useState(null);

  // ---------- Product State (unchanged) ----------
  const [productData, setProductData] = useState({
    productName: "",
    productId: "",
  });
  const [savedProducts, setSavedProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductData, setEditingProductData] = useState(null);

  // ---------- Testing State (unchanged) ----------
  const defaultTests = [
    { id: "ETO", label: "ETO", fields: TESTING_FIELDS.ETO },
    { id: "Micro", label: "Micro", fields: TESTING_FIELDS.Micro },
    { id: "Physical", label: "Physical", fields: TESTING_FIELDS.Physical },
    { id: "Chemical", label: "Chemical", fields: TESTING_FIELDS.Chemical },
    {
      id: "Presticide",
      label: "Presticide",
      fields: TESTING_FIELDS.Presticide,
    },
  ];
  const [availableTests, setAvailableTests] = useState(defaultTests);
  const [selectedTestIds, setSelectedTestIds] = useState([]);
  const [testValues, setTestValues] = useState({});
  const [savedTests, setSavedTests] = useState([]);
  const [editingTestId, setEditingTestId] = useState(null);
  const [editingTestData, setEditingTestData] = useState(null);
  const [newTestLabel, setNewTestLabel] = useState("");
  const [newTestFields, setNewTestFields] = useState([
    { name: "", label: "", placeholder: "" },
  ]);

  // ---------- Company Functions ----------
  const updateCompany = (field, value) =>
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  const resetCompany = () =>
    setCompanyData({
      companyName: "",
      gst: "",
      address: "",
      phone: "",
      headName: "",
    });
  const handleSaveCompany = () => {
    if (!companyData.companyName.trim()) {
      alert("Company Name is required.");
      return;
    }
    const newCompany = {
      ...companyData,
      id: Date.now(),
      savedAt: new Date().toLocaleString(),
      companyCode: generateCode("CMP"),
    };
    setSavedCompanies((prev) => [newCompany, ...prev]);
    resetCompany();
  };
  const startEditCompany = (comp) => {
    setEditingCompanyId(comp.id);
    setEditingCompanyData({ ...comp });
  };
  const cancelEditCompany = () => {
    setEditingCompanyId(null);
    setEditingCompanyData(null);
  };
  const saveEditCompany = () => {
    if (!editingCompanyData.companyName.trim()) {
      alert("Company Name required.");
      return;
    }
    setSavedCompanies((prev) =>
      prev.map((comp) =>
        comp.id === editingCompanyId
          ? { ...editingCompanyData, savedAt: new Date().toLocaleString() }
          : comp,
      ),
    );
    cancelEditCompany();
  };
  const deleteCompany = (id) => {
    if (window.confirm("Delete this company record?")) {
      setSavedCompanies((prev) => prev.filter((comp) => comp.id !== id));
    }
  };

  // ---------- Lab Functions (identical to original, included fully) ----------
  const updateLab = (field, value) =>
    setLabData((prev) => ({ ...prev, [field]: value }));
  const resetLab = () =>
    setLabData({
      labName: "",
      gst: "",
      address: "",
      phone: "",
      headName: "",
      tabType: "",
    });
  const handleSaveLab = () => {
    if (!labData.labName.trim()) {
      alert("Lab Name is required.");
      return;
    }
    const newLab = {
      ...labData,
      id: Date.now(),
      savedAt: new Date().toLocaleString(),
      labCode: generateCode("LAB"),
    };
    setSavedLabs((prev) => [newLab, ...prev]);
    resetLab();
  };
  const startEditLab = (lab) => {
    setEditingLabId(lab.id);
    setEditingLabData({ ...lab });
  };
  const cancelEditLab = () => {
    setEditingLabId(null);
    setEditingLabData(null);
  };
  const saveEditLab = () => {
    if (!editingLabData.labName.trim()) {
      alert("Lab Name required.");
      return;
    }
    setSavedLabs((prev) =>
      prev.map((lab) =>
        lab.id === editingLabId
          ? { ...editingLabData, savedAt: new Date().toLocaleString() }
          : lab,
      ),
    );
    cancelEditLab();
  };
  const deleteLab = (id) => {
    if (window.confirm("Delete this lab record?"))
      setSavedLabs((prev) => prev.filter((lab) => lab.id !== id));
  };

  // ---------- Product Functions ----------
  const updateProduct = (field, value) =>
    setProductData((prev) => ({ ...prev, [field]: value }));
  const resetProduct = () => setProductData({ productName: "", productId: "" });
  const handleSaveProduct = () => {
    if (!productData.productName.trim() || !productData.productId.trim()) {
      alert("Product Name and Product ID are required.");
      return;
    }
    const newProduct = {
      ...productData,
      id: Date.now(),
      savedAt: new Date().toLocaleString(),
    };
    setSavedProducts((prev) => [newProduct, ...prev]);
    resetProduct();
  };
  const startEditProduct = (prod) => {
    setEditingProductId(prod.id);
    setEditingProductData({ ...prod });
  };
  const cancelEditProduct = () => {
    setEditingProductId(null);
    setEditingProductData(null);
  };
  const saveEditProduct = () => {
    if (
      !editingProductData.productName.trim() ||
      !editingProductData.productId.trim()
    ) {
      alert("Product Name and ID required.");
      return;
    }
    setSavedProducts((prev) =>
      prev.map((p) =>
        p.id === editingProductId
          ? { ...editingProductData, savedAt: new Date().toLocaleString() }
          : p,
      ),
    );
    cancelEditProduct();
  };
  const deleteProduct = (id) => {
    if (window.confirm("Delete this product?"))
      setSavedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ---------- Testing Functions (unchanged from original, included fully) ----------
  const handleToggleTest = (testId) => {
    setSelectedTestIds((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId],
    );
    if (!selectedTestIds.includes(testId)) {
      const test = availableTests.find((t) => t.id === testId);
      if (test) {
        const initialValues = {};
        test.fields.forEach((field) => {
          initialValues[field.name] = "";
        });
        setTestValues((prev) => ({ ...prev, [testId]: initialValues }));
      }
    }
  };
  const handleTestFieldChange = (testId, fieldName, value) => {
    setTestValues((prev) => ({
      ...prev,
      [testId]: { ...(prev[testId] || {}), [fieldName]: value },
    }));
  };
  const addCustomField = () =>
    setNewTestFields([
      ...newTestFields,
      { name: "", label: "", placeholder: "" },
    ]);
  const removeCustomField = (index) => {
    const updated = [...newTestFields];
    updated.splice(index, 1);
    setNewTestFields(updated);
  };
  const updateCustomField = (index, key, value) => {
    const updated = [...newTestFields];
    updated[index][key] = value;
    setNewTestFields(updated);
  };
  const handleAddNewTest = () => {
    if (!newTestLabel.trim()) return;
    const invalid = newTestFields.some(
      (f) => !f.name.trim() || !f.label.trim(),
    );
    if (invalid) {
      alert("Please fill in both Name and Label for each field.");
      return;
    }
    const newId = `custom_${Date.now()}`;
    const newTest = {
      id: newId,
      label: newTestLabel.trim(),
      fields: newTestFields.map((f) => ({
        name: f.name.trim(),
        label: f.label.trim(),
        placeholder: f.placeholder || "",
      })),
    };
    setAvailableTests((prev) => [...prev, newTest]);
    setSelectedTestIds((prev) => [...prev, newId]);
    const initialValues = {};
    newTest.fields.forEach((field) => {
      initialValues[field.name] = "";
    });
    setTestValues((prev) => ({ ...prev, [newId]: initialValues }));
    setNewTestLabel("");
    setNewTestFields([{ name: "", label: "", placeholder: "" }]);
  };
  const resetTesting = () => {
    setSelectedTestIds([]);
    setTestValues({});
    setAvailableTests(defaultTests);
    setNewTestLabel("");
    setNewTestFields([{ name: "", label: "", placeholder: "" }]);
  };
  const handleSaveTesting = () => {
    const selectedTestsData = selectedTestIds.map((id) => {
      const test = availableTests.find((t) => t.id === id);
      return {
        testId: id,
        testLabel: test.label,
        fields: test.fields.map((f) => ({
          label: f.label,
          value: testValues[id]?.[f.name] || "",
        })),
      };
    });
    const newEntry = {
      id: Date.now(),
      savedAt: new Date().toLocaleString(),
      tests: selectedTestsData,
    };
    setSavedTests((prev) => [newEntry, ...prev]);
    alert(`Saved ${selectedTestsData.length} test(s).`);
    setSelectedTestIds([]);
  };
  const startEditTest = (entry) => {
    setEditingTestId(entry.id);
    setEditingTestData(JSON.parse(JSON.stringify(entry)));
  };
  const cancelEditTest = () => {
    setEditingTestId(null);
    setEditingTestData(null);
  };
  const saveEditTest = () => {
    setSavedTests((prev) =>
      prev.map((t) =>
        t.id === editingTestId
          ? { ...editingTestData, savedAt: new Date().toLocaleString() }
          : t,
      ),
    );
    cancelEditTest();
  };
  const deleteTest = (id) => {
    if (window.confirm("Delete this test configuration?"))
      setSavedTests((prev) => prev.filter((t) => t.id !== id));
  };
  const updateEditingTestField = (testIndex, fieldIndex, newValue) => {
    const updated = { ...editingTestData };
    updated.tests[testIndex].fields[fieldIndex].value = newValue;
    setEditingTestData(updated);
  };

  // ---------- Render ----------
  return (
    <>
      <style>{globalStyles}</style>
      <div className="lm-app">
        <div className="lm-container">
          <div className="lm-header">
            <h1 className="lm-title">Lab Management System</h1>
            <p className="lm-subtitle">
              Manage companies, labs, products, and test configurations
            </p>
          </div>

          <div className="lm-tabs">
            <button
              className={`lm-tab ${activeTab === "lab" ? "active" : ""}`}
              onClick={() => setActiveTab("lab")}
            >
              Lab
            </button>
            <button
              className={`lm-tab ${activeTab === "product" ? "active" : ""}`}
              onClick={() => setActiveTab("product")}
            >
              Product
            </button>
            <button
              className={`lm-tab ${activeTab === "testing" ? "active" : ""}`}
              onClick={() => setActiveTab("testing")}
            >
              Testing
            </button>
            <button
              className={`lm-tab ${activeTab === "company" ? "active" : ""}`}
              onClick={() => setActiveTab("company")}
            >
              Company
            </button>
          </div>

          {/* ========== COMPANY TAB ========== */}
          {activeTab === "company" && (
            <div className="lm-panel">
              <div className="lm-form-grid">
                <div className="lm-field">
                  <label className="lm-label">Company Name</label>
                  <input
                    className="lm-input"
                    value={companyData.companyName}
                    onChange={(e) =>
                      updateCompany("companyName", e.target.value)
                    }
                  />
                </div>
                <div className="lm-field">
                  <label className="lm-label">GST Number</label>
                  <input
                    className="lm-input"
                    value={companyData.gst}
                    onChange={(e) => updateCompany("gst", e.target.value)}
                  />
                </div>
                <div className="lm-field lm-full-width">
                  <label className="lm-label">Address</label>
                  <textarea
                    className="lm-textarea"
                    value={companyData.address}
                    onChange={(e) => updateCompany("address", e.target.value)}
                  />
                </div>
                <div className="lm-field">
                  <label className="lm-label">Phone Number</label>
                  <input
                    className="lm-input"
                    value={companyData.phone}
                    onChange={(e) => updateCompany("phone", e.target.value)}
                  />
                </div>
                <div className="lm-field">
                  <label className="lm-label">Head Name</label>
                  <input
                    className="lm-input"
                    value={companyData.headName}
                    onChange={(e) => updateCompany("headName", e.target.value)}
                  />
                </div>
              </div>
              {(companyData.companyName || companyData.gst) && (
                <div className="lm-info-card">
                  <strong>🏢 Company Profile</strong>
                  <p>
                    {companyData.companyName || "—"} ·{" "}
                    {companyData.headName
                      ? `Head: ${companyData.headName}`
                      : ""}
                  </p>
                </div>
              )}
              <div className="lm-actions">
                <button className="lm-btn-secondary" onClick={resetCompany}>
                  Clear
                </button>
                <button className="lm-btn-primary" onClick={handleSaveCompany}>
                  Save Company
                </button>
              </div>

              {savedCompanies.length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                  <h3 style={{ marginBottom: "1rem", fontWeight: 600 }}>
                    Saved Companies
                  </h3>
                  <table className="lm-table">
                    <thead>
                      <tr>
                        <th>Company Code</th>
                        <th>Company Name</th>
                        <th>GST</th>
                        <th>Phone</th>
                        <th>Head Name</th>
                        <th>Address</th>
                        <th>Saved At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedCompanies.map((comp) => (
                        <tr key={comp.id}>
                          {editingCompanyId === comp.id ? (
                            <>
                              <td>{comp.companyCode}</td>
                              <td>
                                <input
                                  className="lm-editable-input"
                                  value={editingCompanyData.companyName}
                                  onChange={(e) =>
                                    setEditingCompanyData({
                                      ...editingCompanyData,
                                      companyName: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  className="lm-editable-input"
                                  value={editingCompanyData.gst}
                                  onChange={(e) =>
                                    setEditingCompanyData({
                                      ...editingCompanyData,
                                      gst: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  className="lm-editable-input"
                                  value={editingCompanyData.phone}
                                  onChange={(e) =>
                                    setEditingCompanyData({
                                      ...editingCompanyData,
                                      phone: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  className="lm-editable-input"
                                  value={editingCompanyData.headName}
                                  onChange={(e) =>
                                    setEditingCompanyData({
                                      ...editingCompanyData,
                                      headName: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>
                                <textarea
                                  className="lm-editable-input"
                                  rows={2}
                                  value={editingCompanyData.address}
                                  onChange={(e) =>
                                    setEditingCompanyData({
                                      ...editingCompanyData,
                                      address: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>{comp.savedAt}</td>
                              <td className="lm-action-buttons">
                                <button
                                  className="lm-icon-btn"
                                  onClick={saveEditCompany}
                                >
                                  💾
                                </button>
                                <button
                                  className="lm-icon-btn"
                                  onClick={cancelEditCompany}
                                >
                                  ✖️
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{comp.companyCode}</td>
                              <td>{comp.companyName}</td>
                              <td>{comp.gst}</td>
                              <td>{comp.phone}</td>
                              <td>{comp.headName}</td>
                              <td>{comp.address}</td>
                              <td>{comp.savedAt}</td>
                              <td className="lm-action-buttons">
                                <button
                                  className="lm-icon-btn"
                                  onClick={() => startEditCompany(comp)}
                                >
                                  ✏️
                                </button>
                                <button
                                  className="lm-icon-btn"
                                  onClick={() => deleteCompany(comp.id)}
                                >
                                  🗑️
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========== LAB TAB (original, fully included) ========== */}
          {activeTab === "lab" && (
            <div className="lm-panel">
              <div className="lm-form-grid">
                <div className="lm-field">
                  <label className="lm-label">Lab Name</label>
                  <input
                    className="lm-input"
                    value={labData.labName}
                    onChange={(e) => updateLab("labName", e.target.value)}
                  />
                </div>
                <div className="lm-field">
                  <label className="lm-label">GST Number</label>
                  <input
                    className="lm-input"
                    value={labData.gst}
                    onChange={(e) => updateLab("gst", e.target.value)}
                  />
                </div>
                <div className="lm-field lm-full-width">
                  <label className="lm-label">Address</label>
                  <textarea
                    className="lm-textarea"
                    value={labData.address}
                    onChange={(e) => updateLab("address", e.target.value)}
                  />
                </div>
                <div className="lm-field">
                  <label className="lm-label">Phone Number</label>
                  <input
                    className="lm-input"
                    value={labData.phone}
                    onChange={(e) => updateLab("phone", e.target.value)}
                  />
                </div>
                <div className="lm-field">
                  <label className="lm-label">Head Name</label>
                  <input
                    className="lm-input"
                    value={labData.headName}
                    onChange={(e) => updateLab("headName", e.target.value)}
                  />
                </div>
                <div className="lm-field">
                  <label className="lm-label">Tab Type</label>
                  <select
                    className="lm-select"
                    value={labData.tabType}
                    onChange={(e) => updateLab("tabType", e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="internal">Internal</option>
                    <option value="thirdparty">Third Party</option>
                  </select>
                </div>
              </div>
              {labData.tabType && (
                <div className="lm-info-card">
                  <strong>
                    ⚙️{" "}
                    {labData.tabType === "internal"
                      ? "Internal Lab"
                      : "Third Party Lab"}
                  </strong>
                  <span className="lm-badge">
                    {labData.tabType === "internal" ? "IN-HOUSE" : "EXTERNAL"}
                  </span>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
                    {labData.tabType === "internal"
                      ? "Operates within the organization."
                      : "Accredited external partner."}
                  </p>
                </div>
              )}
              <div className="lm-actions">
                <button className="lm-btn-secondary" onClick={resetLab}>
                  Clear
                </button>
                <button className="lm-btn-primary" onClick={handleSaveLab}>
                  Save Lab
                </button>
              </div>
              {savedLabs.length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                  <h3 style={{ marginBottom: "1rem", fontWeight: 600 }}>
                    Saved Labs
                  </h3>
                  <table className="lm-table">
                    <thead>
                      <tr>
                        <th>Lab Code</th>
                        <th>Lab Name</th>
                        <th>GST</th>
                        <th>Phone</th>
                        <th>Head Name</th>
                        <th>Tab Type</th>
                        <th>Address</th>
                        <th>Saved At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedLabs.map((lab) => (
                        <tr key={lab.id}>
                          {editingLabId === lab.id ? (
                            <>
                              {" "}
                              <td>{lab.labCode}</td>
                              <td>
                                <input
                                  className="lm-editable-input"
                                  value={editingLabData.labName}
                                  onChange={(e) =>
                                    setEditingLabData({
                                      ...editingLabData,
                                      labName: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  className="lm-editable-input"
                                  value={editingLabData.gst}
                                  onChange={(e) =>
                                    setEditingLabData({
                                      ...editingLabData,
                                      gst: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  className="lm-editable-input"
                                  value={editingLabData.phone}
                                  onChange={(e) =>
                                    setEditingLabData({
                                      ...editingLabData,
                                      phone: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  className="lm-editable-input"
                                  value={editingLabData.headName}
                                  onChange={(e) =>
                                    setEditingLabData({
                                      ...editingLabData,
                                      headName: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>
                                <select
                                  className="lm-editable-select"
                                  value={editingLabData.tabType}
                                  onChange={(e) =>
                                    setEditingLabData({
                                      ...editingLabData,
                                      tabType: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="internal">Internal</option>
                                  <option value="thirdparty">
                                    Third Party
                                  </option>
                                </select>
                              </td>
                              <td>
                                <textarea
                                  className="lm-editable-input"
                                  rows={2}
                                  value={editingLabData.address}
                                  onChange={(e) =>
                                    setEditingLabData({
                                      ...editingLabData,
                                      address: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>{lab.savedAt}</td>
                              <td className="lm-action-buttons">
                                <button
                                  className="lm-icon-btn"
                                  onClick={saveEditLab}
                                >
                                  💾
                                </button>
                                <button
                                  className="lm-icon-btn"
                                  onClick={cancelEditLab}
                                >
                                  ✖️
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              {" "}
                              <td>{lab.labCode}</td>
                              <td>{lab.labName}</td>
                              <td>{lab.gst}</td>
                              <td>{lab.phone}</td>
                              <td>{lab.headName}</td>
                              <td>
                                {lab.tabType === "internal"
                                  ? "Internal"
                                  : lab.tabType === "thirdparty"
                                    ? "Third Party"
                                    : "-"}
                              </td>
                              <td>{lab.address}</td>
                              <td>{lab.savedAt}</td>
                              <td className="lm-action-buttons">
                                <button
                                  className="lm-icon-btn"
                                  onClick={() => startEditLab(lab)}
                                >
                                  ✏️
                                </button>
                                <button
                                  className="lm-icon-btn"
                                  onClick={() => deleteLab(lab.id)}
                                >
                                  🗑️
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========== PRODUCT TAB (original) ========== */}
          {activeTab === "product" && (
            <div className="lm-panel">
              <div className="lm-form-grid">
                <div className="lm-field">
                  <label className="lm-label">Product Name</label>
                  <input
                    className="lm-input"
                    value={productData.productName}
                    onChange={(e) =>
                      updateProduct("productName", e.target.value)
                    }
                  />
                </div>
                <div className="lm-field">
                  <label className="lm-label">Product ID</label>
                  <input
                    className="lm-input"
                    value={productData.productId}
                    onChange={(e) => updateProduct("productId", e.target.value)}
                  />
                </div>
              </div>
              {productData.productName && productData.productId && (
                <div className="lm-info-card">
                  <strong>📦 Registered Product</strong>
                  <p>
                    <strong>{productData.productName}</strong> · ID{" "}
                    <code>{productData.productId}</code>
                  </p>
                </div>
              )}
              <div className="lm-actions">
                <button className="lm-btn-secondary" onClick={resetProduct}>
                  Clear
                </button>
                <button className="lm-btn-primary" onClick={handleSaveProduct}>
                  Save Product
                </button>
              </div>
              {savedProducts.length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                  <h3 style={{ marginBottom: "1rem", fontWeight: 600 }}>
                    Saved Products
                  </h3>
                  <table className="lm-table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Product ID</th>
                        <th>Saved At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedProducts.map((prod) => (
                        <tr key={prod.id}>
                          {editingProductId === prod.id ? (
                            <>
                              <td>
                                <input
                                  className="lm-editable-input"
                                  value={editingProductData.productName}
                                  onChange={(e) =>
                                    setEditingProductData({
                                      ...editingProductData,
                                      productName: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  className="lm-editable-input"
                                  value={editingProductData.productId}
                                  onChange={(e) =>
                                    setEditingProductData({
                                      ...editingProductData,
                                      productId: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>{prod.savedAt}</td>
                              <td className="lm-action-buttons">
                                <button
                                  className="lm-icon-btn"
                                  onClick={saveEditProduct}
                                >
                                  💾
                                </button>
                                <button
                                  className="lm-icon-btn"
                                  onClick={cancelEditProduct}
                                >
                                  ✖️
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{prod.productName}</td>
                              <td>{prod.productId}</td>
                              <td>{prod.savedAt}</td>
                              <td className="lm-action-buttons">
                                <button
                                  className="lm-icon-btn"
                                  onClick={() => startEditProduct(prod)}
                                >
                                  ✏️
                                </button>
                                <button
                                  className="lm-icon-btn"
                                  onClick={() => deleteProduct(prod.id)}
                                >
                                  🗑️
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========== TESTING TAB (original) ========== */}
          {activeTab === "testing" && (
            <div className="lm-panel">
              <div className="lm-field lm-full-width">
                <label className="lm-label">Select Testing Types</label>
                <div className="lm-check-group">
                  {availableTests.map((test) => (
                    <div key={test.id} className="lm-checkbox-item">
                      <input
                        type="checkbox"
                        id={test.id}
                        checked={selectedTestIds.includes(test.id)}
                        onChange={() => handleToggleTest(test.id)}
                      />
                      <label htmlFor={test.id}>{test.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lm-new-test">
                <div className="lm-new-test-title">➕ Create New Test</div>
                <div className="lm-row">
                  <div className="lm-field">
                    <label className="lm-label">Test Name</label>
                    <input
                      className="lm-input"
                      value={newTestLabel}
                      onChange={(e) => setNewTestLabel(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className="lm-label">
                    Test Fields (Name, Label, Placeholder)
                  </label>
                  {newTestFields.map((field, idx) => (
                    <div key={idx} className="lm-dynamic-field-row">
                      <div className="lm-field">
                        <input
                          className="lm-input"
                          placeholder="Field name"
                          value={field.name}
                          onChange={(e) =>
                            updateCustomField(idx, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="lm-field">
                        <input
                          className="lm-input"
                          placeholder="Label"
                          value={field.label}
                          onChange={(e) =>
                            updateCustomField(idx, "label", e.target.value)
                          }
                        />
                      </div>
                      <div className="lm-field">
                        <input
                          className="lm-input"
                          placeholder="Placeholder"
                          value={field.placeholder}
                          onChange={(e) =>
                            updateCustomField(
                              idx,
                              "placeholder",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <button
                        className="lm-btn-outline"
                        onClick={() => removeCustomField(idx)}
                        disabled={newTestFields.length === 1}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    className="lm-btn-outline"
                    onClick={addCustomField}
                    style={{ marginTop: "0.5rem" }}
                  >
                    + Add Field
                  </button>
                </div>
                <button
                  className="lm-btn-small"
                  onClick={handleAddNewTest}
                  disabled={!newTestLabel.trim()}
                >
                  Create Test
                </button>
              </div>
              {selectedTestIds.length > 0 && (
                <div className="lm-test-section">
                  <div className="lm-test-heading">📋 Test Parameters</div>
                  {selectedTestIds.map((testId) => {
                    const test = availableTests.find((t) => t.id === testId);
                    if (!test) return null;
                    const values = testValues[testId] || {};
                    return (
                      <div key={testId} className="lm-test-fields">
                        <h3
                          style={{
                            marginBottom: "1rem",
                            fontSize: "1rem",
                            fontWeight: 600,
                          }}
                        >
                          {test.label}
                        </h3>
                        <div className="lm-form-grid">
                          {test.fields.map((field) => (
                            <div key={field.name} className="lm-field">
                              <label className="lm-label">{field.label}</label>
                              <input
                                className="lm-input"
                                placeholder={field.placeholder}
                                value={values[field.name] || ""}
                                onChange={(e) =>
                                  handleTestFieldChange(
                                    testId,
                                    field.name,
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="lm-actions">
                <button className="lm-btn-secondary" onClick={resetTesting}>
                  Clear All
                </button>
                <button className="lm-btn-primary" onClick={handleSaveTesting}>
                  Apply Testing
                </button>
              </div>
              {savedTests.length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                  <h3 style={{ marginBottom: "1rem", fontWeight: 600 }}>
                    Saved Test Configurations
                  </h3>
                  <table className="lm-table">
                    <thead>
                      <tr>
                        <th>Saved At</th>
                        <th>Test(s) & Values</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedTests.map((entry) => (
                        <tr key={entry.id}>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {entry.savedAt}
                          </td>
                          <td>
                            {editingTestId === entry.id
                              ? editingTestData.tests.map((test, ti) => (
                                  <div
                                    key={ti}
                                    style={{ marginBottom: "1rem" }}
                                  >
                                    <strong>{test.testLabel}</strong>
                                    <ul className="lm-test-fields-preview">
                                      {test.fields.map((field, fi) => (
                                        <li key={fi}>
                                          {field.label}:{" "}
                                          <input
                                            className="lm-editable-input"
                                            style={{
                                              width: "auto",
                                              display: "inline-block",
                                              marginLeft: "0.5rem",
                                            }}
                                            value={field.value}
                                            onChange={(e) =>
                                              updateEditingTestField(
                                                ti,
                                                fi,
                                                e.target.value,
                                              )
                                            }
                                          />
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))
                              : entry.tests.map((test, idx) => (
                                  <div
                                    key={idx}
                                    style={{ marginBottom: "0.75rem" }}
                                  >
                                    <strong>{test.testLabel}</strong>
                                    <ul className="lm-test-fields-preview">
                                      {test.fields.map((field, fidx) => (
                                        <li key={fidx}>
                                          {field.label}: {field.value || "—"}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                          </td>
                          <td className="lm-action-buttons">
                            {editingTestId === entry.id ? (
                              <>
                                <button
                                  className="lm-icon-btn"
                                  onClick={saveEditTest}
                                >
                                  💾
                                </button>
                                <button
                                  className="lm-icon-btn"
                                  onClick={cancelEditTest}
                                >
                                  ✖️
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="lm-icon-btn"
                                  onClick={() => startEditTest(entry)}
                                >
                                  ✏️
                                </button>
                                <button
                                  className="lm-icon-btn"
                                  onClick={() => deleteTest(entry.id)}
                                >
                                  🗑️
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
