
const HamburgerIcon = (props) => {

    return (
        <div className={(props.open ? 'Open ' : '') + 'HamburgerIcon'}>
            <div></div>
            <div></div>
        </div>
    )
}

export default HamburgerIcon;
