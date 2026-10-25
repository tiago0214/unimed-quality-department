const filePathElement = document.getElementById("filePath");
const selectBtn = document.getElementById("selectBtn");
const tableRef = document.getElementById("table");
const syncBtn = document.getElementById("sync");

const data = [
  { date: "2026-08-16 15:30:78", status: "Executando", identifiedActions: 27 },
  { date: "2026-08-15 15:30:78", status: "Completo", identifiedActions: 17 },
  { date: "2026-08-13 15:30:78", status: "Completo", identifiedActions: 32 },
  { date: "2026-08-13 15:30:78", status: "Completo", identifiedActions: 32 },
  { date: "2026-08-13 15:30:78", status: "Completo", identifiedActions: 32 },
];

async function checkEtlDir() {
  const dir = (await electronAPI.etlDir()).trim();
  if (dir.length === 0 || !dir) {
    filePathElement.innerText = "Directório dos arquivos não informado";

    return;
  }
  filePathElement.innerText = dir;
}

selectBtn.addEventListener("click", async () => {
  const filePath = await electronAPI.openFile();
  if (filePath) filePathElement.innerText = filePath;
});

syncBtn.addEventListener("click", () => electronAPI.forceSync());

checkEtlDir();

data.forEach((element, index) => {
  const tr = document.createElement("tr");
  const tdDate = document.createElement("td");
  tdDate.innerHTML = element.date;

  const tdStatus = document.createElement("td");
  tdStatus.innerHTML = element.status;

  const tdActions = document.createElement("td");
  tdActions.innerHTML = element.identifiedActions;

  if (index % 2 != 0) {
    tdDate.style = "background-color: var(--color-secondary)";
    tdStatus.style = "background-color: var(--color-secondary)";
    tdActions.style = "background-color: var(--color-secondary)";
  }

  tr.appendChild(tdDate);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  tableRef.appendChild(tr);
});
