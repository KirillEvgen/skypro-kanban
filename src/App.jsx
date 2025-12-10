import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import AppRoutes from "./components/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { TasksProvider } from "./contexts/TasksContext";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthWrapper from "./components/AuthWrapper";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #eaeef6;
    color: #000;
    line-height: 1.5;
  }

  html {
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

// Тема для styled-components
const theme = {
  colors: {
    primary: "#565eef",
    secondary: "#94a6be",
    background: "#eaeef6",
    white: "#ffffff",
    black: "#000000",
    gray: "#d4dbe3",
    hover: "#f4f5f6",
  },
  breakpoints: {
    mobile: "660px",
    tablet: "1024px",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <AuthWrapper>
            <ErrorBoundary>
              <TasksProvider>
                <AppRoutes />
              </TasksProvider>
            </ErrorBoundary>
          </AuthWrapper>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
