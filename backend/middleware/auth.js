// backend/middleware/auth.js
import { ClerkExpressRequireAuth, clerkClient } from "@clerk/express";

// ✅ Authentication middleware
export const requireAuth = ClerkExpressRequireAuth({
  onError: (err, req, res) => {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  },
});

// ✅ Role-based guard
export const requireRole = (roles = []) => {
  return async (req, res, next) => {
    try {
      const userId = req.auth?.userId;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const user = await clerkClient.users.getUser(userId);
      const userRole = user?.privateMetadata?.role || "visitor";

      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      console.error("Role check failed:", err);
      res.status(403).json({ message: "Forbidden" });
    }
  };
};
