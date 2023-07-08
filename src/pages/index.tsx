import Image from 'next/image'
import Link from 'next/link'
import { AuthContext } from '../context'
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  
  const {state, dispatch} = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    console.log('The useEffect hook ran with accessToken: ', state.accessToken)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <div>
          <h1>Welcome to my Next.js app</h1>
          <button onClick={() => router.push('/api/auth/google')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.065 7.98H17v.503h-.45v.444h-1.102V7.98h-.503v-.45h.503V7.03h.444v1.502H17v.45h.065zM13.887 9h-.705v-.502h-.444V9h-.705v.39h.705v.49h.444v-.49h.705V9zM9.538 9h-.897V8.51H8.11V7.98H7.61v.53H6.713v.49h.897v.553H7.11v.5h.53v-.5h.897v-.553H8.64V9zm5.8 0H15.24V8.51h-.49V8h-.51v.51h-.49V9h-.694V8.51H12.12V8h-.51v.51h-.49V9h-.795V8.51h-.49V8H9.74v.51h-.49V9h-.694V8.51h-.49V8H8.11v.51H7.61V9H7.17V8.51h-.49V8H6.184v.51h-.49V9H4.852V8.51H4.362V8h-.49v.51H3.383V9h-.845C2.118 9 2 8.884 2 8.745V8.255c0-.14.118-.255.264-.255h.843V7.51h.49V7h.49v.51h.855c.146 0 .265.115.265.255v.49c0 .14-.118.255-.265.255h-.855V8.49h-.49V8h-.49v.49H3.383V9H2.876C2.73 9 2.61 8.885 2.61 8.745v-.49c0-.14.118-.255.265-.255h.844V8.49h.49V8h.49v.49h.844c.147 0 .266.115.266.255v.49c0 .14-.119.255-.266.255H4.45V9h.703V8.51h.49V8h.51v.51h.49V9h.795V8.51h.49V8h.51v.51h.49V9h.795V8.51h.49V8h.51v.51h.49V9zM17 2.87c.834 0 1.51.678 1.51 1.515v9.23c0 .837-.676 1.515-1.51 1.515H9.103v-1.104h6.65V4.518H9.103V3.414h7.107V2.87z"
              fill="currentColor"
              fill-rule="evenodd"
            />
            </svg>
            Sign in with Google
          </button>
        </div>
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore the Next.js 13 playground.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
