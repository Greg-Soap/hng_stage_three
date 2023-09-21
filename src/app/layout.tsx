import "./globals.css";

export const metadata = {
  title: "Greg HNG Stage Three",
  description: "HNG task for stage three frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
