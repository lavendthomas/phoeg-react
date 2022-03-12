import React, { useEffect, useState } from "react";
import { readGraph } from "../core/ParseFiles";
import GraphSlider from "./GraphSlider";
import {API_URL} from "../.env";
import {fetch_api} from "../core/utils";

export default function Graphs(props) {
    const [graphlist, setGraphList] = useState(["@"]); // La liste des graphes correspondant aux critères
    const [computedList, setComputedList] = useState(false);

    useEffect( () => {

        const graphPath = props.graphPath.value.path;
        let graphs_request = new URL(`${API_URL}${graphPath}`)

        graphs_request.searchParams.append("max_graph_size", props.formData.max_graph_size);

        graphs_request.searchParams.append("invariants[0][name]", props.formData.x_invariant);
        graphs_request.searchParams.append("invariants[1][name]", props.formData.y_invariant);

        // Filter for specific invariant values
        graphs_request.searchParams.append("invariants[0][value]", props.invariantXValue);
        graphs_request.searchParams.append("invariants[1][value]", props.invariantYValue);

        fetch_api(graphs_request.toString(), {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let temp = readGraph(myJson, props.formData.x_invariant, props.invariantXValue, props.formData.y_invariant, props.invariantYValue);
                if (temp !== null) {
                    setGraphList(temp);
                    setComputedList(true);
                } else {
                    setComputedList(false);
                }
            })
    }, [props.invariantXName, props.invariantXValue, props.formData, props.invariantYValue] );

    const RenderGraphSlider = () => {
        if (computedList) {
            return <GraphSlider graphList={graphlist}/>;
        } else {
            return null;
        }
    }

    return (
        <div className="graphs">
            <h2 className="graphs-title">Graphe(s)</h2>
            <p> Nom de l'invariant : {props.invariantXName} | Nombre d'arêtes : {props.invariantYValue} | Nombre de sommets : {<props className="formData max_graph_size"></props>} | Valeur de l'invariant : {props.invariantXValue} </p>
            <RenderGraphSlider />
        </div>
    );
}