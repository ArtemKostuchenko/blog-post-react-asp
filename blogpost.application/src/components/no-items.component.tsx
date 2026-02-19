import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { Button } from "./ui/button";
import { RefreshCcwIcon, type LucideIcon } from "lucide-react";

interface NoItemsProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  onRefresh?: () => void;
}

const NoItems = ({
  icon: Icon,
  title,
  description,
  onRefresh,
}: NoItemsProps) => {
  return (
    <Empty className="bg-muted/30 w-full h-full flex-1 ">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description && (
          <EmptyDescription className="max-w-xs text-pretty">
            {description}
          </EmptyDescription>
        )}
      </EmptyHeader>
      {onRefresh && (
        <EmptyContent>
          <Button variant="outline" onClick={() => onRefresh()}>
            <RefreshCcwIcon />
            Refresh
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
};

export default NoItems;
