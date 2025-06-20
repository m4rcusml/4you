import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HomeItemProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function HomeItem({ label, icon, className }: HomeItemProps) {
  return (
    <Card
      className={cn(
        "flex-1 p-4 items-center justify-center gap-2 rounded-xl shadow-md bg-card hover:shadow-lg transition-shadow cursor-pointer",
        className
      )}
    >
      <CardContent className="flex flex-col items-center justify-center p-0">
        <div className="w-[48px] h-[48px] flex items-center justify-center mb-2">
          {icon}
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </CardContent>
    </Card>
  );
}