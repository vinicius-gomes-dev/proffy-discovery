// Procurar botao
// Quando clicar no botao
document.querySelector("#add-time").addEventListener("click", cloneField);



// Executar uma acao
function cloneField() {
    // Duplicar os campos
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

    const fields = newFieldContainer.querySelectorAll('input');

    fields.forEach( field => field.value = "");
    

    document.querySelector('#schedule-items').appendChild(newFieldContainer);
}

