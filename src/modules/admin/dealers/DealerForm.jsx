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
    <div>
      <h3>{selectedDealer ? "Edit Dealer" : "Create Dealer"}</h3>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>

      <button onClick={handleSubmit}>
        {selectedDealer ? "Update" : "Create"}
      </button>

      {selectedDealer && <button onClick={clearSelection}>Cancel</button>}
    </div>
  );
}