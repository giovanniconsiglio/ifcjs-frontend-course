import { Button, TextField, Box } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";

export const BuildingInfoMenu: FC<{
  onToggleMenu: (active: boolean) => void;
}> = ({ onToggleMenu }) => {
  const [state, dispatch] = useAppContext();
  return (
    <Box>
      <p>This is the building info</p>
    </Box>
  )
}