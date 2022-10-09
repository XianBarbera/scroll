const requestTarget = document.querySelector('#request-target');
const cardContainer = document.querySelector('#card-container');
const intersectionOptions = {
  threshold: 1,
};

let apiUrl = 'https://rickandmortyapi.com/api/location?page=1';
let loading = false;

const onIntersect = ([entry]) => {
  if (apiUrl && !loading && entry.isIntersecting) makeRequest();
};

const makeRequest = () => {
  loading = true;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      cleanUp(data.info.next);
      renderItems(data.results);
    });
};

const cleanUp = (nextPage) => {
  apiUrl = nextPage;
  loading = false;
};

const renderItems = (results) => {
  results.forEach((item) => {
    cardContainer.appendChild(createItem(item));
  });
};

const createItem = (item) => {
  const newItem = document.createElement('div');
  newItem.classList.add('item');
  newItem.innerHTML = ` <div class="card">
            <h1>${item.name}</h1>
            <h2>${item.dimension}<h2>
            <img src="http://placekitten.com/200/200" alt="">
            <div class="detail-container">
            <p> Type: ${item.type}</p>
            <p> Population: ${item.residents.length}</p>
            </div>
            </div>
        `;
  return newItem;
};

let observer = new IntersectionObserver(onIntersect, intersectionOptions);

observer.observe(requestTarget);
