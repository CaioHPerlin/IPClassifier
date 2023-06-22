const form = document.getElementById("ip_form");
const output = document.getElementsByTagName("code")[0];
const clearBtn = document.getElementById("clear_btn");

const toBin = (n) => {
    const bin = (n >>> 0).toString(2);
    return ("000000000"+bin).slice(-8);
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const input = document.getElementById("ip_address").value;
    const arr = input.split(".").filter(n => n).filter(n => n <= 255 && n >= 0);
    console.log(arr)
    let cat = "";
    let mask = "";
    let scope = "Público";
    if(arr.length != 4 || arr[0] > 223 || arr[0] < 1){
        alert(`Formatação de input incorreta.\nEntrada recebida: ${input}\nFormato esperado: 223.255.255.255`);
        return;
    }
    
    if(arr[0] >= 1 && arr[0] <= 127){
        cat = "A";
        mask = "255.0.0.0";
        if(arr[0] == 10) scope = "Privado";
    }else if(arr[0] >= 128 && arr[0] <= 191){
        cat = "B";
        mask = "255.255.0.0";
        if(arr[0] == 172 && arr[1] >= 16 && arr[1] <= 31) scope = "Privado";
    }else if(arr[0] >= 192 && arr[0] <= 223){
        cat = "C";
        mask = "255.255.255.0";
        if(arr[0] == 192 && arr[1] == 168) scope = "Privado";
    }


    let binary = toBin(arr[0]) + toBin(arr[1]) + toBin(arr[2]) + toBin(arr[3]);

    var result = document.createTextNode(`\nIPV4: ${input}\nClasse: ${cat}\nMáscara padrão: ${mask}\nEndereço ${scope}\nBinário: ${binary}\n`);
    output.appendChild(result);
    form.reset();
});

clearBtn.addEventListener("click", () => {
    output.innerHTML = "";
    form.reset();
});