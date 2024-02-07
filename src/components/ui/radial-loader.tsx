import { PrimitiveAtom, useAtom } from 'jotai';

type Props = {
  percentAtom: PrimitiveAtom<number>;
}

export function RadialLoader({ percentAtom }: Props) {
  const [percent,] = useAtom(percentAtom)

  return <div className="w-8 h-14 flex flex-col justify-end">
    <svg className="w-8 h-8 transform translate-x-1 translate-y-1" aria-hidden="true">
      <circle
        className="stroke-muted"
        strokeWidth="5"
        fill="transparent"
        r="12.5"
        cx="15"
        cy="15" />
      <circle
        className="stroke-foreground transition-all"
        strokeWidth="5"
        strokeDasharray={2 * Math.PI * 12.5}
        strokeDashoffset={2 * Math.PI * 12.5 - percent / 100 * 2 * Math.PI * 12.5}
        strokeLinecap="round"
        fill="transparent"
        r="12.5"
        cx="15"
        cy="15" />
    </svg>
  </div>
};
