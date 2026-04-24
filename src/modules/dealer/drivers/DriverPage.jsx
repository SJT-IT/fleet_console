import { useEffect, useState } from "react";
import {
  getDrivers,
  deleteDriver,
} from "../../../services/firestore/userService";
import { getVehicles } from "../../../services/firestore/vehicleService";
import DriverForm from "./DriverForm";
import DriverList from "./DriverList";
import { useAuth } from "../../../context/AuthContext";

export default function DriverPage() {
  const { role, dealerId } = useAuth();

  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const d = await getDrivers(role, dealerId);
    const v = await getVehicles(role, dealerId);
    setDrivers(d);
    setVehicles(v);
    setLoading(false);
  };

  useEffect(() => {
    if (role) fetchAll();
  }, [role, dealerId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this driver?")) return;
    await deleteDriver(id);
    fetchAll();
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Driver Management</h2>

      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <div style={styles.layout}>
          {/* LEFT: FORM */}
          <div style={styles.left}>
            <DriverForm
              selected={selected}
              vehicles={vehicles}
              dealerId={dealerId}
              refresh={fetchAll}
              clear={() => setSelected(null)}
            />
          </div>

          {/* RIGHT: LIST */}
          <div style={styles.right}>
            <DriverList
              drivers={drivers}
              onEdit={setSelected}
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
    gridTemplateColumns: "320px 1fr",
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