import { useRouter } from '@tanstack/react-router';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

export const GoBackButton = () => {
  const router = useRouter();


  return (
    <Button variant="ghost" size="sm" className="p-2" onClick={() => router.history.back()}>
      <ArrowLeft className="h-4 w-4" />
    </Button>
  )
}
