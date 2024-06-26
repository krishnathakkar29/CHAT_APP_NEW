const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:4173",
    // process.env.CLIENT_URL,
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

export { corsOptions };
