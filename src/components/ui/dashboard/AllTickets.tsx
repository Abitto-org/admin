import { Box, Typography, Button, Avatar, Stack } from "@mui/material";
import { type FC } from "react";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";
import SearchFilter from "../table/SearchFilter";
import Pagination from "../table/Pagination";

interface TicketData {
  type: string;
  priority: "high" | "low" | "medium";
  userAvatar?: string;
  fullName: string;
  email: string;
  issueType: string;
  date: string;
  status: "unreplied" | "success" | "in progress";
}

interface AllTicketsProps {
  title: string;
  subtitle?: string;
  data: TicketData[];
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filterable?: boolean;
  filterOptions?: Array<{ label: string; value: string }>;
  onFilterChange?: (value: string) => void;
  defaultFilterValue?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showViewAllButton?: boolean;
  viewAllButtonText?: string;
  onViewAll?: () => void;
  onViewTicket?: (ticket: TicketData, index: number) => void;
  containerSx?: object;
}

const getInitials = (fullName: string): string => {
  const names = fullName.split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return fullName.substring(0, 2).toUpperCase();
};

const getPriorityStyles = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return {
        bg: "#FF3B301A",
        color: "#FF3B30",
      };
    case "medium":
      return {
        bg: "#FF95001A",
        color: "#FF9500",
      };
    case "low":
      return {
        bg: "#34C7591A",
        color: "#34C759",
      };
    default:
      return {
        bg: "#EAEAEA",
        color: "#424242",
      };
  }
};

const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "success":
      return {
        bg: "#34C7591A",
        color: "#34C759",
      };
    case "unreplied":
      return {
        bg: "#FF3B301A",
        color: "#FF3B30",
      };
    case "in progress":
      return {
        bg: "#FF95001A",
        color: "#FF9500",
      };
    default:
      return {
        bg: "#EAEAEA",
        color: "#424242",
      };
  }
};

const AllTickets: FC<AllTicketsProps> = ({
  title,
  subtitle,
  data,
  searchable = false,
  searchPlaceholder = "Search",
  onSearchChange,
  filterable = false,
  filterOptions = [],
  onFilterChange,
  defaultFilterValue = "filter",
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onViewTicket,
  containerSx,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        padding: { xs: "16px", sm: "24px" },
        mt: { xs: 2, md: 3 },
        ...containerSx,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: "16px", sm: "12px" },
          mb: "24px",
        }}
      >
        {/* Title */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "-1%",
              textTransform: "capitalize",
              color: "#000000",
              mb: "4px",
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                textTransform: "capitalize",
                color: "#424242",
                mt: "12px",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Search and Filter */}
        {(searchable || filterable) && (
          <SearchFilter
            searchable={searchable}
            searchPlaceholder={searchPlaceholder}
            onSearchChange={onSearchChange}
            filterable={filterable}
            filterOptions={filterOptions}
            onFilterChange={onFilterChange}
            defaultFilterValue={defaultFilterValue}
          />
        )}
      </Box>

      {/* Cards Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: "14px",
          mb: "24px",
        }}
      >
        {data.map((ticket, index) => {
          const priorityStyles = getPriorityStyles(ticket.priority);
          const statusStyles = getStatusStyles(ticket.status);
          const priority = `${ticket.priority} Priority`;

          return (
            <Box
              key={index}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#FAFAFA",
                padding: "12px",
              }}
            >
              {/* Type and Priority Container */}
              <Box
                sx={{
                  borderRadius: "8px",
                  paddingY: "7px",
                  paddingX: "12px",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: "12px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#0A0A0A",
                  }}
                >
                  {ticket.type}
                </Typography>

                <Box
                  sx={{
                    borderRadius: "4px",
                    gap: "10px",
                    paddingTop: "4px",
                    paddingRight: "8px",
                    paddingBottom: "4px",
                    paddingLeft: "8px",
                    backgroundColor: priorityStyles.bg,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Geist",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      textTransform: "capitalize",
                      color: priorityStyles.color,
                    }}
                  >
                    {priority}
                  </Typography>
                </Box>
              </Box>

              {/* User Profile Section */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  mb: 3,
                }}
              >
                {/* Profile Avatar */}
                <Avatar
                  src={ticket.userAvatar}
                  sx={{
                    width: "47px",
                    height: "47px",
                    backgroundColor: "#3266CC",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  {!ticket.userAvatar && getInitials(ticket.fullName)}
                </Avatar>

                {/* User Info */}
                <Stack spacing="4px">
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      textTransform: "capitalize",
                      color: "#000000",
                    }}
                  >
                    {ticket.fullName}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#424242",
                    }}
                  >
                    {ticket.email}
                  </Typography>
                </Stack>
              </Box>

              {/* Issue Type Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#424242",
                  }}
                >
                  Issue Type
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#0A0A0A",
                  }}
                >
                  {ticket.issueType}
                </Typography>
              </Box>

              {/* Date Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#424242",
                  }}
                >
                  Date
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#0A0A0A",
                  }}
                >
                  {ticket.date}
                </Typography>
              </Box>

              {/* Status Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#424242",
                  }}
                >
                  Status
                </Typography>
                <Box
                  sx={{
                    borderRadius: "4px",
                    gap: "10px",
                    paddingTop: "4px",
                    paddingRight: "8px",
                    paddingBottom: "4px",
                    paddingLeft: "8px",
                    backgroundColor: statusStyles.bg,
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Geist",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      textTransform: "capitalize",
                      color: statusStyles.color,
                    }}
                  >
                    {ticket.status}
                  </Typography>
                </Box>
              </Box>

              {/* View Ticket Button */}
              <Button
                onClick={() => onViewTicket?.(ticket, index)}
                fullWidth
                sx={{
                  height: "48px",
                  width: "auto",
                  borderRadius: "32px",
                  padding: "12px 24px",
                  backgroundColor: "#669900",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#558000",
                  },
                }}
              >
                View Ticket
                <Box
                  component="img"
                  src={ButtonArrowIcon}
                  alt="arrow"
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </Button>
            </Box>
          );
        })}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange || (() => {})}
        />
      )}
    </Box>
  );
};

export default AllTickets;
