import express from "express";

const errorHandler = (error, _req, res, next) => {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    next(error);
  }
};

const securityHeaders = (_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  next();
};

export const viteServerBefore = (server) => {
  server.use(securityHeaders);
  server.use(express.json({ limit: "50mb" }));
  server.use(express.urlencoded({ extended: true, limit: "50mb" }));
};

export const viteServerAfter = (server) => {
  server.use(errorHandler);
};

export const serverBefore = (server) => {
  server.use(securityHeaders);
  server.use(express.json({ limit: "50mb" }));
  server.use(express.urlencoded({ extended: true, limit: "50mb" }));
};

export const serverAfter = (server) => {
  server.use(errorHandler);
};

export const handlerBefore = () => {};
export const handlerAfter = () => {};

export const callbackBefore = (callback) => callback;

export const serverListening = () => {
  console.log("DPM Enterprise server running");
};

export const serverError = (_port, error) => {
  console.error("Server error:", error);
};
