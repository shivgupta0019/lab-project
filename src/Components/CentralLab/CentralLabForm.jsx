import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
// ─── Theme ────────────────────────────────────────────────────────────────────
const C = {
  primary: "#2563eb",
  primaryDark: "#1d4ed8",
  primaryLight: "#eff6ff",
  border: "#e2e8f0",
  text: "#1e293b",
  muted: "#64748b",
  bg: "#f8fafc",
  white: "#ffffff",
  success: "#16a34a",
  danger: "#dc2626",
  warn: "#d97706",
};

// ─── Testing Type Fields ──────────────────────────────────────────────────────
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

const ROLES = [
  "Lab Technician",
  "Senior Scientist",
  "QA Analyst",
  "Lab Manager",
];
const CATEGORIES = [
  "Chemical",
  "Biological",
  "Physical Sample",
  "Reference Standard",
];
const STORAGE = ["Room Temperature", "Refrigerated", "Frozen", "Dark & Dry"];

const LAB_NAMES = [
  "Central Lab Mumbai",
  "Clinical Lab Delhi",
  "Forensic Lab Bangalore",
  "Environmental Lab Pune",
  "Pharmaceutical Lab Hyderabad",
  "Microbiology Lab Chennai",
];

const LOCATIONS = [
  {
    id: 11,
    name: "Delhi",
    labs_id: [1, 2, 3],
    labtest_code: "LT-0001",
  },
  {
    id: 12,
    name: "Noida",
    labs_id: [2, 4],
    labtest_code: "LT-0002",
  },
  {
    id: 13,
    name: "Gurgaon",
    labs_id: [3, 5, 6],
    labtest_code: "LT-0003",
  },
  {
    id: 14,
    name: "Mumbai",
    labs_id: [4, 6, 7],
    labtest_code: "LT-0004",
  },
  {
    id: 15,
    name: "Chennai",
    labs_id: [5, 8],
    labtest_code: "LT-0005",
  },
  {
    id: 16,
    name: "Pune",
    labs_id: [6, 7, 9],
    labtest_code: "LT-0006",
  },
  {
    id: 17,
    name: "Bangalore",
    labs_id: [7, 8],
    labtest_code: "LT-0007",
  },
  {
    id: 18,
    name: "Hyderabad",
    labs_id: [8, 9, 10],
    labtest_code: "LT-0008",
  },
  {
    id: 19,
    name: "Faridabad",
    labs_id: [9],
    labtest_code: "LT-0009",
  },
  {
    id: 20,
    name: "Kolkata",
    labs_id: [10],
    labtest_code: "LT-0010",
  },
];

function genId(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

function getCalibStatus(nextDate) {
  if (!nextDate) return null;
  const diff = Math.ceil((new Date(nextDate) - new Date()) / 86400000);
  if (diff < 0) return "Expired";
  if (diff <= 30) return "Due Soon";
  return "Valid";
}

// ─── Atoms ────────────────────────────────────────────────────────────────────
function FInput({ label, error, style: xStyle, ...props }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 15,
            fontWeight: 800,
            color: C.muted,
            marginBottom: 7,
            textTransform: "uppercase",
            letterSpacing: "0.6px",
          }}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        onFocus={(e) => {
          setF(true);
          props.onFocus && props.onFocus(e);
        }}
        onBlur={(e) => {
          setF(false);
          props.onBlur && props.onBlur(e);
        }}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "13px 15px",
          borderRadius: 8,
          border: `2px solid ${error ? C.danger : f ? C.primary : C.border}`,
          background: C.white,
          color: C.text,
          fontSize: 16,
          fontWeight: 500,
          outline: "none",
          transition: "border 0.15s, box-shadow 0.15s",
          boxShadow: f ? `0 0 0 3px ${C.primary}20` : "none",
          ...xStyle,
        }}
      />
      {error && (
        <p
          style={{
            color: C.danger,
            fontSize: 12,
            margin: "5px 0 0",
            fontWeight: 700,
          }}
        >
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

function FSelect({ label, error, children, ...props }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 15,
            fontWeight: 800,
            color: C.muted,
            marginBottom: 7,
            textTransform: "uppercase",
            letterSpacing: "0.6px",
          }}
        >
          {label}
        </label>
      )}
      <select
        {...props}
        onFocus={() => setF(true)}
        onBlur={() => setF(false)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "13px 15px",
          borderRadius: 8,
          border: `2px solid ${error ? C.danger : f ? C.primary : C.border}`,
          background: C.white,
          color: props.value ? C.text : C.muted,
          fontSize: 16,
          fontWeight: 500,
          outline: "none",
          cursor: "pointer",
          boxShadow: f ? `0 0 0 3px ${C.primary}20` : "none",
          transition: "border 0.15s",
        }}
      >
        {children}
      </select>
      {error && (
        <p
          style={{
            color: C.danger,
            fontSize: 12,
            margin: "5px 0 0",
            fontWeight: 700,
          }}
        >
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

function Btn({
  children,
  variant = "primary",
  size = "md",
  full,
  style: xs,
  ...props
}) {
  const [hov, setHov] = useState(false);
  const v = {
    primary: {
      bg: C.primary,
      hbg: C.primaryDark,
      color: C.white,
      border: "none",
    },
    success: { bg: C.success, hbg: "#15803d", color: C.white, border: "none" },
    danger: { bg: "#fee2e2", hbg: "#fecaca", color: C.danger, border: "none" },
    ghost: {
      bg: "transparent",
      hbg: C.primaryLight,
      color: C.primary,
      border: "none",
    },
    outline: {
      bg: C.white,
      hbg: C.primaryLight,
      color: C.primary,
      border: `1.5px solid ${C.primary}`,
    },
  }[variant];
  const pad =
    size === "sm" ? "5px 12px" : size === "lg" ? "12px 24px" : "8px 16px";
  const fs = size === "sm" ? 12 : 14;
  return (
    <button
      {...props}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: pad,
        borderRadius: 8,
        border: v.border,
        background: hov ? v.hbg : v.bg,
        color: v.color,
        fontSize: fs,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
        transform: hov ? "translateY(-1px)" : "none",
        boxShadow:
          hov && variant === "primary" ? `0 4px 12px ${C.primary}40` : "none",
        width: full ? "100%" : "auto",
        ...xs,
      }}
    >
      {children}
    </button>
  );
}

