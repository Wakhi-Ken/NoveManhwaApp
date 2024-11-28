// Add an event listener for the 'click' event on the 'searchButton'
document.getElementById('searchButton').addEventListener('click', async () => {
    // Get the values from the input fields and remove extra spaces
    const title = document.getElementById('searchTitle').value.trim();
    const author = document.getElementById('searchAuthor').value.trim();
    const resultsDiv = document.getElementById('results'); // Div to display the results
    resultsDiv.innerHTML = ''; // Clear any previous results

    // Check if neither title nor author is provided, then alert the user
    if (!title && !author) {
        alert('Please enter a book title or an author.');
        return;
    }

    // Create the query URL for the API based on the input (title or author)
    let query;
    if (title) {
        query = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`; // Search by book title
    } else if (author) {
        query = `https://openlibrary.org/search.json?author=${encodeURIComponent(author)}&sort=new`; // Search by author, sorted by newest
    }

    try {
        // Fetch data from the Open Library API using the created query URL
        const response = await fetch(query);
        const data = await response.json(); // Parse the JSON data returned from the API

        // If no results are found, display a 'no results' message
        if (data.numFound === 0) {
            resultsDiv.innerHTML = '<p>No results found.</p>';
            return;
        }

        // Loop through the results and display each book
        data.docs.forEach(book => {
            // Create a new div for each book
            const bookElement = document.createElement('div');
            bookElement.classList.add('result'); // Add a class for styling

            // Insert the book's details into the new div (title, author, year, and cover image)
            bookElement.innerHTML = `
                <h2>${book.title}</h2>
                <p><strong>Author(s):</strong> ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                <p><strong>First Published:</strong> ${book.first_publish_year || 'Unknown'}</p>
                ${book.cover_i ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="${book.title} cover" />` : ''}
            `;

            // Add an event listener to the book element so that clicking on it shows more details
            bookElement.addEventListener('click', () => showBookDetails(book, bookElement));
            
            // Append the new book element to the results div
            resultsDiv.appendChild(bookElement);
        });
    } catch (error) {
        // Handle any errors that occur during the fetch operation (e.g., network errors)
        console.error('Fetch error:', error);
        resultsDiv.innerHTML = '<p>Error fetching data. Please try again later.</p>'; // Display an error message
    }
});

// Function to show more details about a book when clicked
async function showBookDetails(book, bookElement) {
    // Check if the book already has a details section, and if so, remove it
    const existingDetails = bookElement.querySelector('.book-details');
    if (existingDetails) {
        existingDetails.remove();
        return;
    }

    // Get the unique book key and fetch more detailed information using this key
    const bookKey = book.key;
    const detailsResponse = await fetch(`https://openlibrary.org${bookKey}.json`);
    const detailsData = await detailsResponse.json(); // Parse the details JSON data

    // Create a new div to hold the detailed information about the book
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('book-details');

    // Insert the detailed book information (authors, publish date, description, etc.)
    detailsContainer.innerHTML = `
        <h2>${detailsData.title}</h2>
        <p><strong>Author(s):</strong> ${detailsData.authors ? detailsData.authors.map(author => author.name).join(', ') : 'Unknown'}</p>
        <p><strong>First Published:</strong> ${detailsData.publish_date || 'Unknown'}</p>
        <p><strong>Description:</strong> ${detailsData.description ? (typeof detailsData.description === 'string' ? detailsData.description : detailsData.description.value) : 'No description available.'}</p>
        <p><strong>Subjects:</strong> ${detailsData.subjects ? detailsData.subjects.join(', ') : 'None'}</p>
        <p><strong>ISBN:</strong> ${detailsData.isbn ? detailsData.isbn.join(', ') : 'Not available'}</p>
        ${detailsData.cover ? `<img src="https://covers.openlibrary.org/b/id/${detailsData.cover.id}-L.jpg" alt="${detailsData.title} cover" />` : ''}
        <p><strong>More Info:</strong> <a href="https://openlibrary.org${bookKey}" target="_blank" rel="noopener noreferrer">View on Open Library</a></p>
    `;

    // Append the details container with detailed information to the book element
    bookElement.appendChild(detailsContainer);
}
