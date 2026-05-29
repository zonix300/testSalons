import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSalons } from "../api/salons";
import { Input } from "@/components/ui/input";
import SalonCard from "@/components/salon/SalonCard";
import { Salon } from "@/types/salon";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Funnel, Search } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Page } from "@/types/pagination";
import { waitForDebugger } from "inspector";

export default function SalonListPage() {

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState<Page<Salon>>({
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 0,
    first: false,
    last: false
  });
  const [sort, setSort] = useState("name,asc");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["salons", debouncedQuery, page, sort],
    queryFn: () => getSalons(debouncedQuery, page, sort)
  });

  const salons: Salon[] = data?.content ?? [];

  const getPageNumbers = (total: number) => {
    return Array.from({ length: total }, (_, i) => i);
  };

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (isLoading || isFetching) return;
    setPage(data!);
  }, [data]);

  return (
    <div>

      <div className="flex flex-col-3 gap-2 p-4">
        <InputGroup className="flex">

          <InputGroupInput
            placeholder="Search by address or district..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <div className="flex w-[50%]">
          <span className="py-1">Sort:</span>
          <NativeSelect value={sort} onChange={e => setSort(e.target.value)}>
            <NativeSelectOption value="name,asc">Name A-Z</NativeSelectOption>
            <NativeSelectOption value="rating,desc">Highest rating</NativeSelectOption>
            <NativeSelectOption value="rating,asc">Lowest rating</NativeSelectOption>
          </NativeSelect>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(prev => ({ ...prev, number: Math.max(0, page.number - 1) }))}
              />
            </PaginationItem>

            {getPageNumbers(page.totalPages).map((p) =>
            (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === page.number}
                  onClick={() => setPage(prev => ({ ...prev, number: p as number }))}
                  className="cursor-pointer"
                >
                  {p + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((prev) => ({ ...prev, number: Math.min(prev.totalPages - 1, prev.number + 1) }))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {!isLoading &&
        (
          <div className="grid md:grid-cols-2 gap-4 mx-4">
            {salons.map(salon => (
              <SalonCard
                key={salon.placeId}
                salon={salon}
              />
            ))}
          </div>
        )
      }
      {
        isLoading &&
        <div className="flex items-center justify-center" >
          <Spinner />
          Loading...
        </div>
      }

    </div>
  );
}
