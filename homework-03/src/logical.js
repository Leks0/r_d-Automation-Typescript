function logical() {
    //let a = true;
    //let a = "hello";
    let a = 4;
    //let b = false;
    //let b = "bye";
    let b = 5;
    let c = "true";
    console.log(`true && true = ${a && a}, true && false = ${a && b}, false && false = ${b && b}`);
    console.log(`true || true = ${a || a}, true || false = ${a || b}, false || false = ${b || b}`);
    console.log(`not ${a} = ${!a}, not ${b} = ${!b}, !!"" (${!!""}) ==  Boolean("") (${Boolean("")}), !!"text" (${!!"text"}) == Boolean("text") (${Boolean("text")})`);
}

logical();