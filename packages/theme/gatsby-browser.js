import React from "react"
import { ContextProvider } from "./src/hooks/useCart";

export const wrapRootElement = ({ element }) => (
  <ContextProvider>{element}</ContextProvider>
)