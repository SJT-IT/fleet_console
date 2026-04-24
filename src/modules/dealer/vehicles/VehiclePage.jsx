import { useEffect, useState } from "react";
import {
  getVehicles,
  deleteVehicle,
} from "../../../services/firestore/vehicleService";
import VehicleForm from "./VehicleForm";
import VehicleList from "./VehicleList";
import { useAuth } from "../../../context/AuthContext";

export default function VehiclePage() {
  const { role, dealerId } = useAuth();

  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    setLoading(true);
    const data = await getVehicles(role, dealerId);
    setVehicles(data);
    setLoading(false);
  };

  useEffect(() => {
    if (role) fetchVehicles(); // avoid bad calls
  }, [role, dealerId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;
    await deleteVehicle(id);
    fetchVehicles();
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Vehicle Management</h2>

      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <div style={styles.layout}>
          {/* LEFT: FORM */}
          <div style={styles.left}>
            <VehicleForm
              selected={selected}
              dealerId={dealerId}
              role={role}
              refresh={fetchVehicles}
              clear={() => setSelected(null)}
            />
          </div>

          {/* RIGHT: LIST */}
          <div style={styles.right}>
            <VehicleList
              vehicles={vehicles}
              onEdit={(v) => {
                setSelected(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "1.5rem",
    background: "#f5f7fb",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  loading: {
    textAlign: "center",
    color: "#666",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "340px 1fr",
    gap: "1.5rem",
    alignItems: "start",
  },
  left: {
    position: "sticky",
    top: "20px",
  },
  right: {
    width: "100%",
  },
};