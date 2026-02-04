import { Box } from "@mui/material";
import { type FC } from "react";
import { type PaginationProps } from "./types";

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      // Show first 3, ellipsis, last 2
      pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, 2, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
    }
    return pages;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        mb: 6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          padding: "4px",
          backgroundColor: "#FAFAFA",
        }}
      >
        {getPaginationNumbers().map((page, index) => (
          <Box
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "24px",
              height: "24px",
              borderRadius: "8px",
              paddingTop: "4px",
              paddingRight: "8px",
              paddingBottom: "4px",
              paddingLeft: "8px",
              backgroundColor: currentPage === page ? "#669900" : "transparent",
              color: currentPage === page ? "#FFFFFF" : "#000000",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "100%",
              cursor: typeof page === "number" ? "pointer" : "default",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  typeof page === "number" && currentPage !== page
                    ? "#E0E0E0"
                    : currentPage === page
                      ? "#669900"
                      : "transparent",
              },
            }}
          >
            {page}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Pagination;
