import { redirect } from 'next/navigation';

export default function RootPage() {
  // In a real app, check session and redirect accordingly
  redirect('/chat/new');
}
