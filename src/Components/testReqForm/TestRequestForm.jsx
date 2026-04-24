// import React, { useState, useEffect } from "react";

// // ===================== CONSTANTS =====================
// const TESTING_FIELDS = {
//   ETO: [
//     {
//       name: "etoConcentration",
//       label: "ETO Concentration",
//       placeholder: "e.g. 600 mg/L",
//     },
//     {
//       name: "exposureTime",
//       label: "Exposure Time",
//       placeholder: "e.g. 4 hours",
//     },
//     { name: "temperature", label: "Temperature", placeholder: "e.g. 54°C" },
//     { name: "humidity", label: "Humidity", placeholder: "e.g. 60%" },
//     {
//       name: "residueLevel",
//       label: "Residue Level",
//       placeholder: "e.g. < 10 ppm",
//     },
//   ],
//   Micro: [
//     {
//       name: "totalPlateCount",
//       label: "Total Plate Count",
//       placeholder: "e.g. < 100 CFU/g",
//     },
//     {
//       name: "yeastMold",
//       label: "Yeast & Mold",
//       placeholder: "e.g. < 10 CFU/g",
//     },
//     { name: "eColi", label: "E. Coli", placeholder: "e.g. Absent/25g" },
//     { name: "salmonella", label: "Salmonella", placeholder: "e.g. Absent/25g" },
//     {
//       name: "coliformBacteria",
//       label: "Coliform Bacteria",
//       placeholder: "e.g. < 3 MPN/g",
//     },
//   ],
//   Physical: [
//     {
//       name: "textureAnalysis",
//       label: "Texture Analysis",
//       placeholder: "e.g. Firm, 8.5 N",
//     },
//     {
//       name: "colorMeasurement",
//       label: "Color Measurement",
//       placeholder: "e.g. L*=92",
//     },
//     {
//       name: "moistureContent",
//       label: "Moisture Content",
//       placeholder: "e.g. 12.5%",
//     },
//     {
//       name: "particleSizeShape",
//       label: "Particle Size & Shape",
//       placeholder: "e.g. 50–100 µm",
//     },
//     { name: "viscosity", label: "Viscosity", placeholder: "e.g. 450 mPa·s" },
//     {
//       name: "densitySpecificGravity",
//       label: "Density / Specific",
//       placeholder: "e.g. 1.05 g/cm³",
//     },
//     {
//       name: "waterActivity",
//       label: "Water Activity",
//       placeholder: "e.g. 0.87 aw",
//     },
//   ],
//   Chemical: [
//     { name: "phLevel", label: "pH Level", placeholder: "e.g. 6.8" },
//     { name: "ashContent", label: "Ash Content", placeholder: "e.g. 1.2%" },
//     {
//       name: "proteinContent",
//       label: "Protein Content",
//       placeholder: "e.g. 18.5%",
//     },
//     { name: "fatContent", label: "Fat Content", placeholder: "e.g. 5.3%" },
//     {
//       name: "peroxideValue",
//       label: "Peroxide Value",
//       placeholder: "e.g. 2.1 meq/kg",
//     },
//     {
//       name: "heavyMetals",
//       label: "Heavy Metals",
//       placeholder: "e.g. Pb < 0.5 ppm",
//     },
//   ],
//   Presticide: [
//     {
//       name: "activeIngredient",
//       label: "Active Ingredient",
//       placeholder: "e.g. Chlorpyrifos",
//     },
//     {
//       name: "concentration",
//       label: "Concentration",
//       placeholder: "e.g. 500 g/L",
//     },
//     { name: "solventUsed", label: "Solvent Used", placeholder: "e.g. Xylene" },
//     {
//       name: "stabilityTest",
//       label: "Stability Test",
//       placeholder: "e.g. Stable at 54°C",
//     },
//     { name: "phOfSolution", label: "pH of Solution", placeholder: "e.g. 6.5" },
//   ],
// };

// const COMPANY_DATA = [
//   { name: "Aryan group 1", code: "AG01", type: "Internal" },
//   { name: "Aryan group 2", code: "AG02", type: "External" },
//   { name: "Aryan group 3", code: "AG03", type: "Internal" },
//   { name: "Aryan group 4", code: "AG04", type: "External" },
// ];

// const LAB_DATA = [
//   { name: "Central Lab", code: "LAB-C01", type: "Internal" },
//   { name: "Micro Analysis Hub", code: "LAB-M02", type: "Internal" },
//   { name: "External Partner Lab", code: "LAB-E03", type: "External" },
//   { name: "Research Lab", code: "LAB-R04", type: "Internal" },
// ];

// const PRODUCT_DATA = [
//   { name: "Medical Gauze", sampleCode: "MG-101" },
//   { name: "Surgical Mask", sampleCode: "SM-202" },
//   { name: "Nitrile Gloves", sampleCode: "NG-303" },
//   { name: "IV Cannula", sampleCode: "IV-404" },
//   { name: "Syringe (10ml)", sampleCode: "SY-505" },
// ];

// const generateUniqueId = () =>
//   `${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;

// const buildInitialFields = (testKey) =>
//   TESTING_FIELDS[testKey].map((f) => ({
//     id: `predefined-${f.name}`,
//     fieldName: f.label,
//     fieldValue: "",
//     placeholder: f.placeholder,
//     isPredefined: true,
//   }));

