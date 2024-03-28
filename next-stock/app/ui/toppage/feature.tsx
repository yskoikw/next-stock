import IconCircle from "@/app/ui/common/iconCircle";

export default function Feature(
    {
      icon,
      dt,
      dd
    }: 
    {
      icon: string,
      dt: string,
      dd: string
    }
  ) {
    return (
      <li className="w-1/3 pr-7 mb-10">
        <IconCircle name={icon}/>
        <dl>
          <dt className="font-bold text-2xl my-3">{dt}</dt>
          <dd className="text-lg">{dd}</dd>
        </dl>
      </li>
    );
  }