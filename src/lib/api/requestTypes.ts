export interface ImageGenRequest {
  prompt: string;
  model_version: string;
  num_results?: number;
  aspect_ratio?: string;
  sync?: boolean;
  negative_prompt?: string;
  steps_num?: number; // no of interations for model
  medium?: string;
  prompt_enhancement?: boolean;
  enhance_image?: boolean;
  content_moderation?: boolean;
  ip_signal?: boolean;
}
/* Args
prompt: The prompt to generate images from
api_key: API key for authentication
model_version: Model version to use (default: "2.2")
num_results: Number of images to generate (1-4)
aspect_ratio: Image aspect ratio ("1:1", "2:3", "3:2", etc.)
sync: Whether to wait for results or get URLs immediately
seed: Optional seed for reproducible results
negative_prompt: Elements to exclude from generation
steps_num: Number of refinement iterations (20-50)
text_guidance_scale: How closely to follow text (1-10)
medium: Generation medium ("photography" or "art")
prompt_enhancement: Whether to enhance the prompt
enhance_image: Whether to enhance image quality
content_moderation: Whether to enable content moderation
ip_signal: Whether to flag potential IP content */

export interface GenFillImgRequest {
  image: string;
  mask: string;
  prompt: string;
  sync: boolean;
  mask_type: string;
}

export interface eraseElementRequest {
  image: string;
  mask: string;
  sync: boolean;
  mask_type: string;
}
