// props of footer.tsx
interface FooterProps {
  mode: number;
}
// component
const Footer: React.FC<FooterProps> = ({ mode }) => {
  return <div
  className={`max-w-full h-30 flex flex-col items-center md:flex-row gap-5 justify-evenly px-[2rem] mt-5 ${
    mode === 1 ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
  } transition-all delay-150 duration-300 ease-in-out`}
  >Crafted with ❤️ by Gamerk • © 2025</div>;
};

export default Footer;
