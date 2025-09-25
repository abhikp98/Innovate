import Profile from "./Profile";
export default function Header() {
  return (
    <header className="h-20 flex justify-between items-center bg-emerald-500 shadow-sm">
      <div className="w-1/3"></div>
      <h1 className="text-2xl text-white font-bold w-1/3">Innovate .</h1>
      <div className="mr-5">
        <Profile />
      </div>
    </header>
  );
}
