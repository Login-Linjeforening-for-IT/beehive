
const HamburgerIcon = () => {

    const color = {
        fill: "#ffffff"
    }

    return (
        <svg width="3em" height="3em"> 
            <rect x="1%" rx="10%" ry="10%" y="10%" width="97%" height="15%" style={color} />
            <rect x="1%" rx="10%" ry="10%" y="40%" width="97%" height="15%" style={color} />
            <rect x="1%" rx="10%" ry="10%" y="70%" width="97%" height="15%" style={color} />
        </svg>
    )
}

export default HamburgerIcon;
