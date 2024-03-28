export function BlueButton({text}: {text: string}) {
    return(
        <p className="bg-blue p-3 min-w-40 text-center text-white text-xl rounded-md hover:bg-sky-100 hover:text-blue">
            {text}
        </p>
    );
}

export function BlueButtonLarge({text}: {text: string}) {
    return(
        <p className="bg-blue p-3 min-w-40 text-center text-white text-3xl font-bold rounded-md hover:bg-sky-100 hover:text-blue">
            {text}
        </p>
    );
}

export function ButtonTransparent({text}: {text: string}) {
    return(
        <p className="bg-transparent p-3 min-w-40 text-center text-black text-xl rounded-md hover:bg-sky-100 hover:text-blue">
            {text}
        </p>
    );
}

export function WhiteButton({text}: {text: string}) {
    return(
        <p className="bg-white p-3 min-w-40 text-center text-blue text-xl rounded-md hover:bg-sky-100">
            {text}
        </p>
    );
}

export function WhiteButtonSmall({text}: {text: string}) {
    return(
        <p className="inline bg-white px-3 py-2 min-w-40 text-center text-blue text-base rounded-md hover:bg-sky-100">
            {text}
        </p>
    );
}

export function WhiteButtonLarge({text}: {text: string}) {
    return(
        <p className="bg-white p-3 min-w-40 text-center text-blue text-3xl font-bold rounded-md hover:bg-sky-100">
            {text}
        </p>
    );
}