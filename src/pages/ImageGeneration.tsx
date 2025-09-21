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

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [options, setOptions] = useState({
    num_results: 1,
    aspect_ratio: "1:1",
    medium: "art",
    enhance_image: false,
  });

  const updateOptions = (key: keyof typeof options, value: any) => [
    setOptions((prev) => ({ ...prev, [key]: value })),
  ];

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
    if (!prompt.trim()) return;
    enhancePromptMutate(prompt);
  };

  const submitToGenerateImage = () => {
    const genImageRequest: ImageGenRequest = {
      prompt: enhancedPrompt ? enhancedPrompt : prompt,
      model_version: "3.2",
      sync: true,
      ...options,
    };
    genImageMutate(genImageRequest);
  };

  return (
    <div className="p-4 grid grid-cols-3 gap-10">
      <div className="flex flex-col col-span-2">
        <h1 className="font-semibold text-xl mb-4">Enter prompt</h1>
        <Textarea
          className="p-5 w-full border rounded-xl text-base"
          placeholder="Write your prompt..."
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <div>
          <Button
            className="mt-5"
            onClick={submitPrompt}
            disabled={isEnhancePending}
          >
            {isEnhancePending ? "Enhancing..." : "Enhance Prompt"}
          </Button>
        </div>

        {isEnhanceSuccess && enhanceData && (
          <div className="mt-5">
            <h1 className="font-medium text-lg underline">Original Prompt:</h1>
            <p className="mt-2 text-sm">{prompt}</p>
            <h1 className="mt-5 font-medium text-lg underline">
              Enhanced Prompt:
            </h1>
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
        <div>
          <Button
            className="mt-5"
            onClick={submitToGenerateImage}
            disabled={isGenImagePending}
          >
            {isGenImagePending ? "Generating Image..." : "Generate Image"}
          </Button>
        </div>
        {isGenImageSuccess && genImageData && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {genImageData?.result.flatMap((item: ImageGenResult, idx: number) =>
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
                    className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg"
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

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="mb-4">Aspect Ratio</h1>
          <Select
            onValueChange={(value) => updateOptions("aspect_ratio", value)}
          >
            <SelectTrigger className="w-[180px]">
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
        <div className="w-full relative">
          {/* Title */}
          <h1 className="mb-3">Number of Images</h1>

          {/* Slider */}
          <Slider
            value={[options.num_results]}
            defaultValue={[1]}
            max={4}
            step={1}
            onValueChange={(val) => updateOptions("num_results", val[0])}
            className="mb-8"
          />

          {/* Labels aligned with steps */}
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
        <div className="flex flex-row gap-3 items-center">
          <Switch
            checked={options.enhance_image}
            onCheckedChange={(value) => {
              updateOptions("enhance_image", value);
            }}
          />
          <h1>Enhance Image</h1>
        </div>
        <div>
          <h1 className="mb-4">Style Options</h1>
          <Select onValueChange={(value) => updateOptions("medium", value)}>
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
      </div>
    </div>
  );
};

export default ImageGeneration;
