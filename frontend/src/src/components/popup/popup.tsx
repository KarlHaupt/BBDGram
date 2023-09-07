import react from 'react';
import Popup from 'reactjs-popup';

const PopupElement = () => {
    return( <div>
        <Popup trigger=
            {<button> Click to open popup </button>}
            position="right center">
            <div>New Post</div>
            <button>Upload a new Post</button>
        </Popup>
    </div>)
}

export default PopupElement;