declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_BACKEND_URL: string;
    readonly NEXT_PUBLIC_SOCKET_API_URL: string;
    readonly NEXT_PUBLIC_SIMULATION_URL: string;
    readonly NEXT_PUBLIC_BACKEND_SIMULATION_URL: string;
    readonly NEXT_PRIVATE_TOKEN: string;
    readonly NEXT_PUBLIC_DOMAIN_COOKIE: string;
    readonly NEXT_PUBLIC_ENV: "PROD" | "DEV";
    readonly NEXT_PUBLIC_YANDEX_CAPTCHA_KEY: string;
  }
}
