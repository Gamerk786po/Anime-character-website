import SocialContact from "./social-contact";

// props of footer.tsx
interface FooterProps {
  mode: number;
}
// component
const Footer: React.FC<FooterProps> = ({ mode }) => {
  // contacts
  const contacts = [
    {name: "discord", url: "https://discord.com/users/gamerk_786po"},
    {name: "instagram", url: "https://www.instagram.com/gamerk786po/"},
    {name: "github", url: "https://github.com/Gamerk786po"},
    { name: "gmail", url: "https://mail.google.com/mail/?view=cm&fs=1&to=abdullahpper@gmail.com" }
  ]
  return (
    // Main container containing
    <div
      className={`max-w-full h-30 flex flex-col items-center md:flex-row gap-5 justify-evenly px-[2rem] mt-5 ${
        mode === 1 ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      } transition-all delay-150 duration-300 ease-in-out`}
    >
      <div>
        {/* crafted by */}
        <div>Crafted with ❤️ by Gamerk • © 2025</div>
        {/* container containing contacts */}
        <div className="flex justify-around">
        {contacts.map((contact) => (
          <SocialContact
            name={contact.name}
            url={contact.url}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
