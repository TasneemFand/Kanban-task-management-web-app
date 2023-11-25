import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ClientOnly from "@/components/ClientOnly";
import { CreateNewBoard } from "@/components/modals/CreateNewBoard";
import { CreateTask } from "@/components/modals/CreateTask";
import { EditBoard } from "@/components/modals/EditBoard";
import { DeleteModal } from "@/components/modals/DeleteModal";
import { ViewTask } from "@/components/modals/ViewTask";
import { EditTask } from "@/components/modals/EditTask";
import { DeleteTask } from "@/components/modals/DeleteTask";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kanban task manager",
  description: "Generated by Tasneem Fandakli",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="kanban-theme"
        >
          {children}
          <ClientOnly>
            <CreateNewBoard/>
            <CreateTask/>
            <EditBoard/>
            <DeleteModal/>
            <ViewTask/>
            <EditTask/>
            <DeleteTask/>
          </ClientOnly>
        </ThemeProvider>
      </body>
    </html>
  );
}
