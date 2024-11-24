import * as tf from "@tensorflow/tfjs";

// Preprocess Data
const preprocessData = (data) => {
  const dates = data.map((item) => new Date(item.sales_date).getTime());
  const products = data.map((item) => (item.product_description === "Product A" ? 0 : 1));
  const quantities = data.map((item) => Number(item.quantity_sold));

  return {
    features: tf.tensor2d(dates.map((date, i) => [date, products[i]])),
    labels: tf.tensor2d(quantities, [quantities.length, 1]),
  };
};

// Train Model
export const trainModel = async (data) => {
  const { features, labels } = preprocessData(data);

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 32, activation: "relu", inputShape: [2] }));
  model.add(tf.layers.dense({ units: 16, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({
    optimizer: "adam",
    loss: "meanSquaredError",
  });

  await model.fit(features, labels, { epochs: 50 });
  return model;
};

// Predict Future Sales
export const predictSales = (model, data) => {
  const futureDates = Array.from({ length: 6 }, (_, i) =>
    new Date().setMonth(new Date().getMonth() + i)
  );

  const futureFeatures = tf.tensor2d(
    futureDates.map((date) => [date, 0]) // Predicting for Product A (adjust as needed)
  );

  const predictions = model.predict(futureFeatures);
  return Array.from(predictions.dataSync());
};
