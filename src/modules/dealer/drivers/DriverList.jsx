export default function DriverList({ drivers, onEdit, onDelete }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Drivers</h3>

      {drivers.length === 0 ? (
        <p style={styles.empty}>No drivers found</p>
      ) : (
        <div style={styles.grid}>
          {drivers.map((d) => (
            <div key={d.id} style={styles.card}>
              <div style={styles.header}>
                <span style={styles.name}>{d.fullName}</span>
                <span
                  style={{
                    ...styles.badge,
                    background: d.assignedVehicleId
                      ? "#d4f8e8"
                      : "#eee",
                    color: d.assignedVehicleId
                      ? "#1b7f5c"
                      : "#555",
                  }}
                >
                  {d.assignedVehicleId ? "Assigned" : "Unassigned"}
                </span>
              </div>

              <p style={styles.text}>
                Vehicle:{" "}
                {d.assignedVehicleId
                  ? d.assignedVehicleId
                  : "None"}
              </p>

              <div style={styles.actions}>
                <button
                  style={styles.editBtn}
                  onClick={() => onEdit(d)}
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => {
                    if (window.confirm("Delete this driver?")) {
                      onDelete(d.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: "2rem",
    padding: "0 1rem",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1rem",
  },
  card: {
    background: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  name: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  badge: {
    padding: "3px 8px",
    borderRadius: "12px",
    fontSize: "0.75rem",
  },
  text: {
    margin: "0.5rem 0 1rem 0",
    color: "#444",
    fontSize: "0.9rem",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
  },
  editBtn: {
    flex: 1,
    padding: "6px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    cursor: "pointer",
  },
  deleteBtn: {
    flex: 1,
    padding: "6px",
    borderRadius: "6px",
    border: "none",
    background: "#ff4d4f",
    color: "#fff",
    cursor: "pointer",
  },
};