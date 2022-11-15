import Globe from "@/components/Globe";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <Head>
        <title>Why Earth</title>
        <meta name="description" content="Why Earth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative left-0 top-0 w-screen h-screen flex flex-col justify-center items-center md:items-start p-5 md:p-10">
        <div className="w-full md:w-2/3 xl:w-1/2 h-full flex flex-col justify-center items-center z-10">
          <h1 className="text-white text-3xl md:text-6xl text-center font-semibold mb-10">
            Knowledge As a Service
          </h1>
          <p className="text-slate-300 text-xl md:text-2xl text-center font-semibold mb-10">
            Most of the world will make decisions by either guessing or using
            their gut. They will be either lucky or wrong. Artificial
            Intelligence has a strong grasp on probability, yet still
            can&rsquo;t compute cause and effect. Until now.
          </p>
          <div className="w-full md:w-4/5 flex flex-col md:flex-row justify-between items-center space-x-0 md:space-x-3 space-y-3 md:space-y-0">
            <input
              type="text"
              id="email"
              className="flex w-full md:w-auto flex-grow h-16 bg-gray-50 border border-gray-300 text-gray-900 text-base md:text-lg rounded-lg outline-none focus:outline-none p-5"
              placeholder="Enter your email"
            />
            <Link href="/signin">
              <button className="w-full md:w-fit h-16 bg-green-600 hover:bg-green-800 rounded-lg px-8 py-5 transition-all duration-300 cursor-pointer">
                <span className="w-full text-white text-base md:text-lg font-bold whitespace-nowrap">
                  SIGN UP FOR THE ALPHA
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-2/3 xl:w-1/2 h-full flex flex-col justify-center items-center absolute left-0 md:left-1/3 xl:left-1/2 z-0">
          <Globe />
        </div>
      </main>
    </div>
  );
}
