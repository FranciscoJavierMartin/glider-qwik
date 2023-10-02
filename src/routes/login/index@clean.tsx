import { component$ } from '@builder.io/qwik';
import { Link, Form, zod$, z, routeAction$ } from '@builder.io/qwik-city';
import ErrorMessages from '@/components/error-messages/ErrorMessages';
import { getSupabaseServerClient } from '@/utils/getSupabaseClient';

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Email input is bad formatted'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(4, 'Password should be more than 4 characters'),
});

export const useLogin = routeAction$(async (data, request) => {
  const supabaseClient = getSupabaseServerClient(request);

  const authToken = await supabaseClient.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  request.redirect(302, '/');

  return authToken;
}, zod$(loginSchema));

export default component$(() => {
  const login = useLogin();

  return (
    <div class='flex-it justify-center items-center h-full'>
      <div class='text-white text-4xl font-bold'>Glider - Get In</div>
      <div class='mt-10 flex-it h-100 xs:w-100 w-full bg-white p-10 rounded-2xl'>
        <div class='flex-it'>
          <Form class='flex-it' action={login}>
            <div class='flex-it overflow-hidden sm:rounded-md'>
              <div class='flex-it'>
                <div class='flex-it'>
                  <div class='flex-it py-2'>
                    <label class='block text-sm font-medium text-gray-700'>
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      class='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                    <ErrorMessages
                      failed={login.value?.failed}
                      messages={login.value?.fieldErrors?.email}
                    />
                  </div>
                  <div class='flex-it py-2'>
                    <label class='block text-sm font-medium text-gray-700'>
                      Password
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      class='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                    <ErrorMessages
                      failed={login.value?.failed}
                      messages={login.value?.fieldErrors?.password}
                    />
                  </div>
                </div>
              </div>
              <div class='text-sm text-gray-600 pb-4'>
                No Account Yet?{' '}
                <Link class='hover:underline' href='/register'>
                  Create a new account
                </Link>
              </div>
              <div class='flex-it py-2'>
                <button
                  type='submit'
                  disabled={login.isRunning}
                  class='
                bg-blue-400 hover:bg-blue-500
                inline-flex focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-400 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-offset-2'
                >
                  Login
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
});
