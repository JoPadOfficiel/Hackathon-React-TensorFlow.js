import * as cocoSsd from '@tensorflow-models/coco-ssd';

const CLASS_COLORS = {
    person: '#FF3B30',
    bicycle: '#5AC8FA',
    car: '#FFCC00',
    motorcycle: '#FF9500',
    airplane: '#4CD964',
    bus: '#5856D6',
    train: '#007AFF',
    truck: '#FF2D55',
    boat: '#34AADC',
    default: '#4CD964',
};

const CONFIDENCE_THRESHOLD = 0.5;

export const loadDetectionModel = async() => {
    try {
        console.log('Chargement du modèle COCO-SSD...');
        const model = await cocoSsd.load({
            base: 'lite_mobilenet_v2'
        });
        console.log('✅ Modèle COCO-SSD chargé avec succès!');
        return model;
    } catch (error) {
        console.error('❌ Erreur lors du chargement du modèle:', error);
        throw error;
    }
};

export const detectObjects = async(model, source) => {
    if (!model || !source) {
        console.warn('Modèle ou source non disponible');
        return [];
    }

    try {
        const predictions = await model.detect(source);
        return predictions.filter(pred => pred.score >= CONFIDENCE_THRESHOLD);
    } catch (error) {
        console.error('Erreur lors de la détection:', error);
        return [];
    }
};

export const detectAndDraw = async(model, video, canvas) => {
    if (!model || !video || !canvas) {
        return [];
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
        const predictions = await detectObjects(model, video);

        predictions.forEach(prediction => {
            const [x, y, width, height] = prediction.bbox;
            const { class: className, score } = prediction;

            const color = CLASS_COLORS[className] || CLASS_COLORS.default;

            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, height);

            ctx.fillStyle = color;
            const textWidth = ctx.measureText(`${className} - ${Math.round(score * 100)}%`).width;
            ctx.fillRect(x, y > 10 ? y - 25 : y + height, textWidth + 10, 25);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = '16px Arial';
            ctx.fillText(
                `${className} - ${Math.round(score * 100)}%`,
                x + 5,
                y > 10 ? y - 7 : y + height + 18
            );
        });

        return predictions;
    } catch (error) {
        console.error('Erreur lors de la détection et du dessin:', error);
        return [];
    }
};