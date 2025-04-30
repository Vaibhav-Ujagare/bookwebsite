async function searchBooks() {
  const query = document.getElementById("searchInput").value;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}`;

  const response = await fetch(url);
  const data = await response.json();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data.items && data.items.length > 0) {
    data.items.forEach((book) => {
      const volumeInfo = book.volumeInfo;
      const title = volumeInfo.title || "No Title";
      const authors = volumeInfo.authors
        ? volumeInfo.authors.join(", ")
        : "Unknown Author";
      const thumbnail =
        volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150";
      const description = volumeInfo.description
        ? volumeInfo.description.slice(0, 150) + "..."
        : "No description available.";

      const bookCard = document.createElement("div");
      bookCard.className =
        "bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col";

      bookCard.innerHTML = `
        <img src="${thumbnail}" alt="${title}" class="w-full h-60 object-contain mb-4 rounded">
        <h2 class="text-xl font-semibold mb-2">${title}</h2>
        <p class="text-gray-600 mb-1"><strong>Author(s):</strong> ${authors}</p>
        <p class="text-sm text-gray-700 mb-4">${description}</p>
        <button class="mt-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          Buy Now
        </button>
      `;

      resultsDiv.appendChild(bookCard);
    });
  } else {
    resultsDiv.innerHTML = '<p class="text-center text-lg">No books found.</p>';
  }
}

async function fetchBooks() {
  try {
    const response = await fetch("./books.json");
    const books = await response.json();
    console.log(books);
    renderBooks(books);
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
}

function renderBooks(books) {
  const container = document.getElementById("booksContainer");

  books.forEach((book) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 h-[470px] col-span-1 min-w-[280px] max-w-[300px]";

    card.innerHTML = `
                        <div class="aspect-w-4 aspect-h-3">
                            <img class=" w-full h-[300px] object-fill rounded-md border" src="${
                              book.image
                            }"
                                alt="${book.title}">
                        </div>
                        <h3 class="text-xl font-semibold text-center mt-3">${
                          book.title
                        }</h3>
                        <div class="text-center text-yellow-500 text-lg">${"★".repeat(
                          book.rating
                        )}${"☆".repeat(5 - book.rating)}</div>
                        <button class="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md w-full">Buy
                            Now</button>
  `;

    container.appendChild(card);
  });
}

fetchBooks();
