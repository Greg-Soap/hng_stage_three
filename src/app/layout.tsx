import Navbar from "@/components/Navbar";
import "./globals.css";
import createClient from "@/utils/supabase-server";

export const metadata = {
  title: "Greg HNG Stage Three",
  description: "HNG task for stage three frontend",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <html lang="en">
      <body>
        <Navbar user={user} />

        {children}
      </body>
    </html>
  );
}
