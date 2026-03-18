"use client";

import { hasLength, useForm } from "@mantine/form";
import type { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useCreatePost } from "@/features/posts/hooks/use-create-post";

export const MAX_CAPTION_LENGTH = 2200;

export function usePostForm() {
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
        { min: 1, max: MAX_CAPTION_LENGTH },
        "Caption is required",
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

  const handleSubmit = (onClose: () => void) =>
    form.onSubmit((values) => {
      if (!imageFile) {
        form.setFieldError("image", "Image is required");
        return;
      }

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

  const handleClose = (onClose: () => void) => {
    resetState();
    onClose();
  };

  return {
    form,
    previewUrl,
    isPending: createPost.isPending,
    handleDrop,
    handleRemoveImage,
    handleSubmit,
    handleClose,
  };
}
