
//Global variables
var client_list = null
var client_dict = null

async function get_and_set_client_name_dropdown() {
    // lock refresh and login button And Dropdown until data refreshed
    document.getElementById("refresh_button").disabled = true
    document.getElementById("login_button").disabled = true
    document.getElementById("client").disabled = true

    // set client_list and client_dict to null thenafter allotted new value
    client_list = null
    client_dict = null

    let client_list_and_dict_py = await eel.get_client_list_and_dict_from_excel()()
    client_list = client_list_and_dict_py[0]
    client_dict = client_list_and_dict_py[1]
    var select = document.getElementById("client")
    for (var i = 0, size = client_list.length; i < size; i++) {
        var client_name = client_list[i]
        var opt = document.createElement('option')
        opt.value = client_name
        opt.innerHTML = client_name
        select.appendChild(opt)
    }

    // Activate dropdown and button
    document.getElementById("client").disabled = false
    document.getElementById("refresh_button").disabled = false
    document.getElementById("login_button").disabled = false
}

// Set client details into table tds
function set_client_details() {
    let selected_client = document.getElementById("client").value
    if (selected_client != "Select") {
        var client_detail_toput = client_dict[selected_client]
        document.getElementById("User_id").innerHTML = client_detail_toput["User_id"]
        document.getElementById("Password").innerHTML = client_detail_toput["Password"]
        document.getElementById("GSTIN").innerHTML = client_detail_toput["GSTIN"]
        document.getElementById("Organization_Type").innerHTML = client_detail_toput["Organization_Type"]
        document.getElementById("Contact_Person").innerHTML = client_detail_toput["Contact_Person"]
        document.getElementById("Contact_Number").innerHTML = client_detail_toput["Contact_Number"]
        document.getElementById("Email_ID").innerHTML = client_detail_toput["Email_ID"]
        document.getElementById("Client_Status").innerHTML = client_detail_toput["Client_Status"]
        document.getElementById("Registration_Type").innerHTML = client_detail_toput["Registration_Type"]
    } else {
        set_default_values()
    }
}

function data_refresh() {
    get_and_set_client_name_dropdown()
    set_default_values()
}

// Set default values into table, useful on dat refresh
function set_default_values() {
    document.getElementById("client").value = "Select"
    document.getElementById("User_id").innerHTML = ""
    document.getElementById("Password").innerHTML = ""
    document.getElementById("GSTIN").innerHTML = ""
    document.getElementById("Organization_Type").innerHTML = ""
    document.getElementById("Contact_Person").innerHTML = ""
    document.getElementById("Contact_Number").innerHTML = ""
    document.getElementById("Email_ID").innerHTML = ""
    document.getElementById("Client_Status").innerHTML = ""
    document.getElementById("Registration_Type").innerHTML = ""
}

// On login button press initiate login to be executed on python part
async function login() {
    let selected_client = document.getElementById("client").value
    if (selected_client != "Select") {
        var id = client_dict[selected_client]["User_id"]
        var pwd = client_dict[selected_client]["Password"]
        if (id != "" && pwd != "") {
            await eel.eel_login_on_gst_portal(id, pwd)()
        } else {
            alert("User ID and/or Password is missing!")
        }
    } else {
        alert("Select client to Login!")
    }
    
}

// On button press give password details into alert
function showPasswrod() {
    let selected_client = document.getElementById("client").value
    if (pwd != "" && selected_client != "Select") {
        var pwd = client_dict[selected_client]["Password"]
        alert("Password: " + pwd)
    } else {
        alert("Password is missing!")
    }
}

// In case user wants to make changes in client master then open excel with installed excel
function open_excel() {
    eel.open_excel_file_to_edit()()
}