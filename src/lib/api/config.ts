import axios from "axios";

export const briaConfig = {
  base_url: import.meta.env.VITE_BRIA_BASE_URL,
  api_key: import.meta.env.VITE_BRIA_API_KEY,
};

export const client = axios.create({
  baseURL: briaConfig.base_url,
  headers: {
    api_token: briaConfig.api_key,
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response?.status) {
      case 400:
        throw new Error("Bad Request, Please check your input prompt.");
      case 415:
        throw new error(
          "Unsupported Media Type. Invalid file type. Supported file types are jpeg, jpg, png, webp."
        );
      case 429:
        throw new Error(
          "Too Many Requests: Request limit exceeded. Try again later."
        );
      case 500:
        throw new Error(
          "Internal server error occured. Please try again later."
        );
      default:
        throw new Error("Unknown error occurred.");
    }
  }
);
