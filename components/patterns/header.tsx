"use client";

import React from "react";
import { AppNavbar, AppNavbarProps } from "@/components/shell/app-navbar";

/**
 * Legacy Header wrapper pointing to components/shell/app-navbar.tsx.
 * Follows the requirement that navbar is rendered once with the 3px tricolor accent line.
 */
export function Header(props: AppNavbarProps) {
  return <AppNavbar {...props} />;
}
