export default function VehicleList({ vehicles, onEdit, onDelete }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Vehicles</h3>

      {vehicles.length === 0 ? (
        <p style={styles.empty}>No vehicles found</p>
      ) : (
        <div style={styles.grid}>
          {vehicles.map((v) => (
            <div key={v.id} style={styles.card}>
              <div style={styles.header}>
                <span style={styles.plate}>{v.licensePlate}</span>
                <span
                  style={{
                    ...styles.status,
                    background:
                      v.status === "active" ? "#d4f8e8" : "#ffe0e0",
                    color:
                      v.status === "active" ? "#1b7f5c" : "#b00020",
                  }}
                >
                  {v.status}
                </span>
              </div>

              <p style={styles.text}>
                {v.make} {v.model}
              </p>

              <div style={styles.actions}>
                <button
                  style={styles.editBtn}
                  onClick={() => onEdit(v)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => onDelete(v.id)}
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
  plate: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  status: {
    padding: "3px 8px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    textTransform: "capitalize",
  },
  text: {
    margin: "0.5rem 0 1rem 0",
    color: "#444",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
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