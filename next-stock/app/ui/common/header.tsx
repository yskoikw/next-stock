import { BlueButton, ButtonTransparent } from "@/app/ui/common/buttons";
import Logo from "@/app/ui/common/Logo";
import Link from 'next/link';

export default function Header() {
    return (
        <div id="header" className="w-full flex items-center justify-between p-3 border-b-glay border-solid border">
            <Logo />
            <div className="flex items-center">
                <Link href={`/login`} >
                    <ButtonTransparent text="Login" />
                </Link>
                <Link href={`/signup`}>
                    <BlueButton text="Sign up" />
                </Link>
            </div>
        </div>
    );
}