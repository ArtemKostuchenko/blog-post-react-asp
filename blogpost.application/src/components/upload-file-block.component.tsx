import { Field, FieldError } from "./ui/field";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { File, Upload, type LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface UploadFileProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  onUploadFile?: () => void;
  error?: string;
}

const UploadFileBlock = ({
  icon: Icon = File,
  title,
  description,
  onUploadFile,
  error,
}: UploadFileProps) => {
  return (
    <Field>
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>
            {description || "Upload your file"}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => onUploadFile?.()}
          >
            <Upload />
            Upload Preview
          </Button>
        </EmptyContent>
      </Empty>
      <FieldError>{error}</FieldError>
    </Field>
  );
};

export default UploadFileBlock;
