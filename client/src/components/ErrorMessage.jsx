function ErrorMessage({ message }) {
    return (
        <div className="page">
            <div className="card">
                <h2>Uhhh Portals have collapsed</h2>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default ErrorMessage;