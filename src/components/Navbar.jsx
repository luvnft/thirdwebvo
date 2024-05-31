import Logo from "../assets/images/logo.png";

const Navbar = () => {
  return (
    <>
      <nav className="w-full flex px-[5%] justify-between items-center border-b border-gray-800">
        <img src={Logo} alt="logo" width={80} />
        <p className="text-white my-6 text-4xl">Voting System</p>
      </nav>
    </>
  );
};

export default Navbar;
