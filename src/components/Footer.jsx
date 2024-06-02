import Logo from "../assets/images/logo.png"

const Footer = () => {
    return ( 
        <div className="flex justify-between px-[5%] border-t border-gray-800 items-center">
            <img src={Logo} alt="" width={70} />
            <p className="text-white">Created by The Wizard of Hahz</p>
        </div>
     );
}
 
export default Footer;