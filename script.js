const recordForm = document.querySelector(".recordForm");

const recordPatientParams = new URLSearchParams(window.location.search);
const recordPatientId = recordPatientParams.get("id");

const threeColumnsPatientParams = new URLSearchParams(window.location.search);
const threeColumnsPatientId = threeColumnsPatientParams.get("id");

console.log("PACIENTE TRES COLUMNAS:", threeColumnsPatientId);

console.log("PACIENTE DEL REGISTRO:", recordPatientId);

const patientParams = new URLSearchParams(window.location.search);

console.log("URL:", window.location.href);
console.log("SEARCH:", window.location.search);

const patientId = patientParams.get("id");

const patients = [
    "Paciente 1",
    "Paciente 2",
];

function showToast(message) {

    const toast = document.querySelector("#toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 2000);

}

const patientName = document.querySelector("#patientName");

if (patientName) {
    patientName.textContent = patients[patientId];
}

console.log("ID PACIENTE:", patientId);

const patientRecordLink = document.querySelector("#patientRecordLink");

if (patientRecordLink) {
    patientRecordLink.href = "index.html?id=" + patientId;
}

const patientThreeColumnsLink = document.querySelector("#patientThreeColumnsLink");

if (patientThreeColumnsLink) {
    patientThreeColumnsLink.href = "threecolumns.html?id=" + patientId;
}

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
    date: new Date().toISOString(),
    patientId: Number(recordPatientId),
    trigger: trigger,
    image: image,
    cognition: cognition,
    emotion: emotion,
    sensation: sensation
};
        let records = JSON.parse(localStorage.getItem("records")) || [];

        records.push(record);

        localStorage.setItem("records", JSON.stringify(records));
        recordForm.reset();
        showToast("Registro guardado");
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
    date: new Date().toISOString(),
    patientId: Number(threeColumnsPatientId),
    critica: critica,
    distorsion: distorsion,
    respuestaCompasiva: respuestaCompasiva
};

        let threeColumnsRecords = JSON.parse(localStorage.getItem("threeColumnsRecords")) || [];

        threeColumnsRecords.push(threeColumns);

        localStorage.setItem("threeColumnsRecords", JSON.stringify(threeColumnsRecords));
threeColumnsForm.reset();
showToast("Ejercicio guardado");
        console.log(threeColumns);

        console.log("Tres columnas guardadas");

    });
}

const records = JSON.parse(localStorage.getItem("records")) || [];

const threeColumnsRecords = JSON.parse(localStorage.getItem("threeColumnsRecords")) || [];

const patientsList = document.querySelector("#patientsList");

if (patientsList) {

    patients.forEach(function(patient, index) {

        const link = document.createElement("a");
        link.href = "patient.html?id=" + index;
        link.classList.add("patientLink");

        const card = document.createElement("article");
        card.classList.add("patientCard");

        const name = document.createElement("h2");
        name.textContent = patient;

const patientRecords = records.filter(function(record) {
    return record.patientId === index;
});

const patientThreeColumns = threeColumnsRecords.filter(function(record) {
    return record.patientId === index;
});

const totalRecords = patientRecords.length + patientThreeColumns.length;

const count = document.createElement("p");
count.textContent = totalRecords + " registros";

const allPatientRecords = patientRecords.concat(patientThreeColumns);

const lastRecord = allPatientRecords.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
})[0];

const lastRecordText = document.createElement("p");

if (lastRecord) {
    const lastDate = new Date(lastRecord.date);
    lastRecordText.textContent = "Último registro: " + lastDate.toLocaleDateString("es-ES");
} else {
    lastRecordText.textContent = "Sin registros";
}

        card.appendChild(name);
        card.appendChild(count);
        card.appendChild(lastRecordText);
        link.appendChild(card);

        patientsList.appendChild(link);

    });

}

console.log(records);

const recordsList = document.querySelector("#recordsList");

if (recordsList) {

records
    .map(function(record, index) {
        return {
            record: record,
            index: index
        };
    })
    .filter(function(item) {
        return item.record.patientId === Number(patientId);
    })
    .forEach(function(item) {

        const link = document.createElement("a");
        link.href = "record.html?id=" + item.index;
        link.classList.add("patientLink");

        const card = document.createElement("article");
        card.classList.add("recordCard");

        const date = new Date(item.record.date);

const formattedDate = date.toLocaleDateString("es-ES");
const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
});

const title = document.createElement("h2");
title.textContent = formattedDate + " - " + formattedTime;

        const sensation = document.createElement("p");
        sensation.textContent = "Perturbación: " + item.record.sensation + "/10";

        card.appendChild(title);
        card.appendChild(sensation);

        link.appendChild(card);

        recordsList.appendChild(link);

    });

}

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

console.log(id);


const record = records[id];

console.log(record);

const recordTrigger = document.querySelector("#recordTrigger");

if (recordTrigger) {
    recordTrigger.textContent = record.trigger;
}

const recordImage = document.querySelector("#recordImage");
const recordCognition = document.querySelector("#recordCognition");
const recordEmotion = document.querySelector("#recordEmotion");
const recordSensation = document.querySelector("#recordSensation");

if (recordImage) {
    recordImage.textContent = record.image;
}

if (recordCognition) {
    recordCognition.textContent = record.cognition;
}

if (recordEmotion) {
    recordEmotion.textContent = record.emotion;
}

if (recordSensation) {
    recordSensation.textContent = record.sensation + "/10";
}


const threeColumnsList = document.querySelector("#threeColumnsList");

if (threeColumnsList) {

threeColumnsRecords
    .map(function(threeColumn, index) {
        return {
            threeColumn: threeColumn,
            index: index
        };
    })
    .filter(function(item) {
        return item.threeColumn.patientId === Number(patientId);
    })
    .forEach(function(item) {

        const link = document.createElement("a");
        link.href = "threecolumns_record.html?id=" + item.index;
        link.classList.add("patientLink");

        const card = document.createElement("article");
        card.classList.add("recordCard");

        const date = new Date(item.threeColumn.date);

const formattedDate = date.toLocaleDateString("es-ES");
const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
});

        const title = document.createElement("h2");
        title.textContent = formattedDate + " - " + formattedTime;

        const subtitle = document.createElement("p");
        subtitle.textContent = item.threeColumn.critica;

        card.appendChild(title);
        card.appendChild(subtitle);

        link.appendChild(card);

        threeColumnsList.appendChild(link);

    });

}

console.log(window.location.href);
console.log(window.location.search);

const threeColumnsParams = new URLSearchParams(window.location.search);

const threeColumnsId = new URLSearchParams(window.location.search).get("id");

console.log("ID TRES COLUMNAS:", threeColumnsId);

console.log(threeColumnsRecords);

const threeColumnRecord = threeColumnsRecords[threeColumnsId];

console.log(threeColumnRecord);

const threeColumnsCritica = document.querySelector("#threeColumnsCritica");
const threeColumnsDistorsion = document.querySelector("#threeColumnsDistorsion");
const threeColumnsRespuesta = document.querySelector("#threeColumnsRespuesta");

if (threeColumnsCritica) {
    threeColumnsCritica.textContent = threeColumnRecord.critica;
}

if (threeColumnsDistorsion) {
    threeColumnsDistorsion.textContent = threeColumnRecord.distorsion;
}

if (threeColumnsRespuesta) {
    threeColumnsRespuesta.textContent = threeColumnRecord.respuestaCompasiva;
}

