const form = document.getElementById("ip_form");
var output = document.getElementsByTagName("code")[0].innerHTML;

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const input = document.getElementById("ip_address").value;
    const arr = input.split(".").filter(n => n).filter(n => n <= 255 && n >= 0);
    console.log(arr)
    let cat = "";
    let mask = "";
    let scope = "Privado";
    if(arr.length != 4) alert(`Formatação de input incorreta.\nEntrada recebida: ${input}\nFormato esperado: 000.000.000.000`)
    
    if(arr[0] >= 1 && arr[0] <= 127){
        cat = "A";
        mask = "255.0.0.0";
        if(arr[0] == 10) scope = "Privado";
    }
    console.log(`${input}\nClasse: ${cat}\nMáscara padrão: ${mask}\nEndereço ${scope}`)
});