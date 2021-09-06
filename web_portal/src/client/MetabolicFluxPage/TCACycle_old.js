import React from 'react';
import './metabolicflux.css'

class TCACycle extends React.Component{

    render() {

        return(
            <svg id="svg-container" xmlns="http://www.w3.org/2000/svg" id="metabolicFluxSVG" width="900" height="291">

              {/*<!--popup--> */}

              <rect id="myPopup" class="popup" x="625" y="25" height="250" width="200"/>

              {/* <!--gradients--> */}
              <defs>
                  <radialGradient id="carbonGradient"
                      cx="0.35" cy="0.35" r="0.40">
                    <stop offset="0%" stop-color="#a2fbca"/>
                    <stop offset="100%" stop-color="mediumseagreen"/>
                  </radialGradient>
              </defs>

              {/* <!--circles--> */}
              <g id="tca cycle">
                <circle cx="300" cy="145" r="45" style={{strokeWidth:"1px", stroke:"black", fill:"none"}}/>
                <rect x="253" y="115" width="15" height="61" style={{fill:"white"}}/>
                <path d="M266,180 L266,172 273,177 266,180" style={{strokeWidth:"1px", stroke:"black", fill:"black"}}/>
                <path d="M310,101 Q290,100 290,80" style={{strokeWidth:"1px", stroke:"black", fill:"none"}}/>
                <text x="300" y="145" style={{textAnchor:"middle", stroke:"black", strokeWidth:"1px", fontSize:"17px", letterSpacing:"2"}}>
                  <tspan style={{textAnchor:"middle"}} x="303" y="137">TCA</tspan>
                  <tspan style={{textAnchor:"middle"}} x="300" y="158">Cycle</tspan>
                 </text>
              </g>

              {/* <!--circle definition--> */}
              <symbol id="2 circles">
                <circle cx="9" cy="9" r="9" style={{fill:"url(#carbonGradient)", stroke:"none", strokeWidth:"2px"}}/>
                <circle cx="31" cy="9" r="9" style={{fill:"url(#carbonGradient)", stroke:"none", strokeWidth:"2px"}}/>
                <line x1="17" y1="9" x2="23" y2="9" style={{stroke:"mediumseagreen", strokeWidth:"2px"}}/>
              </symbol>

              {/* <!--acetyl-coa--> */}
              <use xlinkHref="#2 circles" x="283" y="57"/>
              <text x="289" y="69" style={{stroke:"black", strokeWidth:"1px", fontSize:"10px", letterSpacing:"7.5"}}>1 2</text>
              <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="365" y="70">Acetyl CoA</text>

              {/* <!--connecting pyruvate&acetylcoa--> */}
              <path d="M245,35 L280,55 276,55 278,52 280,55" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}} />

              {/* <!--citrate synthase--> */}
              <text style={{textAnchor:"middle", fill:"mediumorchid", stroke:"mediumorchid", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"0.5"}} x="365" y="90">
                <tspan x="371" y="90">Citrate</tspan>
                <tspan x="368" y="103">Synthase</tspan>
              </text>
              {/* <!--pdh--> */}
              <text style={{textAnchor:"start", fill:"mediumorchid", stroke:"mediumorchid", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"0.5"}} x="133" y="210">
                <tspan x="258" y="37">PDH</tspan>
                <tspan class="flux" x="273" y="50" style={{letterSpacing:"0.5px"}}>V
                  <tspan baseline-shift="sub" style={{fontSize:"6px"}}>PDH</tspan>
                  <tspan x="300" y="50" style={{letterSpacing:"0.5px"}}>/V</tspan>
                  <tspan baseline-shift="sub" style={{fontSize:"6px"}}>CS</tspan>
                </tspan>
              </text>

