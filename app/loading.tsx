import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SpinnerButton() {
  return (
    <div className="flex  justify-center items-center min-h-screen">
      <Button disabled size="lg">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
      {/* <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Processing
      </Button> */}
    </div>
  );
}
