const filePathElement = document.getElementById("filePath");
const selectBtn = document.getElementById("selectBtn");

async function checkEtlDir() {
  const dir = (await electronAPI.etlDir()).trim();
  if (dir.length === 0) {
    filePathElement.innerText = "Directório do arquivo não informado";

    return;
  }
  filePathElement.innerText = dir;
}

selectBtn.addEventListener("click", async () => {
  const filePath = await electronAPI.openFile();
  filePathElement.innerText = filePath;
});

checkEtlDir();
