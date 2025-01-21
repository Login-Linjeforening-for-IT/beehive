export default function Calendar({size,fill}:{size:string,fill:string}) {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 -960 960 960" fill={fill}>
            <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM120-80v-720h120v-80h80v80h320v-80h80v80h120v720H120Zm80-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
        </svg>
    )
}