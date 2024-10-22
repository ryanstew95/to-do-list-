const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
//const axios = require("axios");
const taskCategory = document.getElementById("task-category");

async function categorizeTask(taskName) {
  // Search movie/series with TMDb API
  const tmdbResponse = await axios.get(
    `https://api.themoviedb.org/3/search/multi`,
    {
      params: {
        api_key: "661fbe298ba40c274d5024ea787187f8",
        query: taskName,
      },
    }
  );

  // Ensure the search returns actual movies or TV shows, not just any result
  if (
    tmdbResponse.data.results.length > 0 &&
    tmdbResponse.data.results[0].media_type === "movie"
  ) {
    return "Film / Series (To watch)";
  }

  // // Search restaurants with Yelp API
  // const yelpResponse = await axios.get(
  //   `https://api.yelp.com/v3/businesses/search`,
  //   {
  //     headers: {
  //       Authorization: `Bearer YOUR_YELP_API_KEY`,
  //     },
  //     params: {
  //       term: taskName,
  //       location: "Your default location",
  //     },
  //   }
  // );

  // // Ensure results include restaurants or cafes
  // if (
  //   yelpResponse.data.businesses.length > 0 &&
  //   yelpResponse.data.businesses[0].categories.some((cat) =>
  //     ["restaurants", "cafes"].includes(cat.alias)
  //   )
  // ) {
  //   return "Restaurants, cafes, etc. (To eat)";
  // }

  // Search books with Google Books API
  const googleBooksResponse = await axios.get(
    `https://www.googleapis.com/books/v1/volumes`,
    {
      params: {
        q: taskName,
      },
    }
  );

  // Ensure results are books
  if (googleBooksResponse.data.items.length > 0) {
    return "Books (To read)";
  }

  // Fallback to Products (To buy) if none of the other categories match
  return "Products (To buy)";
}

async function addTask() {
  if (inputBox.value === "") {
    alert("Please enter a task");
  } else {
    let taskName = inputBox.value;

    // Get the category from categorizeTask
    let category = await categorizeTask(taskName);

    // Create a new list item
    let li = document.createElement("li");
    li.innerHTML = taskName;

    // Append the new task to the list
    listContainer.appendChild(li);

    // Create a div element for category and add CSS class
    let categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = category;
    categoryDiv.classList.add("category-text"); // Apply the CSS class

    // Append category span to the task item
    li.appendChild(categoryDiv);

    let deleteSpan = document.createElement("span");
    deleteSpan.innerHTML = "x";
    li.appendChild(deleteSpan);

    // Save tasks to local storage
    saveData();
  }

  inputBox.value = "";
}

listContainer.addEventListener(
  "click",
  function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
      saveData();
    } else if (
      event.target.tagName === "SPAN" &&
      event.target.innerHTML === "x"
    ) {
      event.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