// const SAMPLE_REQUESTS = [
//   {
//     id: "1713264000000-abc12345",
//     companyName: "Aryan group 1",
//     companyCode: "AG01",
//     requestName: "Batch #24-05 Stability",
//     labName: "Central Lab",
//     labCode: "LAB-C01",
//     labType: "Internal",
//     productName: "Medical Gauze",
//     lotNo: "LOT-2409",
//     sampleCode: "MG-101",
//     selectedTests: ["Physical", "Chemical"],
//     testData: {
//       Physical: { fields: buildInitialFields("Physical") },
//       Chemical: { fields: buildInitialFields("Chemical") },
//     },
//     remark: "Routine stability testing at ambient conditions",
//     createdAt: new Date("2024-04-16").toISOString(),
//   },
//   {
//     id: "1713350400000-def67890",
//     companyName: "Aryan group 2",
//     companyCode: "AG02",
//     requestName: "Microbiological Analysis",
//     labName: "Micro Analysis Hub",
//     labCode: "LAB-M02",
//     labType: "Internal",
//     productName: "Surgical Mask",
//     lotNo: "LOT-2410",
//     sampleCode: "SM-202",
//     selectedTests: ["Micro"],
//     testData: {
//       Micro: { fields: buildInitialFields("Micro") },
//     },
//     remark: "Bioburden testing for medical device",
//     createdAt: new Date("2024-04-15").toISOString(),
//   },
// ];

// // ===================== SPINNER COMPONENT =====================
// const Spinner = () => (
//   <span style={styles.spinner} />
// );

// // ===================== MAIN COMPONENT =====================
// const TestRequestForm = () => {
//   const [selectedCompanyName, setSelectedCompanyName] = useState("");
//   const [companyCode, setCompanyCode] = useState("");
//   const [requestName, setRequestName] = useState("");
//   const [selectedLabName, setSelectedLabName] = useState("");
//   const [labCode, setLabCode] = useState("");
//   const [labType, setLabType] = useState("");
//   const [productName, setProductName] = useState("");
//   const [lotNo, setLotNo] = useState("");
//   const [sampleCode, setSampleCode] = useState("");
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [testData, setTestData] = useState({});
//   const [remark, setRemark] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // ---- loader states ----
//   const [savingLoader, setSavingLoader] = useState(false);
//   const [deletingId, setDeletingId] = useState(null); // stores id of row being deleted

//   const [requests, setRequests] = useState(() => {
//     const stored = localStorage.getItem("trf_requests");
//     if (stored) {
//       try {
//         return JSON.parse(stored);
//       } catch (e) {
//         localStorage.setItem("trf_requests", JSON.stringify(SAMPLE_REQUESTS));
//         return SAMPLE_REQUESTS;
//       }
//     } else {
//       localStorage.setItem("trf_requests", JSON.stringify(SAMPLE_REQUESTS));
//       return SAMPLE_REQUESTS;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("trf_requests", JSON.stringify(requests));
//   }, [requests]);

//   useEffect(() => {
//     const selected = COMPANY_DATA.find((c) => c.name === selectedCompanyName);
//     setCompanyCode(selected ? selected.code : "");
//   }, [selectedCompanyName]);

//   useEffect(() => {
//     const selected = LAB_DATA.find((l) => l.name === selectedLabName);
//     if (selected) {
//       setLabCode(selected.code);
//       setLabType(selected.type);
//     } else {
//       setLabCode("");
//       setLabType("");
//     }
//   }, [selectedLabName]);

//   useEffect(() => {
//     const selectedProduct = PRODUCT_DATA.find((p) => p.name === productName);
//     setSampleCode(selectedProduct ? selectedProduct.sampleCode : "");
//   }, [productName]);

//   const initializeTestData = (testKey) => {
//     if (!testData[testKey]) {
//       setTestData((prev) => ({
//         ...prev,
//         [testKey]: { fields: buildInitialFields(testKey) },
//       }));
//     }
//   };

//   useEffect(() => {
//     selectedTests.forEach((testKey) => {
//       if (!testData[testKey]) initializeTestData(testKey);
//     });
//   }, [selectedTests]);

//   const toggleTest = (testKey) => {
//     if (selectedTests.includes(testKey)) {
//       setSelectedTests(selectedTests.filter((t) => t !== testKey));
//     } else {
//       setSelectedTests([...selectedTests, testKey]);
//       initializeTestData(testKey);
//     }
//   };

//   const addCustomField = (testKey) => {
//     const newField = {
//       id: generateUniqueId(),
//       fieldName: "",
//       fieldValue: "",
//       placeholder: "e.g., enter parameter name",
//       isPredefined: false,
//     };
//     setTestData((prev) => ({
//       ...prev,
//       [testKey]: {
//         ...prev[testKey],
//         fields: [...(prev[testKey]?.fields || []), newField],
//       },
//     }));
//   };

//   const updateCustomFieldName = (testKey, fieldId, value) => {
//     setTestData((prev) => ({
//       ...prev,
//       [testKey]: {
//         ...prev[testKey],
//         fields: prev[testKey].fields.map((f) =>
//           f.id === fieldId && !f.isPredefined ? { ...f, fieldName: value } : f,
//         ),
//       },
//     }));
//   };

