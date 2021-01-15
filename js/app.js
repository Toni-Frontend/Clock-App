const consultarFrase = async () => {
  const url = `https://api.quotable.io/random`;

  try {
    const respuesta = await axios.get(url);
    const resultado = await respuesta;

    const { content, author } = resultado.data;

    document.querySelector("#quote").textContent = `"${content}"`;
    document.querySelector(".author").textContent = author;
  } catch (error) {
    console.log(error);
  }
};

const consultarTiempo = () => {
  let tiempo = new Date();
  let formato = tiempo.getHours(); // Formato 24 horas
  let hora = tiempo.getHours() % 12 || 12; // Convertirlo a 12 horas
  let minutos = String(tiempo.getMinutes()).padStart(2, "0");

  let estado = "";

  if (formato >= 5 && formato <= 11) {
    estado = "morning";
  } else if (formato >= 12 && formato <= 17) {
    estado = "afternoon";
  } else {
    estado = "evening";
  }

  document.querySelector(
    ".timeday"
  ).textContent = `GOOD ${estado} IT'S CURRENTLY`;
  document.querySelector(".hour").textContent = `${hora}:${minutos}`;
  let intervalos = (60 - new Date().getSeconds()) * 1000 + 5;

  let background = document.querySelector(".bg");
  let icono = document.querySelector('.icon-day');

  if (estado === "morning") {
    background.classList.add("morning");
    icono.classList.add('fa-sun');
  } else if (estado === "afternoon") {
    background.classList.add("afternoon");
    icono.classList.add('fa-sun');
  } else {
    background.classList.add("evening");
    icono.classList.add('fa-moon');
  }

  setTimeout(consultarTiempo, intervalos);
};

const consultarApiTime = async () => {
  const url = `https://worldtimeapi.org/api/ip`;

  try {
    const respuesta = await axios.get(url);
    const informacion = await respuesta;

    const {
      day_of_week,
      day_of_year,
      week_number,
      abbreviation,
    } = informacion.data;

    document.querySelector("#abb").textContent = `${abbreviation}`;
    document.querySelector("#day-week").textContent = `${day_of_week}`;
    document.querySelector("#day-year").textContent = `${day_of_year}`;
    document.querySelector("#week-number").textContent = `${week_number}`;
  } catch (error) {
    console.log(error);
  }
};

const consultarUbicación = async () => {
  const url = `https://freegeoip.app/json/`;

  try {
    const respuesta = await axios.get(url);
    const resultado = await respuesta;
    const { region_name, country_code, city, country_name } = resultado.data;

    document.querySelector(
      "#location"
    ).textContent = `in ${region_name}, ${country_code}`;
    document.querySelector(
      "#current-timezone"
    ).textContent = `${country_name}/${city}`;
  } catch (error) {
    console.log(error);
  }
};

const rotacionFlecha = () => {
  document.querySelector(".fa-angle-down").classList.toggle("rotate");
};

const mostrarInformacion = () => {
  document.querySelector("#main-section").classList.toggle("transform");
  document.querySelector(".more-information").classList.toggle("transform");
  let more = document.querySelector(".click-more");

  if (more.firstChild.nodeValue === "More") {
    more.firstChild.nodeValue = "Less";
  } else {
    more.firstChild.nodeValue = "More";
  }
};

consultarFrase();
consultarTiempo();
consultarApiTime();
consultarUbicación();

document.querySelector(".more").addEventListener("click", rotacionFlecha);
document.querySelector(".more").addEventListener("click", mostrarInformacion);
document.querySelector("#refresh").addEventListener("click", consultarFrase);
