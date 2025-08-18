import { Link, useLocation } from "react-router-dom";

export function PageSwitcher() {
  const location = useLocation();
  
  const pages = [
    { path: "/", label: "Version A" },
    { path: "/b", label: "Version B" },
    { path: "/c", label: "Version C" }
  ];

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/90 backdrop-blur-sm rounded-lg p-3 flex gap-2">
      {pages.map((page) => (
        <Link
          key={page.path}
          to={page.path}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            location.pathname === page.path
              ? "bg-white text-black"
              : "text-white hover:bg-white/20"
          }`}
        >
          {page.label}
        </Link>
      ))}
    </div>
  );
}
