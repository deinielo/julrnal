const recordForm = document.querySelector(".recordForm");

console.log(recordForm);

if (recordForm) {

    recordForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const trigger = document.querySelector("#trigger").value;
        const image = document.querySelector("#image").value;
        const cognition = document.querySelector("#cognition").value;
        const emotion = document.querySelector("#emotion").value;
        const sensation = document.querySelector("#sensation").value;

        console.log(trigger);
        console.log(image);
        console.log(cognition);
        console.log(emotion);
        console.log(sensation);

        const record = {
            trigger: trigger,
            image: image,
            cognition: cognition,
            emotion: emotion,
            sensation: sensation
        };

        let records = JSON.parse(localStorage.getItem("records")) || [];

        records.push(record);

        localStorage.setItem("records", JSON.stringify(records));

        console.log(record);

        console.log("Formulario enviado");

    });

}

const threeColumnsForm = document.querySelector(".threeColumnsForm");

console.log(threeColumnsForm);

if (threeColumnsForm) {

    threeColumnsForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const critica = document.querySelector("#critica").value;
        const distorsion = document.querySelector("#distorsion").value;
        const respuestaCompasiva = document.querySelector("#respuesta_compasiva").value;

        const threeColumns = {
            critica: critica,
            distorsion: distorsion,
            respuestaCompasiva: respuestaCompasiva
        };

        let threeColumnsRecords = JSON.parse(localStorage.getItem("threeColumnsRecords")) || [];

        threeColumnsRecords.push(threeColumns);

        localStorage.setItem("threeColumnsRecords", JSON.stringify(threeColumnsRecords));

        console.log(threeColumns);

        console.log("Tres columnas guardadas");

    });
}

const records = JSON.parse(localStorage.getItem("records")) || [];

console.log(records);

const recordsList = document.querySelector("#recordsList");

if (recordsList) {

    records.forEach(function(record) {

        const link = document.createElement("a");
        link.href = "record.html";
        link.classList.add("patientLink");

        const card = document.createElement("article");
        card.classList.add("recordCard");

        const title = document.createElement("h2");
        title.textContent = "Registro";

        const sensation = document.createElement("p");
        sensation.textContent = "Perturbación: " + record.sensation + "/10";

        card.appendChild(title);
        card.appendChild(sensation);

        link.appendChild(card);

        recordsList.appendChild(link);

    });

}
