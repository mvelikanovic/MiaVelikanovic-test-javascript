const searchInput = document.getElementById("searchInput");
const loadingMessage = document.getElementById("loadingMessage");
const noResultsMessage = document.getElementById("noResultsMessage");
const resultsList = document.getElementById("resultsList");

async function fetchData(query) {
  loadingMessage.style.display = "block";
  noResultsMessage.style.display = "none";
  resultsList.innerHTML = "";

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=song`
    );
    const data = await response.json();

    loadingMessage.style.display = "none";

    if (data.results.length > 0) {
      displayResults(data.results);
    } else {
      noResultsMessage.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    loadingMessage.style.display = "none";
  }
}

function displayResults(songs) {
  resultsList.innerHTML = "";
  songs.forEach((song) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${song.trackName} by ${song.artistName}`;
    resultsList.appendChild(listItem);
  });
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    fetchData(query);
  } else {
    resultsList.innerHTML = "";
    noResultsMessage.style.display = "none";
  }
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query !== "") {
      fetchData(query);
    } else {
      resultsList.innerHTML = "";
      noResultsMessage.style.display = "none";
    }
  }
});
