declare namespace NodeJS {
  export interface ProcessEnv {
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRATION: string;
    ACCESS_TOKEN_EXPIRATION: string;
  }
}
