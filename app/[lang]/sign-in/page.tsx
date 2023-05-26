import { signIn } from 'next-auth/react';

export default function SignIn({ lang }: { lang: string }) {
  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   const result = await signIn('credentials', {
  //     redirect: false,
  //     email: e.target.email.value,
  //     password: e.target.password.value,
  //   })
  //   if (result.ok) {
  //     router.replace('/');
  //     return;
  //   }
  //   console.log({ result });
  // };

  return (
    <>
      <h1>Sign In</h1>
      <form>
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' type='email' />
        <label
          style={{
            marginTop: 10,
          }}
          htmlFor='password'
        >
          Password
        </label>
        <input id='password' name='password' type='password' />
        <button
          style={{
            marginTop: 15,
          }}
        >
          Sign In
        </button>
      </form>
    </>
  );
}
