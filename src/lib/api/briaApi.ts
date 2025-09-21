import { client } from "./config";
import type { GenFillImgRequest, ImageGenRequest } from "./requestTypes";

// const modelVersion = "2.2";

export const enhancePrompt = async (prompt: string) => {
  try {
    const response = await client.post("/v1/prompt_enhancer", { prompt });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("enhancePrompt api call error: ", error);
    throw error;
  }
};

export const generateImage = async (imageGenRequest: ImageGenRequest) => {
  console.log(imageGenRequest);
  console.log(imageGenRequest.model_version);
  try {
    const response = await client.post(
      `/v1/text-to-image/base/${imageGenRequest.model_version}`,
      imageGenRequest
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("ImageGen api call error: ", error);
    throw error;
  }
};

export const generateFillImage = async (
  genFillImgRequest: GenFillImgRequest
) => {
  console.log(genFillImgRequest);
  try {
    const response = await client.post(
      "/v2/image/edit/gen_fill",
      genFillImgRequest
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("genImgFill api call error: ", error);
    throw error;
  }
};
