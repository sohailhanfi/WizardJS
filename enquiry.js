$(document).ready(function () {
    WizardEnquiry();
    $("#sendContactYourself").show();
    $("#sendInformationUser").hide();
    $("#getAppForm").hide();
    //loadCountries();
  });
  const validateEmail = (id) => {
      const email = $('#'+id).val();
      if(isValidEmail(email)){
          removeValidationError(id+'-error');
      } else{
          addValidationError(id+'-error', 'email is invalid');
      }
      return false;
    }

    const isValidEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/
      );
    };

    const validateMobileNumber = (event, id) => {
        const mobileNumber = $('#'+id).val().trim();
        const isDigitOnly = (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57;
        if(!isDigitOnly){
            setTimeout(() => {
                document.getElementById(id).value = mobileNumber;
            }, 5);
            return false;
        }
        const currentLength = mobileNumber.length;
        const allowedLength =  sessionStorage.getItem('contactPhoneLength');
        if(Number(currentLength) < Number(allowedLength)){
            removeValidationError(id+'-error');
            return true;
        }else{
            setTimeout(() => {
                document.getElementById(id).value = mobileNumber;
            }, 5);
            return false;
        }
    }

   const resetContactPhone = () => {
    document.getElementById('savecontactPhone').value = '';
    document.getElementById('savecontactPhone').value = '';
   }
  // (function () {
  //    "use strict";
  let EUIData;

  async function UploadAttachment(inp) {
    var formData = new FormData();
    $.each(inp.files, function (i, file) {
        formData.append("file-" + i, file);
    });

    // let files = inp.files;
    // for (let i = 0; i < files.length; i++) {
    //    formData.append('file-' + i, files[i]);
    // }

    try {
        // #region jQuery Call Request to upload image

        let url = "";

        $.ajax({
            url: "http://imagehandler.manikworks.com/imageupload",
            type: "POST",
            headers: {
                //'Content-Type': 'application/json',
                FolderPath: "http://resources.manikworks.com/enquiry/docupload/4b12530d-a209-49da-9eca-245d1169f41c/100210",
                FileName: CreateNewGUID() + "." + inp.files[0].name.split(".").pop(),
            },
            data: formData,
            processData: false,
            contentType: false, //'multipart/form-data',
            async: false,
            success: function (result) {
                url = result.ManikJSon[0].JSon0[0].DocURL;
            },
        });

        return url;
        // #endregion

        //#region JavaScript Call Request to upload attachment

        // var response = await fetch('http://imagehandler.manikworks.com/imageupload', {
        //    method: "POST",
        //    headers: {
        //       //'Content-Type': 'application/json',
        //       'FolderPath': 'http://resources.manikworks.com/designer',
        //       'FileName': 'demo.png'
        //    },
        //    body: formData
        // });
        // let result = await response.json();
        // return result.ManikJSon[0].JSon0[0].DocURL;

        //#endregion
    } catch (e) {
        console.log("Server returns following error", e);
    }
  }
   function addValidationError(id, message){
     document.getElementById(id).innerHTML = "<span style='color:red'>"+message+"</span>";
   }
   function removeValidationError(id){
      document.getElementById(id).innerHTML = "";
    }

  function loadCountries() {
    $.ajax({
        url: "https://entityserver.manikworks.com/apptoken",
        type: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        async: false,
        success: function (result) {
            const token = JSON.parse(result).ManikJSon[0].JSon0;
            sessionStorage.setItem("token", token);
            getCountryList();
        },
    });
  }

  function showCountryDrodown(){
      const sendcontactPhoneDropdownMenu = document.getElementById('sendcontactPhone-country-dropdown-menu');
      const savecontactPhoneDropdownMenu = document.getElementById('savecontactPhone-country-dropdown-menu');

      const countryList =  sessionStorage.getItem("countryList");
      if(!countryList){
          console.error('country list is still not loaded');
          return;
      }
      const countries = JSON.parse(countryList);
      var newList = '';
      for (i = 0; i < countries.length; i++) {
          newList += "<li><a id='"+ addCountryDetailsToIdInLiTage(countries[i])+"' class='dropdown-item'>" + getCountryDisplayName(countries[i]) + "</a></li>";
      }
      sendcontactPhoneDropdownMenu.innerHTML += newList;
      savecontactPhoneDropdownMenu.innerHTML += newList;
    setDynamicEvent('sendcontactPhone-country-dropdown-menu');
    setDynamicEvent('savecontactPhone-country-dropdown-menu');
  }

  function addCountryDetailsToIdInLiTage(country){
    return country.CountryCode + ',' + country.MobileNumberLength
  }
  function getCountryDisplayName(country){
    return country.CountryName +" (" + country.CountryCode +")";
  }
  function setDynamicEvent(id){
      var links = document.getElementById(id).getElementsByTagName('li');
      for (var i = 0; i < links.length; i++) {
          var link = links[i];
          link.addEventListener("click", function(e){
            const data = e.target.id.split(',');
            setCountry(e.target.innerText, data[0], data[1]);
        },false);
    }
        setCountryFromIpAddress();
  }
  function setCountry(displayName, countryCode, contactPhoneLength){
      resetContactPhone();
      document.getElementById('savecontactPhone-country-dropdown-id').innerText = displayName;
      document.getElementById('sendcontactPhone-country-dropdown-id').innerText = displayName;
      sessionStorage.setItem('countryCode', countryCode);
      sessionStorage.setItem('contactPhoneLength', contactPhoneLength);
  }

  async function getCountryList(){
      const token =  sessionStorage.getItem("token");
      $.ajax({
          url: "https://entityserver.manikworks.com/apputils",
          type: "GET",
          headers: {
              'Context': 'GET.COUNTRY.AND.LANGUAGE',
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`,
          },
          async: false,
          success: function (result) {
              //CountryAbbreviation, CountryName
              const countryList = JSON.parse(result).ManikJSon[0].JSon0;
              sessionStorage.setItem('countryList', JSON.stringify(countryList));
              showCountryDrodown();
          },
      });
  }

  async function setCountryFromIpAddress(){
    const countryList = JSON.parse(sessionStorage.getItem('countryList'));
    $.ajax({
        url: "https://jsonip.com/",
        type: "GET",
        async: false,
        success: function (result) {
            const country = countryList.find(c => c.CountryAbbreviation === result.country);
            if(country){
                setCountry(getCountryDisplayName(country), country.CountryAbbreviation, country.MobileNumberLength);
            }else{
                console.error('no country found matching with ', result);
            }
        },
    });
  }
  async function addContact() {
    let activeTab = 'E';
    if(!document.getElementById('savecontactModal-tab-1')?.style?.cssText.includes('none')){
      activeTab = 'E';
    }else if(!document.getElementById('savecontactModal-tab-2')?.style?.cssText.includes('none')){
      activeTab = 'M';
    }else{
      console.error('no tab active, please check the id of element');
      return;
    }
    sessionStorage.setItem('activeTab', activeTab);
    if(activeTab === 'E'){
      const emailInputValue = document.getElementById('savecontactEmail').value;
       if(!emailInputValue){
          addValidationError('savecontactEmail-error', 'please enter email id');
          return;
       }else if(!isValidEmail(emailInputValue)){
          addValidationError('savecontactEmail-error', 'email is invalid');
          return;
       }else{
          removeValidationError('savecontactEmail-error');
       }
    }else {
      removeValidationError('savecontactEmail-error');
    }

    if(activeTab === 'M' && !document.getElementById('savecontactPhone').value){
      addValidationError('savecontactPhone-error', 'please enter mobile number');
      return;
    }else {
      removeValidationError('savecontactPhone-error');
    }

    const token =  sessionStorage.getItem("token");
    if(token){
      shareBizcardRequests();
    }else{
      $.ajax({
          url: "https://entityserver.manikworks.com/apptoken",
          type: "GET",
          headers: {
              'Content-Type': 'application/json',
          },
          async: false,
          success: function (result) {
              const token = JSON.parse(result).ManikJSon[0].JSon0;
              sessionStorage.setItem("token", token);
              shareBizcardRequests();
          },
      });
    }

  }

  async function shareBizcardRequests(){
      const token =  sessionStorage.getItem("token");
      const activeTab = sessionStorage.getItem('activeTab');
      let payload = {};
            if(activeTab === 'E'){
              const emailValue = document.getElementById('savecontactEmail').value;
              payload['EmailID'] = emailValue;
            }else if (activeTab === 'M'){
              payload['MobileNumber'] = document.getElementById('savecontactPhone').value;
              payload['CountryCode'] = sessionStorage.getItem('countryCode');
            }else{
              console.error('no tab active, please check the id of element');
              return;
            }

            const url = window.location.href;
            const parts = url.split('/');
            if (![4, 5].includes(parts.length)) {
                console.error('wrong url')
                return;
            }

            const entityHandle = parts.length === 5 ? parts[parts.length - 2] : parts[parts.length - 1];
            const subHandle = parts.length === 5 ? parts[parts.length - 1] : '';
            let data = {};
            if (subHandle) {
                payload['EntityHandle'] = entityHandle;
                payload['SubHandle'] = subHandle;

                data = {
                    "items": [payload]
                };
            } else {
              payload['EntityHandle'] = entityHandle;
                data = {
                    "items": [payload]
                };
            }

            $.ajax({
                url: "https://entityserver.manikworks.com/bizcard",
                type: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Operation': 'UPDATE.BIZCARD.SHAREREQUESTS',
                    'OperationMode': 'A',
                    'authorization': `Bearer ${token}`
                },
                data: JSON.stringify(data),
                async: false,
                success: function (result) {
                    console.log('response ', result);
                    sessionStorage.setItem('requestHandle', JSON.parse(result).ManikJSon[0].JSon0[0].RequestHandle);
                    $("#sendContactYourself").hide();
                    $("#sendInformationUser").show();
                    if(activeTab === 'E'){
                      const emailValue = payload['EmailID'];
                      document.getElementById('sendcontactEmail').setAttribute('value', emailValue);
                    }else if (activeTab === 'M'){
                      const value = payload['MobileNumber'];
                      document.getElementById('sendcontactPhone').setAttribute('value', value);
                    }

                },
                error: function(request,status,errorThrown){
                  if(status === 401){
                      sessionStorage.removeItem('token');
                  }
                }
            });
  }


  function onClickMayBeLater() {
    $("#sendInformationUser").hide();
    $("#getAppForm").show();

  }

  function validateField(id) {

    setTimeout(() => {
        const fieldValue = document.getElementById(id).value;
        if(!fieldValue){
            addValidationError(id+'-error', 'mandatory');
        }else{
            removeValidationError(id+'-error');
        }
    }, 50)

  }
  async function sendInformationUser() {
    const token = sessionStorage.getItem('token');
    const emailValue = document.getElementById('sendcontactEmail').value;
    const contactName = document.getElementById('sendcontactName').value;
    const contactPhone = document.getElementById('sendcontactPhone').value;
    const company = document.getElementById('sendcontactCompany').value;
    const designation = document.getElementById('sendcontactDesignation').value;

    const countryCode = sessionStorage.getItem('countryCode');
    const isEmailValid = isValidEmail(emailValue);
    const allowedLength =  sessionStorage.getItem('contactPhoneLength');

    if(!contactName || !emailValue || !contactPhone || !countryCode || !isEmailValid || Number(contactPhone.length) < Number(allowedLength)) {

        if(!contactName){
            addValidationError('sendcontactName-error', 'Name is mandatory');
        } else{
            removeValidationError('sendcontactName-error');
        }

        if(!emailValue){
            addValidationError('sendcontactEmail-error', 'Email is mandatory');
        } else if (!isEmailValid){
            addValidationError('sendcontactEmail-error', 'email is invalid');
        }else{
            removeValidationError('sendcontactEmail-error');
        }
        if(!contactPhone){
            addValidationError('sendcontactPhone-error', 'Phone Number is mandatory');
        }else if(Number(contactPhone.length) < Number(allowedLength)){
            addValidationError('sendcontactPhone-error', 'Phone Number length should be'+ allowedLength);
        }else{
            removeValidationError('sendcontactPhone-error');
        }
        return;
    }

    const url = window.location.href;
    const parts = url.split('/');
    if (![4, 5].includes(parts.length)) {
        console.error('wrong url')
        return;
    }
    const entityHandle = parts.length === 5 ? parts[parts.length - 2] : parts[parts.length - 1];
    const subHandle = parts.length === 5 ? parts[parts.length - 1] : '';
    const requestHandle = sessionStorage.getItem('requestHandle');
    let data = {};
    if (subHandle) {
        data = {
            "items": [{
                "EmailID": emailValue,
                "Name": contactName,
                "Company": company,
                "Designation": designation,
                "MobileNumber": contactPhone,
                "EntityHandle": entityHandle,
                "SubHandle": subHandle,
                "RequestHandle": requestHandle,
                "CountryCode": countryCode
            }]
        };
    } else {
        data = {
            "items": [{
                "EmailID": emailValue,
                "Name": contactName,
                "Company": company,
                "Designation": designation,
                "MobileNumber": contactPhone,
                "EmailID": emailValue,
                "EntityHandle": entityHandle,
                "RequestHandle": requestHandle,
                "CountryCode": countryCode

            }]
        };
    }

    $.ajax({
        url: "https://entityserver.manikworks.com/bizcard",
        type: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Operation': 'UPDATE.BIZCARD.SHAREREQUESTS',
            'OperationMode': 'E',
            'authorization': `Bearer ${token}`
        },
        data: JSON.stringify(data),
        async: false,
        success: function (result) {
            console.log('response ', result);
            $("#sendInformationUser").hide();
            $("#getAppForm").show();
        },
    });
  }

  async function SubmitEnquiry(data) {
    $.ajax({
        url: "https://entityserver.manikworks.com/submitresponse",
        type: "POST",
        //headers: {
        //    //'Content-Type': 'application/json',
        //    'context': '',
        //    'lgcontext': '',
        //    'EntityActionType': '',
        //    'OperationMode': ''
        //},
        data: JSON.stringify({
            items: data
        }),
        //processData: false,
        //contentType: false,
        async: false,
        success: function (result) {
            //url = result.ManikJSon[0].JSon0[0].DocURL;
            $("#acknowledgeMessage").show();
            $(".instaWizard .row.mt-2").hide();
            setTimeout(() => {
                $("#acknowledgeMessage").hide();
                $("#reloadForm").show();
            }, 15000);
            $(".frmwzrd")[0].reset();
        },
    });
  }

  function CreateNewGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
  }

  function WizardEnquiry() {
    $("#reloadForm a").on("click", function () {
        $(".instaWizard .row.mt-2").show();
        $("#acknowledgeMessage").hide();
        $("#reloadForm").hide();
    });
    $("#acknowledgeMessage").hide();
    $("#reloadForm").hide();
    let buttons = document.getElementsByClassName("wizardSubmitButton");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", async function (e) {
            // let oEnqElements = e.currentTarget.form.elements;
            let PostedData = [];
            let EnqFormGroups = e.currentTarget.form.children[0].getElementsByClassName("row")[0].getElementsByClassName("col-md-12")[0].getElementsByClassName("form-group");
            if (!ValidatePostedWizardData(EnqFormGroups)) {
                return;
            }
            for (let j = 0; j < EnqFormGroups.length; j++) {
                let body = {};
                let quesn =
                    EnqFormGroups[j].getElementsByClassName("wizardFormHeading")[0];

                let answr = EnqFormGroups[j].getElementsByClassName("form-control")[0];
                if (!answr) {
                    answr = EnqFormGroups[j].getElementsByClassName("form-check");
                    for (let k = 0; k < answr.length; k++) {
                        let input = answr[k].getElementsByClassName("form-check-input")[0];
                        let label = answr[k].getElementsByClassName("form-check-label")[0];
                        if (input.type === "radio" && input.checked) {
                            body["ID"] = input.id;
                            body["Q"] = quesn.innerHTML;
                            body["A"] = label.innerHTML;
                        }
                    }
                } else if (
                    answr.type === "text" ||
                    answr.type === "date" ||
                    answr.type === "email" ||
                    answr.type === "number" ||
                    answr.type === "textarea" ||
                    answr.type === "radio" ||
                    answr.type === "checkbox" ||
                    answr.type === "select" ||
                    answr.type === "select-one" ||
                    answr.type === "hidden" ||
                    answr.type === "tel"
                ) {
                    body["ID"] = answr.id;
                    body["Q"] = quesn.innerHTML;
                    body["A"] = answr.value;
                    //body["BusinessHandle"] = sessionStorage.getItem("BusinessHandle");
                    //body["IPAddress"] = "10.10.01.11";
                } else if (answr.type === "file") {
                    debugger;
                    let url = await UploadAttachment(answr);
                    body["ItemName"] = "Image";
                    body["ItemValue"] = url; //uploadURL + oEnqElements[j].files[0].name.split('.').pop();
                }

                //oEnqElements[j].value = "";
                if (body.ID) {
                    PostedData.push(body);
                }
            }
            await SubmitEnquiry(PostedData);
        });
    }
  }

  function ValidatePostedWizardData(oEnqElements) {
    let count = 0;
    for (let i = 0; i < oEnqElements.length; i++) {
        let answr = oEnqElements[i].getElementsByClassName("form-control")[0];
        try {
            if (answr) {
                if (answr.value === "" && answr.type === "textarea") {
                    $("textarea[id=" + answr.id + "]").css("border", "1px solid red");
                    count++;
                } else if (answr.value === "" && answr.type !== "hidden") {
                    $("input[id=" + answr.id + "]").css("border", "1px solid red");
                    count++;
                } else {
                    if (answr.type === "textarea") {
                        $("textarea[id=" + answr.id + "]").css("border", "");
                    } else {
                        $("input[id=" + answr.id + "]").css("border", "");
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    let IsValid = count ? false : true;
    return IsValid;
  }

  // }());
  ;