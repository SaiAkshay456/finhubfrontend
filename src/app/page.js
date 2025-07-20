'use client';
import Header from '@/components/Header';
import HeroLanding from '@/components/HeroLanding';
import { useAuth } from '@/providers/AuthProvider';
import Statistics from '@/components/Statistics';
export default function HomePage() {
  const { isAuthorized, user } = useAuth();

  if (isAuthorized) {
    return (
      <div>
        <Statistics />
      </div>
    );
  }

  // Show landing page for unauthorized users
  return (
    <>
      <Header />
      <HeroLanding />
    </>
  );
}
