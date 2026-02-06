
import React, { useEffect, useState } from "react";
import { apiClient } from "../../integrations/api/client";
import RoleManagement from "./RoleManagement";

interface Activity {
  id: string;
  type: "upload" | "edit" | "delete";
  material_id: string;
  title: string;
  description: string;
  section_key: string;
  week_label: string;
  file_url: string;
  timestamp: string;
  full_name: string;
  email: string;
}

const AdminDashboard = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get<Activity[]>("/api/activity/latest")
      .then(setActivities)
      .catch(() => setError("Failed to load activity log."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Admin dashboard cards removed as requested */}
    </div>
  );
};

export default AdminDashboard;