function Badge({ status }) {
  const map = {
    Valid: { bg: "#dcfce7", color: "#15803d" },
    "Due Soon": { bg: "#fef9c3", color: "#92400e" },
    Expired: { bg: "#fee2e2", color: C.danger },
    "Pending Review": { bg: "#dbeafe", color: C.primary },
    "Lab Technician": { bg: "#f1f5f9", color: C.muted },
    "Senior Scientist": { bg: "#ede9fe", color: "#7c3aed" },
    "QA Analyst": { bg: "#fef3c7", color: "#92400e" },
    "Lab Manager": { bg: "#dcfce7", color: "#15803d" },
  };
  const s = map[status] || { bg: "#f1f5f9", color: C.muted };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        background: s.bg,
        color: s.color,
        letterSpacing: "0.3px",
      }}
    >
      {status}
    </span>
  );
}

function Divider({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "20px 0 14px",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: C.primary,
          textTransform: "uppercase",
          letterSpacing: "1px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: `${C.primary}30` }} />
    </div>
  );
}

// ─── Toast System ─────────────────────────────────────────────────────────────
function ToastStack({ toasts }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: 340,
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            padding: "12px 18px",
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 13,
            background:
              t.type === "success"
                ? C.success
                : t.type === "error"
                  ? C.danger
                  : C.warn,
            color: C.white,
            boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            animation: "clToastIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {t.type === "success" ? "✓" : "⚠"} {t.message}
        </div>
      ))}
    </div>
  );
}

// ─── Scientist Sub-Tab ────────────────────────────────────────────────────────
const ScientistSubTab = forwardRef(function ScientistSubTab(
  { scientists, setScientists, showToast, initialForm },
  ref,
) {
  const makeBlank = () => ({
    userId: genId("USR"),
    name: "",
    role: "",
    labCode: "",
  });
  const [form, setForm] = useState(makeBlank());
  const [errors, setErrors] = useState({});
  const [editIdx, setEditIdx] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialForm) {
      setForm(initialForm);
      const idx = scientists.indexOf(initialForm);
      if (idx !== -1) setEditIdx(idx);
    }
  }, [initialForm, scientists]);

  function commitPending() {
    const nonEmpty = Object.values(form).some((v) =>
      typeof v === "string" ? v.trim() !== "" : !!v,
    );
    if (!nonEmpty) return true;
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      showToast(
        "Please fill required fields in Scientist tab before final submit",
        "error",
      );
      return false;
    }
    handleSubmit();
    return true;
  }

  function hasContent() {
    return Object.values(form).some((v) =>
      typeof v === "string" ? v.trim() !== "" : !!v,
    );
  }

  function getFullItems() {
    const current = scientists || [];
    if (!hasContent()) return current;
    const e = validate();
    if (Object.keys(e).length) return current;
    if (editIdx !== null) return current;
    return [...current, form];
  }

  useImperativeHandle(ref, () => ({ commitPending, hasContent, getFullItems }));

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.role) e.role = "Role is required";
    if (!form.labCode.trim()) e.labCode = "Lab Code is required";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      showToast("Please fill required fields", "error");
      return;
    }
    if (editIdx !== null) {
      setScientists((l) => l.map((x, i) => (i === editIdx ? form : x)));
      showToast("Scientist updated!", "success");
      setEditIdx(null);
    } else {
      setScientists((l) => [...l, form]);
      showToast("Scientist added!", "success");
    }
    setForm(makeBlank());
    setErrors({});
  }

  const filtered = scientists.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.labCode.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <Divider label={editIdx !== null ? "Edit Scientist" : "Add Scientist"} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "0 16px",
        }}
      >
        <FInput
          label="User ID"
          value={form.userId}
          onChange={(e) => set("userId", e.target.value)}
          placeholder="Auto-generated"
        />
        <FInput
          label="Name *"
          value={form.name}
          error={errors.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Full name"
        />
        <FSelect
          label="Role *"
          value={form.role}
          error={errors.role}
          onChange={(e) => set("role", e.target.value)}
        >
          <option value="">— Select Role —</option>
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </FSelect>
        <FInput
          label="Lab Code *"
          value={form.labCode}
          error={errors.labCode}
          onChange={(e) => set("labCode", e.target.value)}
          placeholder="e.g. LAB-001"
        />
      </div>
    </div>
  );
});

