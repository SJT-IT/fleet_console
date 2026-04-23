import {
  createDoc,
  getDocsWithQuery,
  updateDocById,
  deleteDocById,
} from "./baseService";
import { doc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase/config";

// CREATE DRIVER
export const createDriver = async (data, dealerId) => {
  return await createDoc("users", {
    ...data,
    role: "driver",
    dealerId,
    createdAt: new Date(),
  });
};

// GET DRIVERS
export const getDrivers = async (role, dealerId) => {
  if (role === "admin") {
    return await getDocsWithQuery("users", [
      where("role", "==", "driver"),
    ]);
  }

  return await getDocsWithQuery("users", [
    where("role", "==", "driver"),
    where("dealerId", "==", dealerId),
  ]);
};

// DELETE DRIVER
export const deleteDriver = async (id) => {
  return await deleteDocById("users", id);
};

// assign driver to vehicle
export const assignDriverToVehicle = async (driverId, vehicleId) => {
  const ref = doc(db, "users", driverId);

  await updateDoc(ref, {
    assignedVehicleId: vehicleId,
  });
};