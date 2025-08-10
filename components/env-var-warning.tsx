import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center">
      <Badge
        variant="outline"
        className="font-normal border-primary text-primary bg-primary/5"
      >
        Supabase environment variables required
      </Badge>
      <div className="flex gap-2">
        <Button
          size="sm"
          className="bg-primary text-primary-foreground opacity-50 cursor-not-allowed"
          disabled
        >
          Sign in
        </Button>
        <Button
          size="sm"
          className="bg-secondary text-secondary-foreground opacity-50 cursor-not-allowed"
          disabled
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}
