import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function TicketsAnalyticsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>
          View ticket analytics and reports here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>Placeholder for analytics...</p>
      </CardContent>
    </Card>
  );
}
