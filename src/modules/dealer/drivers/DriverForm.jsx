import { useEffect, useState } from "react";
import {
  createDriver,
  assignDriverToVehicle,
} from "../../../services/firestore/userService";
import { assignVehicleToDriver } from "../../../services/firestore/vehicleService";

export default function DriverForm({
  selected,
  vehicles,
  dealerId,
  refresh,
  clear,
}) {
  const [form, setForm] = useState({
    fullName: "",
    assignedVehicleId: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleSubmit = async () => {
    let driverId;

    if (!selected) {
      const res = await createDriver(
        {
          fullName: form.fullName,
        },
        dealerId
      );

      driverId = res.id;
    } else {
      driverId = selected.id;
    }

    if (form.assignedVehicleId) {
      await assignDriverToVehicle(driverId, form.assignedVehicleId);
      await assignVehicleToDriver(form.assignedVehicleId, driverId);
    }

    setForm({ fullName: "", assignedVehicleId: "" });
    clear();
    refresh();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>
          {selected ? "Edit Driver" : "Create Driver"}
        </h3>

        <input
          style={styles.input}
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
        />

        <select
          style={styles.input}
          value={form.assignedVehicleId}
          onChange={(e) =>
            setForm({ ...form, assignedVehicleId: e.target.value })
          }
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.licensePlate}
            </option>
          ))}
        </select>

        <button style={styles.primaryBtn} onClick={handleSubmit}>
          {selected ? "Update Driver" : "Create Driver"}
        </button>

        {selected && (
          <button style={styles.secondaryBtn} onClick={clear}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  card: {
    background: "#fff",
    padding: "1.8rem",
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.2rem",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "0.9rem",
    outline: "none",
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "0.5rem",
  },
  secondaryBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f5f5f5",
    cursor: "pointer",
  },
};