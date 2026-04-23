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
        dealerId // 🔥 critical
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
    <div>
      <h3>{selected ? "Edit Vehicle" : "Create Vehicle"}</h3>

      <input name="licensePlate" value={form.licensePlate} onChange={handleChange} placeholder="Plate" />
      <input name="make" value={form.make} onChange={handleChange} placeholder="Make" />
      <input name="model" value={form.model} onChange={handleChange} placeholder="Model" />
      <input name="color" value={form.color} onChange={handleChange} placeholder="Color" />
      <input name="year" value={form.year} onChange={handleChange} placeholder="Year" />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button onClick={handleSubmit}>
        {selected ? "Update" : "Create"}
      </button>

      {selected && <button onClick={clear}>Cancel</button>}
    </div>
  );
}