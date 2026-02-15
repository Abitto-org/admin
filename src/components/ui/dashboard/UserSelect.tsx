import {
  Box,
  Typography,
  TextField,
  Avatar,
  Stack,
  Skeleton,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";
import { type FC, useState, useRef, useEffect } from "react";
import type { User } from "@/types/users.types";
import { useGetUsers } from "@/hooks/useUsers";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getDisplayName, getInitials } from "@/utils/auth";

// UserSelect.tsx - Update the interface and component
interface UserSelectProps {
  value: User | null;
  onChange: (user: User | null) => void;
  error?: string;
  disabled?: boolean; // Add this
}

const UserSelect: FC<UserSelectProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetching } = useGetUsers({
    page,
    limit: 20,
    search: search || undefined,
    isActive: true,
  });

  // Reset and fetch when search changes
  useEffect(() => {
    if (search) {
      queueMicrotask(() => {
        setPage(1);
        setAllUsers([]);
      });
    }
  }, [search]);

  // Accumulate users for infinite scroll
  useEffect(() => {
    if (data?.data?.users) {
      if (page === 1) {
        queueMicrotask(() => {
          setAllUsers(data.data.users);
        });
      } else {
        queueMicrotask(() => {
          setAllUsers((prev) => {
            const existingIds = new Set(prev.map((u) => u.id));
            const newUsers = data.data.users.filter(
              (u) => !existingIds.has(u.id),
            );
            return [...prev, ...newUsers];
          });
        });
      }
    }
  }, [data, page]);

  // Handle scroll for infinite loading
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const bottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 50;

    if (
      bottom &&
      !isFetching &&
      data?.data?.pagination &&
      page < data.data.pagination.totalPages
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSelectUser = (user: User) => {
    if (disabled) return; // Add this check
    onChange(user);
    setIsOpen(false);
    setSearch("");
    setPage(1);
  };

  const handleClickAway = () => {
    if (disabled) return; // Add this check
    setIsOpen(false);
    setSearch("");
    setPage(1);
  };

  const handleToggle = () => {
    if (disabled) return; // Add this check
    setIsOpen(!isOpen);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative" }} ref={dropdownRef}>
        {/* Selected User Display / Trigger */}
        <Box
          onClick={handleToggle}
          sx={{
            width: "94%",
            padding: "13px 16px",
            borderRadius: "8px",
            border: error ? "1.5px solid #D32F2F" : "1.5px solid #E0E0E0",
            backgroundColor: disabled ? "#F5F5F5" : "#FFFFFF", // Add disabled background
            cursor: disabled ? "not-allowed" : "pointer", // Change cursor when disabled
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s",
            opacity: disabled ? 0.6 : 1, // Add opacity for disabled state
            "&:hover": {
              borderColor: disabled ? "#E0E0E0" : error ? "#D32F2F" : "#669900",
            },
          }}
        >
          {value ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Avatar
                sx={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#3266CC",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                {getInitials(value)}
              </Avatar>
              <Stack spacing="4px">
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "100%",
                    textTransform: "capitalize",
                    color: "#000000",
                  }}
                >
                  {getDisplayName(value)}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "100%",
                    color: "#757575",
                  }}
                >
                  {value.email}
                </Typography>
              </Stack>
            </Box>
          ) : (
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                color: "#9E9E9E",
              }}
            >
              Select a user
            </Typography>
          )}
          <KeyboardArrowDownIcon
            sx={{
              color: "#757575",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </Box>

        {/* Error Message */}
        {error && (
          <Typography
            sx={{
              fontSize: "12px",
              color: "#D32F2F",
              mt: "4px",
              ml: "16px",
            }}
          >
            {error}
          </Typography>
        )}

        {/* Dropdown Menu - Only show if not disabled */}
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
            {/* Search Input */}
            <Box sx={{ p: "12px", borderBottom: "1px solid #F5F5F5" }}>
              <TextField
                fullWidth
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                    "& fieldset": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#669900",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#669900",
                    },
                  },
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </Box>

            {/* User List */}
            <Box
              ref={listRef}
              onScroll={handleScroll}
              sx={{
                overflowY: "auto",
                maxHeight: "320px",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#F5F5F5",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#BDBDBD",
                  borderRadius: "3px",
                },
              }}
            >
              {isLoading && page === 1 ? (
                <Box sx={{ p: "8px" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        p: "12px",
                        mb: "4px",
                      }}
                    >
                      <Skeleton variant="circular" width={40} height={40} />
                      <Stack spacing="6px" sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="60%" height={16} />
                        <Skeleton variant="text" width="80%" height={14} />
                      </Stack>
                    </Box>
                  ))}
                </Box>
              ) : allUsers.length === 0 ? (
                <Box
                  sx={{
                    p: "32px",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#757575",
                    }}
                  >
                    No users found
                  </Typography>
                </Box>
              ) : (
                <>
                  {allUsers.map((user) => (
                    <Box
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        p: "12px",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: "#F5F5F5",
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#3266CC",
                          fontWeight: 600,
                          fontSize: "14px",
                        }}
                      >
                        {getInitials(user)}
                      </Avatar>
                      <Stack spacing="4px" sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: "100%",
                            textTransform: "capitalize",
                            color: "#000000",
                          }}
                        >
                          {getDisplayName(user)}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 400,
                            fontSize: "12px",
                            lineHeight: "100%",
                            color: "#757575",
                          }}
                        >
                          {user.email}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}

                  {isFetching && page > 1 && (
                    <Box sx={{ p: "8px" }}>
                      {[1, 2].map((i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            p: "12px",
                            mb: "4px",
                          }}
                        >
                          <Skeleton variant="circular" width={40} height={40} />
                          <Stack spacing="6px" sx={{ flex: 1 }}>
                            <Skeleton variant="text" width="60%" height={16} />
                            <Skeleton variant="text" width="80%" height={14} />
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

export default UserSelect;
