import { useEffect, useState } from "react";
import {
  createVehicle,
  updateVehicle,
} from "../../../services/firestore/vehicleService";

export default function VehicleForm({
  selected,
  dealerId,
  role,
  refresh,
  clear,
}) {
  const [form, setForm] = useState({
    licensePlate: "",
    color: "",
    make: "",
    model: "",
    year: "",
    status: "active",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (selected) {
      await updateVehicle(selected.id, {
        ...form,
        updatedAt: new Date(),
      });
    } else {
      await createVehicle(
        {
          ...form,
        },
        dealerId
      );
    }

    setForm({
      licensePlate: "",
      color: "",
      make: "",
      model: "",
      year: "",
      status: "active",
    });

    clear();
    refresh();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>
          {selected ? "Edit Vehicle" : "Create Vehicle"}
        </h3>

        <input
          style={styles.input}
          name="licensePlate"
          value={form.licensePlate}
          onChange={handleChange}
          placeholder="License Plate"
        />

        <input
          style={styles.input}
          name="make"
          value={form.make}
          onChange={handleChange}
          placeholder="Make (e.g. Toyota)"
        />

        <input
          style={styles.input}
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model (e.g. Corolla)"
        />

        <input
          style={styles.input}
          name="color"
          value={form.color}
          onChange={handleChange}
          placeholder="Color"
        />

        <input
          style={styles.input}
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Year"
        />

        <select
          style={styles.input}
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button style={styles.primaryBtn} onClick={handleSubmit}>
          {selected ? "Update Vehicle" : "Create Vehicle"}
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
    width: "340px",
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