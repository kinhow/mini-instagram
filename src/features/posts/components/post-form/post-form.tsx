"use client";

import { Button, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import {
  MAX_CAPTION_LENGTH,
  usePostForm,
} from "@/features/posts/hooks/use-post-form";
import { CreatePostCaptionCounter } from "./post-caption-counter";
import { CreatePostImageUpload } from "./post-image-upload";

interface CreatePostFormProps {
  opened: boolean;
  onClose: () => void;
}

export function CreatePostForm({ opened, onClose }: CreatePostFormProps) {
  const {
    form,
    previewUrl,
    isPending,
    handleDrop,
    handleRemoveImage,
    handleSubmit,
    handleClose,
  } = usePostForm();

  return (
    <Modal
      opened={opened}
      onClose={() => handleClose(onClose)}
      title="Create New Post"
      size="lg"
    >
      <form onSubmit={handleSubmit(onClose)} className="flex flex-col gap-4">
        <TextInput
          {...form.getInputProps("author")}
          key={form.key("author")}
          label="Author"
          placeholder="Your name"
          classNames={{
            label: "pb-1.5",
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
              label: "pb-1.5",
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
          loading={isPending}
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
