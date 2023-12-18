import "bootstrap/dist/css/bootstrap.css";
import "/public/css/globals.css";

export const metadata = {
  title: "Phlebo",
  description: "Best App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