//   const removeCustomField = (testKey, fieldId) => {
//     setTestData((prev) => ({
//       ...prev,
//       [testKey]: {
//         ...prev[testKey],
//         fields: prev[testKey].fields.filter(
//           (f) => f.id !== fieldId || f.isPredefined,
//         ),
//       },
//     }));
//   };

//   const resetForm = () => {
//     setSelectedCompanyName("");
//     setCompanyCode("");
//     setRequestName("");
//     setSelectedLabName("");
//     setLabCode("");
//     setLabType("");
//     setProductName("");
//     setLotNo("");
//     setSampleCode("");
//     setSelectedTests([]);
//     setTestData({});
//     setRemark("");
//     setEditingId(null);
//   };

//   const loadRequestForEdit = (req) => {
//     setEditingId(req.id);
//     setSelectedCompanyName(req.companyName);
//     setCompanyCode(req.companyCode);
//     setRequestName(req.requestName);
//     setSelectedLabName(req.labName);
//     setLabCode(req.labCode);
//     setLabType(req.labType);
//     setProductName(req.productName);
//     setLotNo(req.lotNo);
//     setSampleCode(req.sampleCode);
//     setSelectedTests(req.selectedTests);
//     setTestData(req.testData);
//     setRemark(req.remark);
//   };

//   const handleSaveRequest = () => {
//     if (
//       !selectedCompanyName ||
//       !selectedLabName ||
//       !requestName ||
//       !productName
//     ) {
//       alert(
//         "Please fill required fields: Company, Lab Name, Request Name, Product Name",
//       );
//       return;
//     }

//     setSavingLoader(true);

//     setTimeout(() => {
//       const formData = {
//         id: editingId || generateUniqueId(),
//         companyName: selectedCompanyName,
//         companyCode,
//         requestName,
//         labName: selectedLabName,
//         labCode,
//         labType,
//         productName,
//         lotNo,
//         sampleCode,
//         selectedTests: [...selectedTests],
//         testData: JSON.parse(JSON.stringify(testData)),
//         remark,
//         createdAt: editingId
//           ? requests.find((r) => r.id === editingId)?.createdAt ||
//             new Date().toISOString()
//           : new Date().toISOString(),
//       };

//       if (editingId) {
//         setRequests((prev) =>
//           prev.map((req) => (req.id === editingId ? formData : req)),
//         );
//         alert("Request updated successfully!");
//       } else {
//         setRequests((prev) => [formData, ...prev]);
//         alert(`Request created with ID: ${formData.id}`);
//       }

//       setSavingLoader(false);
//       resetForm();
//     }, 800);
//   };

//   const deleteRequest = (id) => {
//     if (window.confirm("Are you sure you want to delete this request?")) {
//       setDeletingId(id);
//       setTimeout(() => {
//         setRequests((prev) => prev.filter((req) => req.id !== id));
//         if (editingId === id) resetForm();
//         setDeletingId(null);
//       }, 600);
//     }
//   };

//   const cancelEdit = () => resetForm();

//   return (
//     <div style={styles.container}>
//       {/* Spinner keyframe injected once */}
//       <style>{`
//         @keyframes trf-spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>

//       <h1 style={styles.mainTitle}>📋 Admin – Define Test Proform</h1>

//       <div style={styles.card}>
//         <h2 style={styles.cardTitle}>🏢 1. Company Details</h2>
//         <div style={styles.row}>
//           <div style={styles.fieldGroup}>
//             <label>Company Name *</label>
//             <select
//               value={selectedCompanyName}
//               onChange={(e) => setSelectedCompanyName(e.target.value)}
//               style={styles.input}
//             >
//               <option value="">-- Select Company --</option>
//               {COMPANY_DATA.map((comp) => (
//                 <option key={comp.code} value={comp.name}>
//                   {comp.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div style={styles.fieldGroup}>
//             <label>Code</label>
//             <input
//               type="text"
//               value={companyCode}
//               readOnly
//               style={{ ...styles.input, backgroundColor: "#f5f5f5" }}
//             />
//           </div>
//           <div style={styles.fieldGroup}>
//             <label>Request Name *</label>
//             <input
//               type="text"
//               value={requestName}
//               onChange={(e) => setRequestName(e.target.value)}
//               style={styles.input}
//             />
//           </div>
//         </div>
//       </div>

//       <div style={styles.card}>
//         <h2 style={styles.cardTitle}>🔬 2. Laboratory Information</h2>
//         <div style={styles.row}>
//           <div style={styles.fieldGroup}>
//             <label>Lab Name *</label>
//             <select
//               value={selectedLabName}
//               onChange={(e) => setSelectedLabName(e.target.value)}
//               style={styles.input}
//             >
//               <option value="">-- Select Lab --</option>
//               {LAB_DATA.map((lab) => (
//                 <option key={lab.code} value={lab.name}>
//                   {lab.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div style={styles.fieldGroup}>
//             <label>Lab Code</label>
//             <input
//               type="text"
//               value={labCode}
//               readOnly
//               style={{ ...styles.input, backgroundColor: "#f5f5f5" }}
//             />
//           </div>
//           <div style={styles.fieldGroup}>
//             <label>Type</label>
//             <input
//               type="text"
//               value={labType}
//               readOnly
//               style={{ ...styles.input, backgroundColor: "#f5f5f5" }}
//             />
//           </div>
//         </div>
//       </div>

