import { Button } from '@/components/ui/button';

type ButtonFieldProps = {
  isEditMode: boolean;
};

export default function ButtonField({ isEditMode }: ButtonFieldProps) {
  return (
    <>
      {/* Submit Button */}
      <Button type="submit">
        {isEditMode ? 'Update Ticket' : 'Create Ticket'}
      </Button>
    </>
  );
}
