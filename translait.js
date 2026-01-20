
function specific_letter_combination(text)
{  
    let symbols = ["գհ", "դզ", "կհ", "սհ", "տս"];
    symbols.forEach(item => {
        text = text.replace(new RegExp(item, "gi"), function (match)
        {
            return match[0] + "ʹ" + match[1];
        });
    });
    return text;
}

function transliterateArmenianLOC(text) 
{
    // LOC single-letter mapping
    const locMap = {
        "Ա": "A",  "ա": "a",
        "Բ": "B",  "բ": "b",
        "Գ": "G",  "գ": "g",
        "Դ": "D",  "դ": "d",
        "Ե": "E",  "ե": "e",
        "Զ": "Z",  "զ": "z",
        "Է": "Ē",  "է": "ē",
        "Ը": "Ě",  "ը": "ě",
        "Թ": "Tʻ ", "թ": "tʻ",
        "Ժ": "Zh", "ժ": "zh",
        "Ի": "I",  "ի": "i",
        "Լ": "L",  "լ": "l",
        "Ւ": "W",  "ւ": "w",
        "Խ": "Kh", "խ": "kh",
        "Ծ": "Ts", "ծ": "ts",
        "Կ": "K",  "կ": "k",
        "Հ": "H",  "հ": "h",
        "Ձ": "Dz", "ձ": "dz",
        "Ղ": "Gh", "ղ": "gh",
        "Ճ": "Ch", "ճ": "ch",
        "Մ": "M",  "մ": "m",
        "Յ": "Y",  "յ": "y",
        "Ն": "N",  "ն": "n",
        "Շ": "Sh", "շ": "sh",
        "Ո": "O",  "ո": "o",
        "Չ": "Chʻ","չ": "chʻ",
        "Պ": "P",  "պ": "p",
        "Ջ": "J",  "ջ": "j",
        "Ռ": "",  "ռ": "ṛ",
        "Ս": "S",  "ս": "s",
        "Վ": "V",  "վ": "v",
        "Տ": "T",  "տ": "t",
        "Ր": "Ṛ",  "ր": "r",
        "Ց": "Tsʻ","ց": "tsʻ",
        "Փ": "Pʻ", "փ": "pʻ",
        "Ք": "Kʻ", "ք": "kʻ",
        "Օ": "Ō",  "օ": "ō",
        "Ֆ": "F",  "ֆ": "f"
    };

    // Handle digraphs and special cases first
    const replacements = {
        "Ու": "U",  "ու": "u",
        "Եվ": "Ev", "և": "ev"
    };

    // Initial Ե → Ye
    text = text.replace(/(?<!^)եվ/g, "եʹվ");
    text = specific_letter_combination(text);

// ʹ 

    if (text.startsWith("Ե"))
        text = "Ye" + text.slice(1);
    else if (text.startsWith("ե"))
        text = "ye" + text.slice(1);

    for (const arm in replacements)
        text = text.split(arm).join(replacements[arm]);

    // Transliterate character by character
    let result = "";
    for (const char of text) {
        result += locMap[char] !== undefined ? locMap[char] : char;
    }
    return result;
}

function update() {

    const text = document.getElementById("input").value;
    let new_text = text.split(" ");
    let result = {
        "loc" : "",
        "hmb" : "",
        "passport" : "",
        "ascii" : ""
    }
    for(const world of new_text)
    {
        result["loc"] += transliterateArmenianLOC(world) + " ";
        // result[1] += transliterateSimple(text, maps.hmb);
        // result[2] += transliterateSimple(text, maps.passport);
        // result[3] += transliterateSimple(text, maps.ascii);
    }
    document.getElementById("loc").innerText = result["loc"];
    //document.getElementById("hmb").innerText = result[1];
    //document.getElementById("passport").innerText = result[2];
    //document.getElementById("ascii").innerText = result[3]; 
}