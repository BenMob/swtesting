import React, {useState}from 'react'
import NodeCoverage from "./NodeCoverage"

// Data section
let alpha1 = 0;
let alpha2 = 0;
let sameSignum = undefined;
let output = [];
let nodes = [];


function SWTest() {
    function toggleNode2(){
        nodes[1] = true;  // node setter
        return true;
    }

    function toggleNode5(){
        nodes[4] = true;   // node setter
        return true;
    }
    function toggleNode6(){
        nodes[5] = true;   // node setter
        return true;
    }

    function computeInteraction(point1, point2, point3, point4){
        nodes[0] = true;  // node setter
        let x = point2 [0];
        let y = point2 [1];
        alpha1 = (point2 [1] - point1 [1]) / (point2 [0] - point1 [0]);
        alpha2 = (point4 [1] - point3 [1]) / (point4 [0] - point3 [0]);
        console.log("- Node1: (alpha1, alpha2) " + alpha1 + ", " + alpha2);
        if(alpha1.toString() === "NaN" || alpha2.toString() === "NaN") return [x,y];
        if (toggleNode2() && alpha1.toString() !== alpha2.toString()) {
            // If first line is vertical
           if (Math.abs(alpha1) > 4000)  {
               nodes[2] = true;  // node setter
             if (Math.abs(alpha2) < 4000) {
                nodes[3] = true;  // node setter
                x = point1 [0];
                let beta2 = point4 [1] - alpha2 * point4 [0];
                y = alpha2 * x + beta2;
            }
            // If second line is vertical
            } else if (toggleNode5() && Math.abs(alpha2) > 4000) {
                if (toggleNode6() && Math.abs(alpha1) < 4000) {
                    nodes[6] = true;
                    x = point3 [0];
                    let beta1 = point2 [1] - alpha1 * point2 [0];
                    y = alpha1 * x + beta1;
                }
            } else { 
                nodes[7] = true;
                sameSignum = Math.sign(alpha1) === Math.sign(alpha2);
                if ((sameSignum && (Math.abs(alpha1) > Math.abs(alpha2)   ? alpha1 / alpha2   : alpha2 / alpha1) > 1.0001)
                    || (!sameSignum && Math.abs(alpha1 - alpha2) > 1E-5)) {
                    nodes[8] = true;
                    let beta1 = point2 [1] - alpha1 * point2 [0];
                    let beta2 = point4 [1] - alpha2 * point4 [0];
                    x = (beta2 - beta1) / (alpha1 - alpha2);
                    y = alpha1 * x + beta1;
                }
            } 
        }
        console.log("- Node10: (alpha1, alpha2, sameSignum): " + alpha1 + ", " + alpha2 + ", " + sameSignum);
        nodes[9] = true;
        return [x, y];
    }

    const [p1_0, setP1_0] = useState(0);
    const [p1_1, setP1_1] = useState(0);
    const [p2_0, setP2_0] = useState(0);
    const [p2_1, setP2_1] = useState(0);
    const [p3_0, setP3_0] = useState(0);
    const [p3_1, setP3_1] = useState(0);
    const [p4_0, setP4_0] = useState(0);
    const [p4_1, setP4_1] = useState(0);
    const [thealpha1, setAlpha1] = useState("NaN");
    const [thealpha2, setAlpha2] = useState("NaN");
    const [thesignSignum, setSignnum] = useState(["NaN"]);
    const [theoutput, setOutput] = useState("...");
    const [thenodes, setNodes] = useState([]);


    const handleP1_0 = (event) =>{
        setP1_0(event.target.value);
    }

    const handleP1_1 = (event) =>{
        setP1_1(event.target.value);
    }

    const handleP2_0 = (event) =>{
        setP2_0(event.target.value);
    }

    const handleP2_1 = (event) =>{
        setP2_1(event.target.value);
    }

    const handleP3_0 = (event) =>{
        setP3_0(event.target.value);
    }

    const handleP3_1 = (event) =>{
        setP3_1(event.target.value);
    }

    const handleP4_0 = (event) =>{
        setP4_0(event.target.value);
    }

    const handleP4_1 = (event) =>{
        setP4_1(event.target.value);
    }

    const clearNodes = () => {
        nodes = [];
        setNodes(nodes);
    }

    const clearInputs = () => {
        setP1_0("");
        setP1_1("");
        setP2_0("");
        setP2_1("");
        setP3_0("");
        setP3_1("");
        setP4_0("");
        setP4_1("");
    }

    const handleReset = () => {
        alpha1 = 0;
        alpha2 = 0;
        sameSignum = undefined;
        output = [];
        setAlpha1("NaN");
        setAlpha2("NaN");
        setSignnum("NaN");
        setOutput(output)
        clearNodes();
        clearInputs();
    }

    const handleSubmit = () => {
        output = computeInteraction([p1_0, p1_1], [p2_0, p2_1], [p3_0, p3_1], [p4_0, p4_1]);
        setAlpha1(alpha1);
        setAlpha2(alpha2);
        if(sameSignum === undefined){
            setSignnum("NaN");
        }else{
            sameSignum? setSignnum("True"): setSignnum("False");
        }
        setOutput(`[${output[0]}, ${output[1]}]`);
        setNodes(nodes);
    }

    return (
        <div className="container">
            <div className="container2">
                <div className="section">
                    <h3>Inputs</h3>
                    <div>
                        <label>point1: </label>
                        <input className="input" value={p1_0} onChange = {handleP1_0}></input>
                        <input className="input" value={p1_1} onChange = {handleP1_1}></input>
                    </div>
                    <div>
                        <label>point2: </label>
                        <input className="input" value={p2_0} onChange = {handleP2_0}></input>
                        <input className="input" value={p2_1} onChange = {handleP2_1}></input>
                    </div>
                    <div>
                        <label>point3: </label>
                        <input className="input" value={p3_0} onChange = {handleP3_0}></input>
                        <input className="input" value={p3_1} onChange = {handleP3_1}></input>
                    </div>
                    <div>
                        <label>point4: </label>
                        <input className="input" value={p4_0} onChange = {handleP4_0}></input>
                        <input className="input" value={p4_1} onChange = {handleP4_1}></input>
                    </div>
                    <div className="clear">
                        <button onClick={handleReset}>Reset</button>
                    </div>
                    <div className="submit">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>  
                </div>
                <div className="section">
                    <h3>Computed Values</h3>
                    <div className="flex-start">
                        <p>alpha1: <span>{thealpha1}</span> </p>
                    </div>
                    <div className="flex-start">
                        <p>alpha2: <span>{thealpha2}</span> </p>
                    </div>
                    <div className="flex-start">
                        <p>signNum: <span>{thesignSignum}</span> </p>
                    </div>
                </div> 
                <div className="section">
                    <h3>Output</h3>
                    <div className="flex-start">
                        <p>{theoutput}</p>
                    </div>
                </div>
                            
            </div>
            <div className="nc-section">
                {(thenodes.length !== 0) && <NodeCoverage nodes={thenodes} />}
            </div>  
        </div>
    )
}


export default SWTest
