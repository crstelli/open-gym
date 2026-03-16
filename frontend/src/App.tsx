const WELCOME_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  fontFamily: "Arial, sans-serif",
};

export default function App() {
  return (
    <div style={WELCOME_STYLE}>
      <h1>Node + Express + React (Vite) Template</h1>
      <p>
        Template made with ❤️ by <a href="https://www.github.com/crstelli">crstelli</a>
      </p>
    </div>
  );
}
