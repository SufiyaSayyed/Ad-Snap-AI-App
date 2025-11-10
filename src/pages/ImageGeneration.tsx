import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { enhancePrompt, generateImage } from "@/lib/api/briaApi";
import type { ImageGenRequest } from "@/lib/api/requestTypes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { ImageGenResult } from "@/lib/api/responseTypes";
import { toast } from "sonner";

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [options, setOptions] = useState({
    num_results: 1,
    aspect_ratio: "1:1",
    medium: "art",
    enhance_image: false,
  });

  const updateOptions = <K extends keyof typeof options>(
    key: K,
    value: (typeof options)[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
    console.log(options);
  };

  const {
    mutate: enhancePromptMutate,
    isPending: isEnhancePending,
    data: enhanceData,
    isSuccess: isEnhanceSuccess,
    isError: isEnhanceError,
    error: enhanceError,
  } = useMutation({
    mutationFn: enhancePrompt,
    onSuccess: (data) => {
      setEnhancedPrompt(data["prompt variations"]);
    },
  });

  const {
    mutate: genImageMutate,
    isPending: isGenImagePending,
    data: genImageData,
    isSuccess: isGenImageSuccess,
    isError: isGenImageError,
    error: genImageError,
  } = useMutation({
    mutationFn: generateImage,
  });

  const submitPrompt = () => {
    if (!prompt.trim()) {
      toast("Please enter prompt.");
      return;
    }
    enhancePromptMutate(prompt);
  };

  const submitToGenerateImage = () => {
    if (!prompt) {
      toast("Please enter a prompt first!");
      return;
    }
    const genImageRequest: ImageGenRequest = {
      prompt: enhancedPrompt ? enhancedPrompt : prompt,
      model_version: "3.2",
      sync: true,
      ...options,
    };
    genImageMutate(genImageRequest);
  };

  const OptionsSection = () => (
    <>
      <div>
        <p className="mb-4">Aspect Ratio</p>
        <Select
          value={options.aspect_ratio}
          onValueChange={(value) => updateOptions("aspect_ratio", value)}
        >
          <SelectTrigger className="w-[12rem]">
            <SelectValue placeholder="Select aspect ratio" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="1:1">1:1</SelectItem>
              <SelectItem value="2:3">2:3</SelectItem>
              <SelectItem value="3:2">3:2</SelectItem>
              <SelectItem value="3:4">3:4</SelectItem>
              <SelectItem value="4:3">4:3</SelectItem>
              <SelectItem value="4:5">4:5</SelectItem>
              <SelectItem value="5:4">5:4</SelectItem>
              <SelectItem value="9:16">9:16</SelectItem>
              <SelectItem value="16:9">16:9</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Number of Images */}
      <div className="w-full relative">
        <p className="mb-3">Number of Images</p>
        <Slider
          value={[options.num_results]}
          defaultValue={[1]}
          min={1}
          max={4}
          step={1}
          onValueChange={(val) => updateOptions("num_results", val[0])}
          className="mb-8"
        />
        <div className="absolute w-full flex justify-between px-0 top-12">
          {Array.from({ length: 4 }, (_, i) => (
            <span
              key={i}
              className={`text-sm ${
                options.num_results === i + 1
                  ? "font-bold text-white"
                  : "text-gray-500"
              }`}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Enhance Image */}
      <div className="flex flex-row gap-3 items-center">
        <Switch
          checked={options.enhance_image}
          onCheckedChange={(value) => updateOptions("enhance_image", value)}
        />
        <p>Enhance Image</p>
      </div>

      {/* Style Options */}
      <div>
        <p className="mb-4">Style Options</p>
        <Select
          value={options.medium}
          onValueChange={(value) => updateOptions("medium", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select style option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  return (
    <div className="w-full">
      <div className="text-center md:text-left">
        <p className="text-2xl font-bold mb-2">Generate HD Images</p>
        <p className="font-grotesk font-semibold">
          Enter prompt and adjust settings to generate image!
        </p>
      </div>

      {/* Main Layout */}
      <div className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Prompt Section */}
        <div className="flex flex-col lg:col-span-2 order-1">
          <p className="font-semibold text-xl mb-4">Enter prompt</p>
          <Textarea
            className="p-5 w-full border rounded-xl text-base"
            placeholder="Write your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          {/* Enhance Button */}
          <div>
            <Button
              className="mt-5"
              onClick={submitPrompt}
              disabled={isEnhancePending}
            >
              {isEnhancePending ? "Enhancing..." : "Enhance Prompt"}
            </Button>
          </div>

          {/* Enhanced Prompt Results */}
          {isEnhanceSuccess && enhanceData && (
            <div className="mt-5">
              <p className="font-medium text-lg underline">Original Prompt:</p>
              <p className="mt-2 text-sm">{prompt}</p>
              <p className="mt-5 font-medium text-lg underline">
                Enhanced Prompt:
              </p>
              <p className="mt-2 text-sm">{enhancedPrompt}</p>
            </div>
          )}
          {isEnhanceError && (
            <div className="mt-5 text-red-600">
              <p className="font-bold text-base">Error</p>
              <p className="font-medium text-sm">
                {enhanceError instanceof Error
                  ? enhanceError.message
                  : "Something went wrong"}
              </p>
            </div>
          )}

          {/* On mobile, show options right after textarea */}
          <div className="block lg:hidden mt-6 flex flex-col gap-5">
            <OptionsSection />
          </div>

          {/* Generate Image Button */}
          <div>
            <Button
              className="mt-5"
              onClick={submitToGenerateImage}
              disabled={isGenImagePending}
            >
              {isGenImagePending ? "Generating Image..." : "Generate Image"}
            </Button>
          </div>

          {/* Generated Images */}
          {isGenImageSuccess && genImageData && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6 order-3">
              {genImageData?.result.flatMap(
                (item: ImageGenResult, idx: number) =>
                  item.urls.map((url: string, index: number) => (
                    <div
                      key={`${idx}-${index}`}
                      className="flex flex-col items-center"
                    >
                      <img
                        src={url}
                        alt={`Generated ${idx}-${index}`}
                        className="w-64 h-64 object-cover rounded-lg border"
                      />
                      <a
                        href={url}
                        download={`image_${idx}_${index}.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 px-3 py-1 text-sm bg-primary text-white border border-border-2 hover:bg-secondary-foreground hover:text-accent-foreground rounded-lg"
                      >
                        Download
                      </a>
                    </div>
                  ))
              )}
            </div>
          )}

          {isGenImageError && (
            <div className="mt-5 text-red-600">
              <p className="font-bold text-base">Error</p>
              <p className="font-medium text-sm">
                {genImageError instanceof Error
                  ? genImageError.message
                  : "Something went wrong"}
              </p>
            </div>
          )}
        </div>

        {/* Options Section (Desktop only) */}
        <div className="hidden lg:flex flex-col gap-5 order-2">
          <OptionsSection />
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;
