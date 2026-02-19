import { useForm } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { ChevronsRight, SearchIcon } from "lucide-react";
import { searchSchema, type SearchFormData } from "@/utils/validations/app";
import { zodResolver } from "@hookform/resolvers/zod";
import useQueryParams from "@/hooks/query-params";
import { useLocation, useNavigate } from "react-router";

interface SearchFormProps {
  to?: string;
  defaultValue?: string;
  placeholder?: string;
}

const SearchForm = ({ to, defaultValue, placeholder }: SearchFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchParams, setQueryParam, getQueryParam } = useQueryParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: defaultValue || getQueryParam("search") || undefined,
    },
  });

  const onSubmit = (data: SearchFormData) => {
    if (to && location.pathname !== to) {
      navigate({
        pathname: "/",
        search: `?search=${data.search}&${searchParams.toString()}`,
      });
      return;
    }

    setQueryParam("search", data.search);
  };

  return (
    <form
      method="GET"
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md px-4"
    >
      <InputGroup className="bg-white">
        <InputGroupInput
          type="search"
          {...register("search")}
          placeholder={placeholder || "Search..."}
          aria-invalid={errors.root?.message ? "true" : "false"}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" type="submit">
            <ChevronsRight />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default SearchForm;
