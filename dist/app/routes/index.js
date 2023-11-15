"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const managementDepartment_route_1 = require("../modules/managementDepartment/managementDepartment.route");
const customer_route_1 = require("../modules/customer/customer.route");
const service_route_1 = require("../modules/service/service.route");
const category_route_1 = require("../modules/category/category.route");
const booking_route_1 = require("../modules/booking/booking.route");
const review_route_1 = require("../modules/reviewRating/review.route");
const feedback_route_1 = require("../modules/feedbackForm/feedback.route");
const post_route_1 = require("../modules/postBlog/post.route");
const notification_route_1 = require("../modules/notifications/notification.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/customers',
        route: customer_route_1.CustomerRoutes,
    },
    {
        path: '/management-departments',
        route: managementDepartment_route_1.ManagementDepartmentRoutes,
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoutes,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
    {
        path: '/feedbacks',
        route: feedback_route_1.FeedbackRoutes,
    },
    {
        path: '/posts',
        route: post_route_1.PostRoutes,
    },
    {
        path: '/notifications',
        route: notification_route_1.NotificationRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
