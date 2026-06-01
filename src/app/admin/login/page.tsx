import { Suspense } from 'react';
import { LoginForm } from './login-form';

export const metadata = {
  title: 'Acceso - Polar Autopartes',
};

export default function AdminLoginPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-start min-h-[60vh]">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
