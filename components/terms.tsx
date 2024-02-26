"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  accept: z.boolean().default(false).optional(),
});

export function Terms({ loading, startFarcasterSignerProcess }: any) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accept: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.accept) {
      startFarcasterSignerProcess();
    } else {
      toast({
        title: "Please accept terms before continuing",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center justify-center">
        <FormField
          control={form.control}
          name="accept"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I acknowledge and accept the risks that sign-in with Warpcast is not stable and
                  could fail
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button
          style={{
            cursor: loading ? "not-allowed" : "pointer",
          }}
          className=""
          disabled={loading}
          type="submit"
        >
          {loading ? "Loading..." : "Sign in with Warpcast"}
        </Button>
      </form>
    </Form>
  );
}
