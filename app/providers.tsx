"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import client from "@/services/Client";
export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider {...themeProps}>
				
  <ApolloProvider client={client}>{children}
  </ApolloProvider></NextThemesProvider>
		</NextUIProvider>
	);
}
