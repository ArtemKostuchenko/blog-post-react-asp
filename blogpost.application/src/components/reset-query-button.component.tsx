import { ListRestart } from "lucide-react";
import { Button } from "./ui/button";
import useQueryParams from "@/hooks/query-params";

const ResetQueryButton = () => {
  const { resetQueryParams } = useQueryParams();
  const handleResetQuery = () => resetQueryParams();

  return (
    <Button variant="outline" onClick={handleResetQuery}>
      <ListRestart />
    </Button>
  );
};

export default ResetQueryButton;
