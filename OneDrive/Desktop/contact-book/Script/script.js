const BASE_URL = "https://telephone-api-crud.vercel.app"
const contactForm = document.getElementById("contactForm");
let contacts = []

async function fetchContacts() {
  try {
    const response = await fetch(`${BASE_URL}/api/phones`);
    contacts = await response.json();
    console.log('contacts:', contacts);

    displayContacts(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
}
function displayContacts(contacts) {
  const contactsList = document.getElementById("contact-list");
  contactsList.innerHTML = ""; // Clear existing contacts   
  contacts.forEach(contact => {
    const contactItem = document.createElement("li");
    contactItem.className = "contact-item";
    contactItem.innerHTML = `<li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${contact.name} - ${contact.phoneNumber}</span>
      <div>
      <button class="update-btn" onclick="updateContact('${contact._id}')">Update</button>
      <button class="delete-btn" onclick="deleteContact('${contact._id}')">Delete</button>
      </div>
    </li>
    `;
    contactsList.appendChild(contactItem);
  });
}
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("contact-id").value;
  const name = document.getElementById("name").value;
  const phoneNumber = document.getElementById("phone").value;
  if(!id){
    addContact(name,phoneNumber);
  }


async function addContact(name, phoneNumber) {
try{
  await fetch(`${BASE_URL}/api/phones`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ name, phoneNumber })
  });
  fetchContacts();
  contactForm.reset();
}
catch(error){
  console.error("Error adding contact:", error);

}
  

}

})
 async function deleteContact(id) {
 
  
  try {
     console.log(contacts);
    await fetch(`${BASE_URL}/api/phones/${id}`, {
      method: "DELETE"
    });
    fetchContacts();
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
} 

const search = document.getElementById("searchForm");
search.addEventListener("submit", (e) => {
  e.preventDefault(); 
  const query = e.target[0].value.toLowerCase();
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(query) || contact.phoneNumber.includes(query)
  );
  displayContacts(filteredContacts);
}); 
async function updateContact(id) {
  const contact = contacts.find(c => c._id === id);
  if (!contact) return;   
  document.getElementById("contact-id").value = contact._id;
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phoneNumber;
}   
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("contact-id").value;   
  const name = document.getElementById("name").value;
  const phoneNumber = document.getElementById("phone").value;
  if (id) {     
    try {
      await fetch(`${BASE_URL}/api/phones/${id}`, {
        method: "PUT",    
        headers: {"content-type": "application/json"},
        body: JSON.stringify({ name, phoneNumber })
      });
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  } else {
    try {
      await fetch(`${BASE_URL}/api/phones`, {   
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({ name, phoneNumber })
      });
    } catch (error) {
      console.error("Error adding contact:", error);
    }   
  }
  
  contactForm.reset();  
  await fetchContacts();
})

fetchContacts();