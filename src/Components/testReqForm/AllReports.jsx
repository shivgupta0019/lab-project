import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// Helper: format date
const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  return new Date(isoString).toLocaleString();
};

// ========== View Modal (read-only) ==========
const ViewModal = ({ trf, onClose }) => {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    axios
      .get(`${API_BASE}/trf/user/${trf.id}`)
      .then((res) => setDetails(res.data))
      .catch(console.error);
  }, [trf.id]);
  if (!details)
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>Loading...</div>
      </div>
    );
  const { trf: trfInfo, fieldsByTest } = details;
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>📄 Test Request Report</h2>
          <button style={styles.modalCloseBtn} onClick={onClose}>
            ×
          </button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.modalSection}>
            <h3>🏢 Company & Request</h3>
            <div style={styles.infoGrid}>
              <div>
                <strong>TRF Code:</strong> {trfInfo.trfCode}
              </div>
              <div>
                <strong>Company:</strong> {trfInfo.companyName}
              </div>
              <div>
                <strong>Request:</strong> {trfInfo.requestName}
              </div>
              <div>
                <strong>Lab:</strong> {trfInfo.labName} ({trfInfo.labType})
              </div>
              <div>
                <strong>Product:</strong> {trfInfo.productName}
              </div>
              <div>
                <strong>Lot No.:</strong> {trfInfo.lotNo || "—"}
              </div>
            </div>
          </div>
          {fieldsByTest &&
            Object.entries(fieldsByTest).map(([testName, fields]) => (
              <div key={testName} style={styles.testResultBlock}>
                <h4>🔬 {testName} Analysis</h4>
                <div style={styles.predefinedGrid}>
                  {fields.map((field) => (
                    <div key={field.fieldRowId} style={styles.predefinedItem}>
                      <span>{field.label}</span>
                      <span>{field.currentValue || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          {trfInfo.remark && (
            <div style={styles.modalSection}>
              <h3>📝 Remark</h3>
              <div style={styles.remarkBox}>{trfInfo.remark}</div>
            </div>
          )}
        </div>
        <div style={styles.modalFooter}>
          <button onClick={onClose} style={styles.closeModalBtn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== Edit Modal with Add Custom Field (includes value input) ==========
const EditModal = ({
  trf,
  testData,
  onUpdateField,
  onAddCustomField,
  onSave,
  onCancel,
}) => {
  const [newFieldName, setNewFieldName] = useState({});
  const [newFieldValue, setNewFieldValue] = useState({});

  const handleAddClick = (testName) => {
    const name = newFieldName[testName]?.trim();
    if (!name) {
      alert("Please enter a field name");
      return;
    }
    const value = newFieldValue[testName] || "";
    onAddCustomField(testName, name, value);
    setNewFieldName((prev) => ({ ...prev, [testName]: "" }));
    setNewFieldValue((prev) => ({ ...prev, [testName]: "" }));
  };

  if (!testData) return null;

  return (
    <div style={styles.modalOverlay} onClick={onCancel}>
      <div
        style={{ ...styles.modalContent, maxWidth: "1000px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>✏️ Edit Results & Add Fields</h2>
          <button style={styles.modalCloseBtn} onClick={onCancel}>
            ×
          </button>
        </div>
        <div style={styles.modalBody}>
          {Object.entries(testData).map(([testName, { fields, testId }]) => (
            <div key={testName} style={styles.editTestSection}>
              <h3 style={styles.editTestTitle}>🔬 {testName} Analysis</h3>
              <div style={styles.grid2Col}>
                {fields.map((field) => (
                  <div key={field.id} style={styles.fieldGroup}>
                    <label style={styles.label}>
                      {field.fieldName}
                      {!field.isPredefined && (
                        <span style={styles.customBadge}>custom</span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={field.fieldValue || ""}
                      onChange={(e) =>
                        onUpdateField(testName, field.id, e.target.value)
                      }
                      placeholder={field.placeholder || "Enter value..."}
                      style={styles.input}
                    />
                  </div>
                ))}
              </div>
              <div style={styles.addCustomSection}>
                <div style={styles.addCustomRow}>
                  <input
                    type="text"
                    placeholder="New field name (e.g. 'pH Level')"
                    value={newFieldName[testName] || ""}
                    onChange={(e) =>
                      setNewFieldName((prev) => ({
                        ...prev,
                        [testName]: e.target.value,
                      }))
                    }
                    style={styles.addFieldInput}
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={newFieldValue[testName] || ""}
                    onChange={(e) =>
                      setNewFieldValue((prev) => ({
                        ...prev,
                        [testName]: e.target.value,
                      }))
                    }
                    style={styles.addFieldInput}
                  />
                  <button
                    onClick={() => handleAddClick(testName)}
                    style={styles.addFieldBtn}
                  >
                    + Add Custom Field
                  </button>
                </div>
                <small style={styles.addHint}>
                  Custom field name + value are saved together.
                </small>
              </div>
            </div>
          ))}
          {Object.keys(testData).length === 0 && <p>No tests found.</p>}
        </div>
        <div style={styles.modalFooter}>
          <button onClick={onSave} style={styles.saveBtn}>
            💾 Save Changes
          </button>
          <button onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== Main AllReports Component ==========
const AllReports = () => {
  const [trfList, setTrfList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrf, setSelectedTrf] = useState(null);
  const [editingTrf, setEditingTrf] = useState(null);
  const [editTestData, setEditTestData] = useState(null);
  const [testNameToIdMap, setTestNameToIdMap] = useState({});

  // Fetch test name → testId mapping
  useEffect(() => {
    axios
      .get(`${API_BASE}/tests`)
      .then((res) => {
        const mapping = {};
        Object.entries(res.data.TESTING_FIELDS).forEach(([name, fields]) => {
          if (fields && fields.length > 0) mapping[name] = fields[0]?.id;
        });
        setTestNameToIdMap(mapping);
      })
      .catch(console.error);
  }, []);

  const loadTrfs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/trf/filled`);
      setTrfList(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrfs();
  }, []);

  const startEdit = async (trf) => {
    try {
      const res = await axios.get(`${API_BASE}/trf/user/${trf.id}`);
      const { trf: trfInfo, fieldsByTest } = res.data;
      const testDataObj = {};
      for (const [testName, fields] of Object.entries(fieldsByTest)) {
        const testId = testNameToIdMap[testName];
        if (!testId) {
          console.warn(`No testId found for testName: ${testName}`);
          continue;
        }
        testDataObj[testName] = {
          testId,
          fields: fields.map((f) => ({
            id: f.fieldRowId,
            fieldName: f.label,
            fieldValue: f.currentValue || "",
            placeholder: f.placeholder,
            isPredefined: f.isPredefined,
            dbFieldId: f.isPredefined ? f.fieldId : null,
          })),
        };
      }
      setEditingTrf(trf);
      setEditTestData(testDataObj);
    } catch (err) {
      console.error(err);
      alert("Could not load test data for editing");
    }
  };

  const updateFieldValue = (testName, fieldId, value) => {
    setEditTestData((prev) => ({
      ...prev,
      [testName]: {
        ...prev[testName],
        fields: prev[testName].fields.map((f) =>
          f.id === fieldId ? { ...f, fieldValue: value } : f,
        ),
      },
    }));
  };

  const addCustomField = (testName, fieldName, initialValue = "") => {
    const newFieldId = `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const newField = {
      id: newFieldId,
      fieldName: fieldName.trim(),
      fieldValue: initialValue,
      placeholder: "Enter custom value",
      isPredefined: false,
      dbFieldId: null,
    };
    setEditTestData((prev) => ({
      ...prev,
      [testName]: {
        ...prev[testName],
        fields: [...(prev[testName]?.fields || []), newField],
      },
    }));
  };

  const saveEdit = async () => {
    if (!editingTrf || !editTestData) return;
    const selectedTests = [];
    for (const [testName, { testId, fields }] of Object.entries(editTestData)) {
      if (!testId) {
        alert(`Test ID missing for ${testName}. Cannot save.`);
        return;
      }
      selectedTests.push({
        testId,
        fields: fields.map((f) => {
          return {
            fieldId: f.isPredefined ? f.dbFieldId : null,
            customLabel: f.isPredefined ? f.fieldName : f.fieldName,
            placeholder: f.placeholder,
            label: f.fieldName,
            isPredefined: f.isPredefined,
            fieldValue: f.fieldValue || "",
          };
        }),
      });
    }

    const payload = {
      requestName: editingTrf.requestName,
      lotNo: editingTrf.lotNo,
      remark: editingTrf.remark,
      createdBy: editingTrf.createdBy || "admin@example.com",
      selectedTests,
    };
    try {
      await axios.put(`${API_BASE}/trf/${editingTrf.id}`, payload);
      alert("Updated successfully!");
      setEditingTrf(null);
      setEditTestData(null);
      loadTrfs();
    } catch (err) {
      console.error(err);
      alert("Save failed: " + (err.response?.data?.error || err.message));
    }
  };

  if (loading)
    return (
      <div style={styles.container}>
        <div style={styles.loadingMsg}>Loading...</div>
      </div>
    );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>📊 Filled Test Requests Reports</h1>
        <p style={styles.subtitle}>
          You can edit values, add custom fields with values, and save.
        </p>
      </div>
      {trfList.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <h3>No filled test requests yet</h3>
          <p>Once users fill test values, they will appear here.</p>
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <div style={styles.statsBar}>
            ✅ Total filled forms: <strong>{trfList.length}</strong>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.th}>TRF Code</th>
                  <th style={styles.th}>Company</th>
                  <th style={styles.th}>Request Name</th>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Tests</th>
                  <th style={styles.th}>Created / Updated</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trfList.map((trf) => (
                  <tr key={trf.id} style={styles.tableRow}>
                    <td style={styles.td}>
                      <code>{trf.trfCode}</code>
                    </td>
                    <td style={styles.td}>{trf.companyName}</td>
                    <td style={styles.td}>{trf.requestName}</td>
                    <td style={styles.td}>{trf.productName}</td>
                    <td style={styles.td}>
                      {(trf.testNames || []).join(", ")}
                    </td>
                    <td style={styles.td}>
                      <div>Created: {formatDate(trf.createdAt)}</div>
                      <div style={{ fontSize: "0.7rem", color: "#666" }}>
                        Updated: {formatDate(trf.updatedAt)}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.filledBadge}>✅ Filled</span>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => setSelectedTrf(trf)}
                        style={styles.viewBtn}
                      >
                        👁️ View
                      </button>
                      <button
                        onClick={() => startEdit(trf)}
                        style={styles.editBtn}
                      >
                        ✏️ Edit / Add Fields
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {selectedTrf && (
        <ViewModal trf={selectedTrf} onClose={() => setSelectedTrf(null)} />
      )}
      {editingTrf && editTestData && (
        <EditModal
          trf={editingTrf}
          testData={editTestData}
          onUpdateField={updateFieldValue}
          onAddCustomField={addCustomField}
          onSave={saveEdit}
          onCancel={() => {
            setEditingTrf(null);
            setEditTestData(null);
          }}
        />
      )}
      <div style={styles.footerNote}>
        <button onClick={loadTrfs} style={styles.refreshBtn}>
          🔄 Refresh List
        </button>
      </div>
    </div>
  );
};

// ========== Styles (same as original, omitted for brevity) ==========
// ... (copy styles from your existing AllReports component)

// // Styles (same as original, included for completeness)
const styles = {
  container: {
    maxWidth: "98vw",
    margin: "0 auto",
    padding: "40px 24px",
    background: "#fff",
    color: "#000",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  },
  header: { marginBottom: "32px" },
  mainTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "8px",
    paddingLeft: "20px",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#4a4a4a",
    marginTop: "8px",
    paddingLeft: "24px",
  },
  statsBar: {
    marginBottom: "16px",
    fontSize: "0.9rem",
    background: "#f7f7f7",
    padding: "10px 16px",
    borderRadius: "40px",
    display: "inline-block",
  },
  tableWrapper: {
    marginTop: "20px",
    border: "1px solid #ececec",
    borderRadius: "24px",
    overflow: "hidden",
    padding: "16px",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" },
  tableHeaderRow: { background: "#f8f8f8", borderBottom: "2px solid #e2e2e2" },
  th: { textAlign: "left", padding: "16px 12px", fontWeight: "600" },
  td: {
    padding: "14px 12px",
    borderBottom: "1px solid #f0f0f0",
    verticalAlign: "middle",
  },
  filledBadge: {
    background: "#e6f7e6",
    color: "#2e7d32",
    padding: "4px 10px",
    borderRadius: "30px",
    fontSize: "0.75rem",
    fontWeight: "600",
  },
  viewBtn: {
    background: "none",
    border: "1px solid #000",
    borderRadius: "30px",
    padding: "5px 12px",
    marginRight: "8px",
    cursor: "pointer",
    fontSize: "0.7rem",
  },
  editBtn: {
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    padding: "5px 12px",
    cursor: "pointer",
    fontSize: "0.7rem",
  },
  emptyState: {
    textAlign: "center",
    padding: "64px 24px",
    background: "#fafafa",
    borderRadius: "32px",
  },
  emptyIcon: { fontSize: "4rem", marginBottom: "16px" },
  loadingMsg: {
    textAlign: "center",
    padding: "60px",
    fontSize: "1.2rem",
    color: "#666",
  },
  footerNote: {
    marginTop: "32px",
    padding: "16px 20px",
    background: "#f9f9f9",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "flex-end",
  },
  refreshBtn: {
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "40px",
    padding: "8px 20px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modalContent: {
    background: "#fff",
    borderRadius: "10px",
    maxWidth: "900px",
    width: "100%",
    maxHeight: "80vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 28px",
    borderBottom: "1px solid #eaeaea",
  },
  modalTitle: { fontSize: "1.6rem", fontWeight: "600", margin: 0 },
  modalCloseBtn: {
    background: "none",
    border: "none",
    fontSize: "2rem",
    cursor: "pointer",
  },
  modalBody: { padding: "24px 28px", flex: 1 },
  modalSection: { marginBottom: "28px" },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "12px",
    background: "#fbfbfb",
    padding: "16px",
    borderRadius: "20px",
  },
  testResultBlock: {
    background: "#fefefe",
    border: "1px solid #ececec",
    borderRadius: "20px",
    padding: "16px 20px",
    marginBottom: "20px",
  },
  predefinedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "8px 16px",
    marginTop: "8px",
  },
  predefinedItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px dashed #eaeaea",
    padding: "6px 0",
    gap: "8px",
  },
  customBadge: {
    marginLeft: "6px",
    background: "#e8f4fd",
    color: "#1565c0",
    fontSize: "0.7rem",
    padding: "1px 7px",
    borderRadius: "20px",
    fontWeight: 500,
  },
  remarkBox: {
    background: "#faf6e7",
    padding: "16px",
    borderRadius: "16px",
    borderLeft: "4px solid #d4a373",
    whiteSpace: "pre-wrap",
  },
  modalFooter: {
    padding: "16px 28px",
    borderTop: "1px solid #eaeaea",
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  closeModalBtn: {
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "40px",
    cursor: "pointer",
  },
  saveBtn: {
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "40px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#9e9e9e",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "40px",
    cursor: "pointer",
  },
  editTestSection: {
    marginBottom: "32px",
    borderBottom: "1px solid #eaeaea",
    paddingBottom: "24px",
  },
  editTestTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "16px",
  },
  grid2Col: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px",
  },
  fieldGroup: { display: "flex", flexDirection: "column" },
  label: {
    marginBottom: "6px",
    fontWeight: "500",
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  input: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    fontSize: "0.9rem",
    outline: "none",
  },
  addCustomSection: {
    marginTop: "20px",
    paddingTop: "12px",
    borderTop: "1px dashed #ccc",
  },
  addCustomRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  addFieldInput: {
    flex: 1,
    minWidth: "150px",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    fontSize: "0.85rem",
  },
  addFieldBtn: {
    background: "#f0f0f0",
    border: "1px solid #aaa",
    borderRadius: "30px",
    padding: "6px 16px",
    cursor: "pointer",
    fontWeight: 500,
  },
  addHint: {
    display: "block",
    marginTop: "8px",
    fontSize: "0.7rem",
    color: "#666",
  },
};

export default AllReports;
