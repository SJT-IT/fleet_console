export default function DealerList({ dealers, onEdit, onDelete }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>All Dealers</h3>

      {dealers.length === 0 ? (
        <p style={styles.empty}>No dealers found</p>
      ) : (
        <div style={styles.grid}>
          {dealers.map((d) => (
            <div key={d.id} style={styles.card}>
              <div style={styles.header}>
                <span style={styles.name}>{d.name}</span>
                <span
                  style={{
                    ...styles.badge,
                    background:
                      d.status === "active" ? "#d4f8e8" : "#ffe0e0",
                    color:
                      d.status === "active" ? "#1b7f5c" : "#b00020",
                  }}
                >
                  {d.status}
                </span>
              </div>

              <p style={styles.email}>{d.email}</p>

              <div style={styles.meta}>
                <span>🚗 {d.totalVehicles ?? 0}</span>
                <span>👤 {d.totalDrivers ?? 0}</span>
              </div>

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
                    if (window.confirm("Delete this dealer?")) {
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
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
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
    textTransform: "capitalize",
  },
  email: {
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "0.5rem",
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.8rem",
    color: "#777",
    marginBottom: "1rem",
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