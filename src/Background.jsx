import React, { useState } from "react";
import Popup from "./popup/Popup";

function App() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div>
            <button onClick={() => setShowPopup(true)}>Show Popup</button>
            {showPopup && (
                <Popup message="Hello!" onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
}

export default App;

