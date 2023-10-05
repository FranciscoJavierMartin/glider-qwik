import { component$ } from '@builder.io/qwik';
import { Link, Form, routeAction$, zod$, z } from '@builder.io/qwik-city';
import ErrorMessages from '@/components/error-messages/ErrorMessages';
import { getSupabaseServerClient } from '@/utils/getSupabaseClient';

const registerSchema = z
  .object({
    fullName: z
      .string({ required_error: 'Full name is required' })
      .min(7, 'Full name should be more than 7 characters')
      .refine(
        (fullName) => fullName,
        'Full name first letter should be uppercased'
      ),
    nickName: z
      .string({ required_error: 'Nickname is required' })
      .min(4, 'Nickname should be more than 4 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Email input is bad formatted'),
    avatar: z
      .string({ required_error: 'Avatar is required' })
      .url('URL is bad formatted'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password should be more than 6 characters'),
    passwordConfirmation: z
      .string({
        required_error: 'Password confirmation is required',
      })
      .min(6, 'Password Confirmation should be more than 6 characters'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password should be same as Password confirmation',
    path: ['passwordConfirmation'],
  });

export const useRegister = routeAction$(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ password, passwordConfirmation, ...data }, request) => {
    const supabaseClient = getSupabaseServerClient(request);

    const response = await supabaseClient.auth.signUp({
      email: data.email,
      password,
    });

    if (response.data.user) {
      const { error } = await supabaseClient.from('users').insert({
        uid: response.data.user.id,
        ...data,
      });

      if (!error) {
        request.redirect(302, '/');
      }
    }

    return response;
  },
  zod$(registerSchema)
);

export default component$(() => {
  const register = useRegister();

  return (
    <div class='flex-it justify-center items-center h-full'>
      <div class='text-white text-4xl font-bold'>Glider - Create Account</div>
      <div class='mt-10 flex-it h-100 xs:w-100 w-full bg-white p-10 rounded-2xl'>
        <div class='flex-it'>
          <Form class='flex-it' action={register}>
            <div class='flex-it overflow-hidden sm:rounded-md'>
              <div class='flex-it'>
                <div class='flex-it'>
                  <div class='flex-it py-2'>
                    <label class='block text-sm font-medium text-gray-700'>
                      Full Name
                    </label>
                    <input
                      type='text'
                      name='fullName'
                      id='fullName'
                      class='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                    <ErrorMessages
                      failed={register.value?.failed}
                      messages={register.value?.fieldErrors?.fullName}
                    />
                  </div>

                  <div class='flex-it py-2'>
                    <label class='block text-sm font-medium text-gray-700'>
                      Nick Name
                    </label>
                    <input
                      type='text'
                      name='nickName'
                      id='nickName'
                      class='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                    <ErrorMessages
                      failed={register.value?.failed}
                      messages={register.value?.fieldErrors?.nickName}
                    />
                  </div>

                  <div class='flex-it py-2'>
                    <label class='block text-sm font-medium text-gray-700'>
                      Email
                    </label>
                    <input
                      type='text'
                      name='email'
                      id='email'
                      class='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                    <ErrorMessages
                      failed={register.value?.failed}
                      messages={register.value?.fieldErrors?.email}
                    />
                  </div>

                  <div class='flex-it py-2'>
                    <label class='block text-sm font-medium text-gray-700'>
                      Avatar
                    </label>
                    <input
                      type='text'
                      name='avatar'
                      id='avatar'
                      class='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                    <ErrorMessages
                      failed={register.value?.failed}
                      messages={register.value?.fieldErrors?.avatar}
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
                      failed={register.value?.failed}
                      messages={register.value?.fieldErrors?.password}
                    />
                  </div>

                  <div class='flex-it py-2'>
                    <label class='block text-sm font-medium text-gray-700'>
                      Password Confirmation
                    </label>
                    <input
                      type='password'
                      name='passwordConfirmation'
                      id='passwordConfirmation'
                      class='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                    <ErrorMessages
                      failed={register.value?.failed}
                      messages={
                        register.value?.fieldErrors?.passwordConfirmation
                      }
                    />
                  </div>
                </div>
              </div>
              <div class='text-sm text-gray-600 pb-4'>
                Already Registered?{' '}
                <Link class='hover:underline' href='/login'>
                  Go to Login
                </Link>
              </div>
              <div class='flex-it py-2'>
                <button
                  type='submit'
                  disabled={register.isRunning}
                  class='
                  bg-blue-400 hover:bg-blue-500 focus:ring-0
                  disabled:cursor-not-allowed disabled:bg-gray-400
                  inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-offset-2'
                >
                  Register
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
});
