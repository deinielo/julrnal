import { auth, db } from "./firebase.js";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const params = new URLSearchParams(window.location.search);
const patientId = params.get("id");


function showToast(message) {

    const toast = document.querySelector("#toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 2000);

}


const threeColumnsForm = document.querySelector(".threeColumnsForm");


if (threeColumnsForm) {

    threeColumnsForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const user = auth.currentUser;

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        const critica = document.querySelector("#critica").value;
        const distorsion = document.querySelector("#distorsion").value;
        const respuestaCompasiva =
            document.querySelector("#respuesta_compasiva").value;


        await addDoc(collection(db, "threeColumns"), {
            patientId: user.uid,
            critica: critica,
            distorsion: distorsion,
            respuestaCompasiva: respuestaCompasiva,
            date: new Date()
        });


        threeColumnsForm.reset();

        showToast("Ejercicio guardado");

    });

}


const threeColumnsList = document.querySelector("#threeColumnsList");


if (threeColumnsList) {

    const threeColumnsQuery = query(
        collection(db, "threeColumns"),
        where("patientId", "==", patientId)
    );

    const threeColumnsSnapshot = await getDocs(threeColumnsQuery);

    threeColumnsSnapshot.forEach(function(threeColumnDoc) {

        const link = document.createElement("a");

        link.href =
            "threecolumns_record.html?id=" + threeColumnDoc.id;

        link.classList.add("patientLink");


        const card = document.createElement("article");

        card.classList.add("recordCard");


        const threeColumn = threeColumnDoc.data();

        const date = threeColumn.date.toDate();

        const formattedDate =
            date.toLocaleDateString("es-ES");

        const formattedTime =
            date.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit"
            });


        const title = document.createElement("h2");

        title.textContent =
            formattedDate + " - " + formattedTime;


        const subtitle = document.createElement("p");

        subtitle.textContent =
            threeColumn.critica;


        card.appendChild(title);
        card.appendChild(subtitle);

        link.appendChild(card);

        threeColumnsList.appendChild(link);

    });

}


const threeColumnsId = params.get("id");


if (threeColumnsId) {

    const threeColumnDoc = await getDoc(
        doc(db, "threeColumns", threeColumnsId)
    );


    if (threeColumnDoc.exists()) {

        const threeColumnRecord = threeColumnDoc.data();


        document.querySelector(".backButton").href =
            "patient.html?id=" + threeColumnRecord.patientId;


        const threeColumnsDate =
            threeColumnRecord.date.toDate();

        document.querySelector("#threeColumnsDate").textContent =
            threeColumnsDate.toLocaleDateString("es-ES");


        const threeColumnsCritica =
            document.querySelector("#threeColumnsCritica");

        const threeColumnsDistorsion =
            document.querySelector("#threeColumnsDistorsion");

        const threeColumnsRespuesta =
            document.querySelector("#threeColumnsRespuesta");


        if (threeColumnsCritica) {

            threeColumnsCritica.textContent =
                threeColumnRecord.critica;

        }


        if (threeColumnsDistorsion) {

            threeColumnsDistorsion.textContent =
                threeColumnRecord.distorsion;

        }


        if (threeColumnsRespuesta) {

            threeColumnsRespuesta.textContent =
                threeColumnRecord.respuestaCompasiva;

        }


        const editThreeColumns =
            document.querySelector("#editThreeColumns");


        if (editThreeColumns) {

            editThreeColumns.addEventListener("click", function() {

                document.querySelector(
                    "#editThreeColumnsForm"
                ).style.display = "block";


                document.querySelector("#editCritica").value =
                    threeColumnRecord.critica;

                document.querySelector("#editDistorsion").value =
                    threeColumnRecord.distorsion;

                document.querySelector("#editRespuesta").value =
                    threeColumnRecord.respuestaCompasiva;

            });

        }


        document.querySelector("#saveThreeColumns")
            .addEventListener("click", async function() {

                await updateDoc(
                    doc(db, "threeColumns", threeColumnsId),
                    {
                        critica:
                            document.querySelector("#editCritica").value,

                        distorsion:
                            document.querySelector("#editDistorsion").value,

                        respuestaCompasiva:
                            document.querySelector("#editRespuesta").value
                    }
                );


                window.location.reload();

            });


        document.querySelector("#deleteThreeColumns")
            .addEventListener("click", async function() {

                await deleteDoc(
                    doc(db, "threeColumns", threeColumnsId)
                );


                window.location.href =
                    "patient.html?id=" +
                    threeColumnRecord.patientId;

            });

    }

}
