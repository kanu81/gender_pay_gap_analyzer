// City descriptions with organization details and contact info
const cityDescriptions = {
    Mumbai: {
        name: "Mumbai", 
        organizations: [
            {
                name: "AKSHARA",
                description: "Akshara Centre is a Mumbai-based non-profit organization empowering women and girls through education and social engagement. Over two decades, they've supported 5000 young women with scholarships, employment, life skills, and legal rights information, breaking the cycle of poverty. They also train 25,000 young men as Gender Champions to combat sexual harassment. Additionally, they work on gender inclusivity and safety in Mumbai, collaborating with authorities and establishing helplines and gender resource centers. Akshara has a national and international presence and actively engages with UN Women and global campaigns.",
                contact: "Akshara Centre, Dhuru Bldg, 3rd floor, opp Bank of Maharashtra, Gokhale Road, Dadar West, Mumbai 400028, India, Tel: 022 24328699, Email: akshara.frea@gmail.com"
            },
            {
                name: "CORO",
                description: "CORO is a community-based organization dedicated to promoting equality and justice by empowering leaders in marginalized communities for social change. Its main targets include empowering women, facilitating access to resources, defending human rights, holding the system accountable, empowering youth, and improving people's quality of life. With over 25 years of experience, CORO seeks to transform the culture of silence into one of action and change for a better future. They aim to expand and deepen their operations to intensify the positive impact they have already made.",
                contact: "Opposite Bezzola Complex, Suman Nagar, Sion-Trombay Road, Chembur, Mumbai - 400 071, Maharashtra, India. PH. +91-(022)-25295002"
            } 
        ]
    },
    Hyderabad: {
        name: "Hyderabad",
     
        organizations: [
            {
                name: "GENDER AT WORK (G@W INDIA)",
                description: "Global presence in more than 10 countries with offices in D.C., Toronto, Delhi, Hyderabad and Online. Gender at Work envisions a world of gender equality, challenging deep-rooted power structures. They support individuals, organizations, and communities in promoting social justice and women's rights. With analytical frameworks and participatory processes, they tackle workplace equality and address violence against women. In India, Gender at Work operates at both community and institutional levels, striving for gender empowerment and equality.",
                contact: "Hyderabad, info@genderatwork.org"
            },
            {
                name: "SAYFTY",
                description: "Sayfty, founded by gender equality activist Dr. Shruti Kapoor, is dedicated to empowering women and girls to protect themselves in challenging situations. Inspired by the 2012 rape case of Jyoti Singh, the organization equips women with tools and a mindset for their safety. Through education, workshops, and social media presence, Sayfty provides a platform for open conversations on violence against women. They aim to change mindsets, promote respect for women, encourage citizen action, and work with authorities to achieve their vision. Sayfty is inclusive, involving men and boys in discussions about women's roles in society and offering self-defense workshops and education campaigns for everyone to feel safe and protected.",
                contact: " team@sayfty.com"
            }
           
        ]
    },
    Karnataka: {
        name: "Karnataka",
        
        organizations: [
            {
                name: "CARE",
                description: " A strong force aiming to alleviate poverty and social injustice in India. With over 65 years of experience and commitment in enacting social change, CARE has shown to make development a possibility for the lives of many Indians. The focus is placed on marginalised women and girls, aiming to equip them with the tools and skills not only to improve their lives, but the livelihoods of their families as well. Women are disproportionately affected by poverty and discrimination, and reversing these trends would only allow for the development of their life quality and the capacity for development for their communities. The organisation has initiated comprehensive projects in health, education, livelihoods, disaster preparedness and response to help women and girls protect themselves and their families. Its programme goal mobilises \"50 million people\" mainly compromising of volunteers to support these projects and channel their passions to enabling change into the organisation.",
                contact: "HQ in Delhi, Multiple Branches - (Bihar, Chhattisgarh, Karnataka, Kerala, Madhya Pradesh, Pune, Odisha, Tamil Nadu, Telangana, Uttar Pradesh).  "
            } 
           
          
        ]
    },
    Delhi: {
        name: "Delhi",
   
        organizations: [
            {
                name: "Jagori Women's Resource Centre",
                description: "JAGORI means \"awaken, women!\" Our mission is to inform, inspire and empower. Our endeavour is to reach out to women in increasingly innovative ways.                Jagori is an oganisation working with the women's movement in India. They have taken up many of the issues the women's movement raised and intorduced issues for it to absorb. Jagori undertakes a variety of activities including offering training courses, organising campaigns, producing materials and runnind a resource and documentation centre. The centre is open to the public",
                contact: "114B, Block B, Shivalik Colony, Malviya Nagar, New Delhi, Delhi 110017 , Phone: 011 2669 1219"
            },
            {
                name: "Samāna Centre for Gender, Policy & Law",
                description: "Samāna Centre is a leading consultancy in India focused on equality, diversity, and inclusion. They work with various organizations globally, providing strategic solutions in gender impact investing, gender equality, diversity at the workplace, philanthropy, and advocacy for related laws. Founded by Aparna Mittal, the Centre aims to achieve the right to equality and the UN's Gender Equality goal.",
                contact: "Centre Delhi, New Delhi, 110001 IN Centre Delhi, New Delhi. "
            }
            
          
        ]
    },
    
};

// Function to display the city description when a city is clicked
function displayCityDescription(event) {
    const clickedCity = event.target.dataset.city;
    const cityDescription = cityDescriptions[clickedCity];

    // Create an HTML string for the city description and organizations
    let html = `<h3>${cityDescription.name}</h3>`;
    html += '<h4>Organizations:</h4>';
    html += '<ul>';
    cityDescription.organizations.forEach(org => {
        html += `<li><strong>${org.name}</strong>: ${org.description} <br><strong>Address and Contact info.</strong> ${org.contact}</li>`;
    });
    html += '</ul>';

    // Update the cityDescriptionElement with the generated HTML
    const cityDescriptionElement = document.getElementById('cityDescription');
    cityDescriptionElement.innerHTML = html;
}
 
  const cityList = document.getElementById('cityList');
  const cities = cityList.getElementsByTagName('li');
  for (let i = 0; i < cities.length; i++) {
    cities[i].addEventListener('click', displayCityDescription);
  }
  
  // Function to handle form submission and send data to the server
  function submitForm(event) {
    console.log('Form submission started.');
    event.preventDefault();
  
    // Get the form data
    const otherIssue = document.getElementById('otherIssue').value;
    const email = document.getElementById('emailInput').value;
  
    // Create a data object to send to the server
    const formData = {
      otherIssue: otherIssue,
      email: email,
    };
  
    // Send the form data to the server using fetch API
    fetch('http://localhost:3000/submit_form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // If the server responds successfully, reset the form fields
          document.getElementById('issueform').reset();
          alert('Form submitted successfully!');
        } else {
          alert('Failed to submit the form. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  