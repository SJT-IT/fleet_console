import { useEffect, useState } from "react";
import { getVehicles, deleteVehicle } from "../../../services/firestore/vehicleService";
import VehicleForm from "./VehicleForm";
import VehicleList from "./VehicleList";
import { useAuth } from "../../../context/AuthContext";

export default function VehiclePage() {
  const { role, dealerId } = useAuth();

  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchVehicles = async () => {
    const data = await getVehicles(role, dealerId);
    setVehicles(data);
  };

  useEffect(() => {
    fetchVehicles();
  }, [role, dealerId]);

  const handleDelete = async (id) => {
    await deleteVehicle(id);
    fetchVehicles();
  };

  return (
    <div>
      <h2>Vehicle Management</h2>

      <VehicleForm
        selected={selected}
        dealerId={dealerId}
        role={role}
        refresh={fetchVehicles}
        clear={() => setSelected(null)}
      />

      <VehicleList
        vehicles={vehicles}
        onEdit={setSelected}
        onDelete={handleDelete}
      />
    </div>
  );
}