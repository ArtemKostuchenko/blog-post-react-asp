import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import useQueryParams from "@/hooks/query-params";
import type { OrderType } from "@/utils/types/app";

const OrderForm = () => {
  const { defaultQueryParams, setQueryParam } = useQueryParams();

  const order = defaultQueryParams.order || "desc";

  const handleOrder = (order: OrderType) => {
    setQueryParam("order", order);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {order == "asc" && (
            <>
              <ArrowUpNarrowWide />
              Older
            </>
          )}
          {order == "desc" && (
            <>
              <ArrowDownWideNarrow />
              New
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleOrder("desc")}>
            <ArrowDownWideNarrow />
            New
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOrder("asc")}>
            <ArrowUpNarrowWide />
            Older
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderForm;
