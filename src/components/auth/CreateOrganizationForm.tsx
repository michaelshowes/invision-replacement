'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { createOrg } from '@/server/organization';
import { generateSlug } from '@/utils/generateSlug';

const formSchema = z.object({
  name: z.string().min(2).max(128),
  logo: z.string().url().optional().or(z.literal(''))
});

export default function CreateOrganizationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      logo: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      await createOrg(values.name, values.logo || '');

      toast.success(`${values.name} created successfully`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create organization');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='My Organization'
                  {...field}
                />
              </FormControl>
              <FormDescription className={'sr-only'}>
                This is the name of your organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className={'size-4 animate-spin'} />
          ) : (
            'Create Organization'
          )}
        </Button>
      </form>
    </Form>
  );
}
