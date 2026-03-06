import ChatLayout from '../components/ChatLayout';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  return <ChatLayout user={user} />;
}