// ─── Raw Material Sub-Tab ─────────────────────────────────────────────────────
const RawMaterialSubTab = forwardRef(function RawMaterialSubTab(
  { materials, setMaterials, showToast, initialForm },
  ref,
) {
  const makeBlank = () => ({
    materialCode: "",
    materialName: "",
    category: "",
    supplier: "",
    storageCondition: "",
  });
  const [form, setForm] = useState(makeBlank());
  const [errors, setErrors] = useState({});
  const [editIdx, setEditIdx] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialForm) {
      setForm(initialForm);
      const idx = materials.indexOf(initialForm);
      if (idx !== -1) setEditIdx(idx);
    }
  }, [initialForm, materials]);

  function commitPending() {
    const nonEmpty = Object.values(form).some((v) =>
      typeof v === "string" ? v.trim() !== "" : !!v,
    );
    if (!nonEmpty) return true;
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      showToast(
        "Please fill required fields in Raw Material tab before final submit",
        "error",
      );
      return false;
    }
    handleSubmit();
    return true;
  }

  function hasContent() {
    return Object.values(form).some((v) =>
      typeof v === "string" ? v.trim() !== "" : !!v,
    );
  }

  function getFullItems() {
    const current = materials || [];
    if (!hasContent()) return current;
    const e = validate();
    if (Object.keys(e).length) return current;
    if (editIdx !== null) return current;
    return [...current, form];
  }

  useImperativeHandle(ref, () => ({ commitPending, hasContent, getFullItems }));

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  function validate() {
    const e = {};
    if (!form.materialCode.trim()) e.materialCode = "Code is required";
    if (!form.materialName.trim()) e.materialName = "Name is required";
    if (!form.category) e.category = "Category is required";
    if (!form.supplier.trim()) e.supplier = "Supplier is required";
    if (!form.storageCondition)
      e.storageCondition = "Storage condition is required";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      showToast("Please fill required fields", "error");
      return;
    }
    if (editIdx !== null) {
      setMaterials((l) => l.map((x, i) => (i === editIdx ? form : x)));
      showToast("Material updated!", "success");
      setEditIdx(null);
    } else {
      setMaterials((l) => [...l, form]);
      showToast("Material added!", "success");
    }
    setForm(makeBlank());
    setErrors({});
  }

  const filtered = materials.filter(
    (m) =>
      m.materialName.toLowerCase().includes(search.toLowerCase()) ||
      m.materialCode.toLowerCase().includes(search.toLowerCase()),
  );

  const storageTag = {
    "Room Temperature": { bg: "#f0fdf4", color: "#15803d" },
    Refrigerated: { bg: "#e0f2fe", color: "#0369a1" },
    Frozen: { bg: "#eff6ff", color: C.primary },
    "Dark & Dry": { bg: "#fef9c3", color: "#92400e" },
  };

  return (
    <div>
      <Divider
        label={editIdx !== null ? "Edit Material" : "Add Raw Material"}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "0 16px",
        }}
      >
        <FInput
          label="Material Code *"
          value={form.materialCode}
          error={errors.materialCode}
          onChange={(e) => set("materialCode", e.target.value)}
          placeholder="e.g. MAT-001"
        />
        <FInput
          label="Material Name *"
          value={form.materialName}
          error={errors.materialName}
          onChange={(e) => set("materialName", e.target.value)}
          placeholder="e.g. Sodium Chloride"
        />
        <FSelect
          label="Category *"
          value={form.category}
          error={errors.category}
          onChange={(e) => set("category", e.target.value)}
        >
          <option value="">— Select Category —</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </FSelect>
        <FInput
          label="Supplier *"
          value={form.supplier}
          error={errors.supplier}
          onChange={(e) => set("supplier", e.target.value)}
          placeholder="e.g. Merck India"
        />
        <FSelect
          label="Storage Condition *"
          value={form.storageCondition}
          error={errors.storageCondition}
          onChange={(e) => set("storageCondition", e.target.value)}
        >
          <option value="">— Select Storage —</option>
          {STORAGE.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </FSelect>
      </div>
    </div>
  );
});

