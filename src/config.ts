export const devMode = process.env.NODE_ENV === "development"
if (devMode) console.log("Running in development mode");

export const backendUrl = devMode ? "http://localhost:8080" : "https://tongames.online";
export const botUsername =  devMode ? "stillnowoman_bot" : "myCasinoTestbot";

