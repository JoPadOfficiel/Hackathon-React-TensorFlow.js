export const saveSnapshot = (imageSrc) => {
  if (!imageSrc) return;

  const snapshotData = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      image: imageSrc,
  };

  const existingSnapshots = JSON.parse(localStorage.getItem("snapshots")) || [];
  const updatedSnapshots = [snapshotData, ...existingSnapshots];
  localStorage.setItem("snapshots", JSON.stringify(updatedSnapshots));

  return updatedSnapshots;
};

export const getSnapshots = () => {
  return JSON.parse(localStorage.getItem("snapshots")) || [];
};
