export default function SignUpSuccess() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 You’re Signed Up!
      </h1>
      <p className="text-lg text-muted-foreground mb-6 max-w-md">
        Welcome to the <strong>(Unofficial) Necco Time Studies</strong> club!  
        You can now log in and start tracking your legendary productivity.
      </p>
      <a
        href="/auth/login"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Go to Login
      </a>
    </main>
  );
}
