import { RegisterForm } from './register-form'
import { isGoogleAuthEnabled } from '@/lib/google-auth'

export default function RegisterPage() {
  return <RegisterForm googleEnabled={isGoogleAuthEnabled()} />
}
