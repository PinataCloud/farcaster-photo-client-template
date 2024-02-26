import { useState } from "react";
import { Expand } from "lucide-react";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DynamicImage({ image, author, text }: {image: string; author: string, text: string }) {
  const [imageUrl, setImageUrl] = useState(image);
  const [error, setError] = useState(false);

  const handleImageError = () => {
    setError(true);
    setImageUrl("/placeholder.webp");
  };

  if (error) {
    return null;
  }

  if (image.includes("/ipfs")) {
    let rawUrl = new URL(image);
    rawUrl.search = "";

    return (
      <div>
        <div className="relative flex flex-col gap-2">
          <DialogTrigger>
            <Expand className="absolute opacity-60 bottom-2 right-2" />
          </DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <img
                  src={imageUrl}
                  className="object-cover sm:max-w-[500px]"
                  alt="image"
                  onError={handleImageError}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="sm:max-w-[500px] max-w-screen">{text}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="font-bold text-gray-500">@{author}</p>
        <DialogContent className="sm:max-h-screen sm:max-w-screen max-w-screen max-h-screen overflow-scroll">
          <img
            src={rawUrl.toString()}
            className="object-scale-down m-auto max-w-screen max-h-screen"
            alt="image"
            onError={handleImageError}
          />
        </DialogContent>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                src={imageUrl}
                className="object-cover sm:max-w-[500px]"
                alt="image"
                onError={handleImageError}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="sm:max-w-[500px] max-w-screen">{text}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p className="font-bold text-gray-500">@{author}</p>
      </div>
    );
  }
}
