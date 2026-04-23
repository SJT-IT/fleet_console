import { useEffect, useState } from "react";
import { getDrivers, deleteDriver } from "../../../services/firestore/userService";
import { getVehicles } from "../../../services/firestore/vehicleService";
import DriverForm from "./DriverForm";
import DriverList from "./DriverList";
import { useAuth } from "../../../context/AuthContext";

export default function DriverPage() {
  const { role, dealerId } = useAuth();

  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchAll = async () => {
    const d = await getDrivers(role, dealerId);
    const v = await getVehicles(role, dealerId);
    setDrivers(d);
    setVehicles(v);
  };

  useEffect(() => {
    fetchAll();
  }, [role, dealerId]);

  const handleDelete = async (id) => {
    await deleteDriver(id);
    fetchAll();
  };

  return (
    <div>
      <h2>Driver Management</h2>

      <DriverForm
        selected={selected}
        vehicles={vehicles}
        dealerId={dealerId}
        refresh={fetchAll}
        clear={() => setSelected(null)}
      />

      <DriverList
        drivers={drivers}
        onEdit={setSelected}
        onDelete={handleDelete}
      />
    </div>
  );
}