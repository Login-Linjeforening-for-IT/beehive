export default function Chart({size,fill,className}:{size:string,fill:string,className:string}) {
    return(
        <svg xmlns='http://www.w3.org/2000/svg' height={size} width={size} viewBox='0 -960 960 960' fill={fill} className={className}>
            <path d='m140-220-60-60 300-300 160 160 284-320 56 56-340 384-160-160-240 240Z'/>
        </svg>
    )
}