//       <div style={styles.card}>
//         <h2 style={styles.cardTitle}>📦 3. Product Details</h2>
//         <div style={styles.row}>
//           <div style={styles.fieldGroup}>
//             <label>Product Name *</label>
//             <select
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               style={styles.input}
//             >
//               <option value="">-- Select Product --</option>
//               {PRODUCT_DATA.map((prod) => (
//                 <option key={prod.sampleCode} value={prod.name}>
//                   {prod.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div style={styles.fieldGroup}>
//             <label>Lot No.</label>
//             <input
//               type="text"
//               value={lotNo}
//               onChange={(e) => setLotNo(e.target.value)}
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.fieldGroup}>
//             <label>Sample Code</label>
//             <input
//               type="text"
//               value={sampleCode}
//               readOnly
//               style={{ ...styles.input, backgroundColor: "#f5f5f5" }}
//             />
//           </div>
//         </div>
//       </div>

//       <div style={styles.card}>
//         <h2 style={styles.cardTitle}>
//           🧪 4. Define Test Proform (Structure only)
//         </h2>
//         <div style={styles.testCheckboxGroup}>
//           {Object.keys(TESTING_FIELDS).map((testKey) => (
//             <label key={testKey} style={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 checked={selectedTests.includes(testKey)}
//                 onChange={() => toggleTest(testKey)}
//               />
//               {testKey}
//             </label>
//           ))}
//         </div>

//         {selectedTests.map((testKey) => (
//           <div key={testKey} style={styles.testSection}>
//             <div style={styles.testHeader}>
//               <h3>🔬 {testKey} Analysis (Fields)</h3>
//               <button
//                 onClick={() => addCustomField(testKey)}
//                 style={styles.addCustomBtn}
//               >
//                 + Add Custom Field
//               </button>
//             </div>

//             <div style={styles.grid2Col}>
//               {testData[testKey]?.fields?.map((field) => (
//                 <div key={field.id} style={styles.fieldGroup}>
//                   {field.isPredefined ? (
//                     <label style={styles.label}>{field.fieldName}</label>
//                   ) : (
//                     <input
//                       type="text"
//                       placeholder="Parameter name (e.g., Viscosity Index)"
//                       value={field.fieldName}
//                       onChange={(e) =>
//                         updateCustomFieldName(testKey, field.id, e.target.value)
//                       }
//                       style={{
//                         ...styles.input,
//                         marginBottom: "6px",
//                         fontWeight: 500,
//                       }}
//                     />
//                   )}
//                   <div
//                     style={{
//                       ...styles.input,
//                       backgroundColor: "#f9f9f9",
//                       color: "#888",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <span style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
//                       {field.placeholder || "(Value will be filled later)"}
//                     </span>
//                     {!field.isPredefined && (
//                       <button
//                         onClick={() => removeCustomField(testKey, field.id)}
//                         style={styles.removeIconBtn}
//                         title="Remove field"
//                       >
//                         🗑️
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//         {selectedTests.length === 0 && (
//           <div style={styles.emptyTestsMsg}>
//             ☑️ Select at least one test category.
//           </div>
//         )}
//       </div>

//       <div style={styles.card}>
//         <h2 style={styles.cardTitle}>📝 5. Remark / Purpose</h2>
//         <textarea
//           rows="3"
//           value={remark}
//           onChange={(e) => setRemark(e.target.value)}
//           style={{ ...styles.input, width: "100%" }}
//         />
//       </div>

//       <div style={styles.actionBar}>
//         <button
//           onClick={handleSaveRequest}
//           style={{
//             ...styles.primaryBtn,
//             opacity: savingLoader ? 0.75 : 1,
//             cursor: savingLoader ? "not-allowed" : "pointer",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//           }}
//           disabled={savingLoader}
//         >
//           {savingLoader && <Spinner />}
//           {savingLoader
//             ? editingId
//               ? "Updating..."
//               : "Creating..."
//             : editingId
//             ? "Update Request"
//             : "Create Request"}
//         </button>
//         {editingId && (
//           <button onClick={cancelEdit} style={styles.secondaryBtn}>
//             Cancel Edit
//           </button>
//         )}
//       </div>

