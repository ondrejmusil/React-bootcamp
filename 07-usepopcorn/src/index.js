import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from "./StarRating";
import {ExpandText} from "./expandText";

function Test() {
    const [movieRating, setMovieRating] = useState(0);

    return (
        <div>
            <StarRating maxRating={10} onSetRating={setMovieRating}/>
            <p>This movie was rated {movieRating} stars</p>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/*<App />*/}
        {/*<StarRating maxRating={5}/>*/}
        {/*<Test />*/}
        <ExpandText/>
    </React.StrictMode>
);
