import { cookies } from "next/headers";
import {
  getProjects,
  getExperience,
  getHackathons,
  getMessages,
  getProfile,
} from "../actions";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = cookies().get("admin_session")?.value === "true";

  if (!session) {
    return <AdminLogin />;
  }

  const [projects, experience, hackathons, messages, profile] =
    await Promise.all([
      getProjects(),
      getExperience(),
      getHackathons(),
      getMessages(),
      getProfile(),
    ]);

  return (
    <AdminDashboard
      projects={projects}
      experience={experience}
      hackathons={hackathons}
      messages={messages}
      profile={profile}
    />
  );
}
