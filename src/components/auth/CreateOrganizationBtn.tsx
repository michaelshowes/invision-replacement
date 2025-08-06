'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import CreateOrganizationForm from './CreateOrganizationForm';

export default function CreateorganizationBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create organization</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create organization</DialogTitle>
          <DialogDescription>Create a new organization</DialogDescription>
        </DialogHeader>
        <CreateOrganizationForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
