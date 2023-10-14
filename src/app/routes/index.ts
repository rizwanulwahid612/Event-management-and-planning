import express from "express";
import { AdminRoutes } from "../modules/admin/admin.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { ManagementDepartmentRoutes } from "../modules/managementDepartment/managementDepartment.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/management-departments",
    route: ManagementDepartmentRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
