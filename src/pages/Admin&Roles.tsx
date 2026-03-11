import { Box, Typography, Button, Stack } from "@mui/material";
import { type FC } from "react";
import AdminRolesTable from "@/components/ui/dashboard/AdminRolesTable";
import InvitationsTable from "@/components/ui/dashboard/InvitationsTable";
import InviteAdminDrawer from "@/components/ui/drawers/InviteAdminDrawer";
import RoleGuard from "@/components/guards/RoleGuard";
import useDisclosure from "@/hooks/useDisclosure";
import ButtonArrowIcon from "@/assets/icons/button-arrow.svg";

const AdminandRoles: FC = () => {
  const inviteAdminDrawer = useDisclosure();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: "24px", md: "16px" },
          mb: { xs: 2, md: 3 },
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "24px", md: "32px" },
              lineHeight: "120%",
              color: "#000000",
              mb: "8px",
            }}
          >
            Admin & Roles
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: "150%",
              color: "#414141",
            }}
          >
            Manage and monitor all admins
          </Typography>
        </Box>

        <RoleGuard action="canInviteAdmin">
          <Stack
            direction="row"
            spacing="16px"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              onClick={inviteAdminDrawer.onOpen}
              sx={{
                height: "48px",
                borderRadius: "32px",
                padding: "12px 24px",
                backgroundColor: "#669900",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: "100%",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                whiteSpace: "nowrap",
                "&:hover": { backgroundColor: "#558000" },
              }}
            >
              Add New Admin
              <Box
                component="img"
                src={ButtonArrowIcon}
                alt="arrow"
                sx={{ width: "20px", height: "20px" }}
              />
            </Button>
          </Stack>
        </RoleGuard>
      </Box>

      <AdminRolesTable />
      <InvitationsTable />

      <InviteAdminDrawer inviteAdminDrawer={inviteAdminDrawer} />
    </>
  );
};

export default AdminandRoles;
