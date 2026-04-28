

import { useEffect, useState } from "react";
import axios from "axios";

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

  .lm-tab:hover { color: #000000; }

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

  .lm-full-width { grid-column: span 2; }

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
    box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
  }

  .lm-input::placeholder,
  .lm-textarea::placeholder { color: #a0abb9; }

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

  .lm-row .lm-field { flex: 1; }

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

  .lm-btn-small:hover { background: #2c2c2c; }

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
    margin: auto;
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
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 120px;
    justify-content: center;
  }

  .lm-btn-primary:hover {
    background: #2c2c2c;
    transform: scale(0.98);
  }

  .lm-btn-primary:disabled {
    background: #555555;
    cursor: not-allowed;
    transform: none;
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

  /* ===== IMPROVED TABLE STYLES ===== */
  .lm-table-section {
    margin-top: 2rem;
  }

  .lm-table-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .lm-table-section-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: #000000;
  }

  .lm-table-count-badge {
    font-size: 0.7rem;
    font-weight: 500;
    background: #f0efeb;
    color: #666;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid #eaeef2;
  }

  .lm-table-card {
    background: #ffffff;
    border-radius: 14px;
    border: 1px solid #eaeef2;
    overflow: hidden;
  }

  .lm-table-scroll {
    overflow-x: auto;
    width: 100%;
  }

  .lm-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8rem;
    display: table;
  }

  .lm-table thead th {
    background: #f8f9fc;
    color: #5b677b;
    font-weight: 600;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 10px 14px;
    text-align: left;
    border-bottom: 1px solid #eaeef2;
    white-space: nowrap;
  }

  .lm-table tbody tr {
    border-bottom: 1px solid #f0f2f5;
    transition: background 0.15s;
  }

  .lm-table tbody tr:last-child {
    border-bottom: none;
  }

  .lm-table tbody tr:hover {
    background: #fafbfd;
  }

  .lm-table td {
    padding: 11px 14px;
    color: #2c3e4e;
    vertical-align: middle;
  }

  .lm-code-pill {
    font-family: monospace;
    font-size: 0.7rem;
    background: #f0efeb;
    padding: 2px 8px;
    border-radius: 6px;
    color: #555;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }

  .lm-table-name {
    font-weight: 600;
    color: #000;
  }

  .lm-table-muted {
    color: #5b677b;
    font-size: 0.78rem;
  }

  .lm-table-date {
    color: #8a96a3;
    font-size: 0.75rem;
    white-space: nowrap;
  }

  .lm-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .lm-type-internal {
    background: #EAF3DE;
    color: #3B6D11;
  }

  .lm-type-external {
    background: #E6F1FB;
    color: #185FA5;
  }

  .lm-action-cell {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .lm-icon-btn {
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.15s;
  }

  .lm-icon-btn:hover {
    background: #f0efeb;
    border-color: #eaeef2;
  }

  .lm-icon-btn.danger:hover {
    background: #FCEBEB;
    border-color: #F7C1C1;
  }

  .lm-editable-input {
    width: 100%;
    padding: 0.4rem;
    border: 1px solid #dce3e9;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.8rem;
  }

  .lm-editable-select {
    width: 100%;
    padding: 0.4rem;
    border: 1px solid #dce3e9;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.8rem;
  }

  .lm-test-fields-preview {
    margin: 0;
    padding-left: 1rem;
  }

  /* ===== LOADER STYLES ===== */
  @keyframes lm-spin {
    to { transform: rotate(360deg); }
  }

  .lm-spinner {
    width: 15px;
    height: 15px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: lm-spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  .lm-table-loader {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 1rem;
    gap: 0.75rem;
    border: 1px solid #eaeef2;
    border-radius: 16px;
    margin-top: 2rem;
    background: #fafbfc;
  }

  .lm-table-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #eaeef2;
    border-top-color: #000000;
    border-radius: 50%;
    animation: lm-spin 0.8s linear infinite;
  }

  .lm-table-loader-text {
    font-size: 0.85rem;
    color: #5b677b;
    font-weight: 500;
  }

  @media (max-width: 720px) {
    .lm-container { padding: 1.5rem; }
    .lm-form-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .lm-full-width { grid-column: span 1; }
    .lm-tab {
      padding: 0.6rem 1rem;
      font-size: 0.85rem;
    }
    .lm-title { font-size: 1.4rem; }
    .lm-row, .lm-dynamic-field-row {
      flex-direction: column;
      align-items: stretch;
    }
    .lm-btn-small { align-self: flex-start; }
  }
`;

const generateCode = (prefix = "ARY") => {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `${prefix}-${datePart}-${random}`;
};

export default function LabManagement() {
  const [activeTab, setActiveTab] = useState("lab");
  const [allTestingFilds, setAllTestingFilds] = useState([]);

  const [savingLab, setSavingLab] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [savingCompany, setSavingCompany] = useState(false);

  // ---------- Company State ----------
  const [companyData, setCompanyData] = useState({ companyName: "", gst: "", address: "", phone: "", adminName: "" });
  const [savedCompanies, setSavedCompanies] = useState([]);
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [editingCompanyData, setEditingCompanyData] = useState(null);

  // ---------- Lab State (unchanged) ----------
  const [labData, setLabData] = useState({
    labName: "",
    gst: "",
    address: "",
    phone: "",
    adminName: "",
    labType: "",
  });
  const [savedLabs, setSavedLabs] = useState([]);
  const [editingLabId, setEditingLabId] = useState(null);
  const [editingLabData, setEditingLabData] = useState(null);

  // ---------- Product State ----------
  const [productData, setProductData] = useState({ productName: "" });
  const [savedProducts, setSavedProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductData, setEditingProductData] = useState(null);

  const defaultTests = Object.keys(allTestingFilds || {}).map((key) => ({ id: key, label: key, fields: allTestingFilds[key] }));
  const [availableTests, setAvailableTests] = useState(defaultTests);

  useEffect(() => { setAvailableTests(defaultTests); }, [allTestingFilds]);

  const [selectedTestIds, setSelectedTestIds] = useState([]);
  const [testValues, setTestValues] = useState({});
  const [savedTests, setSavedTests] = useState([]);
  const [editingTestId, setEditingTestId] = useState(null);
  const [editingTestData, setEditingTestData] = useState(null);
  const [newTestLabel, setNewTestLabel] = useState("");
  const [newTestFields, setNewTestFields] = useState([{ name: "", label: "", placeholder: "" }]);

  const handleGetAllTests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tests");
      if (response.data && response.data.TESTING_FIELDS) setAllTestingFilds(response.data.TESTING_FIELDS);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  // ---------- Company Functions ----------
  const updateCompany = (field, value) => setCompanyData((prev) => ({ ...prev, [field]: value }));
  const resetCompany = () => setCompanyData({ companyName: "", gst: "", address: "", phone: "", adminName: "" });

  const handleSaveCompany = async () => {
    if (!companyData.companyName.trim()) { alert("Company Name is required."); return; }
    const payload = { ...companyData, companyCode: generateCode("ARY") };
    setSavingCompany(true);
    try {
      const response = await axios.post("http://localhost:5000/api/companies", payload);
      if (response.data?.allCompanies) setSavedCompanies(response.data.allCompanies);
      alert("Company saved successfully!");
      resetCompany();
    } catch (error) {
      console.error("Error saving company:", error);
      alert(error.response?.status === 409 ? "Company code already exists." : error.response?.data?.error || "Failed to save company.");
    } finally { setSavingCompany(false); }
  };

  const handleGetAllCompany = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getCompanies");
      if (response.data?.allCompanies) setSavedCompanies(response.data.allCompanies);
    } catch (error) { console.error("Error fetching companies:", error); }
  };

  const startEditCompany = (comp) => { setEditingCompanyId(comp.id); setEditingCompanyData({ ...comp }); };
  const cancelEditCompany = () => { setEditingCompanyId(null); setEditingCompanyData(null); };

  const saveEditCompany = async () => {
    if (!editingCompanyData.companyName.trim()) { alert("Company Name required."); return; }
    try {
      const response = await axios.put(`http://localhost:5000/api/companies/${editingCompanyId}`, editingCompanyData);
      if (response.data?.allCompanies) setSavedCompanies(response.data.allCompanies);
      alert("Company updated successfully!");
      cancelEditCompany();
    } catch (error) {
      console.error("Error updating company:", error);
      alert(error.response?.data?.error || "Failed to update company.");
    }
  };

  const deleteCompany = async (id) => {
    if (!window.confirm("Delete this company record?")) return;
    try {
      const response = await axios.delete(`http://localhost:5000/api/companies/${id}`);
      if (response.data?.allCompanies) setSavedCompanies(response.data.allCompanies);
      alert("Company deleted successfully!");
    } catch (error) { alert(error.response?.data?.error || "Failed to delete company."); }
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
      adminName: "",
      labType: "",
    });
  const handleGetLab = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/labs");
      if (response.data?.allLabs) setSavedLabs(response.data.allLabs);
    } catch (error) { console.error("Error fetching labs:", error); }
  };

  const handleSaveLab = async () => {
    if (!labData.labName.trim()) {
      alert("Lab Name is required.");
      return;
    }
    if (!labData.labType) {
      alert("Please select Lab Type.");
      return;
    }

    const generatedCode = generateCode("LAB"); // e.g., LAB-20260420-001

    try {
      const response = await axios.post("http://localhost:5000/api/labs", {
        labName: labData.labName,
        gst: labData.gst,
        address: labData.address,
        phone: labData.phone,
        adminName: labData.adminName,
        labType: labData.labType,
        labCode: generatedCode,
      });

      if (response.data && response.data.allLabs) {
        setSavedLabs(response.data.allLabs); // full list from DB
        alert("Lab saved successfully!");
      }
      resetLab();
    } catch (error) {
      console.error("Error saving lab:", error);
      if (error.response?.status === 409) {
        alert("Lab Code already exists. Please try again.");
      } else {
        alert(error.response?.data?.error || "Failed to save lab.");
      }
    }
  };

  const startEditLab = (lab) => {
    setEditingLabId(lab.id);
    setEditingLabData({ ...lab });
  };
  const cancelEditLab = () => {
    setEditingLabId(null);
    setEditingLabData(null);
  };
  const saveEditLab = async () => {
    if (!editingLabData.labName.trim()) { alert("Lab Name required."); return; }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/labs/${editingLabId}`,
        {
          labName: editingLabData.labName,
          gst: editingLabData.gst,
          address: editingLabData.address,
          phone: editingLabData.phone,
          adminName: editingLabData.adminName,
          labType: editingLabData.labType,
          labCode: editingLabData.labCode, // include if editable, otherwise omit
        },
      );

      if (response.data && response.data.allLabs) {
        setSavedLabs(response.data.allLabs);
        alert("Lab updated successfully!");
      } else {
        // Fallback: manual update if API doesn't return allLabs
        setSavedLabs((prev) =>
          prev.map((lab) =>
            lab.id === editingLabId
              ? { ...editingLabData, savedAt: new Date().toLocaleString() }
              : lab,
          ),
        );
        alert("Lab updated successfully!");
      }

      cancelEditLab();
    } catch (error) {
      console.error("Error updating lab:", error);
      alert(error.response?.data?.error || "Failed to update lab.");
    }
  };

  const deleteLab = async (id) => {
    if (!window.confirm("Delete this lab record?")) return;
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/labs/${id}`,
      );

      if (response.data && response.data.allLabs) {
        setSavedLabs(response.data.allLabs);
        alert("Lab deleted successfully!");
      } else {
        // Fallback: manual removal if API doesn't return allLabs
        setSavedLabs((prev) => prev.filter((lab) => lab.id !== id));
        alert("Lab deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting lab:", error);
      if (error.response?.status === 404) {
        alert("Lab not found. It may have already been deleted.");
      } else {
        alert(error.response?.data?.error || "Failed to delete lab.");
      }
    }
  };

  // ---------- Product Functions ----------
  const updateProduct = (field, value) => setProductData((prev) => ({ ...prev, [field]: value }));
  const resetProduct = () => setProductData({ productName: "" });

  const handleGetProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      if (response.data?.allProducts) setSavedProducts(response.data.allProducts);
    } catch (error) { console.error("Error fetching products:", error); }
  };

  const handleSaveProduct = async () => {
    if (!productData.productName.trim()) { alert("Product Name is required."); return; }
    setSavingProduct(true);
    try {
      const response = await axios.post("http://localhost:5000/api/products", { ...productData, productId: generateCode("SMP") });
      if (response.data?.allProducts) setSavedProducts(response.data.allProducts);
      resetProduct();
    } catch (error) {
      console.error("Error saving product:", error);
      if (error.response?.status === 409) {
        alert("Product ID already exists. Please try again.");
      } else {
        alert(error.response?.data?.error || "Failed to save product.");
      }
    }
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
    if (!editingProductData.productName.trim()) { alert("Product Name required."); return; }
    setSavedProducts((prev) => prev.map((p) => p.id === editingProductId ? { ...editingProductData, savedAt: new Date().toLocaleString() } : p));
    cancelEditProduct();
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
      if (response.data?.allProducts) setSavedProducts(response.data.allProducts);
      alert("Product deleted successfully!");
    } catch (error) { alert("Failed to delete product."); }
  };

  useEffect(() => {
    handleGetAllCompany();
    handleGetLab();
    handleGetProduct();
    handleGetAllTests();
  }, []);

  // ---------- Testing Functions ----------
  const handleToggleTest = (testId) => {
    setSelectedTestIds((prev) => prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]);
    if (!selectedTestIds.includes(testId)) {
      const test = availableTests.find((t) => t.id === testId);
      if (test) {
        const initialValues = {};
        test?.fields?.forEach((field) => { initialValues[field?.name] = ""; });
        setTestValues((prev) => ({ ...prev, [testId]: initialValues }));
      }
    }
  };

  const handleTestFieldChange = (testId, fieldName, value) => {
    setTestValues((prev) => ({ ...prev, [testId]: { ...(prev[testId] || {}), [fieldName]: value } }));
  };

  const addCustomField = () => setNewTestFields([...newTestFields, { name: "", label: "", placeholder: "" }]);
  const removeCustomField = (index) => { const updated = [...newTestFields]; updated.splice(index, 1); setNewTestFields(updated); };
  const updateCustomField = (index, key, value) => { const updated = [...newTestFields]; updated[index][key] = value; setNewTestFields(updated); };

  const handleAddNewTest = async () => {
    if (!newTestLabel.trim()) return;
    const invalid = newTestFields.some((f) => !f.name.trim() || !f.label.trim());
    if (invalid) { alert("Please fill in both Name and Label for each field."); return; }
    const payload = { test_name: newTestLabel.trim(), fields: newTestFields.map((f) => ({ name: f.name.trim(), label: f.label.trim(), placeholder: f.placeholder || "" })) };
    try {
      const res = await fetch("http://localhost:5000/api/create-test", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) { alert(data.error || "Failed to create test"); return; }
      handleGetAllTests();
      setNewTestLabel("");
      setNewTestFields([{ name: "", label: "", placeholder: "" }]);
    } catch (err) { console.error(err); alert("Error creating test"); }
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
      return { testId: id, testLabel: test.label, fields: test.fields.map((f) => ({ label: f.label, value: testValues[id]?.[f.name] || "" })) };
    });
    setSavedTests((prev) => [{ id: Date.now(), savedAt: new Date().toLocaleString(), tests: selectedTestsData }, ...prev]);
    alert(`Saved ${selectedTestsData.length} test(s).`);
    setSelectedTestIds([]);
  };

  const startEditTest = (entry) => { setEditingTestId(entry.id); setEditingTestData(JSON.parse(JSON.stringify(entry))); };
  const cancelEditTest = () => { setEditingTestId(null); setEditingTestData(null); };
  const saveEditTest = () => {
    setSavedTests((prev) => prev.map((t) => t.id === editingTestId ? { ...editingTestData, savedAt: new Date().toLocaleString() } : t));
    cancelEditTest();
  };
  const deleteTest = (id) => { if (window.confirm("Delete this test configuration?")) setSavedTests((prev) => prev.filter((t) => t.id !== id)); };
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
            <p className="lm-subtitle">Manage companies, labs, products, and test configurations</p>
          </div>

          <div className="lm-tabs">
            {["lab", "product", "testing", "company"].map((tab) => (
              <button key={tab} className={`lm-tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* ========== COMPANY TAB ========== */}
          {activeTab === "company" && (
            <div className="lm-panel">
              <div className="lm-form-grid">
                <div className="lm-field">
                  <label className="lm-label">Company Name</label>
                  <input className="lm-input" value={companyData.companyName} onChange={(e) => updateCompany("companyName", e.target.value)} />
                </div>
                <div className="lm-field">
                  <label className="lm-label">GST Number</label>
                  <input className="lm-input" value={companyData.gst} onChange={(e) => updateCompany("gst", e.target.value)} />
                </div>
                <div className="lm-field lm-full-width">
                  <label className="lm-label">Address</label>
                  <textarea className="lm-textarea" value={companyData.address} onChange={(e) => updateCompany("address", e.target.value)} />
                </div>
                <div className="lm-field">
                  <label className="lm-label">Phone Number</label>
                  <input className="lm-input" value={companyData.phone} onChange={(e) => updateCompany("phone", e.target.value)} />
                </div>
                <div className="lm-field">
                  <label className="lm-label">Admin Name</label>
                  <input className="lm-input" value={companyData.adminName} onChange={(e) => updateCompany("adminName", e.target.value)} />
                </div>
              </div>

              {(companyData.companyName || companyData.gst) && (
                <div className="lm-info-card">
                  <strong>🏢 Company Profile</strong>
                  <p>{companyData.companyName || "—"} · {companyData.adminName ? `Head: ${companyData.adminName}` : ""}</p>
                </div>
              )}

              <div className="lm-actions">
                <button className="lm-btn-secondary" onClick={resetCompany}>Clear</button>
                <button className="lm-btn-primary" onClick={handleSaveCompany} disabled={savingCompany}>
                  {savingCompany ? <><span className="lm-spinner" />Saving...</> : "Save Company"}
                </button>
              </div>

              {savingCompany ? (
                <div className="lm-table-loader">
                  <div className="lm-table-spinner" />
                  <span className="lm-table-loader-text">Saving company, please wait...</span>
                </div>
              ) : savedCompanies.length > 0 && (
                <div className="lm-table-section">
                  <div className="lm-table-section-header">
                    <span className="lm-table-section-title">Saved Companies</span>
                    <span className="lm-table-count-badge">{savedCompanies.length} {savedCompanies.length === 1 ? "company" : "companies"}</span>
                  </div>
                  <div className="lm-table-card">
                    <div className="lm-table-scroll">
                      <table className="lm-table">
                        <thead>
                          <tr>
                            <th>Company Code</th>
                            <th>Company Name</th>
                            <th>GST</th>
                            <th>Phone</th>
                            <th>Admin Name</th>
                            <th>Address</th>
                            <th>Saved At</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {savedCompanies.map((comp) => (
                            <tr key={comp.id}>
                              {editingCompanyId === comp.id ? (
                                <>
                                  <td><span className="lm-code-pill">{comp.companyCode}</span></td>
                                  <td><input className="lm-editable-input" value={editingCompanyData.companyName} onChange={(e) => setEditingCompanyData({ ...editingCompanyData, companyName: e.target.value })} /></td>
                                  <td><input className="lm-editable-input" value={editingCompanyData.gst} onChange={(e) => setEditingCompanyData({ ...editingCompanyData, gst: e.target.value })} /></td>
                                  <td><input className="lm-editable-input" value={editingCompanyData.phone} onChange={(e) => setEditingCompanyData({ ...editingCompanyData, phone: e.target.value })} /></td>
                                  <td><input className="lm-editable-input" value={editingCompanyData.adminName} onChange={(e) => setEditingCompanyData({ ...editingCompanyData, adminName: e.target.value })} /></td>
                                  <td><textarea className="lm-editable-input" rows={2} value={editingCompanyData.address} onChange={(e) => setEditingCompanyData({ ...editingCompanyData, address: e.target.value })} /></td>
                                  <td className="lm-table-date">{comp.savedAt}</td>
                                  <td>
                                    <div className="lm-action-cell">
                                      <button className="lm-icon-btn" onClick={saveEditCompany}>💾</button>
                                      <button className="lm-icon-btn" onClick={cancelEditCompany}>✖️</button>
                                    </div>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td><span className="lm-code-pill">{comp.companyCode}</span></td>
                                  <td className="lm-table-name">{comp.companyName}</td>
                                  <td className="lm-table-muted">{comp.gst || "—"}</td>
                                  <td className="lm-table-muted">{comp.phone || "—"}</td>
                                  <td className="lm-table-muted">{comp.adminName || "—"}</td>
                                  <td className="lm-table-muted">{comp.address || "—"}</td>
                                  <td className="lm-table-date">{comp.savedAt}</td>
                                  <td>
                                    <div className="lm-action-cell">
                                      <button className="lm-icon-btn" onClick={() => startEditCompany(comp)}>✏️</button>
                                      <button className="lm-icon-btn danger" onClick={() => deleteCompany(comp.id)}>🗑️</button>
                                    </div>
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========== LAB TAB ========== */}
          {activeTab === "lab" && (
            <div className="lm-panel">
              <div className="lm-form-grid">
                <div className="lm-field">
                  <label className="lm-label">Lab Name</label>
                  <input className="lm-input" value={labData.labName} onChange={(e) => updateLab("labName", e.target.value)} />
                </div>
                <div className="lm-field">
                  <label className="lm-label">GST Number</label>
                  <input className="lm-input" value={labData.gst} onChange={(e) => updateLab("gst", e.target.value)} />
                </div>
                <div className="lm-field lm-full-width">
                  <label className="lm-label">Address</label>
                  <textarea className="lm-textarea" value={labData.address} onChange={(e) => updateLab("address", e.target.value)} />
                </div>
                <div className="lm-field">
                  <label className="lm-label">Phone Number</label>
                  <input className="lm-input" value={labData.phone} onChange={(e) => updateLab("phone", e.target.value)} />
                </div>
                <div className="lm-field">
                  <label className="lm-label">Admin Name</label>
                  <input className="lm-input" value={labData.adminName} onChange={(e) => updateLab("adminName", e.target.value)} />
                </div>
                <div className="lm-field">
                  <label className="lm-label">Tab Type</label>
                  <select
                    className="lm-select"
                    value={labData.labType}
                    onChange={(e) => updateLab("labType", e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="internal">Internal</option>
                    <option value="thirdparty">Third Party</option>
                  </select>
                </div>
              </div>
              {labData.labType && (
                <div className="lm-info-card">
                  <strong>
                    ⚙️{" "}
                    {labData.labType === "internal"
                      ? "Internal Lab"
                      : "Third Party Lab"}
                  </strong>
                  <span className="lm-badge">
                    {labData.labType === "internal" ? "IN-HOUSE" : "EXTERNAL"}
                  </span>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
                    {labData.labType === "internal"
                      ? "Operates within the organization."
                      : "Accredited external partner."}
                  </p>
                </div>
              )}

              <div className="lm-actions">
                <button className="lm-btn-secondary" onClick={resetLab}>Clear</button>
                <button className="lm-btn-primary" onClick={handleSaveLab} disabled={savingLab}>
                  {savingLab ? <><span className="lm-spinner" />Saving...</> : "Save Lab"}
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
                        <th>Admin Name</th>
                        <th>Tab Type</th>
                        <th>Address</th>
                        <th>Saved At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedLabs?.map((lab) => (
                        <tr key={lab?.id}>
                          {editingLabId === lab?.id ? (
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
                                  value={editingLabData.adminName}
                                  onChange={(e) =>
                                    setEditingLabData({
                                      ...editingLabData,
                                      adminName: e.target.value,
                                    })
                                  }
                                />
                              </td>
                              <td>
                                <select
                                  className="lm-editable-select"
                                  value={editingLabData.labType}
                                  onChange={(e) =>
                                    setEditingLabData({
                                      ...editingLabData,
                                      labType: e.target.value,
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
                              <td>{lab.adminName}</td>
                              <td>
                                {lab.labType === "internal"
                                  ? "Internal"
                                  : lab.labType === "thirdparty"
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
                                  onClick={() => deleteLab(lab?.id)}
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

          {/* ========== PRODUCT TAB ========== */}
          {activeTab === "product" && (
            <div className="lm-panel">
              <div className="lm-form-grid">
                <div className="lm-field">
                  <label className="lm-label">Product Name</label>
                  <input className="lm-input" value={productData?.productName} onChange={(e) => updateProduct("productName", e.target.value)} />
                </div>
              </div>

              <div className="lm-actions">
                <button className="lm-btn-secondary" onClick={resetProduct}>Clear</button>
                <button className="lm-btn-primary" onClick={handleSaveProduct} disabled={savingProduct}>
                  {savingProduct ? <><span className="lm-spinner" />Saving...</> : "Save Product"}
                </button>
              </div>

              {savingProduct ? (
                <div className="lm-table-loader">
                  <div className="lm-table-spinner" />
                  <span className="lm-table-loader-text">Saving product, please wait...</span>
                </div>
              ) : savedProducts.length > 0 && (
                <div className="lm-table-section">
                  <div className="lm-table-section-header">
                    <span className="lm-table-section-title">Saved Products</span>
                    <span className="lm-table-count-badge">{savedProducts.length} {savedProducts.length === 1 ? "product" : "products"}</span>
                  </div>
                  <div className="lm-table-card">
                    <div className="lm-table-scroll">
                      <table className="lm-table">
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Product ID</th>
                            <th>Saved At</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {savedProducts.map((prod) => (
                            <tr key={prod.id}>
                              {editingProductId === prod.id ? (
                                <>
                                  <td><input className="lm-editable-input" value={editingProductData.productName} onChange={(e) => setEditingProductData({ ...editingProductData, productName: e.target.value })} /></td>
                                  <td><input className="lm-editable-input" value={editingProductData.productId} onChange={(e) => setEditingProductData({ ...editingProductData, productId: e.target.value })} /></td>
                                  <td className="lm-table-date">{prod.savedAt}</td>
                                  <td>
                                    <div className="lm-action-cell">
                                      <button className="lm-icon-btn" onClick={saveEditProduct}>💾</button>
                                      <button className="lm-icon-btn" onClick={cancelEditProduct}>✖️</button>
                                    </div>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="lm-table-name">{prod.productName}</td>
                                  <td><span className="lm-code-pill">{prod.productId}</span></td>
                                  <td className="lm-table-date">{prod.savedAt}</td>
                                  <td>
                                    <div className="lm-action-cell">
                                      <button className="lm-icon-btn" onClick={() => startEditProduct(prod)}>✏️</button>
                                      <button className="lm-icon-btn danger" onClick={() => deleteProduct(prod.id)}>🗑️</button>
                                    </div>
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========== TESTING TAB ========== */}
          {activeTab === "testing" && (
            <div className="lm-panel">
              <div className="lm-field lm-full-width">
                <label className="lm-label">Select Testing Types</label>
                <div className="lm-check-group">
                  {availableTests.map((test) => (
                    <div key={test.id} className="lm-checkbox-item">
                      <input type="checkbox" id={test.id} checked={selectedTestIds.includes(test.id)} onChange={() => handleToggleTest(test.id)} />
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
                    <input className="lm-input" value={newTestLabel} onChange={(e) => setNewTestLabel(e.target.value)} />
                  </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className="lm-label">Test Fields (Name, Label, Placeholder)</label>
                  {newTestFields.map((field, idx) => (
                    <div key={idx} className="lm-dynamic-field-row">
                      <div className="lm-field">
                        <input className="lm-input" placeholder="Field name" value={field.name} onChange={(e) => updateCustomField(idx, "name", e.target.value)} />
                      </div>
                      <div className="lm-field">
                        <input className="lm-input" placeholder="Label" value={field.label} onChange={(e) => updateCustomField(idx, "label", e.target.value)} />
                      </div>
                      <div className="lm-field">
                        <input className="lm-input" placeholder="Placeholder" value={field.placeholder} onChange={(e) => updateCustomField(idx, "placeholder", e.target.value)} />
                      </div>
                      <button className="lm-btn-outline" onClick={() => removeCustomField(idx)} disabled={newTestFields.length === 1}>✕</button>
                    </div>
                  ))}
                  <button className="lm-btn-outline" onClick={addCustomField} style={{ marginTop: "0.5rem" }}>+ Add Field</button>
                </div>
                <button className="lm-btn-small" onClick={handleAddNewTest} disabled={!newTestLabel.trim()}>Create Test</button>
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
                        <h3 style={{ marginBottom: "1rem", fontSize: "1rem", fontWeight: 600 }}>{test.label}</h3>
                        <div className="lm-form-grid">
                          {test?.fields?.map((field) => (
                            <div key={field?.name} className="lm-field">
                              <label className="lm-label">{field?.label}</label>
                              <input className="lm-input" placeholder={field?.placeholder} value={values[field?.name] || ""} onChange={(e) => handleTestFieldChange(testId, field?.name, e.target.value)} />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="lm-actions">
                <button className="lm-btn-secondary" onClick={resetTesting}>Clear All</button>
                <button className="lm-btn-primary" onClick={handleSaveTesting}>Apply Testing</button>
              </div>

              {savedTests.length > 0 && (
                <div className="lm-table-section">
                  <div className="lm-table-section-header">
                    <span className="lm-table-section-title">Saved Test Configurations</span>
                    <span className="lm-table-count-badge">{savedTests.length} {savedTests.length === 1 ? "entry" : "entries"}</span>
                  </div>
                  <div className="lm-table-card">
                    <div className="lm-table-scroll">
                      <table className="lm-table">
                        <thead>
                          <tr>
                            <th>Saved At</th>
                            <th>Test(s) &amp; Values</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {savedTests.map((entry) => (
                            <tr key={entry.id}>
                              <td className="lm-table-date" style={{ whiteSpace: "nowrap" }}>{entry.savedAt}</td>
                              <td>
                                {editingTestId === entry.id
                                  ? editingTestData.tests.map((test, ti) => (
                                      <div key={ti} style={{ marginBottom: "1rem" }}>
                                        <strong>{test.testLabel}</strong>
                                        <ul className="lm-test-fields-preview">
                                          {test.fields.map((field, fi) => (
                                            <li key={fi}>
                                              {field.label}:{" "}
                                              <input className="lm-editable-input" style={{ width: "auto", display: "inline-block", marginLeft: "0.5rem" }} value={field.value} onChange={(e) => updateEditingTestField(ti, fi, e.target.value)} />
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))
                                  : entry.tests.map((test, idx) => (
                                      <div key={idx} style={{ marginBottom: "0.75rem" }}>
                                        <strong style={{ fontSize: "0.82rem" }}>{test.testLabel}</strong>
                                        <ul className="lm-test-fields-preview">
                                          {test.fields.map((field, fidx) => (
                                            <li key={fidx} className="lm-table-muted">{field.label}: {field.value || "—"}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                              </td>
                              <td>
                                <div className="lm-action-cell">
                                  {editingTestId === entry.id ? (
                                    <>
                                      <button className="lm-icon-btn" onClick={saveEditTest}>💾</button>
                                      <button className="lm-icon-btn" onClick={cancelEditTest}>✖️</button>
                                    </>
                                  ) : (
                                    <>
                                      <button className="lm-icon-btn" onClick={() => startEditTest(entry)}>✏️</button>
                                      <button className="lm-icon-btn danger" onClick={() => deleteTest(entry.id)}>🗑️</button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}