import * as ort from "onnxruntime-web";

export const MODEL_PATH =
  "/models/fashion/fashion_model.onnx";

export const CLASS_PATH =
  "/models/fashion/class_names.json";

export const TREND_ANALYSIS_PATH =
  "/data/trend_analysis.json";

const DEFAULT_INPUT_SIZE = 224;

ort.env.wasm.numThreads = 1;

let resourcesPromise = null;

async function fetchJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(
      `File tidak ditemukan: ${path} (HTTP ${response.status})`
    );
  }

  return response.json();
}

async function createResources() {
  console.log("Memuat model ONNX dan data tren...");

  const [
    model,
    classNames,
    trendData,
  ] = await Promise.all([
    ort.InferenceSession.create(
      MODEL_PATH,
      {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "all",
      }
    ),

    fetchJson(CLASS_PATH),

    fetchJson(TREND_ANALYSIS_PATH),
  ]);

  if (!Array.isArray(classNames)) {
    throw new Error(
      "class_names.json harus berupa array."
    );
  }

  if (!trendData?.categories) {
    throw new Error(
      "trend_analysis.json tidak memiliki objek categories."
    );
  }

  console.log("Model ONNX berhasil dimuat");
  console.log("Input model:", model.inputNames);
  console.log("Output model:", model.outputNames);
  console.log("Daftar kelas:", classNames);
  console.log(
    "Kategori tren:",
    Object.keys(trendData.categories)
  );

  return {
    model,
    classNames,
    trendData,
    trendMeta: trendData.meta ?? null,
    inputSize: DEFAULT_INPUT_SIZE,
  };
}

export async function loadFashionModel() {
  if (!resourcesPromise) {
    resourcesPromise =
      createResources().catch((error) => {
        resourcesPromise = null;
        throw error;
      });
  }

  return resourcesPromise;
}

export function preprocessImage(
  imageElement,
  inputSize = DEFAULT_INPUT_SIZE
) {
  if (!imageElement) {
    throw new Error(
      "Elemen gambar tidak tersedia."
    );
  }

  if (
    !imageElement.complete ||
    imageElement.naturalWidth === 0
  ) {
    throw new Error(
      "Gambar belum selesai dimuat."
    );
  }

  const canvas =
    document.createElement("canvas");

  canvas.width = inputSize;
  canvas.height = inputSize;

  const context = canvas.getContext(
    "2d",
    {
      willReadFrequently: true,
    }
  );

  if (!context) {
    throw new Error(
      "Canvas browser tidak dapat digunakan."
    );
  }

  context.drawImage(
    imageElement,
    0,
    0,
    inputSize,
    inputSize
  );

  const imageData = context.getImageData(
    0,
    0,
    inputSize,
    inputSize
  );

  const rgbaPixels = imageData.data;

  const pixelCount =
    inputSize * inputSize;

  const tensorData =
    new Float32Array(
      3 * pixelCount
    );

  for (
    let pixel = 0;
    pixel < pixelCount;
    pixel += 1
  ) {
    const rgbaIndex = pixel * 4;

    // Sama dengan transforms.ToTensor():
    // nilai RGB 0–255 menjadi 0–1.
    const red =
      rgbaPixels[rgbaIndex] / 255;

    const green =
      rgbaPixels[rgbaIndex + 1] / 255;

    const blue =
      rgbaPixels[rgbaIndex + 2] / 255;

    // Format NCHW: [1, 3, 224, 224]
    tensorData[pixel] = red;

    tensorData[
      pixelCount + pixel
    ] = green;

    tensorData[
      2 * pixelCount + pixel
    ] = blue;
  }

  return new ort.Tensor(
    "float32",
    tensorData,
    [
      1,
      3,
      inputSize,
      inputSize,
    ]
  );
}

function softmax(values) {
  const logits = Array.from(values);

  if (logits.length === 0) {
    throw new Error(
      "Output model kosong."
    );
  }

  const maximumLogit =
    Math.max(...logits);

  const exponentials = logits.map(
    (logit) =>
      Math.exp(logit - maximumLogit)
  );

  const total =
    exponentials.reduce(
      (sum, value) => sum + value,
      0
    );

  if (
    !Number.isFinite(total) ||
    total === 0
  ) {
    throw new Error(
      "Softmax gagal menghitung probabilitas."
    );
  }

  return exponentials.map(
    (value) => value / total
  );
}

export async function predictFashion({
  model,
  imageElement,
  inputSize = DEFAULT_INPUT_SIZE,
  classNames,
  trendData,
  trendMeta,
}) {
  if (!model) {
    throw new Error(
      "Model ONNX belum dimuat."
    );
  }

  if (!Array.isArray(classNames)) {
    throw new Error(
      "Daftar kelas tidak valid."
    );
  }

  const inputTensor =
    preprocessImage(
      imageElement,
      inputSize
    );

  const inputName =
    model.inputNames[0];

  const outputName =
    model.outputNames[0];

  const outputs = await model.run({
    [inputName]: inputTensor,
  });

  const outputTensor =
    outputs[outputName];

  if (!outputTensor) {
    throw new Error(
      "Model tidak menghasilkan output."
    );
  }

  const probabilities = softmax(
    outputTensor.data
  );

  const predictions = probabilities
    .map(
      (
        confidence,
        index
      ) => ({
        kategori:
          classNames[index] ??
          `class_${index}`,

        confidence,
      })
    )
    .sort(
      (first, second) =>
        second.confidence -
        first.confidence
    );

  const topPrediction =
    predictions[0];

  if (!topPrediction) {
    throw new Error(
      "Prediksi model tidak tersedia."
    );
  }

  const category =
    topPrediction.kategori;

  const categoryTrend =
    trendData?.categories?.[
      category
    ] ?? null;

  return {
    kategori: category,

    confidence:
      topPrediction.confidence,

    topPredictions:
      predictions.slice(0, 3),

    trend: categoryTrend,

    trendMeta:
      trendMeta ?? null,
  };
}