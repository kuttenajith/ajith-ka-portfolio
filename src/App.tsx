import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Blog } from "./Blog";
import { Home } from "./Home";
import { Layout } from "./Layout";
import { LighthousePost } from "./LighthousePost";
import { WorkWithMe } from "./WorkWithMe";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/lighthouse-93" element={<LighthousePost />} />
          <Route path="work-with-me" element={<WorkWithMe />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
