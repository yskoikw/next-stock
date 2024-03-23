import Image from "next/image";

export function IconCircle({name}: {name: string}) {
    return (
        <div className="inline-block bg-white p-5 rounded-full shadow-xl">
            <Image
                src={`/icon/${name}.svg`}
                alt={`Icon ${name}`} 
                width={30}
                height={30}
                priority
                />
        </div>
    );
}