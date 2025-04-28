import * as cocoSsd from '@tensorflow-models/coco-ssd';

export const loadDetectionModel = async() => {
    try {
        const model = await cocoSsd.load();
        console.log("✅ Modèle COCO-SSD chargé !");
        return model;
    } catch (error) {
        console.error("Erreur lors du chargement du modèle :", error);
        throw error;
    }
};

export const detectObjects = async(image) => {
    const model = await cocoSsd.load();
    const predictions = await model.detect(image);
    return predictions;
};

export const detectAndDraw = async(model, video, canvas) => {
    if (!model || !video || !canvas || video.readyState !== 4) {
        return;
    }

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const predictions = await model.detect(video);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction.bbox;

        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = "#00FF00";
        const textWidth = ctx.measureText(prediction.class).width;
        ctx.fillRect(x, y > 10 ? y - 20 : y + 5, textWidth + 4, 20);

        ctx.fillStyle = "#000000";
        ctx.font = "16px Arial";
        ctx.fillText(prediction.class, x + 2, y > 10 ? y - 5 : y + 18);
    });

    return predictions;
};