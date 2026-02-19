import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { Spinner } from "./ui/spinner";

interface DeleteDialogProps {
  title: string;
  description: string;
  canDelete: boolean;
  loading?: boolean;
  open: boolean;
  onOpenChanged: (opened: boolean) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteDialog = ({
  title,
  description,
  canDelete,
  loading = false,
  open,
  onOpenChanged,
  onCancel,
  onDelete,
}: DeleteDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChanged}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive size-10">
            <Trash2Icon className="size-6" />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" onClick={onCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onDelete}
            disabled={!canDelete || loading}
          >
            {loading && <Spinner data-icon="inline-start" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