// ─── Instrument Sub-Tab ───────────────────────────────────────────────────────
const InstrumentSubTab = forwardRef(function InstrumentSubTab(
  { instruments, setInstruments, showToast, initialForm },
  ref,
) {
  const makeBlank = () => ({
    instrumentId: "",
    instrumentName: "",
    model: "",
    calibrationDate: "",
    nextCalibrationDate: "",
  });
  const [form, setForm] = useState(makeBlank());
  const [errors, setErrors] = useState({});
  const [editIdx, setEditIdx] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialForm) {
      setForm(initialForm);
      const idx = instruments.indexOf(initialForm);
      if (idx !== -1) setEditIdx(idx);
    }
  }, [initialForm, instruments]);

  function commitPending() {
    const nonEmpty = Object.values(form).some((v) =>
      typeof v === "string" ? v.trim() !== "" : !!v,
    );
    if (!nonEmpty) return true;
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      showToast(
        "Please fill required fields in Instrument tab before final submit",
        "error",
      );
      return false;
    }
    handleSubmit();
    return true;
  }

  function hasContent() {
    return Object.values(form).some((v) =>
      typeof v === "string" ? v.trim() !== "" : !!v,
    );
  }

  function getFullItems() {
    const current = instruments || [];
    if (!hasContent()) return current;
    const e = validate();
    if (Object.keys(e).length) return current;
    if (editIdx !== null) return current;
    return [...current, form];
  }

  useImperativeHandle(ref, () => ({ commitPending, hasContent, getFullItems }));

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  function validate() {
    const e = {};
    if (!form.instrumentId.trim()) e.instrumentId = "ID is required";
    if (!form.instrumentName.trim()) e.instrumentName = "Name is required";
    if (!form.model.trim()) e.model = "Model is required";
    if (!form.calibrationDate) e.calibrationDate = "Date required";
    if (!form.nextCalibrationDate) e.nextCalibrationDate = "Date required";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      showToast("Please fill required fields", "error");
      return;
    }
    if (editIdx !== null) {
      setInstruments((l) => l.map((x, i) => (i === editIdx ? form : x)));
      showToast("Instrument updated!", "success");
      setEditIdx(null);
    } else {
      setInstruments((l) => [...l, form]);
      showToast("Instrument added!", "success");
    }
    setForm(makeBlank());
    setErrors({});
  }

  const previewStatus = getCalibStatus(form.nextCalibrationDate);
  const filtered = instruments.filter(
    (ins) =>
      ins.instrumentName.toLowerCase().includes(search.toLowerCase()) ||
      ins.instrumentId.toLowerCase().includes(search.toLowerCase()),
  );

  function rowBg(st, i) {
    if (st === "Expired") return "#fff1f2";
    if (st === "Due Soon") return "#fffbeb";
    return i % 2 === 0 ? C.white : C.bg;
  }

  return (
    <div>
      <Divider
        label={editIdx !== null ? "Edit Instrument" : "Add Instrument"}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "0 16px",
        }}
      >
        <FInput
          label="Instrument ID *"
          value={form.instrumentId}
          error={errors.instrumentId}
          onChange={(e) => set("instrumentId", e.target.value)}
          placeholder="e.g. INS-001"
        />
        <FInput
          label="Instrument Name *"
          value={form.instrumentName}
          error={errors.instrumentName}
          onChange={(e) => set("instrumentName", e.target.value)}
          placeholder="e.g. HPLC Analyzer"
        />
        <FInput
          label="Model *"
          value={form.model}
          error={errors.model}
          onChange={(e) => set("model", e.target.value)}
          placeholder="e.g. Agilent 1260"
        />
        <FInput
          label="Calibration Date *"
          type="date"
          value={form.calibrationDate}
          error={errors.calibrationDate}
          onChange={(e) => set("calibrationDate", e.target.value)}
        />
        <div>
          <FInput
            label="Next Calibration Date *"
            type="date"
            value={form.nextCalibrationDate}
            error={errors.nextCalibrationDate}
            onChange={(e) => set("nextCalibrationDate", e.target.value)}
          />
          {previewStatus && (
            <div
              style={{
                marginTop: -10,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>
                Auto status:
              </span>
              <Badge status={previewStatus} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// ─── Lab Test Sub-Tab ─────────────────────────────────────────────────────────
const LabTestSubTab = forwardRef(function LabTestSubTab(
  { tests, setTests, showToast, initialForm, location, setSelectedLocation },
  ref,
) {
  const makeBlank = () => ({
    code: "",
    labname: "",
    location: "",
    labtype: "",
    labCode: "",
    companyCode: "",
    companyName: "",
    labTestCode: "",
    testLocation: "",
    testingCompanyName: "",
    testingType: [],
  });
  const [form, setForm] = useState(makeBlank());
  const [errors, setErrors] = useState({});
  const [editIdx, setEditIdx] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (initialForm) {
      setForm(initialForm);
    }
  }, [initialForm]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function commitPending() {
    const nonEmpty = Object.values(form).some((v) =>
      typeof v === "string" ? v.trim() !== "" : !!v,
    );
    if (!nonEmpty) return true;
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      showToast(
        "Please fill required fields in Lab Test tab before final submit",
        "error",
      );
      return false;
    }
    handleAddTest();
    return true;
  }

  function hasContent() {
    return Object.values(form).some((v) =>
      typeof v === "string" ? v.trim() !== "" : !!v,
    );
  }

  function getFullItems() {
    const current = tests || [];
    if (!hasContent()) return current;
    const e = validate();
    if (Object.keys(e).length) return current;
    if (editIdx !== null) return current;
    return [...current, form];
  }

  useImperativeHandle(ref, () => ({ commitPending, hasContent, getFullItems }));

  function resetDynamic(base) {
    const r = {};
    Object.values(TESTING_FIELDS).forEach((flds) =>
      flds.forEach((f) => {
        r[f.name] = "";
      }),
    );
    return { ...base, ...r };
  }

  function setField(key, val) {
    if (key === "testingType") {
      setForm((f) => resetDynamic({ ...f, testingType: val }));
    } else {
      setForm((f) => ({ ...f, [key]: val }));
    }
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function toggleTestingType(type) {
    setForm((f) => {
      const current = f.testingType || [];
      const newTypes = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      return resetDynamic({ ...f, testingType: newTypes });
    });
    setErrors((e) => ({ ...e, testingType: "" }));
  }

  function validate() {
    const e = {};
    if (!form.code.trim()) e.code = "Lab Code is required";
    if (!form.labname.trim()) e.labname = "Lab Name is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.labtype.trim()) e.labtype = "Lab Type is required";
    if (!form.labCode.trim()) e.labCode = "Lab Code is required";
    if (!form.companyCode.trim()) e.companyCode = "Company Code is required";
    if (!form.companyName.trim()) e.companyName = "Company Name is required";
    if (!form.labTestCode.trim()) e.labTestCode = "Lab Test Code is required";
    if (!form.testingType || form.testingType.length === 0)
      e.testingType = "Select at least one Testing Type";
    return e;
  }

  function handleAddTest() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      showToast("Please fill required fields", "error");
      return;
    }
    if (editIdx !== null) {
      setTests((l) => l.map((x, i) => (i === editIdx ? form : x)));
      showToast("Test updated!", "success");
      setEditIdx(null);
    } else {
      setTests((l) => [...l, { ...form }]);
      showToast("Test added!", "success");
    }
    setForm(makeBlank());
    setErrors({});
  }

  const dynFields = form.testingType
    .flatMap((type) => TESTING_FIELDS[type] || [])
    .filter((f, i, arr) => arr.findIndex((x) => x.name === f.name) === i);

  return (
    <div>
      <Divider label="Lab Information" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "0 20px",
          marginBottom: 20,
        }}
      >
        <FSelect
          label="Location *"
          value={form.location}
          error={errors.location}
          onChange={(e) => setField("location", e.target.value)}
        >
          <option value="">— Select Location —</option>
          {location?.map((loc) => (
            <option key={loc?.id}>{loc?.name}</option>
          ))}
        </FSelect>
        <FSelect
          label="Lab Name *"
          value={form.labname}
          error={errors.labname}
          onChange={(e) => setField("labname", e.target.value)}
        >
          <option value="">— Select Lab Name —</option>
          {LAB_NAMES.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </FSelect>

        <div style={{ maxWidth: 550 }} ref={dropdownRef}>
          <label
            style={{
              display: "block",
              fontSize: 15,
              fontWeight: 800,
              color: C.muted,
              marginBottom: 5,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
            }}
          >
            Testing Type *
          </label>
          <div style={{ position: "relative" }}>
            <button
              type="button"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 15px",
                borderRadius: 8,
                border: `2px solid ${errors.testingType ? C.danger : C.border}`,
                background: C.white,
                color: form.testingType.length > 0 ? C.text : C.muted,
                fontSize: 16,
                fontWeight: 500,
                textAlign: "left",
                cursor: "pointer",
                outline: "none",
                transition: "border 0.15s",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
            >
              <span>
                {form.testingType.length === 0
                  ? "— Select Testing Types —"
                  : form.testingType.join(", ")}
              </span>
              <span>▼</span>
            </button>
            <div
              style={{
                display: dropdownOpen ? "block" : "none",
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: C.white,
                border: `2px solid ${C.primary}`,
                borderTop: "none",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                zIndex: 1000,
                maxHeight: 300,
                overflowY: "auto",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              {Object.keys(TESTING_FIELDS).map((testType) => (
                <label
                  key={testType}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    cursor: "pointer",
                    userSelect: "none",
                    borderBottom: `1px solid ${C.border}`,
                    background: form.testingType.includes(testType)
                      ? C.primaryLight
                      : C.white,
                    transition: "background 0.15s",
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={(e) => {
                    if (!form.testingType.includes(testType)) {
                      e.currentTarget.style.background = C.bg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      form.testingType.includes(testType)
                        ? C.primaryLight
                        : C.white;
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.testingType.includes(testType)}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleTestingType(testType);
                      setDropdownOpen(false);
                    }}
                    style={{
                      width: 18,
                      height: 18,
                      cursor: "pointer",
                      accentColor: C.primary,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: form.testingType.includes(testType)
                        ? C.primary
                        : C.text,
                    }}
                  >
                    {testType}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {errors.testingType && (
            <p
              style={{
                color: C.danger,
                fontSize: 12,
                margin: "5px 0 0",
                fontWeight: 700,
              }}
            >
              ⚠ {errors.testingType}
            </p>
          )}
        </div>
      </div>

      {form.testingType.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {form.testingType.map((testType) => {
            const typeFields = TESTING_FIELDS[testType] || [];
            return (
              <div
                key={testType}
                style={{
                  background: `${C.primary}07`,
                  border: `1.5px solid ${C.primary}25`,
                  borderRadius: 12,
                  padding: "18px 20px",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      fontWeight: 700,
                      color: C.primary,
                      textTransform: "uppercase",
                      letterSpacing: "1.2px",
                    }}
                  >
                    {testType} Parameters
                  </p>
                  <Btn
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTestingType(testType)}
                    style={{ color: C.danger }}
                  >
                    ✕ Remove
                  </Btn>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                    gap: "0 16px",
                  }}
                >
                  {typeFields.map((f) => (
                    <FInput
                      key={f.name}
                      label={f.label}
                      value={form[f.name] || ""}
                      onChange={(e) => setField(f.name, e.target.value)}
                      placeholder={f.placeholder}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

// ─── Main CentralLabForm ──────────────────────────────────────────────────────
export default function CentralLabForm({ onSaved }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("lab-test");
  const [toasts, setToasts] = useState([]);

  const labTestRef = useRef(null);
  const scientistRef = useRef(null);
  const materialsRef = useRef(null);
  const instrumentsRef = useRef(null);

  // Sub-records state
  const [tests, setTests] = useState([]);
  const [scientists, setScientists] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [instruments, setInstruments] = useState([]);

  // Initial form data for edit mode
  const [initialTestForm, setInitialTestForm] = useState(null);
  const [initialScientistForm, setInitialScientistForm] = useState(null);
  const [initialMaterialForm, setInitialMaterialForm] = useState(null);
  const [initialInstrumentForm, setInitialInstrumentForm] = useState(null);

  const [summaryRecord, setSummaryRecord] = useState(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const [location, setLocation] = useState(LOCATIONS || []);
  const [selectedLocation, setSelectedLocation] = useState("");
  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/locations");
      console.log(response.data.data);
      const resData = response.data.data;
      setLocation(resData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("centrallab") || "[]");
    if (id != null) {
      const rec = stored[Number(id)];
      if (rec) {
        setTests(rec.tests || []);
        setScientists(rec.scientists || []);
        setMaterials(rec.materials || []);
        setInstruments(rec.instruments || []);

        // Set initial form data for edit mode
        if (rec.tests && rec.tests.length > 0) setInitialTestForm(rec.tests[0]);
        if (rec.scientists && rec.scientists.length > 0)
          setInitialScientistForm(rec.scientists[0]);
        if (rec.materials && rec.materials.length > 0)
          setInitialMaterialForm(rec.materials[0]);
        if (rec.instruments && rec.instruments.length > 0)
          setInitialInstrumentForm(rec.instruments[0]);
      }
    }
  }, [id]);

  const showToast = useCallback((message, type = "success") => {
    const tid = Date.now() + Math.random();
    setToasts((t) => [...t, { id: tid, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== tid)), 3500);
  }, []);

  // ─── Common Submit — saves all sub-records together ────────────
  function handleFinalSubmit() {
    const subTabs = [
      { ref: labTestRef, key: "lab-test" },
      { ref: scientistRef, key: "scientist" },
      { ref: materialsRef, key: "raw-material" },
      { ref: instrumentsRef, key: "instrument" },
    ];

    for (const tab of subTabs) {
      const commitFn = tab.ref.current?.commitPending;
      if (typeof commitFn === "function") {
        const ok = commitFn();
        if (!ok) {
          setActiveTab(tab.key);
          return;
        }
      }
    }

    const testsFinal = labTestRef.current?.getFullItems?.() ?? tests;
    const scientistsFinal =
      scientistRef.current?.getFullItems?.() ?? scientists;
    const materialsFinal = materialsRef.current?.getFullItems?.() ?? materials;
    const instrumentsFinal =
      instrumentsRef.current?.getFullItems?.() ?? instruments;

    if (testsFinal.length === 0) {
      setActiveTab("lab-test");
      showToast("Please add at least one lab test before submit", "error");
      return;
    }
    if (scientistsFinal.length === 0) {
      setActiveTab("scientist");
      showToast("Please add at least one scientist before submit", "error");
      return;
    }
    if (materialsFinal.length === 0) {
      setActiveTab("raw-material");
      showToast("Please add at least one raw material before submit", "error");
      return;
    }
    if (instrumentsFinal.length === 0) {
      setActiveTab("instrument");
      showToast("Please add at least one instrument before submit", "error");
      return;
    }

    const record = {
      tests: testsFinal,
      scientists: scientistsFinal,
      materials: materialsFinal,
      instruments: instrumentsFinal,
    };
    console.log("record", record);

    setTests(testsFinal);
    setScientists(scientistsFinal);
    setMaterials(materialsFinal);
    setInstruments(instrumentsFinal);

    let old = JSON.parse(localStorage.getItem("centrallab") || "[]");

    if (id != null) {
      old[Number(id)] = record;
      showToast("Record updated successfully!", "success");
    } else {
      old.push(record);
      showToast("Record saved successfully!", "success");
    }

    localStorage.setItem("centrallab", JSON.stringify(old));

    setSummaryRecord(record);
    setShowSummaryModal(true);

    // Auto-navigate to centrallab after 3 seconds
    setTimeout(() => {
      navigate("/centrallab");
    }, 3000);

    if (onSaved) {
      setTimeout(() => onSaved(), 1500);
    }
  }

  const isEdit = id != null;

  const hasPendingTest = labTestRef.current?.hasContent?.() ?? false;
  const hasPendingScientist = scientistRef.current?.hasContent?.() ?? false;
  const hasPendingMaterials = materialsRef.current?.hasContent?.() ?? false;
  const hasPendingInstruments = instrumentsRef.current?.hasContent?.() ?? false;

  const canSubmit =
    (tests.length > 0 || hasPendingTest) &&
    (scientists.length > 0 || hasPendingScientist) &&
    (materials.length > 0 || hasPendingMaterials) &&
    (instruments.length > 0 || hasPendingInstruments);

  const TABS = [
    { key: "lab-test", label: "Lab Test", icon: "🧪" },
    { key: "scientist", label: "Scientist", icon: "🔬" },
    { key: "raw-material", label: "Raw Material", icon: "📦" },
    { key: "instrument", label: "Instrument", icon: "⚙️" },
  ];

  return (
    <>
      <style>{`
        @keyframes clToastIn { from { opacity:0; transform:translateX(60px); } to { opacity:1; transform:translateX(0); } }
        @keyframes clFadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .cl-content { animation: clFadeIn 0.2s ease; }
        @media (max-width:640px) {
          .cl-main-card { padding: 18px 12px !important; }
          .cl-tab-scroll { overflow-x: auto; }
          .cl-tab-btn { padding: 8px 10px !important; font-size: 12px !important; }
        }
        @media print { body > *:not(.cl-print-area) { display: none; } }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: C.bg,
          padding: "24px 14px",
          fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
          <div
            className="cl-main-card"
            style={{
              background: C.white,
              borderRadius: 16,
              boxShadow: "0 2px 20px rgba(37,99,235,0.09)",
              border: `1px solid ${C.border}`,
              padding: "28px 26px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                🏥
              </div>
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 800,
                    color: C.text,
                    lineHeight: 1.2,
                  }}
                >
                  Central Lab Master
                </h2>
                <p style={{ margin: 0, fontSize: 12, color: C.muted }}>
                  Manage lab records, tests, scientists & instruments
                </p>
              </div>
              {isEdit && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.primary,
                    background: C.primaryLight,
                    padding: "4px 12px",
                    borderRadius: 20,
                    border: `1px solid ${C.primary}33`,
                  }}
                >
                  ✏ Editing
                </span>
              )}
            </div>

            {/* Tabs */}
            <div
              className="cl-tab-scroll"
              style={{
                borderBottom: `2px solid ${C.border}`,
                marginBottom: 22,
              }}
            >
              <div style={{ display: "flex", gap: 0, minWidth: "max-content" }}>
                {TABS.map((t) => {
                  const active = activeTab === t.key;
                  return (
                    <button
                      key={t.key}
                      className="cl-tab-btn"
                      onClick={() => setActiveTab(t.key)}
                      style={{
                        padding: "12px 24px",
                        border: "none",
                        borderBottom: active
                          ? `2px solid ${C.primary}`
                          : "2px solid transparent",
                        background: active ? C.primaryLight : "transparent",
                        color: active ? C.primary : C.muted,
                        fontWeight: active ? 800 : 600,
                        fontSize: 16,
                        cursor: "pointer",
                        borderRadius: "8px 8px 0 0",
                        transition: "all 0.15s",
                        whiteSpace: "nowrap",
                        marginBottom: -2,
                      }}
                    >
                      {t.icon} {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="cl-content">
              <div
                style={{ display: activeTab === "lab-test" ? "block" : "none" }}
              >
                <LabTestSubTab
                  ref={labTestRef}
                  tests={tests}
                  setTests={setTests}
                  showToast={showToast}
                  initialForm={initialTestForm}
                  location={location}
                  setSelectedLocation={setSelectedLocation}
                />
              </div>

              <div
                style={{
                  display: activeTab === "scientist" ? "block" : "none",
                }}
              >
                <ScientistSubTab
                  ref={scientistRef}
                  scientists={scientists}
                  setScientists={setScientists}
                  showToast={showToast}
                  initialForm={initialScientistForm}
                />
              </div>

              <div
                style={{
                  display: activeTab === "raw-material" ? "block" : "none",
                }}
              >
                <RawMaterialSubTab
                  ref={materialsRef}
                  materials={materials}
                  setMaterials={setMaterials}
                  showToast={showToast}
                  initialForm={initialMaterialForm}
                />
              </div>

              <div
                style={{
                  display: activeTab === "instrument" ? "block" : "none",
                }}
              >
                <InstrumentSubTab
                  ref={instrumentsRef}
                  instruments={instruments}
                  setInstruments={setInstruments}
                  showToast={showToast}
                  initialForm={initialInstrumentForm}
                />
              </div>
            </div>

            {/* ─── Common Submit Button ─── */}
            <div
              style={{
                marginTop: 28,
                paddingTop: 18,
                borderTop: `2px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 12, color: C.muted }}></div>
              <Btn
                variant="primary"
                size="lg"
                onClick={handleFinalSubmit}
                disabled={!canSubmit}
                style={{
                  opacity: canSubmit ? 1 : 0.55,
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
              >
                {isEdit ? "✔ Update All & Save" : "✔ Submit All & Save"}
              </Btn>
            </div>
          </div>
        </div>
      </div>

      {showPrintModal && summaryRecord && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: 20,
            overflow: "auto",
          }}
        >
          <div
            style={{
              background: C.white,
              borderRadius: 12,
              width: "95%",
              maxWidth: "none",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
              zIndex: 100000,
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <h3 style={{ margin: 0 }}>Print Preview</h3>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="primary" onClick={() => window.print()}>
                  🖨 Print
                </Btn>
                <Btn variant="ghost" onClick={() => setShowPrintModal(false)}>
                  Close
                </Btn>
              </div>
            </div>
            <div style={{ padding: "14px 18px" }}>
              <h4>Lab Test Entries ({summaryRecord.tests?.length || 0})</h4>
              <div
                style={{ maxHeight: 180, overflowY: "auto", marginBottom: 10 }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Lab Name
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Lab Code
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Company
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Test Code
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Testing Types
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryRecord.tests?.map((t, i) => (
                      <tr key={i}>
                        <td>{t.labname}</td>
                        <td>{t.labCode}</td>
                        <td>{t.companyName}</td>
                        <td>{t.labTestCode}</td>
                        <td>
                          {Array.isArray(t.testingType)
                            ? t.testingType.join(", ")
                            : t.testingType}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h4>Scientists ({summaryRecord.scientists?.length || 0})</h4>
              <div
                style={{ maxHeight: 130, overflowY: "auto", marginBottom: 10 }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        ID
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Role
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Lab Code
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryRecord.scientists?.map((s, i) => (
                      <tr key={i}>
                        <td>{s.userId}</td>
                        <td>{s.name}</td>
                        <td>{s.role}</td>
                        <td>{s.labCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h4>Materials ({summaryRecord.materials?.length || 0})</h4>
              <div
                style={{ maxHeight: 130, overflowY: "auto", marginBottom: 10 }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Code
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Category
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Supplier
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryRecord.materials?.map((m, i) => (
                      <tr key={i}>
                        <td>{m.materialCode}</td>
                        <td>{m.materialName}</td>
                        <td>{m.category}</td>
                        <td>{m.supplier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h4>Instruments ({summaryRecord.instruments?.length || 0})</h4>
              <div
                style={{ maxHeight: 130, overflowY: "auto", marginBottom: 10 }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        ID
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Model
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        Next Calib.
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryRecord.instruments?.map((ins, i) => (
                      <tr key={i}>
                        <td>{ins.instrumentId}</td>
                        <td>{ins.instrumentName}</td>
                        <td>{ins.model}</td>
                        <td>{ins.nextCalibrationDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastStack toasts={toasts} />
    </>
  );
}
