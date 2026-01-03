export default function DisplayError({ message }: { message?: string }) {
  return (
    <div
      className="
        w-full min-h-screen flex flex-col items-center justify-center 
        gap-6 p-6 animate-[fadeIn_0.3s_ease-out]
      "
    >
      {/* Title */}
      <p
        className="
          text-xl sm:text-4xl font-semibold font-lamoric 
          text-red-500 dark:text-red-400
        "
      >
        Something went wrong
      </p>

      {/* Subtext */}
      <p
        className="
          font-haneen text-sm  sm:text-xl 
          text-zinc-600 dark:text-zinc-400 
          text-center max-w-sm leading-relaxed
        "
      >
        {message || (
          <>
            We’re having trouble fetching the latest news.
            <br />
            Please try again soon.
          </>
        )}
      </p>
    </div>
  );
}
