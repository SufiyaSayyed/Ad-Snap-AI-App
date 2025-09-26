import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { replaceBackground } from "@/lib/api/briaApi";
import type { ReplaceBgReuqest } from "@/lib/api/requestTypes";
import { useMutation } from "@tanstack/react-query";
import { Settings, Square, Zap } from "lucide-react";
import { useState } from "react";
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
    <div className="w-full">
      <div className="mb-8 text-center md:text-left">
        <p className="text-2xl font-bold mb-2">Replace Background</p>
        <p className="font-grotesk font-semibold">
          Drop in a photo and describe the background you'd like to swap in!
        </p>
      </div>
      <div className="mb-6 flex justify-center md:justify-start">
        <label
          htmlFor="file-upload"
          className="bg-p-4  border border-border-2 hover:bg-p-1 px-6 py-3 rounded-xl"
        >
          Upload Image
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      {imageFile && (
        <div className="py-4 grid grid-cols-1 lg:grid-cols-3  gap-10">
          <div className="lg:col-span-2 w-full max-w-[800px]">
            <img
              src={URL.createObjectURL(imageFile)}
              alt=""
              className="w-full h-auto"
            />
          </div>
          <div className="relative inline-block lg:col-span-1">
            <p className="font-semibold text-xl mb-4">Enter Prompt: </p>
            <Textarea
              className="p-4 mb-6"
              value={prompt}
              placeholder="Enter your prompt"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <p className="font-semibold text-xl mb-4">Select Mode: </p>
            <ToggleGroup
              type="single"
              value={mode}
              className="rounded-md border p-1 mb-6 w-full sm:w-[20rem] flex flex-row justify-between text-xs sm:text-sm"
              onValueChange={(value) => setMode(value)}
            >
              <ToggleGroupItem
                value="base"
                className="data-[state=on]:bg-gray-100 data-[state=on]:text-gray-800 flex px-4 flex-row"
              >
                <Square className="mr-1 h-4 w-4" />
                Base
              </ToggleGroupItem>
              <ToggleGroupItem
                value="high_control"
                className="data-[state=on]:bg-gray-100 data-[state=on]:text-gray-800 flex flex-row px-10"
              >
                <Settings className="mr-1 h-4 w-4" />
                High Control
              </ToggleGroupItem>
              <ToggleGroupItem
                value="fast"
                className="data-[state=on]:bg-gray-100 data-[state=on]:text-gray-800 flex flex-row px-4"
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
        <div className="relative inline-block col-span-2 w-full max-w-[800px]">
          <img src={recievedImg} alt="" className="w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default ReplaceBackground;
