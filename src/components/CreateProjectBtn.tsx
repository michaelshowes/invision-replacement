'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createProject } from '@/server/project';

const formSchema = z.object({
  name: z.string().min(2).max(128),
  prefix: z.string().min(2).max(6)
});

// Function to generate prefix from name (first letter of each word)
function generatePrefix(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 6); // Limit to 6 characters max
}

export default function CreateProjectBtn({
  organizationId
}: {
  organizationId: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPrefixManuallyModified, setIsPrefixManuallyModified] =
    useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      prefix: ''
    }
  });

  // Watch the name field for changes
  const nameValue = form.watch('name');
  const prefixValue = form.watch('prefix');

  // Auto-populate prefix based on name
  useEffect(() => {
    if (nameValue && !isPrefixManuallyModified) {
      const generatedPrefix = generatePrefix(nameValue);
      form.setValue('prefix', generatedPrefix);
    }
  }, [nameValue, isPrefixManuallyModified, form]);

  // Track if prefix has been manually modified
  useEffect(() => {
    if (nameValue && prefixValue) {
      const expectedPrefix = generatePrefix(nameValue);
      // If the current prefix doesn't match what would be auto-generated, mark as manually modified
      if (prefixValue !== expectedPrefix && prefixValue !== '') {
        setIsPrefixManuallyModified(true);
      }
    }

    // Reset manual modification flag if prefix is cleared
    if (prefixValue === '') {
      setIsPrefixManuallyModified(false);
    }
  }, [prefixValue, nameValue]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const { data } = await createProject(organizationId, values.name);

      router.push(`/app/clients/${organizationId}/project/${data?.id}`);

      toast.success(`${data?.name} created successfully`);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project for your organization.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='My Project'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='prefix'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prefix</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='MYP'
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        // Mark as manually modified when user types in prefix field
                        if (e.target.value !== generatePrefix(nameValue)) {
                          setIsPrefixManuallyModified(true);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='flex items-center gap-2'>
                  <Loader2 className={'size-4 animate-spin'} />
                  Creating Project...
                </span>
              ) : (
                'Create Project'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
