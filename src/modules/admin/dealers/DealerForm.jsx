import { useState, useEffect } from "react";
import {
  createDealer,
  updateDealer,
} from "../../../services/firestore/dealerService";

export default function DealerForm({
  selectedDealer,
  refresh,
  clearSelection,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    status: "active",
  });

  useEffect(() => {
    if (selectedDealer) {
      setForm(selectedDealer);
    }
  }, [selectedDealer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      return alert("Name and Email are required");
    }

    if (selectedDealer) {
      await updateDealer(selectedDealer.id, {
        ...form,
        updatedAt: new Date(),
      });
    } else {
      await createDealer({
        ...form,
        totalVehicles: 0,
        totalDrivers: 0,
        createdAt: new Date(),
      });
    }

    setForm({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      status: "active",
    });

    clearSelection();
    refresh();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>
          {selectedDealer ? "Edit Dealer" : "Create Dealer"}
        </h3>

        {selectedDealer && (
          <p style={styles.editing}>Editing dealer...</p>
        )}

        <input
          style={styles.input}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Dealer Name"
        />

        <input
          style={styles.input}
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />

        <input
          style={styles.input}
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <input
          style={styles.input}
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />

        <select
          style={styles.input}
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        <button style={styles.primaryBtn} onClick={handleSubmit}>
          {selectedDealer ? "Update Dealer" : "Create Dealer"}
        </button>

        {selectedDealer && (
          <button style={styles.secondaryBtn} onClick={clearSelection}>
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
    width: "360px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "0.5rem",
  },
  editing: {
    fontSize: "0.8rem",
    color: "#667eea",
    marginBottom: "1rem",
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