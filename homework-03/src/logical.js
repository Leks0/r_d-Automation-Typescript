function logical() {
    //const a = true;
    //const a = "hello";
    const a = 4;
    //const b = false;
    //const b = "bye";
    const b = 5;
    console.log(`true && true = ${a && a}, true && false = ${a && b}, false && false = ${b && b}`);
    console.log(`true || true = ${a || a}, true || false = ${a || b}, false || false = ${b || b}`);
    console.log(`not ${a} = ${!a}, not ${b} = ${!b}, !!"" (${!!""}) ==  Boolean("") (${Boolean("")}), !!"text" (${!!"text"}) == Boolean("text") (${Boolean("text")})`);
}

logical();
