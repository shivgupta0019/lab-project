// AllReports.jsx
import React, { useState, useEffect } from "react";

// ------------------- View Modal (read-only, same as original) -------------------
const ViewModal = ({ request, onClose, formatDate }) => {
  if (!request) return null;

  const {
    companyName,
    companyCode,
    requestName,
    labName,
    labCode,
    labType,
    productName,
    lotNo,
    sampleCode,
    selectedTests = [],
    testData = {},
    remark,
    createdAt,
    id,
  } = request;

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
            <h3 style={styles.modalSectionTitle}>🏢 Company & Request</h3>
            <div style={styles.infoGrid}>
              <div>
                <strong>Company:</strong> {companyName} ({companyCode})
              </div>
              <div>
                <strong>Request Name:</strong> {requestName}
              </div>
              <div>
                <strong>Lab:</strong> {labName} ({labCode}) – {labType}
              </div>
              <div>
                <strong>Product:</strong> {productName}
              </div>
              <div>
                <strong>Lot No.:</strong> {lotNo || "—"}
              </div>
              <div>
                <strong>Sample Code:</strong> {sampleCode || "—"}
              </div>
              <div>
                <strong>Created:</strong> {formatDate(createdAt)}
              </div>
              <div>
                <strong>ID:</strong> <code>{id}</code>
              </div>
            </div>
          </div>

          {selectedTests.length > 0 ? (
            <div style={styles.modalSection}>
              <h3 style={styles.modalSectionTitle}>🧪 Test Results</h3>
              {selectedTests.map((testKey) => {
                const test = testData?.[testKey];
                if (!test?.fields) {
                  return (
                    <div key={testKey} style={styles.testResultBlock}>
                      <h4 style={styles.testResultTitle}>
                        🔬 {testKey} Analysis
                      </h4>
                      <div style={{ color: "#999", padding: "10px" }}>
                        No data available
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={testKey} style={styles.testResultBlock}>
                    <h4 style={styles.testResultTitle}>
                      🔬 {testKey} Analysis
                    </h4>
                    <div style={styles.predefinedGrid}>
                      {test.fields.map((field) => (
                        <div key={field.id} style={styles.predefinedItem}>
                          <span style={{ color: "#555", fontSize: "0.85rem" }}>
                            {field.fieldName}
                            {!field.isPredefined && (
                              <span style={styles.customBadge}>custom</span>
                            )}
                          </span>
                          <span style={{ fontWeight: 500 }}>
                            {field.fieldValue?.toString().trim() || (
                              <span style={{ color: "#bbb" }}>—</span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={styles.modalSection}>
              <p>No tests selected.</p>
            </div>
          )}
          {remark && (
            <div style={styles.modalSection}>
              <h3>📝 Remark</h3>
              <div style={styles.remarkBox}>{remark}</div>
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

// ------------------- Edit Modal with ADD CUSTOM FIELD feature -------------------
const EditModal = ({
  request,
  testData,
  onUpdateField,
  onAddCustomField,
  onSave,
  onCancel,
}) => {
  if (!request) return null;
  const { selectedTests = [] } = request;
  const [newFieldName, setNewFieldName] = useState({}); // { testKey: "" }
  const [newFieldValue, setNewFieldValue] = useState({}); // { testKey: "" }

  const handleAddClick = (testKey) => {
    const name = newFieldName[testKey]?.trim();
    if (!name) {
      alert("Please enter a field name");
      return;
    }
    onAddCustomField(testKey, name, newFieldValue[testKey] || "");
    // clear inputs for that test
    setNewFieldName((prev) => ({ ...prev, [testKey]: "" }));
    setNewFieldValue((prev) => ({ ...prev, [testKey]: "" }));
  };

  return (
    <div style={styles.modalOverlay} onClick={onCancel}>
      <div
        style={{ ...styles.modalContent, maxWidth: "1000px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>
            ✏️ Edit & Add Fields
            {/* – {request.requestName} */}
          </h2>
          <button style={styles.modalCloseBtn} onClick={onCancel}>
            ×
          </button>
        </div>
        <div style={styles.modalBody}>
          {selectedTests.map((testKey) => {
            const fields = testData[testKey]?.fields || [];
            return (
              <div key={testKey} style={styles.editTestSection}>
                <h3 style={styles.editTestTitle}>🔬 {testKey} Analysis</h3>
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
                          onUpdateField(testKey, field.id, e.target.value)
                        }
                        placeholder={field.placeholder || "Enter value..."}
                        style={styles.input}
                      />
                    </div>
                  ))}
                </div>

                {/* --- Add Custom Field section --- */}
                <div style={styles.addCustomSection}>
                  <div style={styles.addCustomRow}>
                    <input
                      type="text"
                      placeholder="New field name (e.g. 'pH Level')"
                      value={newFieldName[testKey] || ""}
                      onChange={(e) =>
                        setNewFieldName((prev) => ({
                          ...prev,
                          [testKey]: e.target.value,
                        }))
                      }
                      style={styles.addFieldInput}
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={newFieldValue[testKey] || ""}
                      onChange={(e) =>
                        setNewFieldValue((prev) => ({
                          ...prev,
                          [testKey]: e.target.value,
                        }))
                      }
                      style={styles.addFieldInput}
                    />
                    <button
                      onClick={() => handleAddClick(testKey)}
                      style={styles.addFieldBtn}
                    >
                      + Add Custom Field
                    </button>
                  </div>
                  <small style={styles.addHint}>
                    Custom fields are saved and can be edited later.
                  </small>
                </div>
              </div>
            );
          })}
          {selectedTests.length === 0 && (
            <p style={styles.noData}>No tests selected for this request.</p>
          )}
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

// ------------------- MAIN AllReports Component -------------------
const AllReports = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [filledRequests, setFilledRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null); // for view modal
  const [editingRequest, setEditingRequest] = useState(null);
  const [editTestData, setEditTestData] = useState({});

  // Helper: check if a request has any filled test field (same logic as original)
  const isRequestFilled = (request) => {
    const { testData = {}, selectedTests = [] } = request;
    for (const testKey of selectedTests) {
      const test = testData[testKey];
      if (!test) continue;
      for (const field of test.fields || []) {
        if (field.fieldValue && field.fieldValue.toString().trim() !== "") {
          return true;
        }
      }
    }
    return false;
  };

  const loadRequests = () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem("trf_requests");
      let requests = [];
      if (stored) {
        const parsed = JSON.parse(stored);
        requests = Array.isArray(parsed) ? parsed : [];
      }
      // sort by createdAt desc
      const sorted = [...requests].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setAllRequests(sorted);
      const filledOnly = sorted.filter((req) => isRequestFilled(req));
      setFilledRequests(filledOnly);
    } catch (error) {
      console.error("Failed to load requests:", error);
      setFilledRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
    const handleStorageChange = (e) => {
      if (e.key === "trf_requests") loadRequests();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleString();
  };

  // Start editing a request: clone testData deeply
  const startEdit = (request) => {
    const clonedTestData = JSON.parse(JSON.stringify(request.testData || {}));
    setEditingRequest(request);
    setEditTestData(clonedTestData);
  };

  // Update existing field value
  const updateFieldValue = (testKey, fieldId, value) => {
    setEditTestData((prev) => ({
      ...prev,
      [testKey]: {
        ...prev[testKey],
        fields: prev[testKey].fields.map((f) =>
          f.id === fieldId ? { ...f, fieldValue: value } : f,
        ),
      },
    }));
  };

  // ADD CUSTOM FIELD to a specific test
  const addCustomField = (testKey, fieldName, initialValue = "") => {
    const newFieldId = `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const newField = {
      id: newFieldId,
      fieldName: fieldName.trim(),
      fieldValue: initialValue,
      isPredefined: false,
      placeholder: "Enter custom value",
    };
    setEditTestData((prev) => {
      const existingTest = prev[testKey] || { fields: [] };
      const updatedFields = [...(existingTest.fields || []), newField];
      return {
        ...prev,
        [testKey]: {
          ...existingTest,
          fields: updatedFields,
        },
      };
    });
  };

  // Save edited results back to localStorage
  const saveEditedResults = () => {
    if (!editingRequest) return;
    const updatedRequest = { ...editingRequest, testData: editTestData };
    // update in the full list
    const newAllRequests = allRequests.map((req) =>
      req.id === editingRequest.id ? updatedRequest : req,
    );
    setAllRequests(newAllRequests);
    localStorage.setItem("trf_requests", JSON.stringify(newAllRequests));
    // refresh filled list
    const newFilled = newAllRequests.filter((req) => isRequestFilled(req));
    setFilledRequests(newFilled);
    setEditingRequest(null);
    setEditTestData({});
    alert("✅ Test results & custom fields saved successfully!");
  };

  const cancelEdit = () => {
    setEditingRequest(null);
    setEditTestData({});
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingMsg}>Loading reports...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{`* { box-sizing: border-box; }`}</style>
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>📊 All Test Request Forms Reports</h1>
        <p style={styles.subtitle}>
          Showing only test requests that already have filled results. You can{" "}
          <strong>edit</strong> values or <strong>add new custom fields</strong>{" "}
          to any test.
        </p>
      </div>

      {filledRequests.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <h3>No filled test requests yet</h3>
          <p>
            Once you fill test values from the main “Fill Test Request Forms”
            page, they will appear here.
          </p>
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <div style={styles.statsBar}>
            ✅ Total filled forms: <strong>{filledRequests.length}</strong>
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
                  <th style={styles.th}>Created</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filledRequests.map((req) => (
                  <tr key={req.id} style={styles.tableRow}>
                    <td style={styles.td}>
                      <code style={styles.fullIdCode}>{req.id}</code>
                    </td>
                    <td style={styles.td}>{req.companyName}</td>
                    <td style={styles.td}>{req.requestName}</td>
                    <td style={styles.td}>{req.productName}</td>
                    <td style={styles.td}>
                      {(req.selectedTests || []).join(", ") || "—"}
                    </td>
                    <td style={styles.td}>{formatDate(req.createdAt)}</td>
                    <td style={styles.td}>
                      <span style={styles.filledBadge}>✅ Filled</span>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => setSelectedRequest(req)}
                        style={styles.viewBtn}
                      >
                        👁️ View
                      </button>
                      <button
                        onClick={() => startEdit(req)}
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

      {/* View Modal */}
      {selectedRequest && (
        <ViewModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          formatDate={formatDate}
        />
      )}

      {/* Edit Modal with field addition */}
      {editingRequest && (
        <EditModal
          request={editingRequest}
          testData={editTestData}
          onUpdateField={updateFieldValue}
          onAddCustomField={addCustomField}
          onSave={saveEditedResults}
          onCancel={cancelEdit}
        />
      )}

      <div style={styles.footerNote}>
        <p>
          💡 <strong>Note:</strong> New custom fields are saved with the request
          and will appear in future edits and view modal.
        </p>
        <button onClick={loadRequests} style={styles.refreshBtn}>
          🔄 Refresh List
        </button>
      </div>
    </div>
  );
};

// ------------------- Styles (enhanced, consistent with original) -------------------
const styles = {
  container: {
    maxWidth: "1400px",
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
  fullIdCode: {
    background: "#f0f0f0",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontFamily: "monospace",
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
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  refreshBtn: {
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "40px",
    padding: "8px 20px",
    cursor: "pointer",
  },

  // Modal styles (same as original, extended)
  modalOverlay: {
    position: "fixed",
    top: 100,
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
  modalSectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "16px",
    paddingBottom: "6px",
    borderBottom: "2px solid #f0f0f0",
  },
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
  noData: { color: "#888", fontStyle: "italic", margin: "8px 0" },
};

export default AllReports;
