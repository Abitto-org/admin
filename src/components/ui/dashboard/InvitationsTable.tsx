import { type FC, useMemo, useState } from "react";
import { type Column, type BadgeConfig } from "../table/types";
import DataTable from "../table/DataTable";
import Badge from "../table/Badge";
import LinkText from "./LinkText";
import useDisclosure from "@/hooks/useDisclosure";
import { useGetInvitations, useCancelInvitation } from "@/hooks/useAdmins";
import { formatDate } from "@/utils";
import type { Invitation, InvitationStatus } from "@/types/admins.types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { MailOutline as MailIcon } from "@mui/icons-material";
import toast from "react-hot-toast";

const badgeConfig: BadgeConfig = {
  status: {
    pending: { bg: "#FFF9C4", text: "#F57F17" },
    accepted: { bg: "#E8F5E9", text: "#2E7D32" },
    expired: { bg: "#F5F5F5", text: "#757575" },
  },
};

interface InvitationTableRow {
  id: string;
  email: string;
  status: InvitationStatus;
  expiresAt: string;
  createdAt: string;
  actions: Invitation;
}

const InvitationsTable: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetInvitations({
    page: currentPage,
    limit: 10,
  });
  const cancelInvitation = useCancelInvitation();
  const cancelDialog = useDisclosure();
  const [selectedInvitation, setSelectedInvitation] =
    useState<Invitation | null>(null);

  const tableData: InvitationTableRow[] = useMemo(() => {
    if (!data?.data?.results) return [];
    return data.data.results.map((inv) => ({
      id: inv.id,
      email: inv.email ?? "N/A",
      status: inv.status,
      expiresAt: inv.expiresAt ? formatDate(inv.expiresAt) : "N/A",
      createdAt: inv.createdAt ? formatDate(inv.createdAt) : "N/A",
      actions: inv,
    }));
  }, [data]);

  const handleCancelClick = (inv: Invitation) => {
    setSelectedInvitation(inv);
    cancelDialog.onOpen();
  };

  const handleConfirmCancel = () => {
    if (!selectedInvitation) return;
    cancelInvitation.mutate(selectedInvitation.id, {
      onSuccess: () => {
        toast.success("Invitation cancelled");
        cancelDialog.onClose();
        setSelectedInvitation(null);
      },
      onError: () => {
        toast.error("Failed to cancel invitation");
      },
    });
  };

  const columns: Column<InvitationTableRow>[] = [
    {
      key: "email",
      label: "Email",
      minWidth: "200px",
    },
    {
      key: "status",
      label: "Status",
      minWidth: "120px",
      renderCell: (value: InvitationStatus) => (
        <Badge type="status" value={value} config={badgeConfig} />
      ),
    },
    {
      key: "createdAt",
      label: "Sent At",
      minWidth: "160px",
    },
    {
      key: "expiresAt",
      label: "Expires At",
      minWidth: "160px",
    },
    {
      key: "actions",
      label: "Action",
      renderCell: (_: unknown, row: InvitationTableRow) =>
        row.actions.status === "pending" ? (
          <LinkText
            text="Cancel"
            onClick={() => handleCancelClick(row.actions)}
            showIcon={false}
          />
        ) : (
          <Typography
            sx={{ fontSize: "14px", color: "#BDBDBD", fontWeight: 600 }}
          >
            —
          </Typography>
        ),
    },
  ];

  const totalPages = data?.data ? Math.ceil(data.data.total / 10) : 1;

  return (
    <>
      <DataTable
        title="Invitations"
        subtitle="Track all sent admin invitations"
        columns={columns}
        data={tableData}
        searchable={false}
        filterable={false}
        showDateFilters={false}
        showTypeFilter={false}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
        skeletonRows={5}
        containerSx={{ mt: 3 }}
      />

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelDialog.open}
        onClose={cancelDialog.onClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "12px", padding: "8px" } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: "20px 24px 16px",
          }}
        >
          <Box
            sx={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#FEF3F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <MailIcon sx={{ color: "#EA0000", fontSize: "24px" }} />
          </Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "28px",
              color: "#000000",
            }}
          >
            Cancel Invitation
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ padding: "0 24px 24px" }}>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "20px",
              color: "#667085",
            }}
          >
            Are you sure you want to cancel the invitation for{" "}
            <Box component="span" sx={{ fontWeight: 600, color: "#000000" }}>
              {selectedInvitation?.email}
            </Box>
            ? They will no longer be able to use this invitation link.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ padding: "0 24px 20px", gap: 1 }}>
          <Button
            onClick={cancelDialog.onClose}
            disabled={cancelInvitation.isPending}
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "14px",
              padding: "10px 18px",
              borderRadius: "8px",
              borderColor: "#D0D5DD",
              color: "#344054",
              "&:hover": { borderColor: "#D0D5DD", backgroundColor: "#F9FAFB" },
            }}
          >
            Keep It
          </Button>
          <Button
            onClick={handleConfirmCancel}
            disabled={cancelInvitation.isPending}
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "14px",
              padding: "10px 18px",
              borderRadius: "8px",
              backgroundColor: "#EA0000",
              minWidth: "100px",
              "&:hover": { backgroundColor: "#C70000" },
              "&:disabled": { backgroundColor: "#F5A0A0", color: "#FFFFFF" },
            }}
          >
            {cancelInvitation.isPending ? (
              <CircularProgress size={16} sx={{ color: "#FFFFFF" }} />
            ) : (
              "Cancel Invite"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InvitationsTable;
