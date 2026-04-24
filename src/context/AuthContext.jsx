import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // add this

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [dealerId, setDealerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      setUser(null);
      setRole(null);
      setDealerId(null);
      setLoading(false);
      return;
    }

    setUser(firebaseUser);

    const ref = doc(db, "users", firebaseUser.uid);
    const snap = await getDoc(ref);

    let userData;

    // IF USER DOES NOT EXIST → CREATE
    if (!snap.exists()) {
      userData = {
        userId: firebaseUser.uid,
        username: firebaseUser.email,

        role: "Driver",
        dealerId: null,
        vehicleId: null,

        fullName: "",
        phoneNumber: "",
        drivingLicenseNumber: "",

        status: "pending",
        isProfileComplete: false,
        isApproved: false,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(ref, userData);
      console.log("NEW USER CREATED");
    } else {
      userData = snap.data();
    }

    // SET STATE ONCE
    setRole(userData.role);
    setDealerId(userData.dealerId);

    // NAVIGATION
    if (userData.role === "Admin") navigate("/admin");
    else if (userData.role === "Dealer") navigate("/dealer");

    setLoading(false);
  });

  return () => unsub();
  }, []);
  return (
    <AuthContext.Provider value={{ user, role, dealerId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);