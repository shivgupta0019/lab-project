import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// Helper: format date
const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  return new Date(isoString).toLocaleString();
};

// ========== View Modal (Read-only) ==========
const ViewModal = ({ trf, fieldsByTest, onClose }) => {
  if (!trf) return null;
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>📄 Test Request Form</h2>
          <button style={styles.modalCloseBtn} onClick={onClose}>
            ×
          </button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.modalSection}>
            <h3>🏢 Company & Request</h3>
            <div style={styles.infoGrid}>
              <div>
                <strong>TRF Code:</strong> {trf.trfCode}
              </div>
              <div>
                <strong>Company:</strong> {trf.companyName} ({trf.companyCode})
              </div>
              <div>
                <strong>Request Name:</strong> {trf.requestName}
              </div>
              <div>
                <strong>Lab:</strong> {trf.labName} ({trf.labCode}) –{" "}
                {trf.labType}
              </div>
              <div>
                <strong>Product:</strong> {trf.productName}
              </div>
              <div>
                <strong>Lot No.:</strong> {trf.lotNo || "—"}
              </div>
              <div>
                <strong>Sample Code:</strong> {trf.sampleCode || "—"}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                {trf.status === "filled" ? "✅ Filled" : "❌ Not Filled"}
              </div>
              <div>
                <strong>Created:</strong> {formatDate(trf.createdAt)}
              </div>
              <div>
                <strong>Last Updated:</strong> {formatDate(trf.updatedAt)}
              </div>
            </div>
          </div>
          {fieldsByTest && Object.keys(fieldsByTest).length > 0 && (
            <div style={styles.modalSection}>
              <h3>🧪 Test Results</h3>
              {Object.entries(fieldsByTest).map(([testName, fields]) => (
                <div key={testName} style={styles.testResultBlock}>
                  <h4 style={styles.testResultTitle}>🔬 {testName} Analysis</h4>
                  <div style={styles.predefinedGrid}>
                    {fields.map((field) => (
                      <div key={field.fieldRowId} style={styles.predefinedItem}>
                        <span>{field.label}</span>
                        <span style={{ fontWeight: 500 }}>
                          {field.currentValue || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {trf.remark && (
            <div style={styles.modalSection}>
              <h3>📝 Remark</h3>
              <div style={styles.remarkBox}>{trf.remark}</div>
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

// ========== Edit/Fill Modal ==========
const EditModal = ({ trf, fieldsByTest, onSave, onCancel, onFieldChange }) => {
  if (!trf) return null;

  return (
    <div style={styles.modalOverlay} onClick={onCancel}>
      <div
        style={{ ...styles.modalContent, maxWidth: "1000px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>
            {trf.status === "filled"
              ? "✏️ Edit Results"
              : "📝 Fill Test Values"}
          </h2>
          <button style={styles.modalCloseBtn} onClick={onCancel}>
            ×
          </button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.infoGrid} className="compact">
            <div>
              <strong>Request:</strong> {trf.requestName}
            </div>
            <div>
              <strong>Product:</strong> {trf.productName}
            </div>
            <div>
              <strong>Lot No:</strong> {trf.lotNo || "—"}
            </div>
          </div>
          {Object.entries(fieldsByTest).map(([testName, fields]) => (
            <div key={testName} style={styles.editTestSection}>
              <h3 style={styles.editTestTitle}>🔬 {testName} Analysis</h3>
              <div style={styles.grid2Col}>
                {fields.map((field) => (
                  <div key={field.fieldRowId} style={styles.fieldGroup}>
                    <label style={styles.label}>{field.label}</label>
                    <input
                      type="text"
                      value={field.currentValue || ""}
                      onChange={(e) =>
                        onFieldChange(
                          testName,
                          field.fieldRowId,
                          e.target.value,
                        )
                      }
                      placeholder={field.placeholder}
                      style={styles.input}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(fieldsByTest).length === 0 && <p>No fields to fill.</p>}
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

// ========== Main Component ==========
const AllTestRequests = () => {
  const [trfList, setTrfList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrf, setSelectedTrf] = useState(null); // for view modal
  const [selectedFieldsByTest, setSelectedFieldsByTest] = useState(null);
  const [editingTrf, setEditingTrf] = useState(null);
  const [editFieldsByTest, setEditFieldsByTest] = useState({});

  // Load all TRFs from backend
  const loadTrfList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/trf`);
      setTrfList(response.data);
    } catch (error) {
      console.error("Failed to load TRFs", error);
      alert("Could not load test requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrfList();
  }, []);

  // Open view modal
  const handleView = async (trf) => {
    try {
      const response = await axios.get(`${API_BASE}/trf/user/${trf.id}`);
      setSelectedTrf(response.data.trf);
      setSelectedFieldsByTest(response.data.fieldsByTest);
    } catch (error) {
      alert("Failed to load details");
    }
  };

  // Open edit/fill modal
  const handleEdit = async (trf) => {
    try {
      const response = await axios.get(`${API_BASE}/trf/user/${trf.id}`);
      setEditingTrf(response.data.trf);
      setEditFieldsByTest(response.data.fieldsByTest);
    } catch (error) {
      alert("Failed to load fields for editing");
    }
  };

  // Update a single field value in edit modal
  const handleFieldChange = (testName, fieldRowId, value) => {
    setEditFieldsByTest((prev) => ({
      ...prev,
      [testName]: prev[testName].map((f) =>
        f.fieldRowId === fieldRowId ? { ...f, currentValue: value } : f,
      ),
    }));
  };

  // Save all edited values
  const handleSaveEdit = async () => {
    if (!editingTrf) return;
    // Flatten all fields into array of { fieldRowId, value }
    const fields = [];
    Object.values(editFieldsByTest).forEach((testFields) => {
      testFields.forEach((f) => {
        fields.push({ fieldRowId: f.fieldRowId, value: f.currentValue });
      });
    });
    const payload = { fields };
    try {
      await axios.patch(`${API_BASE}/trf/${editingTrf.id}/fill`, payload);
      alert("Test results saved successfully!");
      setEditingTrf(null);
      setEditFieldsByTest({});
      loadTrfList(); // refresh list to update status
    } catch (error) {
      console.error(error);
      alert("Failed to save results");
    }
  };

  const cancelEdit = () => {
    setEditingTrf(null);
    setEditFieldsByTest({});
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
        <h1 style={styles.mainTitle}>📋 Fill Test Request Forms</h1>
        <p style={styles.subtitle}>
          Click <strong>Fill the Form</strong> to enter test values. Once saved,
          status changes to <strong>Filled</strong>.
        </p>
      </div>

      {trfList.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <h3>No test request forms found</h3>
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <div style={styles.statsBar}>
            Total forms: <strong>{trfList.length}</strong>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.th}>Full ID</th>
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
                {trfList.map((trf) => {
                  // Extract test names from selectedTests (array of { testId, fields })
                  const testNames = trf.selectedTests
                    ? trf.selectedTests.map((t) => {
                        // Find test name from allTestingFilds? We don't have it here.
                        // But the list API should include test names. I'll assume trf.selectedTests contains test names.
                        // Actually allTrf returns selectedTests as array of { testId, fields }. To get test names we need separate mapping.
                        // For simplicity, let's modify allTrf to include test_names array.
                        // However, in our earlier allTrf we didn't include test names. We'll update allTrf to return testNames.
                        // But to avoid changing backend again, I'll compute using a map fetched from tests API.
                        // For now, I'll assume backend returns testNames directly. I'll adjust the frontend to use a separate fetch of test definitions.
                        return t.testId; // placeholder – you should actually store test names.
                      })
                    : [];
                  // Better: let's use a separate useEffect to fetch test definitions and map testId to name.
                  // I'll show a simple version: assume trf.testNames is provided by backend (recommended).
                  // Since you already have allTestingFilds in the admin component, you can reuse it, but this is a separate component.
                  // I'll modify allTrf to include testNames array. See backend note below.
                  return (
                    <tr key={trf.id} style={styles.tableRow}>
                      <td style={styles.td}>
                        <code>{trf.trfCode}</code>
                      </td>
                      <td style={styles.td}>{trf.companyName}</td>
                      <td style={styles.td}>{trf.requestName}</td>
                      <td style={styles.td}>{trf.productName}</td>
                      <td style={styles.td}>
                        {trf.testNames ? trf.testNames.join(", ") : "—"}
                      </td>
                      <td style={styles.td}>
                        <div>Created: {formatDate(trf.createdAt)}</div>
                        {trf.updatedAt && (
                          <div style={{ fontSize: "0.7rem", color: "#666" }}>
                            Updated: {formatDate(trf.updatedAt)}
                          </div>
                        )}
                      </td>
                      <td style={styles.td}>
                        {trf.status === "filled" ? (
                          <span style={styles.filledBadge}>✅ Filled</span>
                        ) : (
                          <span style={styles.notFilledBadge}>
                            ❌ Not Filled
                          </span>
                        )}
                      </td>
                      <td style={styles.td}>
                        <button
                          onClick={() => handleView(trf)}
                          style={styles.viewBtn}
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => handleEdit(trf)}
                          style={
                            trf.status === "filled"
                              ? styles.editBtn
                              : styles.fillBtn
                          }
                        >
                          {trf.status === "filled"
                            ? "✏️ Edit Results"
                            : "✏️ Fill the Form"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTrf && (
        <ViewModal
          trf={selectedTrf}
          fieldsByTest={selectedFieldsByTest}
          onClose={() => {
            setSelectedTrf(null);
            setSelectedFieldsByTest(null);
          }}
        />
      )}
      {editingTrf && (
        <EditModal
          trf={editingTrf}
          fieldsByTest={editFieldsByTest}
          onFieldChange={handleFieldChange}
          onSave={handleSaveEdit}
          onCancel={cancelEdit}
        />
      )}

      <div style={styles.footerNote}>
        <button onClick={loadTrfList} style={styles.refreshBtn}>
          🔄 Refresh List
        </button>
      </div>
    </div>
  );
};

// ========== Styles (same as before, keep as is) ==========
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
  notFilledBadge: {
    background: "#ffe6e6",
    color: "#b71c1c",
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
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    padding: "5px 12px",
    cursor: "pointer",
    fontSize: "0.7rem",
  },
  fillBtn: {
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
  testResultTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "14px",
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
};

export default AllTestRequests;
