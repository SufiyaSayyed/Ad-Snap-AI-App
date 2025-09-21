import { client } from "./config";
import type {
  eraseElementRequest,
  GenFillImgRequest,
  ImageGenRequest,
} from "./requestTypes";

// const modelVersion = "2.2";

export const enhancePrompt = async (prompt: string) => {
  try {
    const response = await client.post("/v1/prompt_enhancer", { prompt });
    console.log("enhancePrompResponse: ", response);
    return response.data;
  } catch (error) {
    console.log("enhancePrompt api call error: ", error);
    throw error;
  }
};

export const generateImage = async (imageGenRequest: ImageGenRequest) => {
  console.log("imageGenRequest: ", imageGenRequest);
  console.log(imageGenRequest.model_version);
  try {
    const response = await client.post(
      `/v1/text-to-image/base/${imageGenRequest.model_version}`,
      imageGenRequest
    );
    console.log("imageGenResponse: ", response);
    return response.data;
  } catch (error) {
    console.log("ImageGen api call error: ", error);
    throw error;
  }
};

export const generateFillImage = async (
  genFillImgRequest: GenFillImgRequest
) => {
  console.log("genFillImgRequest: ", genFillImgRequest);
  try {
    const response = await client.post(
      "/v2/image/edit/gen_fill",
      genFillImgRequest
    );
    console.log("genFillImgResponse: ", response);
    return response.data;
  } catch (error) {
    console.log("genImgFill api call error: ", error);
    throw error;
  }
};

export const eraseElement = async (
  eraseElementRequest: eraseElementRequest
) => {
  console.log("eraseElementRequest: ", eraseElementRequest);
  try {
    const response = await client.post(
      "/v2/image/edit/erase",
      eraseElementRequest
    );
    console.log("eraseElementResponse: ", response);
    return response.data;
  } catch (error) {
    console.log("eraseElement api call error: ", error);
    throw error;
  }
};
