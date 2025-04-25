import * as cocoSsd from '@tensorflow-models/coco-ssd';

export const detectObjects = async(image) => {
    const model = await cocoSsd.load();
    const predictions = await model.detect(image);
    return predictions;
};