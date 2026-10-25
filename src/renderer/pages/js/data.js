const pathCheck = document.getElementById("path-check");

async function checkEtlDir() {
  const dir = (await mainProcess.etlDir()).trim();
  if (dir.length === 0) {
    pathCheck.innerHTML = "Directório do arquivo não informado";

    return;
  }
  pathCheck.innerHTML = dir;
}

checkEtlDir();
