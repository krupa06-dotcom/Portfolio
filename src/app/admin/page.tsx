import { getProjects, getExperiences, getMessages } from "../actions";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { auth?: string };
}) {
  const isAuthed = searchParams.auth === process.env.ADMIN_SECRET;
  const authFailed = !!(searchParams.auth && !isAuthed);

  if (!isAuthed) {
    return <AdminLogin authFailed={authFailed} />;
  }

  const [projects, experiences, messages] = await Promise.all([
    getProjects(),
    getExperiences(),
    getMessages(),
  ]);

  return (
    <AdminDashboard
      projects={projects}
      experiences={experiences}
      messages={messages}
    />
  );
}
