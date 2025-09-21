import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { replaceBackground } from "@/lib/api/briaApi";
import type { ReplaceBgReuqest } from "@/lib/api/requestTypes";
import { useMutation } from "@tanstack/react-query";
import { Settings, Square, Zap } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ReplaceBackground = () => {
  const [mode, setMode] = useState("base");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [recievedImg, setRecievedImage] = useState("");

  const getImageBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
    });
  };

  const {
    mutate: replaceBgFn,
    data: replaceBgData,
    isPending: isReplaceBgPending,
    isError: isReplaceBgError,
    error: replaceBgError,
    isSuccess: isReplaceBgSuccess,
  } = useMutation({
    mutationFn: replaceBackground,
    onSuccess: (data) => {
      setRecievedImage(data.result.image_url);
    },
  });

  const submitReplaceBg = async () => {
    if (!imageFile || !prompt) {
      toast("Please upload an image and enter prompt.");
      return;
    }

    const originalImgBase64 = await getImageBase64(imageFile);

    const replaceBgRequest: ReplaceBgReuqest = {
      image: originalImgBase64,
      prompt: prompt,
      mode: mode,
      sync: true,
    };
    console.log(replaceBgRequest);
    replaceBgFn(replaceBgRequest);
  };

  return (
    <div className="p-4">
      <p className="mb-5">Pload image to replace background</p>
      <label htmlFor="file-upload" className="bg-gray-800 px-6 py-3 rounded-xl">
        Upload Image
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      {imageFile && (
        <div className="p-4 grid grid-cols-3 gap-10">
          <div className="col-span-2">
            <img src={URL.createObjectURL(imageFile)} alt="" />
          </div>
          <div className="relative inline-block col-span-1">
            <h1 className="mb-3">Enter Prompt: </h1>
            <Textarea
              className="p-4 mb-6"
              value={prompt}
              placeholder="Enter your prompt"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <h1 className="mb-3">Select Mode: </h1>
            <ToggleGroup
              type="single"
              value={mode}
              className="rounded-md border p-1 mb-6"
              onValueChange={(value) => setMode(value)}
            >
              <ToggleGroupItem
                value="base"
                className="data-[state=on]:bg-gray-100 data-[state=on]:text-gray-800 flex px-2 flex-row"
              >
                <Square className="mr-1 h-4 w-4" />
                Base
              </ToggleGroupItem>
              <ToggleGroupItem
                value="high_control"
                className="data-[state=on]:bg-gray-100 data-[state=on]:text-gray-800 flex flex-row px-8"
              >
                <Settings className="mr-1 h-4 w-4" />
                High Control
              </ToggleGroupItem>
              <ToggleGroupItem
                value="fast"
                className="data-[state=on]:bg-gray-100 data-[state=on]:text-gray-800 flex flex-row px-2"
              >
                <Zap className="mr-1 h-4 w-4" />
                Fast
              </ToggleGroupItem>
            </ToggleGroup>
            <Button
              className="mb-5"
              onClick={submitReplaceBg}
              disabled={isReplaceBgPending}
            >
              {isReplaceBgPending ? "Generating Image..." : "Generate Image"}
            </Button>
            {isReplaceBgError && (
              <div className="mt-5 text-red-600">
                <p className="font-bold text-base">Error</p>
                <p className="font-medium text-sm">
                  {replaceBgError instanceof Error
                    ? replaceBgError.message
                    : "Something went wrong"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {isReplaceBgSuccess && replaceBgData && (
        <div className="relative inline-block col-span-2">
          <img src={recievedImg} alt="" />
        </div>
      )}
    </div>
  );
};

export default ReplaceBackground;
