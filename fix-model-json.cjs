const fs = require("fs");
const path = require("path");

const modelPath = path.join(
  __dirname,
  "public",
  "models",
  "fashion",
  "model.json"
);

function normalizeDType(value) {
  if (value && typeof value === "object") {
    return value?.config?.name || value?.name || "float32";
  }

  return value;
}

function convertInboundNodes(layer) {
  const inboundNodes = layer?.inbound_nodes;

  if (!Array.isArray(inboundNodes)) return;

  layer.inbound_nodes = inboundNodes.map((node) => {
    if (Array.isArray(node)) {
      return node;
    }

    if (!node || typeof node !== "object") {
      return node;
    }

    const args = Array.isArray(node.args) ? node.args : [];
    const kwargs = node.kwargs || {};

    const converted = args
      .map((arg) => {
        const history = arg?.config?.keras_history;

        if (!Array.isArray(history)) return null;

        return [
          history[0],
          history[1] ?? 0,
          history[2] ?? 0,
          kwargs
        ];
      })
      .filter(Boolean);

    return converted;
  });
}

function patchObject(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(patchObject);
    return;
  }

  if (!obj || typeof obj !== "object") return;

  if ("quantization_config" in obj) {
    delete obj.quantization_config;
  }

  if ("dtype" in obj) {
    obj.dtype = normalizeDType(obj.dtype);
  }

  if (obj.class_name === "InputLayer" && obj.config) {
    if (obj.config.batch_shape && !obj.config.batchInputShape) {
      obj.config.batchInputShape = obj.config.batch_shape;
      delete obj.config.batch_shape;
    }

    if (obj.config.batch_input_shape && !obj.config.batchInputShape) {
      obj.config.batchInputShape = obj.config.batch_input_shape;
      delete obj.config.batch_input_shape;
    }

    if (obj.config.dtype) {
      obj.config.dtype = normalizeDType(obj.config.dtype);
    }
  }

  if (obj.config && obj.config.dtype) {
    obj.config.dtype = normalizeDType(obj.config.dtype);
  }

  if (obj.config && Array.isArray(obj.config.layers)) {
    obj.config.layers.forEach((layer) => {
      if (layer.config && layer.config.dtype) {
        layer.config.dtype = normalizeDType(layer.config.dtype);
      }

      if (layer.config && "quantization_config" in layer.config) {
        delete layer.config.quantization_config;
      }

      convertInboundNodes(layer);
    });
  }

  if (obj.inbound_nodes) {
    convertInboundNodes(obj);
  }

  Object.values(obj).forEach(patchObject);
}

const raw = fs.readFileSync(modelPath, "utf-8");
const modelJson = JSON.parse(raw);

patchObject(modelJson);

fs.writeFileSync(modelPath, JSON.stringify(modelJson, null, 2));

console.log("model.json berhasil dipatch penuh:", modelPath);