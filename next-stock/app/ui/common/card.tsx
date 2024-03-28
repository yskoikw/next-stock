export default function Card({title, value}: {title: string, value: string}) {
    return(
        <div className="inline-block min-w-44 bg-white p-5 text-center rounded-md shadow-xl">
            <dl>
                <dt>{title}</dt>
                <dd className="text-2xl font-bold">{value}</dd>
            </dl>
        </div>
    );
}