import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

type ButtonFieldProps = {
  ticketFormStates: {
    isEditMode: boolean;
    isUpdating: boolean;
    isLoading: boolean;
  };
};

export default function ButtonField({ ticketFormStates }: ButtonFieldProps) {
  const { isEditMode, isUpdating, isLoading } = ticketFormStates;

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
