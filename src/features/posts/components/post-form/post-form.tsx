"use client";

import { Button, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import type { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useCreatePost } from "@/features/posts/hooks/use-create-post";
import { CreatePostCaptionCounter } from "./post-caption-counter";
import { CreatePostImageUpload } from "./post-image-upload";

const MAX_CAPTION_LENGTH = 2200;

interface CreatePostFormProps {
  opened: boolean;
  onClose: () => void;
}

export function CreatePostForm({ opened, onClose }: CreatePostFormProps) {
  const createPost = useCreatePost();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      author: "",
      caption: "",
      image: "",
    },
    validate: {
      author: hasLength({ min: 2, max: 40 }, "Author must be 2-40 characters"),
      caption: hasLength(
        { max: MAX_CAPTION_LENGTH },
        `Caption must be under ${MAX_CAPTION_LENGTH} characters`,
      ),
    },
  });

  const resetState = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreviewUrl(null);
    setImageFile(null);
    form.reset();
  };

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setPreviewUrl(url);
    setImageFile(file);
  };

  const handleRemoveImage = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreviewUrl(null);
    setImageFile(null);
  };

  const handleSubmit = form.onSubmit((values) => {
    createPost.mutate(
      {
        author: values.author,
        caption: values.caption,
        image: imageFile ?? undefined,
      },
      {
        onSuccess: () => {
          resetState();
          onClose();
        },
        onError: (error: AxiosError) => {
          if (error.response) {
            switch (error.response.status) {
              case 413:
                form.setFieldError(
                  "image",
                  "Image is too large. Please upload an image under 1MB.",
                );
                return;
              case 415:
                form.setFieldError(
                  "image",
                  "Unsupported file type. Please upload a JPEG, PNG, or GIF.",
                );
                return;
              case 400:
                form.setFieldError(
                  "caption",
                  "Invalid input. Please check your fields and try again.",
                );
                return;
            }
          }
          form.setFieldError(
            "caption",
            "Something went wrong. Please try again.",
          );
        },
      },
    );
  });

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Create New Post"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          {...form.getInputProps("author")}
          key={form.key("author")}
          label="Author"
          placeholder="Your name"
          classNames={{
            input: "focus:border-blue-500",
          }}
        />

        <Stack gap={4}>
          <Textarea
            {...form.getInputProps("caption")}
            key={form.key("caption")}
            label="Caption"
            placeholder="Write a caption..."
            minRows={3}
            classNames={{
              input: "focus:border-blue-500",
            }}
          />

          <CreatePostCaptionCounter
            current={form.getValues().caption.length}
            max={MAX_CAPTION_LENGTH}
          />
        </Stack>

        <CreatePostImageUpload
          previewUrl={previewUrl}
          onDrop={handleDrop}
          onRemove={handleRemoveImage}
          error={form.errors.image}
        />

        <Button
          type="submit"
          loading={createPost.isPending}
          fullWidth
          classNames={{
            root: "bg-blue-500 hover:bg-blue-600",
          }}
        >
          Create Post
        </Button>
      </form>
    </Modal>
  );
}
