import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { eraseElement } from "@/lib/api/briaApi";
import type { EraseElementRequest } from "@/lib/api/requestTypes";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const EraseElement = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(30);
  const [recievedImg, setRecievedImage] = useState("");

  useEffect(() => {
    if (!imageFile) return;
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    img.onload = () => {
      const imageCanvas = imageCanvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      if (!imageCanvas || !maskCanvas) return;

      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;

      let { width, height } = img;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const aspectRatio = width / height;
        if (aspectRatio > 1) {
          // landscape
          width = MAX_WIDTH;
          height = MAX_WIDTH / aspectRatio;
        } else {
          // portrait
          height = MAX_HEIGHT;
          width = MAX_HEIGHT * aspectRatio;
        }
      }

      imageCanvas.width = width;
      imageCanvas.height = height;
      maskCanvas.width = width;
      maskCanvas.height = height;

      const ctx = imageCanvas.getContext("2d");
      ctx?.clearRect(0, 0, width, height); // clear previous
      ctx?.drawImage(img, 0, 0, width, height);
    };
  }, [imageFile]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(event);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    maskCanvasRef.current?.getContext("2d")?.beginPath();
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const ctx = maskCanvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";

    ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
  };

  const getImageBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
    });
  };

  const getMaskBase64 = (): string | null => {
    if (!maskCanvasRef.current) return null;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = maskCanvasRef.current.width;
    exportCanvas.height = maskCanvasRef.current.height;
    const exportCtx = exportCanvas.getContext("2d");

    if (exportCtx) {
      exportCtx.fillStyle = "black";
      exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
      exportCtx.drawImage(maskCanvasRef.current, 0, 0);
    }

    return exportCanvas.toDataURL("image/png").split(",")[1];
  };

  const clearMask = () => {
    const ctx = maskCanvasRef.current?.getContext("2d");
    const maskCanvas = maskCanvasRef.current;
    if (ctx && maskCanvas)
      ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
  };

  const {
    mutate: eraseElementFn,
    data: eraseElementData,
    isPending: isEraseElementPending,
    isError: isEraseElementError,
    error: eraseElementError,
    isSuccess: isEraseElementSuccess,
  } = useMutation({
    mutationFn: eraseElement,
    onSuccess: (data) => {
      setRecievedImage(data.result.image_url);
    },
  });

  const submitEraseElement = async () => {
    if (!imageFile || !prompt) {
      toast("Please upload an image and enter prompt.");
      return;
    }

    const originalImgBase64 = await getImageBase64(imageFile);
    const maskedImgbase64 = getMaskBase64();

    if (!maskedImgbase64) {
      toast("Please draw the image mask first!");
      return;
    }

    const eraseElementRequest: EraseElementRequest = {
      image: originalImgBase64,
      mask: maskedImgbase64,
      sync: true,
      mask_type: "manual",
    };
    console.log(eraseElementRequest);
    eraseElementFn(eraseElementRequest);
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center md:text-left">
        <p className="text-2xl font-bold mb-2">Erase Elements</p>
        <p className="font-grotesk font-semibold">
          Draw a mask on the area you want to erase!
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

      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {(imageFile || isEraseElementSuccess) && (
          <div className="relative lg:col-span-2 flex justify-center">
            {imageFile && (
              <div className="relative w-full max-w-[800px]">
                <canvas ref={imageCanvasRef} className="w-full h-auto" />
                <canvas
                  ref={maskCanvasRef}
                  className="absolute top-0 left-0 w-full h-auto cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseUp={endDrawing}
                  onMouseOut={endDrawing}
                  onMouseMove={draw}
                />
              </div>
            )}
            {isEraseElementSuccess && eraseElementData && (
              <div className="mt-5 relative w-full max-w-[800px]">
                <img src={recievedImg} alt="" className="w-full h-auto" />
              </div>
            )}
          </div>
        )}

        {(imageFile || recievedImg) && (
          <div className="flex flex-col">
            <p className="font-semibold text-xl mb-4">Brush Size</p>
            <Slider
              className="mb-8"
              min={5}
              max={100}
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(Number(value[0]))}
            />
            <Button className="mb-5 w-min" onClick={clearMask}>
              Reset Mask
            </Button>
            <div>
              <Button
                className="mb-5 w-min"
                onClick={submitEraseElement}
                disabled={isEraseElementPending}
              >
                {isEraseElementPending
                  ? "Generating Image..."
                  : "Generate Image"}
              </Button>
            </div>

            {isEraseElementError && (
              <div className="mt-5 text-red-600">
                <p className="font-bold text-base">Error</p>
                <p className="font-medium text-sm">
                  {eraseElementError instanceof Error
                    ? eraseElementError.message
                    : "Something went wrong"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EraseElement;
