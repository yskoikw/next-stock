import Logo from "@/app/ui/common/Logo";

export default function Footer() {
    return (
        <div id="footer" className="mb-3 border-t-paleGlay border-solid border">
            <ul className="flex justify-end mb-3">
                <li>
                    <a
                    href="https://github.com/yskoikw/next-stock"
                    className="p-5 m-3 inline-block rounded-md hover:bg-sky-100 hover:text-blue"
                    target="_blank"
                    >
                    <h2 className="mb-3 text-2xl">Github</h2>
                    <p className="text-sm">
                        Do you have any ideas or find any bags?<br />
                        Let me know by creating an issue.
                    </p>
                    </a>
                </li>
            </ul>

            <div className="flex flex-col items-center">
                <Logo />
                <p className="">© 2024 Yoshiki Oikawa.</p>
            </div>
        </div>
    );
}