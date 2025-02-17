import { API_BASE_URL } from "../render.js";
import { navigate } from "../router.js";

function createFormsTableContainer() {
  const container = document.createElement('div');

  const structure = {
      tag: 'h1',
      text: 'View Forms'
  };

  const tableStructure = {
      tag: 'table',
      children: [
          {
              tag: 'thead',
              children: [
                  {
                      tag: 'tr',
                      children: [
                          { tag: 'th', text: 'Form Name' },
                          { tag: 'th', text: 'Status' },
                          { tag: 'th', text: 'Number of Responses' },
                          { tag: 'th', text: 'Actions' }
                      ]
                  }
              ]
          },
          { tag: 'tbody', attributes: { id: 'forms-table-body' } }
      ]
  };

  const paginationStructure = {
      tag: 'div',
      attributes: { class: 'pagination' },
      children: [
          { tag: 'button', attributes: { id: 'prevPage', disabled: true }, text: 'Previous' },
          { tag: 'span', attributes: { id: 'pageInfo' }, text: 'Page 1' },
          { tag: 'button', attributes: { id: 'nextPage' }, text: 'Next' }
      ]
  };

  function createElementFromJSON(json) {
      const element = document.createElement(json.tag);
      if (json.text) element.textContent = json.text;
      if (json.attributes) {
          Object.keys(json.attributes).forEach(attr => {
              element.setAttribute(attr, json.attributes[attr]);
          });
      }
      if (json.children) {
          json.children.forEach(child => {
              element.appendChild(createElementFromJSON(child));
          });
      }
      return element;
  }

  container.appendChild(createElementFromJSON(structure));
  container.appendChild(createElementFromJSON(tableStructure));
  container.appendChild(createElementFromJSON(paginationStructure));

  let currentPage = 0;
  const pageSize = 5;

  function fetchForms(page) {
      fetch(`${API_BASE_URL}/api/forms/paginated?page=${page}&size=${pageSize}`)
          .then(response => response.json())
          .then(data => {
              const forms = data.content;
              const tableBody = container.querySelector('#forms-table-body');
              tableBody.innerHTML = '';

              forms.forEach(form => {
                  const row = document.createElement('tr');

                  const formNameCell = document.createElement('td');
                  formNameCell.textContent = form.name;
                  row.appendChild(formNameCell);

                  const statusCell = document.createElement('td');
                  statusCell.textContent = form.status === 'active' ? 'Active' : 'Inactive';
                  statusCell.classList.add('status', form.status === 'active' ? 'active' : 'inactive');
                  row.appendChild(statusCell);

                  const responsesCell = document.createElement('td');
                  responsesCell.textContent = 'Loading...';
                  row.appendChild(responsesCell);

                  fetch(`${API_BASE_URL}/api/responses/count/${form.id}`)
                      .then(response => response.json())
                      .then(responseCount => {
                          responsesCell.textContent = responseCount;
                      })
                      .catch(() => {
                          responsesCell.textContent = 0;
                      });

                  const actionsCell = document.createElement('td');
                  const actionsDiv = document.createElement('div');
                  actionsDiv.classList.add('actions');

                  const viewButton = document.createElement('button');
                  viewButton.textContent = 'View';
                  
                   viewButton.addEventListener("click", () => {
                              navigate(`/view-responses/${form.id}`);
                          });
                  
                  actionsDiv.appendChild(viewButton);
                  

                  const deleteButton = document.createElement('button');
                  deleteButton.classList.add('delete');
                  deleteButton.textContent = 'Delete';
                  deleteButton.addEventListener('click', () => {
                     Swal.fire({
                         title: "Are you sure?",
                         text: `You are about to deactivate form: ${form.name}.`,
                         icon: "warning",
                         showCancelButton: true,
                         confirmButtonColor: "#d33",
                         cancelButtonColor: "#3085d6",
                         confirmButtonText: "Yes, deactivate it!"
                     }).then((result) => {
                         if (result.isConfirmed) {
                             fetch(`${API_BASE_URL}/api/forms/${form.id}/status`, {
                                 method: 'PUT',
                                 headers: { 'Content-Type': 'application/json' },
                                 body: JSON.stringify({ status: 'inactive' })
                             })
                             .then(response => response.json())
                             .then(() => {
                                 fetchForms(currentPage);
                             })
                             .catch((error => console.error('Error deactivating form:', error)));
                         }
                     });
                  });

                  actionsDiv.appendChild(deleteButton);
                  actionsCell.appendChild(actionsDiv);
                  row.appendChild(actionsCell);

                  tableBody.appendChild(row);
              });

              updatePagination(data.totalPages);
          });
  }

  function updatePagination(totalPages) {
      container.querySelector('#pageInfo').textContent = `Page ${currentPage + 1}`;
      container.querySelector('#prevPage').disabled = currentPage === 0;
      container.querySelector('#nextPage').disabled = currentPage >= totalPages - 1;
  }

  container.querySelector('#prevPage').addEventListener('click', () => {
      if (currentPage > 0) {
          currentPage--;
          fetchForms(currentPage);
      }
  });

  container.querySelector('#nextPage').addEventListener('click', () => {
      currentPage++;
      fetchForms(currentPage);
  });

  fetchForms(currentPage);

  return container;
}

export default createFormsTableContainer;