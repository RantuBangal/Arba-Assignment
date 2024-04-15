import { Box } from "@chakra-ui/react";
import React from "react";

export function Sidebar() {
  return (
    <Box
      bgColor={"rgb(44, 203, 203)"}
      height={"100%"}
      width={"50%"}
      display={{ base: "none", sm: "none", md: "flex", lg: "flex", xl: "flex" }}
      flexDir={"column"}>
      <Box h={"40%"} display={"flex"}>
        <Box
          h={"100%"}
          w={"45%"}
          borderBottomRightRadius={"100%"}
          bgColor={"rgb(1, 150, 170)"}></Box>
      </Box>
      <Box h={"40%"} display={"flex"} justifyContent={"flex-end"}>
        <Box
          h={"100%"}
          w={"50%"}
          mt={131}
          borderTopLeftRadius={"100%"}
          bgColor={"rgb(1, 150, 170)"}></Box>
      </Box>
    </Box>
  );
}