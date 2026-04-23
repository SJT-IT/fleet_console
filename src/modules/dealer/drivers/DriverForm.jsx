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

    // assignment logic
    if (form.assignedVehicleId) {
      await assignDriverToVehicle(driverId, form.assignedVehicleId);
      await assignVehicleToDriver(form.assignedVehicleId, driverId);
    }

    setForm({ fullName: "", assignedVehicleId: "" });
    clear();
    refresh();
  };

  return (
    <div>
      <h3>{selected ? "Edit Driver" : "Create Driver"}</h3>

      <input
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) =>
          setForm({ ...form, fullName: e.target.value })
        }
      />

      <select
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

      <button onClick={handleSubmit}>
        {selected ? "Update" : "Create"}
      </button>

      {selected && <button onClick={clear}>Cancel</button>}
    </div>
  );
}