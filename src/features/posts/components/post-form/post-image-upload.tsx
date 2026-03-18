import { ActionIcon, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Image from "next/image";

interface CreatePostImageUploadProps {
  previewUrl: string | null;
  onDrop: (files: File[]) => void;
  onRemove: () => void;
  error?: React.ReactNode;
}

export function CreatePostImageUpload({
  previewUrl,
  onDrop,
  onRemove,
  error,
}: CreatePostImageUploadProps) {
  if (previewUrl) {
    return (
      <div className="mb-4">
        <div className="relative">
          <Image
            src={previewUrl}
            alt="Preview"
            width={600}
            height={400}
            className="w-full rounded-lg object-cover max-h-80"
          />
          <ActionIcon
            onClick={onRemove}
            variant="filled"
            color="red"
            radius="xl"
            classNames={{
              root: "absolute top-2 right-2",
            }}
            aria-label="Remove image"
          >
            X
          </ActionIcon>
        </div>
        {error && (
          <Text
            classNames={{
              root: "text-[var(--mantine-color-error)] text-sm mt-1",
            }}
          >
            {error}
          </Text>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <Dropzone
        onDrop={onDrop}
        accept={IMAGE_MIME_TYPE}
        maxSize={1000000}
        multiple={false}
        classNames={{
          root: "border-dashed border-2 border-[var(--mantine-color-default-border)] hover:border-blue-400 rounded-lg p-8 cursor-pointer transition-colors",
          inner: "flex flex-col items-center justify-center gap-2",
        }}
      >
        <Text
          classNames={{
            root: "text-[var(--mantine-color-dimmed)] text-center",
          }}
        >
          Drag an image here or click to select
        </Text>
        <Text
          classNames={{
            root: "text-xs text-[var(--mantine-color-dimmed)] text-center",
          }}
        >
          Max file size: 1MB. Accepts JPEG, PNG, GIF, WebP
        </Text>
      </Dropzone>
      {error && (
        <Text
          classNames={{
            root: "text-[var(--mantine-color-error)] text-sm mt-1",
          }}
        >
          {error}
        </Text>
      )}
    </div>
  );
}
