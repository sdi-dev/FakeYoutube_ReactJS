import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("/login", "routes/login.tsx"),
    route("/register", "routes/register.tsx"),
    route("/profil", "routes/profil.tsx"),
    route("/desktop/:id", "routes/visuDesk.tsx"),
    route("/mobile/:id", "routes/visuShort.tsx"),
] satisfies RouteConfig;
