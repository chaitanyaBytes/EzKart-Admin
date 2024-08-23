"use client";

import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageUplaodProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUplaod: React.FC<ImageUplaodProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const ref = useRef<any>();

  useEffect(() => {
    ref.current = onChange;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type={"button"}
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={(results) => {
          if (results.info) {
            const info = results.info as CloudinaryUploadWidgetInfo;
            ref.current(info.secure_url);
          }
        }}
        uploadPreset="qkhe10ur"
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <div className="flex space-x-2">
              <Button
                type="button"
                disabled={disabled}
                variant={"secondary"}
                onClick={onClick}
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Upload an Image
              </Button>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUplaod;
