//
// USAGE <range-cmp min="{number}" max="{number}" step="{number}" [value="{number}"] [{standard-html-attribute}}] />
// 

function initCustomRanges() {
    const cmps = document.getElementsByTagName("range-cmp");
    console.log("CustomRange | INFO | Generating " + cmps.length + " custom range(s)...");
    // add css
    if (cmps.length > 0 && (!window.customRange || !window.customRange.CssAdded)) {
        console.log("CustomRange | INFO | Generating CSS...");
        let css = ".range-cmp { margin: 0; width: 100%; }";
        css += ".range-cmp>.range-value { position: relative; width: 97%; height: 1em; margin: 0 auto; }";
        css += ".range-cmp>.range-value > .range-value-left { position: absolute; top: 0; left: 0; }";
        css += ".range-cmp>.range-value > .range-value-right { position: absolute; top: 0; right: 0; }";
        css += ".range-cmp>.range-measures { width: 96.5%; margin: .5em auto -.5em auto; height: 1em; display: flex; flex-direction: row; flex-wrap: nowrap; }";
        css += ".range-cmp>.range-measures>div { height: 100%; flex-grow: 1; border-right: 1px solid #777; }";
        css += ".range-cmp>.range-measures>div:first-child { border-left: 1px solid #777; }";
        css += '.range-cmp>input[type="range"] { width: 98%; margin: 0 1% 0 1%; }';
        const styleDiv = document.createElement("style");
        styleDiv.type = "text/css";
        styleDiv.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(styleDiv);

        if (!window.customRange) {
            window.customRange = {};
        }
        window.customRange.CssAdded = true;
        console.log("CustomRange | INFO | Generating CSS done !");
    }

    //create cmps
    console.log("CustomRange | INFO | Generating custom range(s)...");
    let id = 0;
    Array.prototype.forEach.call(cmps, function (cmp) {
        // inputs
        const min = cmp.getAttribute("min");
        const max = cmp.getAttribute("max");
        const step = cmp.getAttribute("step");
        if (!min || !max || !step) {
            console.error("CustomRange | ERROR | Attribut " + (!min ? '"min"' : !max ? '"max"' : '"step"') + " manquant !")
            return;
        }
        const value = cmp.getAttribute("value") | min;

        // parent
        const rangeCmp = document.createElement("div");
        rangeCmp.classList.add("range-cmp");

        // values
        const rangeValue = document.createElement("div");
        rangeValue.id = "range-value-" + id;
        rangeValue.classList.add("range-value");
        const leftValue = document.createElement("div");
        leftValue.classList.add("range-value-left")
        leftValue.innerText = min;
        const rightValue = document.createElement("div");
        rightValue.classList.add("range-value-right")
        rightValue.innerText = max;
        rangeValue.appendChild(leftValue)
        rangeValue.appendChild(rightValue)
        rangeCmp.appendChild(rangeValue);

        // measures
        const rangeMeasures = document.createElement("div");
        rangeMeasures.classList.add("range-measures");
        let i = 0;
        do {
            rangeMeasures.appendChild(document.createElement("div"));
            i++;
        } while (i < (max - min) / step);
        rangeCmp.appendChild(rangeMeasures);

        // input
        const rangeInput = document.createElement("input");
        rangeInput.type = "range";
        rangeInput.id = "range-input-" + id;
        rangeInput.setAttribute("min", min);
        rangeInput.setAttribute("max", max);
        rangeInput.setAttribute("step", step);
        rangeInput.setAttribute("value", value);
        rangeCmp.appendChild(rangeInput);

        // add to DOM
        cmp.appendChild(rangeCmp);

        // end
        id++;
    })
    console.log("CustomRange | INFO | Generating custom range(s) successfully !");
}

console.log("CustomRange | INFO | Initialization...");
const oldOnload = window.onload;
window.onload = function () {
    if (typeof oldOnload == 'function') {
        oldOnload();
    }
    console.log("CustomRange | INFO | Starting...");
    initCustomRanges();
    console.log("CustomRange | INFO | Started successfully !");
}