//       <div style={styles.tableWrapper}>
//         <div style={styles.tableHeader}>
//           <h2 style={{ ...styles.cardTitle, marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}>📋 Submitted Requests</h2>
//           <span style={styles.requestCount}>{requests.length} request{requests.length !== 1 ? "s" : ""}</span>
//         </div>
//         {requests.length === 0 ? (
//           <div style={styles.emptyTable}>
//             <div style={{ fontSize: "2.2rem", marginBottom: "10px" }}>📭</div>
//             No requests created yet.
//           </div>
//         ) : (
//           <div style={{ overflowX: "auto", borderRadius: "20px", border: "1px solid #eaeaea" }}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.th}>#</th>
//                   <th style={styles.th}>Company</th>
//                   <th style={styles.th}>Request Name</th>
//                   <th style={styles.th}>Product</th>
//                   <th style={styles.th}>Tests</th>
//                   <th style={styles.th}>Date</th>
//                   <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.map((req, index) => (
//                   <tr
//                     key={req.id}
//                     style={styles.tr}
//                     onMouseEnter={(e) => { e.currentTarget.style.background = "#fafafa"; }}
//                     onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
//                   >
//                     <td style={{ ...styles.td, color: "#bbb", fontSize: "0.78rem", width: "36px", textAlign: "center" }}>
//                       {index + 1}
//                     </td>
//                     <td style={styles.td}>
//                       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                         {/* <div style={styles.companyAvatar}>
//                           {req.companyName.charAt(0).toUpperCase()}
//                         </div> */}
//                         <div>
//                           <div style={{ fontWeight: "600", fontSize: "0.85rem" }}>{req.companyName}</div>
//                           <div style={{ fontSize: "0.72rem", color: "#aaa", marginTop: "1px" }}>{req.companyCode}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td style={styles.td}>
//                       <span style={{ fontWeight: "500", fontSize: "0.85rem" }}>{req.requestName}</span>
//                     </td>
//                     <td style={styles.td}>
//                       <div style={{ fontSize: "0.85rem", fontWeight: "500" }}>{req.productName}</div>
//                       <div style={{ fontSize: "0.72rem", color: "#aaa", marginTop: "1px" }}>{req.sampleCode}</div>
//                     </td>
//                     <td style={styles.td}>
//                       <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
//                         {req.selectedTests.map((t) => (
//                           <span key={t} style={styles.testBadge}>{t}</span>
//                         ))}
//                       </div>
//                     </td>
//                     <td style={{ ...styles.td, fontSize: "0.78rem", color: "#999", whiteSpace: "nowrap" }}>
//                       {new Date(req.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
//                     </td>
//                     <td style={{ ...styles.td, textAlign: "center" }}>
//                       <div style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
//                         <button
//                           onClick={() => loadRequestForEdit(req)}
//                           style={styles.editBtn}
//                           title="Edit"
//                         >
//                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
//                             <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
//                           </svg>
//                         </button>
//                         <button
//                           onClick={() => deleteRequest(req.id)}
//                           disabled={deletingId === req.id}
//                           style={{
//                             ...styles.delBtn,
//                             opacity: deletingId === req.id ? 0.65 : 1,
//                             cursor: deletingId === req.id ? "not-allowed" : "pointer",
//                             display: "inline-flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             width: "32px",
//                             height: "32px",
//                             padding: 0,
//                           }}
//                           title="Delete"
//                         >
//                           {deletingId === req.id ? (
//                             <span style={{
//                               ...styles.spinner,
//                               borderColor: "#cc0000",
//                               borderTopColor: "transparent",
//                               width: "11px",
//                               height: "11px",
//                             }} />
//                           ) : (
//                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <polyline points="3 6 5 6 21 6"/>
//                               <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
//                               <path d="M10 11v6M14 11v6"/>
//                               <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
//                             </svg>
//                           )}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "1300px",
//     margin: "0 auto",
//     padding: "50px 16px",
//     background: "#ffffff",
//     color: "#000000",
//   },
//   mainTitle: {
//     fontSize: "2rem",
//     fontWeight: "600",
//     marginBottom: "28px",
//     paddingLeft: "18px",
//     letterSpacing: "-0.3px",
//   },
//   card: {
//     background: "#ffffff",
//     border: "1px solid #eaeaea",
//     borderRadius: "24px",
//     padding: "24px 28px",
//     marginBottom: "28px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.05)",
//   },
//   cardTitle: {
//     fontSize: "1.4rem",
//     fontWeight: "600",
//     marginBottom: "20px",
//     paddingBottom: "8px",
//     borderBottom: "2px solid #f0f0f0",
//   },
//   row: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "20px",
//     alignItems: "flex-end",
//   },
//   fieldGroup: { flex: "1 1 200px", minWidth: "180px" },
//   label: {
//     display: "block",
//     marginBottom: "6px",
//     fontWeight: "500",
//     fontSize: "0.85rem",
//     color: "#1a1a1a",
//   },
//   input: {
//     width: "100%",
//     padding: "10px 12px",
//     border: "1px solid #cccccc",
//     borderRadius: "12px",
//     fontSize: "0.9rem",
//     backgroundColor: "#ffffff",
//     color: "#000000",
//     outline: "none",
//     transition: "0.2s",
//     boxSizing: "border-box",
//   },
//   testCheckboxGroup: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "24px",
//     marginBottom: "28px",
//     padding: "12px 0",
//     borderBottom: "1px dashed #ddd",
//   },
//   checkboxLabel: {
//     display: "flex",
//     alignItems: "center",
//     fontSize: "1rem",
//     fontWeight: "500",
//     cursor: "pointer",
//     background: "#fafafa",
//     padding: "6px 14px",
//     borderRadius: "40px",
//     border: "1px solid #e2e2e2",
//     gap: "8px",
//   },
//   testSection: {
//     background: "#fefefe",
//     border: "1px solid #ededed",
//     borderRadius: "20px",
//     padding: "18px 22px",
//     marginBottom: "24px",
//   },
//   testHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexWrap: "wrap",
//     marginBottom: "16px",
//   },
//   addCustomBtn: {
//     background: "#ffffff",
//     border: "1px solid #000000",
//     borderRadius: "40px",
//     padding: "6px 14px",
//     fontSize: "0.8rem",
//     fontWeight: "500",
//     cursor: "pointer",
//     color: "#000000",
//   },
//   grid2Col: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//     gap: "16px",
//   },
//   removeIconBtn: {
//     background: "none",
//     border: "none",
//     fontSize: "1rem",
//     cursor: "pointer",
//     color: "#cc0000",
//     padding: "0 0 0 8px",
//   },
//   emptyTestsMsg: {
//     textAlign: "center",
//     color: "#6c6c6c",
//     padding: "28px 12px",
//     fontStyle: "italic",
//   },
//   actionBar: {
//     display: "flex",
//     gap: "18px",
//     justifyContent: "flex-end",
//     margin: "16px 0 32px 0",
//   },
//   primaryBtn: {
//     background: "#000000",
//     color: "#ffffff",
//     border: "none",
//     padding: "12px 28px",
//     borderRadius: "40px",
//     fontSize: "1rem",
//     fontWeight: "600",
//     cursor: "pointer",
//   },
//   secondaryBtn: {
//     background: "#ffffff",
//     color: "#000000",
//     border: "1px solid #aaaaaa",
//     padding: "12px 28px",
//     borderRadius: "40px",
//     fontSize: "1rem",
//     fontWeight: "500",
//     cursor: "pointer",
//   },
//   tableWrapper: { marginTop: "20px" },
//   tableHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "16px",
//   },
//   requestCount: {
//     fontSize: "0.8rem",
//     color: "#999",
//     background: "#f4f4f4",
//     padding: "4px 12px",
//     borderRadius: "40px",
//     fontWeight: "500",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     fontSize: "0.85rem",
//   },
//   th: {
//     padding: "12px 16px",
//     textAlign: "left",
//     fontSize: "0.72rem",
//     fontWeight: "600",
//     color: "#888",
//     textTransform: "uppercase",
//     letterSpacing: "0.6px",
//     background: "#f9f9f9",
//     borderBottom: "1px solid #eaeaea",
//     whiteSpace: "nowrap",
//   },
//   tr: {
//     borderBottom: "1px solid #f0f0f0",
//     transition: "background 0.15s",
//   },
//   td: {
//     padding: "14px 16px",
//     verticalAlign: "middle",
//     color: "#1a1a1a",
//   },
//   companyAvatar: {
//     width: "32px",
//     height: "32px",
//     borderRadius: "50%",
//     background: "#000",
//     color: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "0.8rem",
//     fontWeight: "600",
//     flexShrink: 0,
//   },
//   testBadge: {
//     display: "inline-block",
//     padding: "2px 8px",
//     borderRadius: "20px",
//     background: "#f0f0f0",
//     color: "#444",
//     fontSize: "0.72rem",
//     fontWeight: "500",
//     border: "1px solid #e4e4e4",
//   },
//   editBtn: {
//     background: "none",
//     border: "1px solid #d0d0d0",
//     borderRadius: "8px",
//     padding: "0",
//     width: "32px",
//     height: "32px",
//     display: "inline-flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     color: "#555",
//     transition: "border-color 0.15s, background 0.15s",
//   },
//   delBtn: {
//     background: "none",
//     border: "1px solid #ffcccc",
//     color: "#cc0000",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontSize: "0.75rem",
//   },
//   emptyTable: {
//     textAlign: "center",
//     padding: "48px 32px",
//     background: "#fafafa",
//     borderRadius: "20px",
//     color: "#888",
//     fontSize: "0.9rem",
//   },
//   // Spinner style
//   spinner: {
//     display: "inline-block",
//     width: "14px",
//     height: "14px",
//     border: "2px solid #ffffff",
//     borderTopColor: "transparent",
//     borderRadius: "50%",
//     animation: "trf-spin 0.65s linear infinite",
//     flexShrink: 0,
//   },
// };

