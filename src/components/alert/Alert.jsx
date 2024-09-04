import './Alert.css';

const Alert = ({ children, variant = 'info', icon = 'info', className = '' }) => {
    return (
        <div className={`alert alert--${variant} ${className}`}>
            <i className="alert__icon material-symbols-sharp">{icon}</i>
            <div className="alert__content">{children}</div>
        </div>
    );
};

export default Alert;