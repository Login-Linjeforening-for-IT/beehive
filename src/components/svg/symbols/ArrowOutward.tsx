export default function ArrowOutward({size,fill,className}:{size:string,fill:string,className:string}) {
    return(
        <svg xmlns='http://www.w3.org/2000/svg' height={size} width={size} viewBox='0 -960 960 960' fill={fill} className={className}>
            <path d='m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z'/>
        </svg>
    )
}