// export default TestRequestForm;


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
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [requestName, setRequestName] = useState("");
  const [selectedLabName, setSelectedLabName] = useState("");
  const [labCode, setLabCode] = useState("");
  const [labType, setLabType] = useState("");
  const [productName, setProductName] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [sampleCode, setSampleCode] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);
  const [testData, setTestData] = useState({});
  const [remark, setRemark] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [savingLoader, setSavingLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);   // center loader for table
  const [deletingId, setDeletingId] = useState(null);

  const [requests, setRequests] = useState(() => {
    const stored = localStorage.getItem("trf_requests");
    if (stored) {
      try { return JSON.parse(stored); }
      catch (e) { localStorage.setItem("trf_requests", JSON.stringify(SAMPLE_REQUESTS)); return SAMPLE_REQUESTS; }
    } else {
      localStorage.setItem("trf_requests", JSON.stringify(SAMPLE_REQUESTS));
      return SAMPLE_REQUESTS;
    }
  });

  useEffect(() => { localStorage.setItem("trf_requests", JSON.stringify(requests)); }, [requests]);

  useEffect(() => {
    const selected = COMPANY_DATA.find((c) => c.name === selectedCompanyName);
    setCompanyCode(selected ? selected.code : "");
  }, [selectedCompanyName]);

  useEffect(() => {
    const selected = LAB_DATA.find((l) => l.name === selectedLabName);
    if (selected) { setLabCode(selected.code); setLabType(selected.type); }
    else { setLabCode(""); setLabType(""); }
  }, [selectedLabName]);

  useEffect(() => {
    const selectedProduct = PRODUCT_DATA.find((p) => p.name === productName);
    setSampleCode(selectedProduct ? selectedProduct.sampleCode : "");
  }, [productName]);

  const initializeTestData = (testKey) => {
    if (!testData[testKey]) {
      setTestData((prev) => ({ ...prev, [testKey]: { fields: buildInitialFields(testKey) } }));
    }
  };

  useEffect(() => {
    selectedTests.forEach((testKey) => { if (!testData[testKey]) initializeTestData(testKey); });
  }, [selectedTests]);

  const toggleTest = (testKey) => {
    if (selectedTests.includes(testKey)) setSelectedTests(selectedTests.filter((t) => t !== testKey));
    else { setSelectedTests([...selectedTests, testKey]); initializeTestData(testKey); }
  };

  const addCustomField = (testKey) => {
    const newField = { id: generateUniqueId(), fieldName: "", fieldValue: "", placeholder: "e.g., enter parameter name", isPredefined: false };
    setTestData((prev) => ({ ...prev, [testKey]: { ...prev[testKey], fields: [...(prev[testKey]?.fields || []), newField] } }));
  };

  const updateCustomFieldName = (testKey, fieldId, value) => {
    setTestData((prev) => ({
      ...prev,
      [testKey]: { ...prev[testKey], fields: prev[testKey].fields.map((f) => f.id === fieldId && !f.isPredefined ? { ...f, fieldName: value } : f) },
    }));
  };

  const removeCustomField = (testKey, fieldId) => {
    setTestData((prev) => ({
      ...prev,
      [testKey]: { ...prev[testKey], fields: prev[testKey].fields.filter((f) => f.id !== fieldId || f.isPredefined) },
    }));
  };

  const resetForm = () => {
    setSelectedCompanyName(""); setCompanyCode(""); setRequestName("");
    setSelectedLabName(""); setLabCode(""); setLabType("");
    setProductName(""); setLotNo(""); setSampleCode("");
    setSelectedTests([]); setTestData({}); setRemark(""); setEditingId(null);
  };

  const loadRequestForEdit = (req) => {
    setEditingId(req.id);
    setSelectedCompanyName(req.companyName); setCompanyCode(req.companyCode);
    setRequestName(req.requestName); setSelectedLabName(req.labName);
    setLabCode(req.labCode); setLabType(req.labType);
    setProductName(req.productName); setLotNo(req.lotNo);
    setSampleCode(req.sampleCode); setSelectedTests(req.selectedTests);
    setTestData(req.testData); setRemark(req.remark);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveRequest = () => {
    if (!selectedCompanyName || !selectedLabName || !requestName || !productName) {
      alert("Please fill required fields: Company, Lab Name, Request Name, Product Name");
      return;
    }

    // button loader ON
    setSavingLoader(true);

    setTimeout(() => {
      const formData = {
        id: editingId || generateUniqueId(),
        companyName: selectedCompanyName, companyCode,
        requestName, labName: selectedLabName, labCode, labType,
        productName, lotNo, sampleCode,
        selectedTests: [...selectedTests],
        testData: JSON.parse(JSON.stringify(testData)),
        remark,
        createdAt: editingId
          ? requests.find((r) => r.id === editingId)?.createdAt || new Date().toISOString()
          : new Date().toISOString(),
      };

      // button loader OFF, table loader ON
      setSavingLoader(false);
      setTableLoader(true);

      setTimeout(() => {
        if (editingId) {
          setRequests((prev) => prev.map((req) => req.id === editingId ? formData : req));
        } else {
          setRequests((prev) => [formData, ...prev]);
        }
        setTableLoader(false);
        resetForm();
      }, 700);

    }, 900);
  };

  const deleteRequest = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      setDeletingId(id);
      setTimeout(() => {
        setRequests((prev) => prev.filter((req) => req.id !== id));
        if (editingId === id) resetForm();
        setDeletingId(null);
      }, 600);
    }
  };

  const cancelEdit = () => resetForm();

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

      {/* ===== COMPANY ===== */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🏢 1. Company Details</h2>
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label>Company Name *</label>
            <select value={selectedCompanyName} onChange={(e) => setSelectedCompanyName(e.target.value)} style={styles.input}>
              <option value="">-- Select Company --</option>
              {COMPANY_DATA.map((comp) => <option key={comp.code} value={comp.name}>{comp.name}</option>)}
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

      {/* ===== LAB ===== */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🔬 2. Laboratory Information</h2>
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label>Lab Name *</label>
            <select value={selectedLabName} onChange={(e) => setSelectedLabName(e.target.value)} style={styles.input}>
              <option value="">-- Select Lab --</option>
              {LAB_DATA.map((lab) => <option key={lab.code} value={lab.name}>{lab.name}</option>)}
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

      {/* ===== PRODUCT ===== */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📦 3. Product Details</h2>
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label>Product Name *</label>
            <select value={productName} onChange={(e) => setProductName(e.target.value)} style={styles.input}>
              <option value="">-- Select Product --</option>
              {PRODUCT_DATA.map((prod) => <option key={prod.sampleCode} value={prod.name}>{prod.name}</option>)}
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

      {/* ===== TESTS ===== */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🧪 4. Define Test Proform (Structure only)</h2>
        <div style={styles.testCheckboxGroup}>
          {Object.keys(TESTING_FIELDS).map((testKey) => (
            <label key={testKey} style={styles.checkboxLabel}>
              <input type="checkbox" checked={selectedTests.includes(testKey)} onChange={() => toggleTest(testKey)} />
              {testKey}
            </label>
          ))}
        </div>

        {selectedTests.map((testKey) => (
          <div key={testKey} style={styles.testSection}>
            <div style={styles.testHeader}>
              <h3>🔬 {testKey} Analysis (Fields)</h3>
              <button onClick={() => addCustomField(testKey)} style={styles.addCustomBtn}>+ Add Custom Field</button>
            </div>
            <div style={styles.grid2Col}>
              {testData[testKey]?.fields?.map((field) => (
                <div key={field.id} style={styles.fieldGroup}>
                  {field.isPredefined ? (
                    <label style={styles.label}>{field.fieldName}</label>
                  ) : (
                    <input
                      type="text"
                      placeholder="Parameter name (e.g., Viscosity Index)"
                      value={field.fieldName}
                      onChange={(e) => updateCustomFieldName(testKey, field.id, e.target.value)}
                      style={{ ...styles.input, marginBottom: "6px", fontWeight: 500 }}
                    />
                  )}
                  <div style={{ ...styles.input, backgroundColor: "#f9f9f9", color: "#888", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.8rem", fontStyle: "italic" }}>{field.placeholder || "(Value will be filled later)"}</span>
                    {!field.isPredefined && (
                      <button onClick={() => removeCustomField(testKey, field.id)} style={styles.removeIconBtn} title="Remove field">🗑️</button>
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

      {/* ===== REMARK ===== */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📝 5. Remark / Purpose</h2>
        <textarea rows="3" value={remark} onChange={(e) => setRemark(e.target.value)} style={{ ...styles.input, width: "100%" }} />
      </div>

      {/* ===== ACTION BAR ===== */}
      <div style={styles.actionBar}>
        <button
          onClick={handleSaveRequest}
          disabled={savingLoader}
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

      {/* ===== TABLE SECTION ===== */}
      <div style={styles.tableWrapper}>
        <div style={styles.tableHeader}>
          <h2 style={{ ...styles.cardTitle, marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}>
            📋 Submitted Requests
          </h2>
          <span style={styles.requestCount}>
            {requests.length} request{requests.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* TABLE LOADER — center spinner */}
        {tableLoader ? (
          <TableLoader text={editingId ? "Updating request..." : "Saving request..."} />
        ) : requests.length === 0 ? (
          <div style={styles.emptyTable}>
            <div style={{ fontSize: "2.2rem", marginBottom: "10px" }}>📭</div>
            No requests created yet.
          </div>
        ) : (
          <div style={{ overflowX: "auto", borderRadius: "20px", border: "1px solid #eaeaea" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Company</th>
                  <th style={styles.th}>Request Name</th>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Tests</th>
                  <th style={styles.th}>Date</th>
                  <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, index) => (
                  <tr
                    key={req.id}
                    style={styles.tr}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#fafafa"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <td style={{ ...styles.td, color: "#bbb", fontSize: "0.78rem", width: "36px", textAlign: "center" }}>
                      {index + 1}
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: "600", fontSize: "0.85rem" }}>{req.companyName}</div>
                      <div style={{ fontSize: "0.72rem", color: "#aaa", marginTop: "1px" }}>{req.companyCode}</div>
                    </td>
                    <td style={styles.td}>
                      <span style={{ fontWeight: "500", fontSize: "0.85rem" }}>{req.requestName}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontSize: "0.85rem", fontWeight: "500" }}>{req.productName}</div>
                      <div style={{ fontSize: "0.72rem", color: "#aaa", marginTop: "1px" }}>{req.sampleCode}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {req.selectedTests.map((t) => (
                          <span key={t} style={styles.testBadge}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ ...styles.td, fontSize: "0.78rem", color: "#999", whiteSpace: "nowrap" }}>
                      {new Date(req.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td style={{ ...styles.td, textAlign: "center" }}>
                      <div style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
                        <button
                          onClick={() => loadRequestForEdit(req)}
                          style={styles.editBtn}
                          title="Edit"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteRequest(req.id)}
                          disabled={deletingId === req.id}
                          style={{
                            ...styles.delBtn,
                            opacity: deletingId === req.id ? 0.65 : 1,
                            cursor: deletingId === req.id ? "not-allowed" : "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "32px",
                            height: "32px",
                            padding: 0,
                          }}
                          title="Delete"
                        >
                          {deletingId === req.id ? (
                            <Spinner color="#cc0000" size={11} />
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// ===================== STYLES =====================
const styles = {
  container: {
    maxWidth: "1300px",
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