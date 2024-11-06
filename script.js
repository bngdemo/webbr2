document.getElementById('fetchButton').addEventListener('click', fetchReviews);

async function fetchReviews() {
  const selectedCompanyId = document.getElementById('companySelect').value;
  const API_ENDPOINT = `https://wextractor.com/api/v1/reviews/glassdoor`;
  const API_KEY = '756a03a3f98e010770685bfdac65ca8e3f03a79c';
  
  try {
    const response = await fetch(`${API_ENDPOINT}?id=${selectedCompanyId}&language=en&auth_token=${API_KEY}&offset=0`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();
    displayReviews(data.reviews);

  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

function displayReviews(reviews) {
  const reviewsContainer = document.getElementById('reviews');
  reviewsContainer.innerHTML = ''; // Clear previous reviews

  if (reviews.length === 0) {
    reviewsContainer.innerHTML = '<p>No reviews available for this company.</p>';
    return;
  }

  reviews.forEach(review => {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review';
    reviewElement.innerHTML = `
      <h3>${review.title}</h3>
      <p class="rating">Rating: ${'★'.repeat(review.rating)}</p>
      <p><strong>Reviewer:</strong> ${review.reviewer} - <em>${new Date(review.datetime).toLocaleDateString()}</em></p>
      <p><strong>Pros:</strong> ${review.pros}</p>
      <p><strong>Cons:</strong> ${review.cons}</p>
      <p><strong>Advice:</strong> ${review.advice || 'N/A'}</p>
    `;
    reviewsContainer.appendChild(reviewElement);
  });
}
