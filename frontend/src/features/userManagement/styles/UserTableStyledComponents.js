import { styled } from "@mui/system";
import { Chip, IconButton } from "@mui/material";

export const StyledChip = styled(Chip)(({ theme }) => ({
  border: 0,
  "& .MuiChip-icon": {
    color: "#757575",
  },
  "&:hover": {
    color: theme.palette.primary.main,
    "& .MuiChip-icon": {
      color: theme.palette.primary.main,
    },
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    "& svg": {
      color: theme.palette.primary.main,
    },
  },
}));
