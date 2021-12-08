import React, { useEffect, useState } from "react";
import Graph from "./Graph";

export default function GraphSlider(props) {
    const [currentIndex, setCurrentIndex] = useState(0); // Indice du graphe à afficher
    const [currentSign, setCurrentSign] = useState(props.graphList[currentIndex]);

    useEffect( () => {
        setCurrentSign(props.graphList[currentIndex]);
        }, [props.graphList, currentSign, currentIndex] );

    const handleClickPrevious = () => {
        console.log("Previous " + currentIndex);
        setCurrentIndex(1);
        //currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(props.graphList.length - 1)
        return null;
    }

    const handleClickNext = () => {
        console.log("Next " + currentIndex);
        //setCurrentIndex((currentIndex + 1) % props.graphList.length);
        return null;
    }

    const RenderSlider = () => {
        if (props.graphList.length === 1) {
            return <Graph signature={currentSign}/>
        } else {
            return (
                <div>
                    <button onClick={handleClickPrevious}> Précédent </button>
                    <Graph signature={currentSign}/>
                    <button onClick={handleClickNext}> Suivant </button>
                </div>
            );
        }
    }

    return (
        <div className="graphslider">
            <p> Nous avons trouvé {props.graphList.length} graphe(s) différent(s) </p>
            <h3> Graphe dont la signature est : {currentSign} </h3>
            <RenderSlider />
        </div>
    );

}