declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      NODE_ENV: "development" | "production";
    }
  }
}
export {};
