import { useEffect, useState } from "react";
import {
  getDealers,
  deleteDealer,
} from "../../../services/firestore/dealerService";
import DealerForm from "./DealerForm";
import DealerList from "./DealerList";

export default function DealerPage() {
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDealers = async () => {
    setLoading(true);
    const data = await getDealers();
    setDealers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this dealer?")) return;
    await deleteDealer(id);
    fetchDealers();
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Dealer Management</h2>

      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <div style={styles.layout}>
          {/* LEFT: FORM */}
          <div style={styles.left}>
            <DealerForm
              selectedDealer={selectedDealer}
              refresh={fetchDealers}
              clearSelection={() => setSelectedDealer(null)}
            />
          </div>

          {/* RIGHT: LIST */}
          <div style={styles.right}>
            <DealerList
              dealers={dealers}
              onEdit={(d) => {
                setSelectedDealer(d);
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
    gridTemplateColumns: "360px 1fr",
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