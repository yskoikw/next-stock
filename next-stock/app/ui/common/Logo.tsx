import Image from "next/image";
export default function Logo() {
    return (
        <div className="flex items-center">
            <Image
                className=""
                src="/logo.svg"
                alt="NextStock Logo"
                width={60}
                height={60}
                priority
            />
            <h1 className="text-2xl">NextStock</h1>
        </div>
    )
}