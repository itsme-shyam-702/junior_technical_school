// backend/middleware/auth.js
import { ClerkExpressWithAuth, ClerkClient } from "@clerk/express";

// ✅ Initialize Clerk Client
const clerkClient = new ClerkClient();

// ✅ Middleware to require authentication
export const requireAuth = ClerkExpressWithAuth({
  async onError(err, req, res, next) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  },
});

// ✅ Custom role-based guard (for admins, etc.)
export const requireRole = (roles = []) => {
  return async (req, res, next) => {
    try {
      const userId = req.auth.userId;
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
