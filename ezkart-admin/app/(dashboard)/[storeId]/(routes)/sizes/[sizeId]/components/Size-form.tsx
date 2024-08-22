"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Size } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUplaod from "@/components/ui/image-upload";

const formSchema = z.object({
  name: z.string().min(2, { message: "label must be atleast 2 characters" }),
  value: z.string().min(2, { message: "label must be atleast 2 characters" }),
});

type SizeformValues = z.infer<typeof formSchema>;

interface SizeformProps {
  initialData: Size | null;
}

export const SizeForm: React.FC<SizeformProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Size" : "Create Size";
  const description = initialData ? "Edit a Size" : "Add a new Size";
  const toastMessage = initialData ? "Size Updated" : "Size Created";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<SizeformValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: SizeformValues) => {
    try {
      setLoading(true);
      if (initialData) {
        const { data } = await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          values
        );
      } else {
        const { data } = await axios.post(
          `/api/${params.storeId}/sizes`,
          values
        );
      }
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success("Size Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Make sure you removed all products using this size first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-5 w-5" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"value"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
