import Logo from "@/app/ui/common/Logo";

export default function HeaderManager() {
    return (
        <div id="header" className="w-full flex items-start justify-between p-3 border-b-paleGlay border-solid border">
            <Logo />
        </div>
    );
}