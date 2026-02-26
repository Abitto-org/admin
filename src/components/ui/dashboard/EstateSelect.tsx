import {
  Box,
  Typography,
  TextField,
  Stack,
  Skeleton,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";
import { type FC, useState, useRef, useEffect } from "react";
import type { Estate } from "@/types/estates.types";
import { useGetEstates } from "@/hooks/useEstates";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface EstateSelectProps {
  value: Estate | null;
  onChange: (estate: Estate | null) => void;
  error?: string;
  disabled?: boolean;
}

const EstateSelect: FC<EstateSelectProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [allEstates, setAllEstates] = useState<Estate[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const prevSearchRef = useRef("");
  const prevPageRef = useRef(1);

  const { data, isLoading, isFetching } = useGetEstates({
    page,
    limit: 20,
    search: search || undefined,
  });

  useEffect(() => {
    if (search !== prevSearchRef.current) {
      prevSearchRef.current = search;
      queueMicrotask(() => {
        setPage(1);

        setAllEstates([]);
      });
    }
  }, [search]);

  useEffect(() => {
    if (!data?.data?.estates) return;

    if (page === 1) {
      queueMicrotask(() => {
        setAllEstates(data.data.estates);
      });
    } else if (page !== prevPageRef.current) {
      prevPageRef.current = page;
      queueMicrotask(() => {
        setAllEstates((prev) => {
          const existingIds = new Set(prev.map((e) => e.id));
          const newEstates = data.data.estates.filter(
            (e) => !existingIds.has(e.id),
          );
          return [...prev, ...newEstates];
        });
      });
    }
  }, [data, page]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 50;
    if (
      atBottom &&
      !isFetching &&
      data?.data?.pagination &&
      page < data.data.pagination.totalPages
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSelect = (estate: Estate) => {
    if (disabled) return;
    onChange(estate);
    setIsOpen(false);
    setSearch("");
    setPage(1);
    setAllEstates([]);
    prevSearchRef.current = "";
    prevPageRef.current = 1;
  };

  const handleClickAway = () => {
    if (disabled) return;
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative" }} ref={dropdownRef}>
        {/* Trigger */}
        <Box
          onClick={handleToggle}
          sx={{
            width: "94%",
            padding: "13px 16px",
            borderRadius: "8px",
            border: error ? "1.5px solid #D32F2F" : "1.5px solid #E0E0E0",
            backgroundColor: disabled ? "#F5F5F5" : "#FFFFFF",
            cursor: disabled ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s",
            opacity: disabled ? 0.6 : 1,
            "&:hover": {
              borderColor: disabled ? "#E0E0E0" : error ? "#D32F2F" : "#669900",
            },
          }}
        >
          {value ? (
            <Stack spacing="4px">
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "100%",
                  color: "#000000",
                }}
              >
                {value.name}
              </Typography>
              <Typography
                sx={{ fontWeight: 400, fontSize: "12px", color: "#757575" }}
              >
                {value.address}
              </Typography>
            </Stack>
          ) : (
            <Typography
              sx={{ fontWeight: 400, fontSize: "14px", color: "#9E9E9E" }}
            >
              Select an estate
            </Typography>
          )}
          <KeyboardArrowDownIcon
            sx={{
              color: "#757575",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              flexShrink: 0,
            }}
          />
        </Box>

        {/* Error */}
        {error && (
          <Typography
            sx={{ fontSize: "12px", color: "#D32F2F", mt: "4px", ml: "16px" }}
          >
            {error}
          </Typography>
        )}

        {/* Dropdown */}
        {isOpen && !disabled && (
          <Box
            sx={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              maxHeight: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Search */}
            <Box sx={{ p: "12px", borderBottom: "1px solid #F5F5F5" }}>
              <TextField
                fullWidth
                placeholder="Search estates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#757575", fontSize: "20px" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    "& fieldset": { borderColor: "#E0E0E0" },
                    "&:hover fieldset": { borderColor: "#669900" },
                    "&.Mui-focused fieldset": { borderColor: "#669900" },
                  },
                }}
              />
            </Box>

            {/* List */}
            <Box
              onScroll={handleScroll}
              sx={{
                overflowY: "auto",
                maxHeight: "320px",
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-track": { backgroundColor: "#F5F5F5" },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#BDBDBD",
                  borderRadius: "3px",
                },
              }}
            >
              {isLoading && page === 1 ? (
                <Box sx={{ p: "8px" }}>
                  {[1, 2, 3, 4].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        gap: "12px",
                        p: "12px",
                        mb: "4px",
                      }}
                    >
                      <Stack spacing="6px" sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="50%" height={16} />
                        <Skeleton variant="text" width="75%" height={14} />
                      </Stack>
                    </Box>
                  ))}
                </Box>
              ) : allEstates.length === 0 ? (
                <Box sx={{ p: "32px", textAlign: "center" }}>
                  <Typography sx={{ fontSize: "14px", color: "#757575" }}>
                    No estates found
                  </Typography>
                </Box>
              ) : (
                <>
                  {allEstates.map((estate) => (
                    <Box
                      key={estate.id}
                      onClick={() => handleSelect(estate)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        p: "12px",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        "&:hover": { backgroundColor: "#F5F5F5" },
                        ...(value?.id === estate.id && {
                          backgroundColor: "#F1F8E9",
                        }),
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#000000",
                        }}
                      >
                        {estate.name}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", color: "#757575" }}>
                        {estate.address}
                      </Typography>
                    </Box>
                  ))}

                  {isFetching && page > 1 && (
                    <Box sx={{ p: "8px" }}>
                      {[1, 2].map((i) => (
                        <Box
                          key={i}
                          sx={{ display: "flex", gap: "12px", p: "12px" }}
                        >
                          <Stack spacing="6px" sx={{ flex: 1 }}>
                            <Skeleton variant="text" width="50%" height={16} />
                            <Skeleton variant="text" width="75%" height={14} />
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default EstateSelect;
