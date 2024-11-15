document.addEventListener("DOMContentLoaded", () => {
  const titulosDados = document.querySelectorAll(".titulo-dado");
  const bairro = document.querySelector("#campo-bairro");
  const cidade = document.querySelector("#campo-localidade");
  const estado = document.querySelector("#campo-estado");
  const rua = document.querySelector("#campo-logradouro");
  const resultado = document.querySelector(".resultado");
  const erro = document.querySelector("#erro");
  const classDado = document.querySelector(".dados");

  const consultaCep = document.querySelector("#consultar-cep");

  consultaCep.addEventListener("click", async () => {
    const cep = document.querySelector("#CEP").value;
    if (cep === "" || !validacaoCep(cep)) {
        erro.style.display = "block";
        erro.innerHTML = "Insira um CEP válido com 8 dígitos";
        resultado.style.display = "none";
        bairro.style.display = "none";
        cidade.style.display = "none";
        estado.style.display = "none";
        rua.style.display = "none";
        titulosDados.forEach((titulo) => {
          titulo.style.display = "none";
        });
        return;
      }
    erro.style.display = "none";
    console.log(cep);
    try {
      const response = await fetch(
        `https://api.allorigins.win/raw?url=https://viacep.com.br/ws/${cep}/json/`
      );

      if (!response.ok) {
        erro.innerHTML =
          "*Ocorreu algum erro na consulta, ou o CEP nao existe.";
        console.log("Algum erro ocorreu");
      }
      const dados = await response.json();
      console.log(dados);
      classDado.style.display = " flex";
      resultado.style.display = "block";
      titulosDados.forEach((titulo) => {
        titulo.style.display = "block";
      });
      bairro.style.display = "block";
      cidade.style.display = "block";
      estado.style.display = "block";
      rua.style.display = "block";
      bairro.innerHTML = dados.bairro || "Nao encontrado";
      rua.innerHTML = dados.logradouro || "Nao encontrado";
      cidade.innerHTML = dados.localidade || "Nao encontrado";
      estado.innerHTML = dados.estado || "Nao encontrado";
    } catch (error) {
      erro.innerHTML = "*Ocorreu algum erro na consulta, ou o CEP e invalido";
      erro.style.display = "block";
      resultado.style.display = "none";
      titulosDados.forEach((titulo) => {
        titulo.style.display = "none";
      });
      console.error("Erro:", error);
    }
  });
  function validacaoCep(cep) {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    return cepRegex.test(cep);
  }
});
