import ThemeToggle from "@/Components/ThemeToggle";

export default function Header() {
  return (
    <header className="flex gap-6 justify-between items-center ">
      <p className="text-3xl sm:text-5xl md:text-6xl text-zinc-800 dark:text-zinc-100">
        GitHub Repo Explorer
      </p>
      <ThemeToggle />
    </header>
  );
}
