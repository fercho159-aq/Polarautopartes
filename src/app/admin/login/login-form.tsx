'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { loginAction, type LoginState } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Verificando...' : 'Entrar'}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState<LoginState, FormData>(loginAction, undefined);
  const next = useSearchParams().get('next') ?? '/admin/upload';

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Lock className="h-6 w-6 text-primary" />
          Acceso de administrador
        </CardTitle>
        <CardDescription>
          Ingresa tus credenciales para entrar al panel.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="next" value={next} />

          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>

          {state?.error && (
            <div className="flex items-center gap-2 text-destructive text-sm" role="alert">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
