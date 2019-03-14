(() => {
  const init = () => {
    
    const elements = {
      colapse: '.endpoint .colapse',
    };
    
    const cache = {
      sheetLink: document.querySelector('.sheet_link'),
      btnGetApi: document.querySelector('.btn_get_api'),
      endpointsSection: document.querySelector('section.endpoints'),
      endpointsSectionMessage: document.querySelector('section.endpoints .message'),
      dataContent: document.querySelector('section.endpoints .data'),
    }
    
    const getEndpoint = (label, link, json) => {
      cache.dataContent.insertAdjacentHTML('beforeend', `
        <div class="endpoint">
          <h2>${label}</h2>
          <h2>${link} <span class="colapse"></span> </h2>
          <textarea name="" id="myTextarea" cols="30" rows="30">
            ${JSON.stringify(json, undefined, 4)}
          </textarea>
        </div>
      `);
    };
    
    /**
     * Handle and show ENDPOINTS to Google Sheet
     * 
     * @param JSON data - JSON Returned API
     * @param String api - Sheet Link
     */
    const handleEndpoints = (data, api) => {
      
      cache.dataContent.insertAdjacentHTML('beforeend', `
        <h1>
          Get you Google Sheet ENDPOINT Below =)
        </h1>
      `);
      
      getEndpoint('Get all data', api, data.data);
      
      Object.keys(data.data).forEach((table) => {
        let link = `${api}/${table}`
        let json = data.data[table];
        getEndpoint(`Get only ${table} table data`, link, json);
        
        if (data.data[table].length > 0) {
          link = `${api}/${table}/0`
          json = data.data[table][0];
          getEndpoint(`Get only 1 item from ${table} table`, link, json);
          
        }
      });
      
      [].slice.call(document.querySelectorAll(elements.colapse)).forEach((el) => {
        el.addEventListener('click', function (event) {
          if ([].slice.call(event.target.parentElement.parentElement.classList).indexOf('expand') > -1) {
            event.target.parentElement.parentElement.classList.remove('expand');
          } else {
            event.target.parentElement.parentElement.classList.add('expand');
          }
        });
      });
      
    };
    
    /**
     * Click Button Get API ENDPOONTS
     */
    cache.btnGetApi.addEventListener('click', () => {
      cache.endpointsSection.classList.remove('empty');
      cache.endpointsSection.classList.remove('error');
      cache.endpointsSection.classList.remove('load');
      cache.endpointsSection.classList.remove('show');
      cache.dataContent.innerHTML = '';
      
      let sheetLink = cache.sheetLink.value;
      
      if (sheetLink.replace(/\s/g, '') == '') {
        cache.endpointsSection.classList.add('error');
        cache.endpointsSectionMessage.innerText = 'You Must Enter your Google Sheet Link In Above Input, Please!';
      } else if (sheetLink.indexOf('docs.google.com/spreadsheets/d/') == -1) {
        cache.endpointsSection.classList.add('error');
        cache.endpointsSectionMessage.innerText = 'You Must Enter A Valid Google Sheet Link In Above Input, Please!';
      } else {
        cache.endpointsSection.classList.add('load');
        
        sheetLink = sheetLink.split('docs.google.com/spreadsheets/d/');
        sheetLink = sheetLink[1].split('/')[0];
        
        const api = 'https://gsapi.kelvins.cc/sheet/' + sheetLink;
        fetch(api)
        .then(response => response.json())
        .then((data) => {
          
          if (data.status) {
            handleEndpoints(data, api);
            
            cache.endpointsSection.classList.add('show');
          } else {
            cache.endpointsSection.classList.add('error');
            cache.endpointsSectionMessage.innerText = data.message;
          }
          
          cache.endpointsSection.classList.remove('load');
        })
      }
    });
  };
  
  setTimeout(init, 1000);
})();