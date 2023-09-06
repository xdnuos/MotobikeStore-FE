import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <StyledChart />
          <Router />
          <ScrollToTop />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