            {/* <!--pyruvate-->  */}
                <use xlinkHref="#2 circles" x="178" y="27"/>
                <use xlinkHref="#2 circles" x="200" y="27"/>
                <text x="184" y="39" style={{stroke:"black", strokeWidth:"1px", fontSize:"10px", letterSpacing:"7.5"}}>1 2 3</text>
                <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="209" y="22">Pyruvate</text>
                <path d="M215,128 L215,168 217,165 213,165 215,169" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}} transform="translate(15,-77)"/>
            {/* <!--pyruvate carboxylase--> */}
                <text style={{textAnchor:"end", fill:"mediumorchid", stroke:"mediumorchid", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"0.5"}} x="133" y="210">
                    <tspan x="230" y="65">Pyruvate Carboxylase</tspan>
                    <tspan class="flux" x="227" y="78" style={{letterSpacing:"0.5px"}}>V
                        <tspan baseline-shift="sub" style={{fontSize:"6px"}}>PC</tspan>
                    </tspan>
                </text>

                {/* <!--oxaloacetate--> */}
                <g id="4 circles">
                    <use xlinkHref="#2 circles" x="161" y="107"/>
                    <use xlinkHref="#2 circles" x="206" y="107"/>
                    <line x1="200" y1="116" x2="206" y2="116" style={{stroke:"mediumseagreen", strokeWidth:"2px"}}/>
                {/* <!--Text in 4 circles--> */}
                    <text x="167" y="119" style={{stroke:"black", strokeWidth:"1px", fontSize:"10px", letterSpacing:"7.5"}}>
                        <tspan>1</tspan>
                        <tspan>2</tspan>
                        <tspan>3</tspan>
                        <tspan>4</tspan>
                    </text>
                </g>

                {/* <!--oxaloacetate label--> */}
                <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="203" y="103">Oxaloacetate</text>
                {/* <!--connecting phosphoenol/oxalo--> */}
                <path d="M408,218 L352,218 355,220 355,216 351,218" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}} transform="translate(-258,-100)"/>
                {/* <!--PEPCK--> */}
                <text style={{textAnchor:"middle", fill:"mediumorchid", stroke:"mediumorchid", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"0.5"}} x="100" y="150">
                    <tspan x="125" y="135">PEPCK</tspan>
                    <tspan class="flux" x="125" y="148" style={{letterSpacing:"0.5px"}}>V
                        <tspan baseline-shift="sub" style={{fontSize:"6px"}}>PEPCK</tspan>
                    </tspan>
                </text>

                {/* <!--fulmarate/malate--> */}
                <use xlinkHref="#4 circles" x="0" y="53"/>
                <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="203" y="190">Fulmarate/Malate</text>
                <path d="M215,158 L215,128 213,131 217,131 215,127" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}}/>
                <path d="M193,159 L193,129 191,132 195,132 193,128" transform="rotate(180,193,143)" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}}/>
                {/* <!--succinate dehydrogenase--> */}
                <text style={{textAnchor:"middle", fill:"mediumorchid", stroke:"mediumorchid", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"0.5"}} x="133" y="210">
                    <tspan x="145" y="210">Succinate Dehydrogenase</tspan>
                    <tspan class="flux" x="145" y="223" style={{letterSpacing:"0.5px"}}>V
                        <tspan baseline-shift="sub" style={{fontSize:"6px"}}>SDH</tspan>
                    </tspan>
                </text>

                {/* <!--succinyl coa--> */}
                <use xlinkHref="#4 circles" x="100" y="102"/>
                <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="304" y="205">Succinyl CoA</text>
                <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="304" y="270">
                    <tspan x="306" y="275"> Propionate, Val, </tspan>
                    <tspan x="304" y="288">Iso, Thr, Met</tspan>
                </text>
                <path d="M215,160 L215,128 213,131 217,131 215,127" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}} transform="translate(122 104)"/>
                {/* <!--connecting succinyl&fulm/mal--> */}
                <path d="M245,35 L280,55" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}} transform="translate(-25,162)"/>
                <path d="M516,210 L521,210 519,213 517,210" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}} transform="translate(-297,-13)"/>
                {/* <!--succinyl coaana--> */}
                <text style={{textAnchor:"end", fill:"mediumorchid", stroke:"mediumorchid", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"0.5"}} x="133" y="210">
                    <tspan x="325" y="243">Succinyl CoA Anaplerosis</tspan>
                    <tspan class="flux" x="322" y="253" style={{letterSpacing:"0.5px"}}>V
                        <tspan baseline-shift="sub" style={{fontSize:"6px"}}>SUCCINYL COA ANA</tspan>
                    </tspan>
                </text>

             {/* <!--citrate--> */}
                <g id="5 circles">
                    <use xlinkHref="#4 circles" x="250" y="-15"/>
                    <circle cx="509" cy="101" r="9" style={{fill:"url(#carbonGradient)", stroke:"none", strokeWidth:"2px"}}/>
                    <line x1="494" y1="101" x2="500" y2="101" style={{stroke:"mediumseagreen", strokeWidth:"2px"}}/>
                    <text x="507" y="104" style={{stroke:"black", strokeWidth:"1px", fontSize:"10px", letterSpacing:"7.5"}}>5</text>
                </g>
            {/* <!--6th carbon--> */}
                <circle cx="465" cy="123" r="9" style={{fill:"url(#carbonGradient)", stroke:"none", strokeWidth:"2px"}}/>
                <line x1="465" y1="109" x2="465" y2="115" style={{stroke:"mediumseagreen", strokeWidth:"2px"}}/>
                <text x="462" y="126" style={{stroke:"black", strokeWidth:"1px", fontSize:"10px", letterSpacing:"7.5"}}>6</text>
                {/* <!--citrate label--> */}
                <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="465" y="87">Citrate</text>
                {/* <!--losing co2--> */}
                <text style={{textAnchor:"end", fill:"mediumaquamarine", stroke:"mediumaquamarine", strokeWidth:"0.8px", fontSize:"10px", letterSpacing:"1"}} x="531" y="127">
                    <tspan x="529" y="127" >
                        CO
                        <tspan x="531" y="127" baseline-shift="sub">2</tspan>
                    </tspan>
                </text>
                <path d="M478,123 L505,123 502,121 502,125 506,123" style={{stroke:"mediumaquamarine", strokeWidth:"1.5px", fill:"mediumaquamarine"}}/>


                {/* <!--isocitrate--> */}
                <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="545" y="160">Isocitrate</text>
                    {/* <!--connecting isocitrate & citrate--> */}
                    <path d="M245,35 L280,55 276,55 278,52 280,55" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}} transform="translate(230,100)"/>
                    {/* <!--connecting isocitrate & keto--> */}
                    <path d="M510,165 L475,190 478,190 476,187 474,190" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}}/>

                {/* <!--α ketoglutarate--> */}
                <use xlinkHref="#5 circles" x="-10" y="118"/>
                <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="454" y="205">α-ketoglutarate</text>
                    {/* <!--connecting keto&gluta--> */}
                    <path d="M245,35 L280,55 276,55 278,52 280,55" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}} transform="translate(272,175)"/>
                    <path d="M516,210 L521,210 519,213 517,210" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}}/>
                    {/* <!--connecting succinyl&keto--> */}
                    <path d="M396,218 L352,218 355,220 355,216 351,218" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}}/>
                    {/* <!--losing co2--> */}
                    <path d="M502,173 L475,190 478,190 476,187 474,190" style={{stroke:"mediumaquamarine", strokeWidth:"1.5px", fill:"mediumaquamarine"}}transform="translate(-60,57)" />
                    <text style={{textAnchor:"end", fill:"mediumaquamarine", stroke:"mediumaquamarine", strokeWidth:"0.8px", fontSize:"10px", letterSpacing:"1"}} x="410" y="250">
                        <tspan x="408" y="250" >
                            CO
                            <tspan x="410" y="250" baseline-shift="sub">2</tspan>
                        </tspan>
                    </text>

                {/* <!--Glutamate/Glutamine--> */}
                    <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="560" y="245">Glutamate</text>
                    <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="560" y="285">Glutamine</text>
                    <path d="M215,155 L215,128 213,131 217,131 215,127" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}} transform="translate(371 122)"/>
                    {/* <!--glutaminase--> */}
                    <text style={{textAnchor:"end", fill:"mediumorchid", stroke:"mediumorchid", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"0.5"}} x="133" y="210">
                        <tspan x="580" y="259">Glutaminase</tspan>
                        <tspan class="flux" x="577" y="269" style={{letterSpacing:"0.5px"}}>V
                            <tspan baseline-shift="sub" style={{fontSize:"6px"}}>GLN ANA</tspan>
                        </tspan>
                    </text>

                {/* <!--Phosphoenolpyruvate/Glucose--> */}
                <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="43" y="115">
                    <tspan x="48" y="112">Phosphoenol-</tspan>
                    <tspan x="48" y="125">pyruvate</tspan>
                </text>
                <text style={{textAnchor:"middle", fill:"cornflowerblue", stroke:"cornflowerblue", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"1.5"}} x="43" y="13">Glucose</text>
                <path d="M43,100 L43,19 41,22 45,22 43,18" style={{stroke:"salmon", strokeWidth:"1.5px", fill:"salmon"}} transform="translate(-20)"/>
                {/* <!--rgp--> */}
                <text style={{textAnchor:"start", fill:"mediumorchid", stroke:"mediumorchid", strokeWidth:"0.5px", fontSize:"12px", letterSpacing:"0.5"}} x="25" y="60">
                    <tspan x="29" y="40">Renal</tspan>
                    <tspan x="29" y="53">Glucose</tspan>
                    <tspan x="29" y="66">Production</tspan>
                    <tspan class="flux" x="29" y="79" style={{letterSpacing:"0.5"}}>V
                        <tspan baseline-shift="sub" style={{fontSize:"6px"}}>RGP</tspan>
                    </tspan>
                </text>


    		</svg>

        )
        

    }
    
}

export default TCACycle;
