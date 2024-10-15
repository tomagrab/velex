import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

type ButtonFieldProps = {
  ticketStates: {
    isEditMode: boolean;
    isUpdating: boolean;
    isLoading: boolean;
  };
};

export default function ButtonField({ ticketStates }: ButtonFieldProps) {
  const { isEditMode, isUpdating, isLoading } = ticketStates;

  if (!isEditMode) {
    return null;
  }

  return (
    <>
      {/* Submit Button */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : isUpdating ? (
          'Update'
        ) : (
          'Create'
        )}
      </Button>
    </>
  );
}
