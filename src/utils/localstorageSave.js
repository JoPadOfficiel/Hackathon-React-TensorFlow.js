const SNAPSHOTS_KEY =
    import.meta.env.VITE_SNAPSHOTS_KEY || 'tensor_vision_snapshots';

export const saveSnapshot = (imageSrc, detections = []) => {
    if (!imageSrc) return [];

    const snapshotData = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        image: imageSrc,
        detections,
        createdAt: new Date().toISOString(),
    };

    const existingSnapshots = getSnapshots();
    const updatedSnapshots = [snapshotData, ...existingSnapshots];

    try {
        localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(updatedSnapshots));
        return updatedSnapshots;
    } catch (error) {
        console.error('Erreur lors de la sauvegarde des captures:', error);
        return existingSnapshots;
    }
};

export const getSnapshots = () => {
    try {
        const snapshots = localStorage.getItem(SNAPSHOTS_KEY);
        return snapshots ? JSON.parse(snapshots) : [];
    } catch (error) {
        console.error('Erreur lors de la récupération des captures:', error);
        return [];
    }
};

export const deleteSnapshot = (id) => {
    const snapshots = getSnapshots();
    const updatedSnapshots = snapshots.filter(snap => snap.id !== id);

    try {
        localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(updatedSnapshots));
        return updatedSnapshots;
    } catch (error) {
        console.error('Erreur lors de la suppression de la capture:', error);
        return snapshots;
    }
};

export const clearSnapshots = () => {
    try {
        localStorage.removeItem(SNAPSHOTS_KEY);
        return [];
    } catch (error) {
        console.error('Erreur lors de la suppression des captures:', error);
        return getSnapshots();
    }
};