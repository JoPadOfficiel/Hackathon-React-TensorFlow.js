const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setScreenshot(imageSrc);
  
      const snapshotData = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        image: imageSrc,
      };
  
  
      const isPresent = JSON.parse(localStorage.getItem("snapshots")) || [];
      const updated = [snapshotData, ...isPresent];
      localStorage.setItem("snapshots", JSON.stringify(updated));
  
      setSavedSnapshots(updated);
    }
  };
  