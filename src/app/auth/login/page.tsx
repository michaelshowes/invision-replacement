import ISLogo from '@/assets/images/svg/ISLogo';
import { LoginForm } from '@/components/auth/LoginForm';
import { sessionRedirect } from '@/utils/sessionRedirect';

export default async function LoginPage() {
  await sessionRedirect();

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <a
          href='https://www.interactivestrategies.com'
          target='_blank'
          className='flex items-center gap-2 self-center font-medium'
        >
          <div className={'size-32'}>
            <ISLogo />
          </div>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
