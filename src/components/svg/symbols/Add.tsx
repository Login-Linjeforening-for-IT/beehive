export default function Add({size,fill,className}:{size:string,fill:string,className:string}) {
    return(
        <svg xmlns='http://www.w3.org/2000/svg' height={size} width={size} viewBox='0 -960 960 960' fill={fill} className={className}>
            <path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/>
        </svg>
    )
}