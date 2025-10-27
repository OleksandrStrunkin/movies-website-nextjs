import useThemeStore from "@/store/themeStore";

export default function Header() {
  const { colorTheme, setColorTheme } = useThemeStore();
  const toggleTheme = () => {
    const newTheme = colorTheme === "light" ? "dark" : "light";
    setColorTheme(newTheme);
  };
  return (
    <header className="w-full bg-gray-700/60 fixed z-10 text-white p-4">
      <h1 className="text-2xl font-bold">Movie App</h1>
      <button className="h-12 w-32 bg-amber-300 text-black p-4 text-sm" onClick={toggleTheme}>Color theme</button>
      <p>{colorTheme}</p>
    </header>
  );
}