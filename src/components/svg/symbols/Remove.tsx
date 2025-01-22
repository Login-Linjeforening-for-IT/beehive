export default function Remove({size,fill,className}:{size:string,fill:string,className:string}) {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 -960 960 960" fill={fill} className={className}>
            <path d="M200-440v-80h560v80H200Z"/>
        </svg>
    )
}